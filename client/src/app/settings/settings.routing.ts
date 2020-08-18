import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';

const childRoutes: Routes = [
  {
    path: '',
    component: SettingsComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
