import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { routing } from "./results.routing";
import { HttpModule } from "@angular/http";

import { NgxPaginationModule } from "ngx-pagination";
import { SelectModule } from "ng2-select";
import { ModalModule } from "ngx-modal";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { SearchPipe } from "./search.pipe";
import { NgxPrintModule } from "ngx-print";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
/* components */
import { ResultsComponent } from "./results.component";

@NgModule({
  imports: [
    NgbModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
    SelectModule,
    ModalModule,
    HttpModule,
    routing
  ],
  declarations: [ResultsComponent, SearchPipe]
})
export class ResultsModule {}
