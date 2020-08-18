import { Routes, RouterModule } from '@angular/router';
import { ManageFeeVoucherComponent } from './manage-fee-voucher.component';

const childRoutes: Routes = [
  {
    path: '',
    component: ManageFeeVoucherComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
