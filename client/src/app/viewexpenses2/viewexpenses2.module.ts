
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { routing } from "./viewexpenses2.routing";
import { HttpModule } from "@angular/http";

import { NgxPaginationModule } from "ngx-pagination";
import { SelectModule } from "ng2-select";
import { ModalModule } from "ngx-modal";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
/* components */
import { ViewExpenses2Component } from "./viewexpenses2.component";

@NgModule({
  imports: [
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    SelectModule,
    ModalModule,
    HttpModule,
    routing
  ],
  declarations: [ViewExpenses2Component]
})
export class ViewExpenses2Module {}
