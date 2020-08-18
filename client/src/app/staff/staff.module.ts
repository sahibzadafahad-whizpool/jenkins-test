import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { routing } from "./staff.routing";
import { HttpModule } from "@angular/http";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from "ngx-pagination";
import { SelectModule } from "ng2-select";
import { ModalModule } from "ngx-modal";
import { TeachersSearchPipe } from "./search.pipe";

import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
/* components */
import { StaffComponent } from "./staff.component";

@NgModule({
  imports: [
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
  declarations: [StaffComponent, TeachersSearchPipe]
})
export class StaffModule {}
