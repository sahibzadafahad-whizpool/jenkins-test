import { Routes, RouterModule } from '@angular/router';
import { ManageFeeHeadsComponent } from './manage-fee-heads.component';

const childRoutes: Routes = [
  {
    path: '',
    component: ManageFeeHeadsComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);