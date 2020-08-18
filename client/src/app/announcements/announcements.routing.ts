import { Routes, RouterModule } from '@angular/router';
import { AnnouncementsComponent } from './announcements.component';

const childRoutes: Routes = [
  {
    path: '',
    component: AnnouncementsComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
