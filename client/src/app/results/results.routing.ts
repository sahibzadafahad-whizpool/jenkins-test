import { Routes, RouterModule } from '@angular/router';
import { ResultsComponent } from './results.component';

const childRoutes: Routes = [
  {
    path: '',
    component: ResultsComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
