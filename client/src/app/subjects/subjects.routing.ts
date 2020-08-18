import { Routes, RouterModule } from '@angular/router';
import { SubjectsComponent } from './subjects.component';

const childRoutes: Routes = [
  {
    path: '',
    component: SubjectsComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
