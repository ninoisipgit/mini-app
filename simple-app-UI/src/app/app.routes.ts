import { Routes } from '@angular/router';
import { EngrListComponent } from './components/engr-list/engr-list.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { EngrDetailsComponent } from './components/engr-details/engr-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'engr-list',
    pathMatch: 'full'
  },
  {
    path: 'engr-list',
    component: EngrListComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'engr/:id',
    component: EngrDetailsComponent
  }


];
