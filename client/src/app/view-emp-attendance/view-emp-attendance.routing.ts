import { Routes, RouterModule } from "@angular/router";
import { ViewEmpAttendanceComponent } from "./view-emp-attendance.component";

const childRoutes: Routes = [
  {
    path: "",
    component: ViewEmpAttendanceComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
