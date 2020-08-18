import { GlobalService } from './shared/services/global.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth.guard';
import { ModalModule } from 'ngx-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [
    // SearchPipe,
    // TeachersSearchPipe,
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    MainComponentComponent,
    LoginComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    RouterModule,
    NgxPrintModule,
    AppRoutingModule,
    HttpModule,
    ModalModule,
    NgbModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [GlobalService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
