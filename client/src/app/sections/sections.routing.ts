import { Routes, RouterModule } from '@angular/router';
import { SectionsComponent } from './sections.component';

const childRoutes: Routes = [
  {
    path: '',
    component: SectionsComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
