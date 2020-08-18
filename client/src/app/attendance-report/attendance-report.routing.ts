import { Routes, RouterModule } from '@angular/router';
import { AttendanceReportComponent } from './attendance-report.component';

const childRoutes: Routes = [
  {
    path: '',
    component: AttendanceReportComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
