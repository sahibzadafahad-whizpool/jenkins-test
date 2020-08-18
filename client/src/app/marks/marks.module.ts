import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './marks.routing';
import { HttpModule } from '@angular/http';

import { NgxPaginationModule } from 'ngx-pagination';
import { SelectModule } from 'ng2-select';
import { ModalModule } from 'ngx-modal';
import { SearchPipe } from './search.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* components */
import { MarksComponent } from './marks.component';

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
  declarations: [MarksComponent, SearchPipe]
})
export class MarksModule {}
