import { Routes, RouterModule } from '@angular/router';
import { TeachersComponent } from './teachers.component';

const childRoutes: Routes = [
    {
        path: '',
        component: TeachersComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
