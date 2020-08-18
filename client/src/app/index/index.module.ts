import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { routing } from './index.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpModule } from '@angular/http';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    Ng2SearchPipeModule,
    NgxPaginationModule,
    CommonModule,
    routing,
    HttpModule
  ],
  declarations: [IndexComponent]
})
export class IndexModule {}
