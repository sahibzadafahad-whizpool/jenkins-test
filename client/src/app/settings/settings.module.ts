import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './settings.routing';
import { HttpModule } from '@angular/http';

import { NgxPaginationModule } from 'ngx-pagination';
import { SelectModule } from 'ng2-select';
import { ModalModule } from 'ngx-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* components */
import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [
    Ng2SearchPipeModule,
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
  declarations: [SettingsComponent]
})
export class SettingsModule {}
