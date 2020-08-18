import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './manage-fee-discounts.routing';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-modal';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DiscountSearchPipe } from './discountSearch.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* components */
import { ManageFeeDiscountsComponent } from './manage-fee-discounts.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    HttpModule,
    NgxPaginationModule,
    routing,
    NgbModule
  ],
  declarations: [ManageFeeDiscountsComponent, DiscountSearchPipe]
})
export class ManageFeeDiscountsModule {}
