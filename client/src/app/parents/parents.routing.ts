import { Routes, RouterModule } from '@angular/router';
import { ParentsComponent } from './parents.component';

const childRoutes: Routes = [
    {
        path: '',
        component: ParentsComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
