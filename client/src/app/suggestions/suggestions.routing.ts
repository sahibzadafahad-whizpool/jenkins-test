import { Routes, RouterModule } from "@angular/router";
import { SuggestionsComponent } from "./suggestions.component";

const childRoutes: Routes = [
  {
    path: "",
    component: SuggestionsComponent
  }
];

export const routing = RouterModule.forChild(childRoutes);
