import { Component, OnInit } from '@angular/core';
import { ImportsModule } from '../../prime-imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EngineerService } from '../../shared/services/engineer.service';
import { Engineer } from '../../shared/models/engineer.model';
@Component({
  selector: 'app-engr-list',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './engr-list.component.html',
  styleUrl: './engr-list.component.css'
})
export class EngrListComponent implements OnInit {
  selectedFile: File | null = null;
  prcID: number = 0; // Replace with your actual PRC ID value
  today = new Date();
  visible: boolean = false;
  profileForm: FormGroup;
  minDate = new Date();
  headerTitle:string = 'Add New Engineer';
  stateOptions: any[] = [
    { label: 'Active', value: 1 },
    { label: 'Not Active', value: 0 }
  ];
  genders = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];

  listData: Engineer[] = [];
  message: string | null = null;
  constructor(private fb: FormBuilder, private engineerService: EngineerService) {
    this.profileForm = this.fb.group({
      id: [null],
      prcID: [null, Validators.required],
      name: [null, Validators.required],
      gender: [null],
      email: [null, [Validators.required, Validators.email]],
      prcExpiryDate: [new Date(), Validators.required],
      projectCount: [0, Validators.min(0)],
      issActive: [1]
    });
  }

  ngOnInit() {
    this.fetchData();
  }

  openDialog(isEdit:boolean) {
    this.profileForm.reset();
    this.profileForm.patchValue({issActive:1});
    this.profileForm.patchValue({projectCount:0});
    if(isEdit){
      this.headerTitle = 'Edit Information';
    }else{
      this.headerTitle = 'Add New Engineer';
    }
    this.visible = true;
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;
      const date = new Date(formData.prcExpiryDate);
      formData.prcExpiryDate.setDate(date.getDate() + 1);
      if(formData.id > 0){
        this.engineerService.update(formData.id, formData).subscribe((response:any) => {
          if(response){
            this.fetchData();
          }
        });
      }else{
        this.engineerService.create(formData).subscribe((response:any) => {
          if(response){
            this.fetchData();
          }
        });
      }
      this.visible = false;
    }
  }

  fetchData() {
    this.engineerService.getAll().subscribe((response:any) => {
      if(response){
        this.listData = response;
      }

    })
  }

  edit(row: Engineer){
    this.openDialog(true);
    this.profileForm.patchValue(row);
    this.profileForm.patchValue({prcExpiryDate: row.prcExpiryDate? new Date(row.prcExpiryDate) : new Date()});
  }

  checkIfExpired(row: Engineer){
    const expiryDate = row.prcExpiryDate ? new Date(row.prcExpiryDate) : null;
    return expiryDate && expiryDate < this.today;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmitImage() {
    const formData = this.profileForm.value;
    if (this.selectedFile && formData.prcID) {
      this.engineerService.uploadImage(this.selectedFile, formData.prcID).subscribe({
        next: (response) => {
          this.message = 'Image uploaded successfully!';
          console.log(response); // Handle response as needed
        },
        error: (error) => {
          this.message = 'Image upload failed!';
          console.error(error); // Handle error as needed
        },
        complete: () => {
          this.visible = false;

          console.log('Image upload completed');
        }
      });
    }
  }

}
