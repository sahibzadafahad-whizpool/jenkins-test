import { Routes, RouterModule } from '@angular/router';
import { MarksComponent } from './marks.component';

const childRoutes: Routes = [
  {
    path: '',
    component: MarksComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
