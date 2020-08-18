import { Routes, RouterModule } from "@angular/router";
import { StudentsComponent } from "./students.component";

const childRoutes: Routes = [
  {
    path: "",
    component: StudentsComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
