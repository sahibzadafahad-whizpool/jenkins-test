import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  NavigationEnd,
  Router
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _routes: Router) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem('id') != null) {
      const tokenInfo = this.getDecodedAccessToken();
      // logout if token expired
      if (Math.floor(Date.now() / 1000) > tokenInfo.exp) {
        this._routes.navigate(['login'], {
          queryParams: { returnUrl: state.url }
        });
        return false;
      }

      return true;
    } else {
      this._routes.navigate(['login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
  }

  // jwt verification

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
