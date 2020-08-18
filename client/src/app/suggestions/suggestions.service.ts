import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from '../shared/services/global.service';

@Injectable()
export class SuggestionsService {
  constructor(private http: Http, private _globalService: GlobalService) {}
  public headers = new Headers(this._globalService.constants.headers);
  public serverLink = this._globalService.constants.serverLink;

  get_suggestions() {
    return this.http
      .post(this.serverLink + 'get_suggestions', {
          headers: this.headers
      })
      .map(response => response.json());
  }
  
}
