import { ViewExpenseService } from './viewexpenses.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

import { NgbModal,NgbModalRef,NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ExpenseService } from '../expense/expense.service';
import { CommonService } from '../shared/services/common.service';
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'app-expense',
  templateUrl: './viewexpenses.component.html',
  styleUrls: ['./viewexpenses.component.css'],
  providers: [ViewExpenseService,ExpenseService, CommonService,SettingsService]
})
export class ViewExpensesComponent implements OnInit {
  public admin_level;
  public loadData;
  public pageSize = 10;
  public pageNumber = 1;
  /* active session */
  public running_session = localStorage.getItem('running_session');

  public custom_filter = '-1 months';
  public start_date = '';
  public end_date = '';

  public filter_type = 'custom';
  public sort_by = '';
  public expense_category_id = '';
  public expense_category_type_xref_id = '';
  public report_time_period = '';
  public expenses: Array<any> = [];
  public expenses_stats: Array<any> = [];
  public expense_categories: Array<any> = [];
  public expense_category_type_xref: Array<any> = [];

  public no_expenses_for_specified_period = false;

  private modalRef: NgbModalRef;

  public school_info: {};

  constructor(
    private _veiwexpenseService: ViewExpenseService,
    private _expenseService: ExpenseService,
    private modalService: NgbModal,
    private _commonService: CommonService,
    private _settingsService: SettingsService
  ) {}

  ngOnInit() {
    
    this.admin_level = localStorage.getItem('admin_level');

    //we need to load last month records initially
    var start_date_raw = new Date();
    start_date_raw.setMonth(start_date_raw.getMonth() - 1);

    let start_date = Math.floor(start_date_raw.getTime()/1000);
    
    var end_date_raw = new Date();
    let end_date = Math.floor(end_date_raw.getTime()/1000);


    let data = {expense_category_id:'',expense_category_type_xref_id:'',start_date:start_date,end_date:end_date,sort_by:''};

    this.get_expenses(data);
    this.get_expenses_stats(data);
    this.getExpenseCategories();
    this.getSchoolInfo();

    this.get_expense_category_type_xref();

  }

  get_expense_category_type_xref(){
    this._veiwexpenseService.get_expense_category_type_xref().subscribe(result => {
      if (result.status === 1) {
        this.expense_category_type_xref = result.data;
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
        
      } else if (result.status === 0) {
        
      } else {
        
      }
    });
    }

  public getSchoolInfo(){
    this._settingsService.get_schoolInfoF().subscribe(result => {
        
        if(result.status){
            this.school_info = result.data[0];
        }
    });
  }

  public get_expenses(data){
    this.expenses = [];
    this._veiwexpenseService.get_expenses(data).subscribe(result => {
      if (result.status === 1) {
        this.expenses = result.data;
          if(this.expenses.length){
              this.no_expenses_for_specified_period = false;
          }
          else{
              this.no_expenses_for_specified_period = true;
          }
      } else {
        this._commonService.errorToaster('Server error try again', 'Failed!');
        console.log(result.msg);
      }
    });
  }

  public get_expenses_stats(data){
    this.expenses_stats = [];
    this._veiwexpenseService.get_expenses_stats(data).subscribe(result => {
      if (result.status === 1) {
        this.expenses_stats = result.data;
      } else if (result.status === 0) {
        
      } else {
        this._commonService.errorToaster('Server error try again', 'Failed!');
        console.log(result.msg);
      }
    });
  }


  public post_viewexpenses_form(submitevent){
      let custom_filter = this.custom_filter;

      let start_date = 0;
      let end_date = 0;

      if(this.filter_type=='custom'){
          
          //we need to give priority to custom filter,so if it is selected then unset start and end date
          this.start_date = '';
          this.end_date = '';
        
          //we need to calculate start and end dates

          end_date = Math.floor(new Date().getTime()/1000);
          
          if(custom_filter.indexOf('months')>-1){
              //users needs it in 1,2,3,4 e.t.c months
              let temp = custom_filter.replace('months','').trim();
              temp = temp.replace("-",'').trim();
              
              let months = parseInt(temp);

              start_date = this._commonService.get_timestamp_months_ago(months);

          }
          else if(custom_filter.indexOf('days')>-1){
              
              //users needs it in 1,2,3,4 e.t.c days
              let temp = custom_filter.replace('days','').trim();
              temp = temp.replace("-",'').trim();
              let days = parseInt(temp);
              
              start_date = this._commonService.get_timestamp_days_ago(days);

          }
      }
      else{
          //lets check start date and end date
          let st_raw = this.start_date;
          let en_raw = this.end_date;

          if(st_raw!='' && en_raw!=''){
              //do work

              start_date = this._commonService.convert_date_to_timestamp(st_raw);
              end_date = this._commonService.convert_date_to_timestamp(en_raw);

          }
          else if(st_raw==''){
            this._commonService.errorToaster('Please select start date', '');
            return false;
          }
          else if(en_raw==''){
            this._commonService.errorToaster('Please select end date', '');
            return false;
          }
      }

      let sort_by = this.sort_by;

      let data = {expense_category_type_xref_id:this.expense_category_type_xref_id,expense_category_id:this.expense_category_id,start_date:start_date,end_date:end_date,sort_by:sort_by};
      this.get_expenses(data);

      this.get_expenses_stats(data);
  }

  public reset_form_fields(){
      
      //this.custom_filter = '-1 months';
      this.custom_filter = '';
      this.start_date = '';
      this.end_date = '';

      this.expenses = [];

      // let start_date = this._commonService.get_timestamp_months_ago(1);
      // let end_date = Math.floor(new Date().getTime()/1000);

      // let data = {start_date:start_date,end_date:end_date};
      // this.get_expenses(data);

  }

  public pretty_date(tdate){
      return this._commonService.get_pretty_date(tdate);
  }

  public show_expenses_result(exp,inc){
      if(exp>inc){
          return '<span class="text-danger">'+(exp-inc)+' Loss </span>';
      }
      else if(inc>exp){
          return '<span class="text-success">'+(inc-exp)+' Profit </span>';
      }
      else{
          return 'No Profit No Loss';
      }
  }

  prepare_print_report_modal(content){
    let ngbModalOptions: NgbModalOptions = {
        size: 'lg',
        backdrop: 'static',
        keyboard: false
    };

    this.modalService.open(content, ngbModalOptions);

    this.show_print_report_time_period();

  }

  show_print_report_time_period(){

    let period = '';

    if(this.filter_type=="custom"){
        let temp = this.custom_filter.replace('days','').trim();
        temp = this.custom_filter.replace('months','').trim();
        temp = temp.replace("-",'').trim();
        let identifier = parseInt(temp);
        period = 'Previous '+identifier+' months from '+this._commonService.get_current_month()+' '+this._commonService.get_current_year();
    }
    else{

        let start_date = this._commonService.convert_date_to_timestamp(this.start_date);
        let end_date = this._commonService.convert_date_to_timestamp(this.end_date);

        period = 'From '+this.pretty_date(start_date)+' to '+this.pretty_date(end_date);
    }
    
    this.report_time_period = period;
  }

  print_report(){
    var mywindow = window.open('', 'PRINT');//,'height=400,width=600'
    mywindow.document.write('<html><head><title>Print</title>');

    mywindow.document.write('</head><body><div class="container" style="">');
    var mydata = document.getElementById('income_statement').innerHTML;
    
    mywindow.document.write(mydata);
    mywindow.document.write('</div></body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();
    
    return true;
  }

}
