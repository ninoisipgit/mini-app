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

  calendarDays : number = 0;
  constructor(private fb: FormBuilder, private engineerService: EngineerService, private projectService: ProjectService) {
    this.projectForm = this.fb.group({
      id: [null],
      title: [null, Validators.required],
      contructor: [null],
      amount: [0],
      startDate: [null, ],
      endDate: [null, ],
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
    if (!this.projectForm.valid) {
      console.error('Form is invalid:', this.projectForm.errors);
      return; // Return early if the form is not valid
    }

    const formData = { ...this.projectForm.value }; // Create a shallow copy of the form data
    formData.assignedEngrID = Number(formData.assignedEngrID); // Ensure assignedEngrID is a number

    // Log the original dates for debugging
    console.log('Original startDate:', formData.startDate);
    console.log('Original endDate:', formData.endDate);

    // Ensure startDate and endDate are valid date objects
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error('Invalid date values:', { startDate, endDate });
      return; // Return if either date is invalid
    }

    // Format the dates to local date string without converting to UTC
    formData.startDate = startDate.toLocaleString('en-CA', { timeZone: 'Asia/Singapore' }).split(',')[0]; // 'YYYY-MM-DD'
    formData.endDate = endDate.toLocaleString('en-CA', { timeZone: 'Asia/Singapore' }).split(',')[0]; // 'YYYY-MM-DD'

    // Log the formatted dates before sending them
    console.log('Formatted startDate:', formData.startDate);
    console.log('Formatted endDate:', formData.endDate);

    if (formData.id > 0) {
      // If an ID exists, update the project
      this.projectService.update(formData.id, formData).subscribe((response: any) => {
        if (response) {
          this.fetchData(); // Refresh data after update
        }
      });
    } else {
      // If no ID, create a new project
      this.projectService.create(formData).subscribe((response: any) => {
        if (response) {
          this.fetchData(); // Refresh data after creation
        }
      });
    }

    this.visible = false; // Close the form/modal after submission
  }



  edit(row: Project){
    this.openDialog(true);
    this.projectForm.patchValue(row);
    this.projectForm.patchValue({startDate: row.startDate? new Date(row.startDate) : new Date()});
    this.projectForm.patchValue({endDate: row.endDate? new Date(row.endDate) : new Date()});

    // Calculate the number of days between startDate and endDate
    const startDate = this.projectForm.get('startDate')?.value;
    const endDate = this.projectForm.get('endDate')?.value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Calculate the difference in milliseconds
      const timeDifference = end.getTime() - start.getTime();

      // Convert milliseconds to days
      this.calendarDays = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Using Math.ceil to round up
    } else {
      this.calendarDays = 0; // Default to 0 if dates are not valid
    }
  }


  getName(id: number) {
    return this.unFilteredengrList.find(engr => engr.id == id)?.name || '';
  }


  updateEndDate(days: Event) {
    const startDateControl = this.projectForm.get('startDate');

    if (startDateControl) {
      const startDateValue = startDateControl.value;
      const defaultDate = new Date(0); // Unix Epoch default date

      // Check if startDate is null, undefined, or the default Unix Epoch date
      if (!startDateValue || new Date(startDateValue).getTime() === defaultDate.getTime()) {
        return; // Exit the function if startDate is the default date
      }

      const startDate = new Date(startDateValue);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + this.calendarDays); // Add the number of days

      // Patch the calculated endDate to the form
      this.projectForm.patchValue({
        endDate: endDate
      });
    }
  }



}
