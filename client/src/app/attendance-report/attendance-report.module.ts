import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './attendance-report.routing';
import { HttpModule } from '@angular/http';

import { NgxPaginationModule } from 'ngx-pagination';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchPipe } from './search.pipe';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* components */
import { AttendanceReportComponent } from './attendance-report.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    Ng2SearchPipeModule,
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    NgbModule
  ],
  declarations: [AttendanceReportComponent, SearchPipe]
})
export class AttendanceReportModule {}
