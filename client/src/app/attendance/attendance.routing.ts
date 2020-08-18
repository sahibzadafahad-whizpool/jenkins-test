import { Routes, RouterModule } from "@angular/router";
import { AttendanceComponent } from "./attendance.component";

const childRoutes: Routes = [
  {
    path: "",
    component: AttendanceComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
