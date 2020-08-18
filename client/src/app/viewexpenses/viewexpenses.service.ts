import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from '../shared/services/global.service';

@Injectable()
export class ViewExpenseService {
  constructor(private http: Http, private _globalService: GlobalService) {}
  public headers = new Headers(this._globalService.constants.headers);
  public serverLink = this._globalService.constants.serverLink;

  // *********************** Call  API to add expense *****************************

  
  // *********************** Call  API to get all expenses *****************************
  get_expenses(data) {
    return this.http
      .post(this.serverLink + 'get/expenses_on_filters',data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  get_expenses_stats(data) {
    return this.http
      .post(this.serverLink + 'get/expenses_stats_on_filters',data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  get_expense_category_type_xref(){
    return this.http
    .get(this.serverLink + 'get/expense_category_type_xref', {
      headers: this.headers
    })
    .map(response => response.json());
  }

}
