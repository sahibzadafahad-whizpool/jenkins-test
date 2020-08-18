import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from '../shared/services/global.service';

@Injectable()
export class ExpenseService {
  constructor(private http: Http, private _globalService: GlobalService) {}
  public headers = new Headers(this._globalService.constants.headers);
  public serverLink = this._globalService.constants.serverLink;

  // *********************** Call  API to add expense *****************************

  add_newExpenseHead(new_expense_data) {
    return this.http
      .post(this.serverLink + 'add/expense_head', new_expense_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  edit_ExpenseHead(expense_data) {
    return this.http
      .post(this.serverLink + 'edit/expense_head', expense_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  delete_expense_head(expense_head_id){
    let data = {id:expense_head_id};
    return this.http
    .post(this.serverLink + 'delete/expense_head', data, {
      headers: this.headers
    })
    .map(response => response.json());
  }

  delete_expense_category(expense_category_id){
    let data = {id:expense_category_id};
    return this.http
    .post(this.serverLink + 'delete/expense_category', data, {
      headers: this.headers
    })
    .map(response => response.json());
  }

  add_newExpenseCategory(data) {
    return this.http
      .post(this.serverLink + 'add/expense_category', data, {
        headers: this.headers
      })
      .map(response => response.json());
  }
  
  add_newExpenseF(new_expense_data) {
    return this.http
      .post(this.serverLink + 'add/new_expense', new_expense_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API to get all expenses *****************************
  getExpensesF() {
    return this.http
      .get(this.serverLink + 'get/expenses', {
        headers: this.headers
      })
      .map(response => response.json());
  }

  getExpensesHead(data) {
    return this.http
      .post(this.serverLink + 'get/expenses_head',data, {
        headers: this.headers
      })
      .map(response => response.json());
  }

  getExpenseCategories() {
    return this.http
      .get(this.serverLink + 'get/expense_categories', {
        headers: this.headers
      })
      .map(response => response.json());
  }

  // *********************** Call  API to Update expenses *****************************

  update_expense(update_data) {
    return this.http
      .post(this.serverLink + 'update/expense_date', update_data, {
        headers: this.headers
      })
      .map(response => response.json());
  }
}
