import { Routes, RouterModule } from '@angular/router';
import { StaffComponent } from './staff.component';

const childRoutes: Routes = [
    {
        path: '',
        component: StaffComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
