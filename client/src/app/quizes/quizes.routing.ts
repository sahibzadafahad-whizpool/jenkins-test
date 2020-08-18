import { Routes, RouterModule } from '@angular/router';
import { QuizesComponent } from './quizes.component';

const childRoutes: Routes = [
  {
    path: '',
    component: QuizesComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
