import { Routes, RouterModule } from '@angular/router';
import { StudentsPromotionComponent } from './students-promotion.component';

const childRoutes: Routes = [
  {
    path: '',
    component: StudentsPromotionComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
