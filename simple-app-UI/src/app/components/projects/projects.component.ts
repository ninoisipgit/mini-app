import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImportsModule } from '../../prime-imports';
import { EngineerService } from '../../shared/services/engineer.service';
import { Project } from '../../shared/models/projects';
import { Engineer } from '../../shared/models/engineer.model';
import { ProjectService } from '../../shared/services/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projectForm: FormGroup;
  visible: boolean = false;
  headerTitle: string = 'Add Project';
  minEndDate: Date | null = null; // Variable to hold the minimum end date
  statusOptions = [
    { label: 'Active', value: 1 },
    { label: 'Inactive', value: 0 }
  ];

  engrList : any[] = []
  unFilteredengrList : Engineer[] = []
  listData : Project[] = []
  editMode : boolean = false;
  constructor(private fb: FormBuilder, private engineerService: EngineerService, private projectService: ProjectService) {
    this.projectForm = this.fb.group({
      id: [null],
      title: [null, Validators.required],
      contructor: [null],
      amount: [0, Validators.min(0)],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      assignedEngrID: [0, Validators.min(0)],
      status: [1, Validators.required]
    });
    this.fetchEngrList();
    this.fetchData();
  }

  ngOnInit() {

       // Subscribe to changes in startDate to update minEndDate
       this.projectForm.get('startDate')?.valueChanges.subscribe(value => {
        this.minEndDate = value ? new Date(value) : null; // Set minEndDate to startDate
        // if (this.projectForm.get('endDate')?.value) {
        //   this.projectForm.get('endDate')?.updateValueAndValidity(); // Re-validate endDate
        // }
      });

      // Subscribe to changes in endDate to update maxStartDate
      this.projectForm.get('endDate')?.valueChanges.subscribe(value => {
        const startDateControl = this.projectForm.get('startDate');
        if (startDateControl?.value && value) {
          startDateControl.setValidators([Validators.required, Validators.max(value)]); // Set maximum date for startDate
          startDateControl.updateValueAndValidity();
        }
      });



  }

  fetchEngrList() {
    this.engineerService.getAll().subscribe((response: Engineer[]) => {
      if (response) {
        this.unFilteredengrList = response;
        const today = new Date();
        const filteredEngineers = response.filter(engr => {
          const expiryDate = engr.prcExpiryDate ? new Date(engr.prcExpiryDate) : null;
          // return expiryDate && expiryDate >= today && engr.issActive === 1;
          return expiryDate && expiryDate >= today && engr.issActive === 1;
        });
        this.engrList = filteredEngineers.map(engr => ({ label: engr.name, value: engr.id }));
      }
    })
  }

  fetchData() {
    this.projectService.getAll().subscribe((response:any) => {
      if(response){
        this.listData = response;
      }
    })
  }

  openDialog(editMode: boolean) {
    this.editMode = editMode;
    this.headerTitle = editMode ? 'Edit Project' : 'Add Project';
    this.projectForm.reset();
    this.projectForm.patchValue({status:1});
    this.visible = true;
  }


  onSubmit() {
    if (this.projectForm.valid) {
      const formData = this.projectForm.value;
      formData.assignedEngrID = Number(formData.assignedEngrID);
      formData.startDate.setDate(new Date(formData.startDate).getDate() + 1);
      formData.endDate.setDate(new Date(formData.endDate).getDate() + 1);
      if(formData.id > 0){
        this.projectService.update(formData.id, formData).subscribe((response:any) => {
          if(response){
            this.fetchData();
          }
        });
      }else{
        this.projectService.create(formData).subscribe((response:any) => {
          if(response){
            this.fetchData();
          }
        });
      }
      this.visible = false;
    }
  }


  edit(row: Project){
    this.openDialog(true);
    this.projectForm.patchValue(row);
    this.projectForm.patchValue({startDate: row.startDate? new Date(row.startDate) : new Date()});
    this.projectForm.patchValue({endDate: row.endDate? new Date(row.endDate) : new Date()});
  }


  getName(id: number) {
    return this.unFilteredengrList.find(engr => engr.id == id)?.name || '';
  }
}
