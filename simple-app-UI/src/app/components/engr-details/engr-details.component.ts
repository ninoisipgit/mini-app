import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImportsModule } from '../../prime-imports';
import { EngineerService } from '../../shared/services/engineer.service';
import { Project } from '../../shared/models/projects';
import { ProjectService } from '../../shared/services/project.service';
import { Engineer } from '../../shared/models/engineer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-engr-details',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './engr-details.component.html',
  styleUrl: './engr-details.component.css'
})
export class EngrDetailsComponent implements OnInit {
  projectListDataByEngr : Project[] = [];
  projectListAll : Project[] = [];
  imagePath: string | null = null;
  engrList : any[] = []
  unFilteredengrList : Engineer[] = [];
  engrId: number = 0;
  engrDetails! : Engineer;
  selectedProject:any;
  showImageDialog: boolean = false;

    // ViewChild to access the image element
    @ViewChild('imageToPrint', { static: false }) imageToPrint!: ElementRef<HTMLImageElement>;

  constructor(private engineerService: EngineerService, private projectService: ProjectService,private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.engrId =  Number(params.get('id'));
    });
  }

  ngOnInit(): void {
    if(this.engrId > 0){
      this.engineerService.getById(this.engrId).subscribe((response: Engineer) => {
        if (response) {
          this.engrDetails = response;
          if (this.engrDetails.prcID !== null && this.engrDetails.prcID !== undefined) {
            this.getPRCImage(this.engrDetails.prcID);
          }
        }
      });
    }

    this.fetchData();
    this.fetchEngrList();
  }

  fetchData() {
    this.projectService.getAll()
    .pipe(map((response: Project[]) => response.filter((project: Project) => project.status === 1)))
    .subscribe((response:Project[]) => {
      if(response){
        this.projectListDataByEngr = response.filter((project:Project) => project.assignedEngrID == this.engrId);

        this.projectListAll = response.filter((project:Project) =>
          project.assignedEngrID != this.engrId &&
          (project.assignedEngrID == null || project.assignedEngrID == 0)
        );

          // After filtering, check for date overlaps
          this.projectListAll = this.projectListAll.map((project: Project) => {
            // Check if there's an overlap with any project in projectListDataByEngr
            const overlap = this.projectListDataByEngr.some((assignedProject: Project) => {
              return this.isDateOverlap(
                assignedProject.startDate?.toString(), // Convert to string if necessary
                assignedProject.endDate?.toString(),   // Convert to string if necessary
                project.startDate?.toString(),         // Convert to string if necessary
                project.endDate?.toString()            // Convert to string if necessary
              );
            });

            // If overlap is found, mark as invalid
            if (overlap) {
              return { ...project, invalid: true };
            }
            return project;
          });
      }
    })
  }

// Modify the isDateOverlap function to work with string inputs
private isDateOverlap(start1: string | null | undefined, end1: string | null | undefined, start2: string | null | undefined, end2: string | null | undefined): boolean {
  // Ensure dates are valid and default to a non-overlapping range if they are missing
  const startDate1 = start1 ? new Date(start1) : new Date('9999-12-31'); // Default to a far future date
  const endDate1 = end1 ? new Date(end1) : new Date('0000-01-01');       // Default to a far past date
  const startDate2 = start2 ? new Date(start2) : new Date('9999-12-31');
  const endDate2 = end2 ? new Date(end2) : new Date('0000-01-01');

  return startDate1 <= endDate2 && startDate2 <= endDate1;
}
  fetchEngrList() {
    this.engineerService.getAll().subscribe((response: Engineer[]) => {
      if (response) {
        this.unFilteredengrList = response;
        const today = new Date();
        const filteredEngineers = response.filter(engr => {
          const expiryDate = engr.prcExpiryDate ? new Date(engr.prcExpiryDate) : null;
          return expiryDate && expiryDate >= today && engr.issActive === 1;
        });
        this.engrList = filteredEngineers.map(engr => ({ label: engr.name, value: engr.id }));
      }
    })
  }

  getName(id: number) {
    return this.unFilteredengrList.find(engr => engr.id == id)?.name || '';
  }

  getPRCImage(prcID: string) {
    this.engineerService.getImageByPrcID(prcID).subscribe(
      (response) => {
        if (response?.success) {
          this.imagePath = response.imagePath;
        } else {
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }


  assignProject(project: Project) {
    project.assignedEngrID = this.engrId;
    this.projectService.update(project.id, project).subscribe((response:any) => {
      if(response){
        this.fetchData();
      }
    });
  }

  unAssignProject(project: Project) {
    project.assignedEngrID = 0;
    this.projectService.update(project.id, project).subscribe((response:any) => {
      if(response){
        this.fetchData();
      }
    });
  }

  // Function to print the specific image
  printImage() {
    const printContents = this.imageToPrint.nativeElement.src; // Access the image source
    const printWindow = window.open('', '_blank'); // Stay on the same tab

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Image</title>
            <style>
              body {
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
              }
              img {
                max-width: 100%;
                height: auto;
              }
            </style>
          </head>
          <body>
            <img src="${printContents}" alt="${this.engrDetails.prcID}" />
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();


      // Close the dialog after printing
      this.showImageDialog = false; // Close the dialog
    }
  }
}
