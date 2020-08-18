import { ViewExpenses2Service } from './viewexpenses2.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

import { NgbModal,NgbModalRef,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ExpenseService } from '../expense/expense.service';
import { CommonService } from '../shared/services/common.service';
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'app-expense',
  templateUrl: './viewexpenses2.component.html',
  styleUrls: ['./viewexpenses2.component.css'],
  providers: [ViewExpenses2Service,ExpenseService, CommonService,SettingsService]
})
export class ViewExpenses2Component implements OnInit {
  public admin_level;
  public loadData;
  /* active session */
  public running_session = localStorage.getItem('running_session');

  public custom_filter = '-1 months';
  public start_date = '';
  public end_date = '';

  public expense_amount;
  public expense_date;
  public expense_category_id;
  public expense_head_id;
  public expense_id;

  public expenses: Array<any> = [];

  public expense_categories: Array<any> = [];
  public expense_heads: Array<any> = [];
  public expense_category_type_xref: Array<any> = [];

  public no_expenses_for_specified_period = false;

  public processing_request = false;

  public add_edit_expense_modal_title = '';
  public add_edit_expense_modal_button = '';

  private modalRef: NgbModalRef;

  public school_info: {};

  constructor(
    private _veiwexpenses2Service: ViewExpenses2Service,
    private _expenseService: ExpenseService,
    private modalService: NgbModal,
    private _commonService: CommonService,
    private _settingsService: SettingsService
  ) {}

  ngOnInit() {
    
    this.admin_level = localStorage.getItem('admin_level');

    this.get_expenses();
    this.getExpenseCategories();

    this.get_expense_category_type_xref();

  }

  public edit_Expense(submitEvent){
      const expense_data = submitEvent.value;
      const expense_date = new Date(expense_data.expense_date).getTime() / 1000;
      const edit_expense_data = {
        expense_date: expense_date,
        expense_amount: this.expense_amount,
        expenses_head_id: this.expense_head_id,
        expense_id:this.expense_id,
      };
      this.processing_request = true;
      this._veiwexpenses2Service.edit_Expense(edit_expense_data).subscribe(result => {
        this.processing_request = false;
        if (result.status === 1) {
          this._commonService.successToaster(
            'Expense updated successfully',
            'Success!'
          );
  
          //this.getExpenseHeads(this.selectedCategoryId); // call function to reload the data after inserting new data
          this.modalService.dismissAll();
          //submitEvent.reset();
          this.get_expenses();
          //reset fiels
          this.expense_date = this._commonService.get_today_date();
          delete this.expense_category_id;
          delete this.expense_head_id;
          delete this.expense_amount;
          delete this.expense_id;

        } else {
          this._commonService.errorToaster('Server Error, Try Again', 'Failed!');
          console.log(result.msg);
        }
      });

  }

  delete_expense(expense_id){
      swal({
        title: 'Are you sure?',
        text: 'You wont be able to revert this!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.value) {
          // if user confirm then call delete API
          this.processing_request = true;
          this._veiwexpenses2Service.delete_expense(expense_id).subscribe(data => {
            this.processing_request = false;
            this.get_expenses();
          });
          // show deleted notification
          this._commonService.successToaster('Deleted Successfully', 'Success!');
        }
      });
  }

  public add_newExpense(submitEvent) {
    const expense_data = submitEvent.value;
    // ** convert date to Unix timestamp
    
  const expense_date = new Date(expense_data.expense_date).getTime() / 1000;
	
	const new_expense_data = {
		  expense_date: expense_date,
		  expense_amount: this.expense_amount,
		  expenses_head_id: this.expense_head_id
    };
    // calling function
    this.processing_request = true;
    this._expenseService.add_newExpenseF(new_expense_data).subscribe(result => {
      this.processing_request = false;
      if (result.status === 1) {
        this._commonService.successToaster(
          'Expense added successfully',
          'Success!'
        );

        //this.getExpenseHeads(this.selectedCategoryId); // call function to reload the data after inserting new data
		    this.modalService.dismissAll();
        //submitEvent.reset();
        this.get_expenses();
        //reset fiels
        this.expense_date = this._commonService.get_today_date();
        delete this.expense_category_id;
        delete this.expense_head_id;
        delete this.expense_amount;
        
      } else {
        this._commonService.errorToaster('Server Error, Try Again', 'Failed!');
        console.log(result.msg);
      }
    });
  }

  get_expense_category_type_xref(){
    this._veiwexpenses2Service.get_expense_category_type_xref().subscribe(result => {
      if (result.status === 1) {
        this.expense_category_type_xref = result.data;
      }
    });
  }

  get_expense_heads_from_category(category_id){
      let expense_category_id = category_id;

    let data = {expense_category_id:expense_category_id};

      //lets get heads from this category
      this._veiwexpenses2Service.get_expense_heads_from_expense_category(data).subscribe(result => {
        if (result.status === 1) {
          this.expense_heads = result.data;
        }
      });
  }

  show_expense_category_type_xref_name(id){
      for(let i=0;i<this.expense_category_type_xref.length;i++){
          if(this.expense_category_type_xref[i].expense_category_type_xref_id==id){
              return this.expense_category_type_xref[i].expense_category_type_xref_name
          }
      }

      return ''

  }

  public getExpenseCategories() {
    this._expenseService.getExpenseCategories().subscribe(result => {
      if (result.status === 1) {
        this.expense_categories = result.data;
      }
    });
    }

  public OpenAddExpense(modal) {

    //set expense date as current date
    this.expense_date = this._commonService.get_today_date();
    delete this.expense_category_id;
    delete this.expense_head_id;
    delete this.expense_amount;
    delete this.expense_id;

    this.add_edit_expense_modal_title = 'Add New Expense / Income';
    this.add_edit_expense_modal_button = 'Add New Expense / Income';

    this.openNgModal(modal, 'md');

  }

  public prepare_edit_expense_modal(modal,index) {

    //set expense date as current date
    this.set_expense_details_for_editting(index);

    this.add_edit_expense_modal_title = 'Update New Expense / Income';
    this.add_edit_expense_modal_button = 'Update New Expense / Income';

    this.openNgModal(modal, 'md');

}

  set_expense_details_for_editting(index){
      let data = this.expenses[index];
      
      this.expense_category_id = data.expense_category_id;
      this.expense_head_id = data.expenses_head_id;
      this.get_expense_heads_from_category(data.expense_category_id);
      this.expense_amount = data.expense_amount;
      this.expense_id = data.expense_id;
      this.expense_date = this._commonService.get_date_from_unix(data.expense_date);
  }

  // new modal
  openNgModal(content, size) {
    this.modalRef = this.modalService.open(content, { size: size });
}

  public get_expenses(){

    //we need to load records from last 30,31 days
    var start_date_raw = new Date();
    start_date_raw.setMonth(start_date_raw.getMonth() - 1);
    start_date_raw.setHours(0, 0, 0);

    // Zero the milliseconds
    start_date_raw.setMilliseconds(0);

    let start_date = Math.floor(start_date_raw.getTime()/1000);
    

    let data = {created_at:start_date};

    this.expenses = [];
    this._veiwexpenses2Service.get_expenses_from_time_period(data).subscribe(result => {
      if (result.status === 1) {
          this.expenses = result.data;
          if(this.expenses.length){
              this.no_expenses_for_specified_period = false;
          }
          else{
              this.no_expenses_for_specified_period = true;
          }
      }else {
        this._commonService.errorToaster('Server error try again', 'Failed!');
        console.log(result.msg);
      }
    });
  }

  public pretty_date(tdate){
      return this._commonService.get_pretty_date(tdate);
  }


}
