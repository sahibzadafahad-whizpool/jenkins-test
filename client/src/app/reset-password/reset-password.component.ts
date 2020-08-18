import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ResetPasswordService } from './reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [ResetPasswordService]
})
export class ResetPasswordComponent implements OnInit {
  errorMesage: string;
  loginNoti = false;

  username: string;
  password: string;
  newpassword: string;
  type = '';

  constructor(
    private _router: Router,
    private _resetPasswordService: ResetPasswordService
  ) {}

  ngOnInit() {}

  // ********************************************************** **********/
  // ************************* Reset Password ***************************/
  // ******************************************************************* */
  onUpdatePassSubmit(data) {
    this.loginNoti = false;
    this.errorMesage = '';
    const username = data.username;
    const password = data.password;
    const newpass = data.newpassword;
    const hashpass = Md5.hashStr(password);

    const newpassword = Md5.hashStr(newpass);
    const reset_password_data = {
      username: username,
      password: hashpass,
      newpassword: newpassword
    };

    this._resetPasswordService
      .resetNewPassword(reset_password_data)
      .subscribe(result => {
        console.log(result);
        if (result.status === 1) {
          this.loginNoti = true;
          this.type = 'success';
          this.errorMesage = 'Password Updated Successfully';
          this.password = '';
          this.newpassword = '';
        } else if (result.status === 0) {
          this.loginNoti = true;
          this.errorMesage = 'Invalid User Name or Password';
          this.newpassword = '';
          this.type = 'danger';
          this.password = '';
        } else {
          this.type = 'danger';
          this.loginNoti = true;
          this.errorMesage = 'Server error try again';
          console.log(result.msg);
        }
      });
  }
}
