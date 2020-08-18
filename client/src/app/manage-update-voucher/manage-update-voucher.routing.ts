import { Routes, RouterModule } from "@angular/router";
import { ManageUpdateVoucherComponent } from "./manage-update-voucher.component";

const childRoutes: Routes = [
  {
    path: "",
    component: ManageUpdateVoucherComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
