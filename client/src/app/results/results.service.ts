import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from './../shared/services/global.service';
import 'rxjs/add/operator/catch';
@Injectable()
export class ResultsService {
  constructor(private http: Http, private _globalService: GlobalService) {}
  public headers = new Headers(this._globalService.constants.headers);
  public serverLink = this._globalService.constants.serverLink;

  // *********************** Set session active *****************************
  getStudentsResultSummary(result_data) {
    return this.http
      .post(this.serverLink + 'get/result/summary', result_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }
}
