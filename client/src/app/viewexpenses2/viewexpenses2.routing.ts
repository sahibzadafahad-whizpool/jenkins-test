import { Routes, RouterModule } from "@angular/router";
import { ViewExpenses2Component } from "./viewexpenses2.component";

const childRoutes: Routes = [
  {
    path: "",
    component: ViewExpenses2Component
  }
];

export const routing = RouterModule.forChild(childRoutes);
