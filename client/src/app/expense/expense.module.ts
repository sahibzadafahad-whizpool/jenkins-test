
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { routing } from "./expense.routing";
import { HttpModule } from "@angular/http";

import { NgxPaginationModule } from "ngx-pagination";
import { SelectModule } from "ng2-select";
import { ModalModule } from "ngx-modal";


import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
/* components */
import { ExpenseComponent } from "./expense.component";

@NgModule({
  imports: [
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    SelectModule,
    ModalModule,
    HttpModule,
    routing
  ],
  declarations: [ExpenseComponent]
})
export class ExpenseModule {}
