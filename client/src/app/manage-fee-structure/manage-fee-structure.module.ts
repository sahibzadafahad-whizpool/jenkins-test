import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './manage-fee-structure.routing';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-modal';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
/* components */
import { ManageFeeStructureComponent } from './manage-fee-structure.component';

@NgModule({
  imports: [
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    HttpModule,

    routing,
    CommonModule
  ],
  declarations: [ManageFeeStructureComponent]
})
export class ManageFeeStructureModule {}
