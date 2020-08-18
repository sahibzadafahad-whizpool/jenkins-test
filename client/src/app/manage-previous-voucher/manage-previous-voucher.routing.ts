import { Routes, RouterModule } from "@angular/router";
import { ManagePreviousVoucherComponent } from "./manage-previous-voucher.component";

const childRoutes: Routes = [
  {
    path: "",
    component: ManagePreviousVoucherComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
