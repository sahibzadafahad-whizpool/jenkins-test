import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from '../shared/services/global.service';

@Injectable()
export class ViewExpenses2Service {
  constructor(private http: Http, private _globalService: GlobalService) {}
  public headers = new Headers(this._globalService.constants.headers);
  public serverLink = this._globalService.constants.serverLink;

  // *********************** Call  API to add expense *****************************

  
  get_expense_heads_from_expense_category(data){
    return this.http
    .post(this.serverLink + 'get/expense_heads_from_expense_category',data, {
      headers: this.headers
    })
    .map(response => response.json());
  }
  
  // *********************** Call  API to get all expenses *****************************
  get_expenses_from_time_period(data) {
    return this.http
      .post(this.serverLink + 'get/expenses_from_time_period',data, {
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

  edit_Expense(data){
    return this.http
    .post(this.serverLink + 'edit/expense',data, {
      headers: this.headers
    })
    .map(response => response.json());
  }

  delete_expense(expense_id){

    let data = {id:expense_id};

    return this.http
    .post(this.serverLink + 'delete/expense',data, {
      headers: this.headers
    })
    .map(response => response.json());
  }

}
