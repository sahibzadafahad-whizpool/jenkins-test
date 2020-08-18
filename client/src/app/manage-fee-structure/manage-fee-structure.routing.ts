import { Routes, RouterModule } from '@angular/router';
import { ManageFeeStructureComponent } from './manage-fee-structure.component';

const childRoutes: Routes = [
  {
    path: '',
    component: ManageFeeStructureComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
