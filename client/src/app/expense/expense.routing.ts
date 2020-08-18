import { Routes, RouterModule } from "@angular/router";
import { ExpenseComponent } from "./expense.component";

const childRoutes: Routes = [
  {
    path: "",
    component: ExpenseComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
