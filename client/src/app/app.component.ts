import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  ActivatedRoute,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { SettingsService } from './settings/settings.service';
import { CommonService } from './shared/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SettingsService, CommonService]
})
export class AppComponent implements OnInit {
  title = 'School web app';
  activeSession = '';
  returnUrl;
  loading = true;

  constructor(
    private _router: Router,
    private _settingsService: SettingsService,
    private route: ActivatedRoute,
    private _commonService: CommonService
  ) {}

  ngOnInit() {
    this.loading = false;

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this._router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.get_activeSession();

    // cehck if user login than redirect ot home
    if (localStorage.getItem('id') == null) {
      this._router.navigate(['login']);
    }
  }

  /********************************************************** **********/
  // ************************* get active session ***************************/
  // ******************************************************************* */
  public get_activeSession() {
    this._settingsService.get_activeSessionF().subscribe(result => {
      if (result.status === 1) {
        this.activeSession = result.data[0].session_name;

        localStorage.setItem('running_session', this.activeSession);
      } else if (result.status === 0) {
        this._commonService.warningToaster('No active Session', 'Warning!');

        //console.log('Getting active session error' + result.msg);
      } else {
        this._commonService.warningToaster(
          'Server Connection Error',
          'Warning!'
        );

        //console.log('Getting active session error' + result.msg);
      }
    });
  }
}
