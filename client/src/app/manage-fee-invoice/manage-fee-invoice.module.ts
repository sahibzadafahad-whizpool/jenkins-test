import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { routing } from "./manage-fee-invoice.routing";
import { HttpModule } from "@angular/http";
import { ModalModule } from "ngx-modal";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { SearchPipe } from "./search.pipe";
import { NgxPaginationModule } from "ngx-pagination";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
/* components */
import { ManageFeeInvoiceComponent } from "./manage-fee-invoice.component";

@NgModule({
  imports: [
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    HttpModule,
    CommonModule,
    NgxPaginationModule,
    NgbModule,
    routing
  ],
  declarations: [ManageFeeInvoiceComponent, SearchPipe]
})
export class ManageFeeInvoiceModule {}
