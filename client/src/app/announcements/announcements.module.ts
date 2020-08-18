import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './announcements.routing';

import { AnnouncementsComponent } from './announcements.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { SelectModule } from 'ng2-select';
import { ModalModule } from 'ngx-modal';
@NgModule({
  imports: [
    routing,
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SelectModule,
    ModalModule
  ],
  declarations: [AnnouncementsComponent]
})
export class AnnouncementsModule {}
