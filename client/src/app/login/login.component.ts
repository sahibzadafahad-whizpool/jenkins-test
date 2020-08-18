import { CommonService } from './../shared/services/common.service';
import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import swal from 'sweetalert2';
import { SettingsService } from '../settings/settings.service';
import { AdminService } from '../admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { GlobalService } from '../shared/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AdminService, SettingsService, CommonService]
})
export class LoginComponent implements OnInit {
  errorMesage: string;
  loginNoti = false;
  returnUrl: string;
  disableBtn = false;

  loginres: Array<any>;
  public school_info = {}
  login_as: string;
  email: string;
  password: string;
  loginMessage: string;
  public imagesBaseServer
  activeSession = '';

  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private route: ActivatedRoute,
    private _router: Router,
    private _appDataService: AdminService,
    private _settingsService: SettingsService,
    private _commonService: CommonService,
    private _globalService: GlobalService
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.imagesBaseServer = this._globalService.constants.imagesBaseServer + 'images/';
    this.login_as = '-1';
    this.getSchoolInfo();
  }

  // ********************************************************** **********/
  // ************************* get active session ***************************/
  // ******************************************************************* */
  public get_activeSession() {
    this._settingsService.get_activeSessionF().subscribe(result => {
      if (result.status === 1) {
        this.activeSession = result.data[0].session_name;

        localStorage.setItem('running_session', this.activeSession);
      } else if (result.status === 0) {
        const message = 'Getting active session error' + result.msg;
        this._commonService.warningToaster(message, 'Failed');
      } else {
        const message = 'Getting active session error' + result.msg;
        this._commonService.warningToaster(message, 'Failed');
      }
    });
  }

  // ********************************************************** **********/
  // ************************* Admin Login ***************************/
  // ******************************************************************* */
  onLoginSubmit(data) {
    this.spinnerService.show();
    const email = data.email;
    const password = data.password;

    const hash_pass = Md5.hashStr(password);
    const login_check = {
      role_xref_id: data.login_as,
      email: email,
      password: hash_pass
    };

    this._appDataService.loginCheck(login_check).subscribe(result => {
      this.spinnerService.hide();
      this.disableBtn = false;
      if (result.status === 1) {
        // this._router.navigate(['/index']);
        localStorage.setItem('id', result.data.login_id);
        localStorage.setItem('admin_level', result.data.user_level);
        localStorage.setItem('user_name', result.data.user_name);
        localStorage.setItem('role_xref_id', result.data.role_xref_id);
        localStorage.setItem('jwt', result.jwt);
        this.get_activeSession();
        this._settingsService.get_schoolInfoF().subscribe(result2 => {
          localStorage.setItem('school_name', result2.data[0].school_name);
          this._router.navigateByUrl(this.returnUrl);
        });

        this._commonService.successToaster('Successfully Loggedin.', 'Success');
      } else {
        this.loginNoti = true;
        this.errorMesage = 'Email or Password Wrong';
      }
    });
  }

  public getSchoolInfo() {
    this._settingsService.get_schoolInfoF().subscribe(result => {
      if(result.status){
        this.school_info = result.data[0]
      localStorage.setItem('school_name', result.data[0].school_name);
      }
    });
  }

  public forgetPassword() {
    swal({
      title: 'Enter Your Email',
      input: 'email',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Reset Password',
      showLoaderOnConfirm: true,
      preConfirm: login => {
        const data = {
          user_email: login
        };

        this._settingsService.forget_password(data).subscribe(result => {
          status = result.status;
          if (result.status === 1) {
            this._commonService.successToaster(result.msg, 'Success');
          } else if (result.status === 3) {
            this._commonService.warningToaster(result.msg, 'Failed');
          } else {
            this._commonService.warningToaster(result.msg, 'Failed');
          }
        });
      },
      allowOutsideClick: () => !swal.isLoading()
    });
  }
}
