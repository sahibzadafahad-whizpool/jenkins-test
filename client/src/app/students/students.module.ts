import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './students.routing';
import { HttpModule } from '@angular/http';

import { NgxPaginationModule } from 'ngx-pagination';
import { SelectModule } from 'ng2-select';
import { ModalModule } from 'ngx-modal';
import { SearchPipe } from './search.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* components */
import { StudentsComponent } from './students.component';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  imports: [
    Ng2SearchPipeModule,
    NgxPrintModule,
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SelectModule,
    ModalModule,
    HttpModule,
    routing
  ],
  declarations: [StudentsComponent, SearchPipe]
})
export class StudentsModule {}
