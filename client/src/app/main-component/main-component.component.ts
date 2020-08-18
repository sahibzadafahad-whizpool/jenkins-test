import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../shared/services/global.service';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  RouterStateSnapshot,
  NavigationStart,
  Router
} from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss'],
  providers: [GlobalService]
})
export class MainComponentComponent {
  loading = false;
  constructor(private router: Router, private _global_service: GlobalService) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;

          // check jwt expired than logout
          const tokenInfo = this.getDecodedAccessToken();
          // logout if token expired
          if (Math.floor(Date.now() / 1000) > tokenInfo.exp) {
            // this.router.navigate(['login'], {
            //   // queryParams: { returnUrl: state.url }
            // });
            this._global_service.logoutFun();
          }

          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  // decode jwt token
  getDecodedAccessToken(): any {
    const token = localStorage.getItem('jwt');
    try {
      const decoded_jwt = jwt_decode(token);
      return decoded_jwt;
    } catch (Error) {
      return false;
    }
  }
}
