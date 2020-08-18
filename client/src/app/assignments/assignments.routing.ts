import { Routes, RouterModule } from "@angular/router";
import { AssignmentsComponent } from "./assignments.component";

const childRoutes: Routes = [
  {
    path: "",
    component: AssignmentsComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
