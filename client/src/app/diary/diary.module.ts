import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { routing } from "./diary.routing";
import { HttpModule } from "@angular/http";

import { NgxPaginationModule } from "ngx-pagination";
import { SelectModule } from "ng2-select";
import { ModalModule } from "ngx-modal";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { FileUploadModule } from "ng2-file-upload";

import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
/* components */
import { DiaryComponent } from "./diary.component";
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';

@NgModule({
  imports: [
    Ng2SearchPipeModule,
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    SelectModule,
    ModalModule,
    HttpModule,
    routing,
    TextareaAutosizeModule
  ],
  declarations: [DiaryComponent]
})
export class DiaryModule {}
