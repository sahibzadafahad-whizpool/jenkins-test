import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import * as AppConfig from '../../config';

@Injectable()
export class GlobalService {
  constructor(private _router: Router) {}

  private dataSource = new Subject<DataSourceClass>();
  public serverUrl;

  data$ = this.dataSource.asObservable();

  public constants = {
    serverLink: AppConfig.SERVER,
    imagesBaseServer: AppConfig.IMAGE_BASE,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-type': 'application/json',
      'jwt':localStorage.getItem('jwt')
    }
  };

  public dataBusChanged(ev, value) {
    this.dataSource.next({
      ev: ev,
      value: value
    });
  }

  // logout user
  public logoutFun() {
    localStorage.removeItem('id');
    localStorage.removeItem('jwt');
    localStorage.removeItem('admin_level');
    localStorage.removeItem('user_name');
    localStorage.removeItem('running_session');
    localStorage.clear();

    this._router.navigate(['/login']);
  }

  // check login

  public checkLogin() {
    const user_id = localStorage.getItem('id');
    if (!user_id) {
      this.logoutFun();
    }
  }
}

// logout

export class DataSourceClass {
  ev: string;
  value: any;
}
