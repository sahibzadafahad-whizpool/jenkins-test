import { Routes, RouterModule } from "@angular/router";
import { ClassesComponent } from "./classes.component";

const childRoutes: Routes = [
  {
    path: "",
    component: ClassesComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
