import { Routes, RouterModule } from "@angular/router";
import { ExamsComponent } from "./exams.component";

const childRoutes: Routes = [
  {
    path: "",
    component: ExamsComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
