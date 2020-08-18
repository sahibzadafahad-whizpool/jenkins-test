import { Routes, RouterModule } from "@angular/router";
import { DiaryComponent } from "./diary.component";

const childRoutes: Routes = [
  {
    path: "",
    component: DiaryComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
