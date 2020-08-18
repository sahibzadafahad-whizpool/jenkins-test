import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './manage-fee-voucher.routing';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-modal';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPrintModule } from "ngx-print";

import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
/* components */
import { ManageFeeVoucherComponent } from './manage-fee-voucher.component';

@NgModule({
  imports: [
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    HttpModule,
	NgxPrintModule,
    routing,
    CommonModule
  ],
  declarations: [ManageFeeVoucherComponent]
})
export class ManageFeeVoucherModule {}
