import { Routes, RouterModule } from "@angular/router";
import { ManageFeeInvoiceComponent } from "./manage-fee-invoice.component";

const childRoutes: Routes = [
  {
    path: "",
    component: ManageFeeInvoiceComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
