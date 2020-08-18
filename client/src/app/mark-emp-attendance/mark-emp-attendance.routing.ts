import { Routes, RouterModule } from "@angular/router";
import { MarkEmpAttendanceComponent } from "./mark-emp-attendance.component";

const childRoutes: Routes = [
  {
    path: "",
    component: MarkEmpAttendanceComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
