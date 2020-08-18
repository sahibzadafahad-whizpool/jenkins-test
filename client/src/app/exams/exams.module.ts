import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './exams.routing';
import { HttpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { SelectModule } from 'ng2-select';
import { ModalModule } from 'ngx-modal';
import { SearchExamPipe } from './searchexam.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
/* components */
import { ExamsComponent } from './exams.component';

@NgModule({
  imports: [
    Ng2SearchPipeModule,
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    SelectModule,
    ModalModule,
    HttpModule,
    routing
  ],
  declarations: [ExamsComponent, SearchExamPipe]
})
export class ExamsModule {}
