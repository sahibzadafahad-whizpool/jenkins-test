import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../shared/services/global.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  avatarImgSrc = 'assets/images/logo.svg';
  schooName = 'School Web App';
  userPost = 'POSt';

  public user_name = '';
  public admin_level;
  public sidebarOpened = false;
  public running_session = localStorage.getItem('running_session');
  toggleOffcanvas() {
    this.sidebarOpened = !this.sidebarOpened;
    if (this.sidebarOpened) {
      document.querySelector('.sidebar-offcanvas').classList.add('active');
    } else {
      document.querySelector('.sidebar-offcanvas').classList.remove('active');
    }
  }
  constructor(
    config: NgbDropdownConfig,
    private _router: Router,
    private _globalService: GlobalService
  ) {
    config.placement = 'bottom-right';
  }
  ngOnInit() {
    this.user_name = localStorage.getItem('user_name');
    this.admin_level = localStorage.getItem('admin_level');
    this._globalService.checkLogin();
    this.schooName = localStorage.getItem('school_name');
  }

  public logoutFun() {
    localStorage.removeItem('id');
    localStorage.removeItem('jwt');
    localStorage.removeItem('admin_level');
    localStorage.removeItem('user_name');
    localStorage.removeItem('running_session');
    localStorage.clear();

    this._router.navigate(['/login']);
  }

  public redirect(pagename) {
    const path = '/' + pagename;
    this._router.navigate([path]);
  }

  public reload() {
    location.reload();
  }
}
