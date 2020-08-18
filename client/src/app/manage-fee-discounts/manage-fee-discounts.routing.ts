import { Routes, RouterModule } from '@angular/router';
import { ManageFeeDiscountsComponent } from './manage-fee-discounts.component';

const childRoutes: Routes = [
  {
    path: '',
    component: ManageFeeDiscountsComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
