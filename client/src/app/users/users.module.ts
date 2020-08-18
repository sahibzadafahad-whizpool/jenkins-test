import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './users.routing';

import { NgxPaginationModule } from 'ngx-pagination';
import { SelectModule } from 'ng2-select';
import { ModalModule } from 'ngx-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* components */
import { UsersComponent } from './users.component';

@NgModule({
  imports: [
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    SelectModule,
    ModalModule,
    routing,
    NgbModule.forRoot()
  ],
  declarations: [UsersComponent]
})
export class UsersModule {}
