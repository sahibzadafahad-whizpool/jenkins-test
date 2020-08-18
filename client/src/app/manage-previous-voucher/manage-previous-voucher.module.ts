import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { routing } from "./manage-previous-voucher.routing";
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
import { ManagePreviousVoucherComponent } from "./manage-previous-voucher.component";

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
  declarations: [ManagePreviousVoucherComponent, SearchPipe]
})
export class ManagePreviousVoucherModule {}
