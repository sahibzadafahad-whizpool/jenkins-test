import { Routes, RouterModule } from "@angular/router";
import { ViewExpensesComponent } from "./viewexpenses.component";

const childRoutes: Routes = [
  {
    path: "",
    component: ViewExpensesComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
