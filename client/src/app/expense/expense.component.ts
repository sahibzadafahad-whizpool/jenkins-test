import { ExpenseService } from './expense.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

import { NgbModal,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
  providers: [ExpenseService, CommonService]
})
export class ExpenseComponent implements OnInit {
  public admin_level;
  public loadData;
  public pageSize = 10;
  public pageNumber = 1;
  /* active session */
  public running_session = localStorage.getItem('running_session');

  public selectedCategoryId = '';
  public selectedCategoryName = '';

  public expense_type = '2';
  private modalRef: NgbModalRef;

  // add expense

  public add_expense_category: string;
  public u_expense_category: string;
  public expense_title: string;
  public expense_desc: string;
  public expense_date: string;
  public expense_amount: number;

  // update expennse details
  public u_expense_head: string;
  public u_expense_title: string;
  public u_expense_desc: string;
  public u_expense_date: string;
  public u_expense_amount: number;
  public u_expense_id: number;
  public u_expenses_head_id: number;
  public no_expense_heads = false;
  // array

  public expense_details: Array<any> = [];
  public expense_head_details: Array<any> = [];
  public expense_categories: Array<any> = [];

  // notification
  public expense_notification = '';

  public edit_expense_category;
  public edit_head_name;
  public edit_expense_head_description;
  public edit_expenses_head_id;

  public processing_request = false;

  constructor(
    private _expenseService: ExpenseService,
    private modalService: NgbModal,
    private _commonService: CommonService
  ) {}

  ngOnInit() {
    //this.getExpense_details();
    //this.getExpenseHeads();
    this.getExpenseCategories();
    this.admin_level = localStorage.getItem('admin_level');

  }

  // *********************************************************************************************************************** */
  /**********************************************************Read Data from DB Methods************************************** */
  // *********************************************************************************************************************** */

  // ********************************************************** **********/
  // *********************** Get Expense Details ************************/
  // ******************************************************************* */

  public getExpense_details() {
    this.expense_notification = '';
    this._expenseService.getExpensesF().subscribe(result => {
      if (result.status === 1) {
        this.expense_details = result.data;
      } else if (result.status === 0) {
        this.expense_notification = 'No Expense Data Availabale';
      } else {
        this._commonService.errorToaster('Server error try again', 'Failed!');
        console.log(result.msg);
      }
    });
  }

  // ********************************************************** **********/
  // *********************** Add new expense head ************************/
  // ******************************************************************* */
    public add_newExpensehead(submitEvent) {
    const expense_data = submitEvent.value;
    
		// ** convert date to Unix timestamp
		const new_expense_data = {
      expense_category_id:expense_data.add_expense_category,
		  head_name: expense_data.head_name,
		  description: expense_data.description,
		};

		// calling function
    this.processing_request = true;
		this._expenseService.add_newExpenseHead(new_expense_data).subscribe(result => {
      this.processing_request = false;
		  if (result.status === 1) {
          this._commonService.successToaster(
            'Expense head added successfully',
            'Success!'
          );

          
          
          //select the current category as current one
          this.selectedCategoryId = expense_data.add_expense_category;
          this.selectedCategoryName = this.get_expense_categoryy_name_from_head(this.selectedCategoryId);

          submitEvent.reset();
          this.modalService.dismissAll();
          this.getExpenseHeads(this.selectedCategoryId);

		  } else {
			this._commonService.errorToaster('Server Error, Try Again', 'Failed!');
			console.log(result.msg);
		  }
		});
    }
    
    public get_expense_categoryy_name_from_head(cat_id){
        let categories = this.expense_categories;
        for(let i=0;i<categories.length;i++){
            if(cat_id==categories[i].id){
                return categories[i].expense_category_name;
            }
        }
    }

    public add_newExpenseCategory(submitEvent,modal) {
        const data = {'expense_category_name':this.u_expense_category,expense_category_type:this.expense_type}
        this.processing_request = true;
        this._expenseService.add_newExpenseCategory(data).subscribe(result => {
          this.processing_request = false;
          if (result.status === 1) {
              this._commonService.successToaster(
                'Expense category added successfully',
                'Success!'
              );
                
                
                //refresh the categories
                this.getExpenseCategories();
                //remove current expense heads as newly added category can not have any expense heads
                this.expense_head_details = result.data;


                //now we have to set the new category in that category select
                let new_category_id = result.inserted_id;

                //select the newly added category as current one
                this.selectedCategoryId = new_category_id;
                this.add_expense_category = new_category_id;
                this.selectedCategoryName = this.u_expense_category;
                this.no_expense_heads = true;

                //at last reset form fields and close modal
                submitEvent.reset();
                this.modalRef.close();

          } else {
          this._commonService.errorToaster('Server Error, Try Again', 'Failed!');
          console.log(result.msg);
          }
        });
    }

    prepare_edit_expense_head_modal(editExpenseHeadModal,index){
        this.set_expense_head_details_for_editting(index);
        this.modalRef = this.modalService.open(editExpenseHeadModal);
    }

    set_expense_head_details_for_editting(index){
        let expense_details = this.expense_head_details[index];
        
        this.edit_expense_category = expense_details['expense_category_id'];
        this.edit_head_name = expense_details['head_name'];
        this.edit_expense_head_description = expense_details['description'];
        this.edit_expenses_head_id = expense_details['expenses_head_id'];

    }

    public edit_Expensehead(){
        
        const edit_expense_data = {
          id: this.edit_expenses_head_id,
          name: this.edit_head_name,
          description: this.edit_expense_head_description,
        };

        // calling function
        this.processing_request = true;
        this._expenseService.edit_ExpenseHead(edit_expense_data).subscribe(result => {
          this.processing_request = false;
          if (result.status === 1) {
              this._commonService.successToaster(
                'Expense head updated successfully',
                'Success!'
              );

              this.modalRef.close();

              this.getExpenseHeads(this.selectedCategoryId);

          } else {
            this._commonService.errorToaster('Server Error, Try Again', 'Failed!');
            console.log(result.msg);
          }
        });
    }

    delete_expense_head(expense_head_id){
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
          this._expenseService.delete_expense_head(expense_head_id).subscribe(data => {
            this.processing_request = false;
              this.getExpenseHeads(this.selectedCategoryId);
          });
          // show deleted notification
          this._commonService.successToaster('Deleted Successfully', 'Success!');
        }
      });
    }

    delete_expense_category(){
      swal({
        title: 'Are you sure to delete this category?',
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
          this._expenseService.delete_expense_category(this.selectedCategoryId).subscribe(data => {
            this.processing_request = false;
              this.getExpenseCategories();
              this.selectedCategoryId = '';
              this.no_expense_heads = false;
              this.selectedCategoryName = '';
          });
          // show deleted notification
          this._commonService.successToaster('Deleted Successfully', 'Success!');
        }
      });
    }

    public prepare_add_category_modal(content,size){
        this.expense_type = '2';
        this.openNgModal(content, size);
    }

    public prepare_add_head_modal(content,size){
        if(this.selectedCategoryId){
          this.add_expense_category = this.selectedCategoryId;
        }
        this.openNgModal(content, size);
    }

    public add_expense_category_dropdown_changed(event,content){
        //we wil check if category value is -1 then user wants to add a new category
        if(event.target.value=="-1"){
            event.srcElement.blur();
            event.preventDefault();
  
            this.openNgModal(content, 'md')
        }
    }

	  // ********************************************************** **********/
	  // *********************** Get Expense Details ************************/
	  // ******************************************************************* */

	  public getExpenseHeads(expense_category_id) {
    this.expense_notification = '';
    
    let data = {expense_category_id:expense_category_id};

		this._expenseService.getExpensesHead(data).subscribe(result => {
      this.expense_head_details = [];
      if (result.status === 1) {
			this.expense_head_details = result.data;
      this.no_expense_heads = false;
		  } else if (result.status === 0) {
      //this.expense_notification = 'No Expense Data Availabale';
        //this._commonService.successToaster('No Expense Data Availabale', 'Success!');
        this.no_expense_heads = true;
		  } else {
			this._commonService.errorToaster('Server error try again', 'Failed!');
			console.log(result.msg);
		  }
		});
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
  

  // *********************************************************************************************************************** */
  /**********************************************************Add Update  Data  Methods************************************** */
  // *********************************************************************************************************************** */

  // ********************************************************** **********/
  // *********************** Add new expense ************************/
  // ******************************************************************* */

  public add_newExpense(submitEvent) {
    const expense_data = submitEvent.value;
    // ** convert date to Unix timestamp

    const expense_date = new Date(expense_data.expense_date).getTime() / 1000;

    const new_expense_data = {
      expense_date: expense_date,
		  expense_amount: expense_data.expense_amount,
		  expenses_head_id: this.u_expenses_head_id
    };
    // calling function
    this._expenseService.add_newExpenseF(new_expense_data).subscribe(result => {
      if (result.status === 1) {
        this._commonService.successToaster(
          'Expense added successfully',
          'Success!'
        );

        //this.getExpenseHeads(this.selectedCategoryId); // call function to reload the data after inserting new data
		    this.modalService.dismissAll();
        //submitEvent.reset();
    
        //reset fiels
        delete this.expense_amount
        
      } else {
        this._commonService.errorToaster('Server Error, Try Again', 'Failed!');
        console.log(result.msg);
      }
    });
  }

  // *****************************************************************/
  // *********************** Update new expense  ************************/
  // ******************************************************************* */

  public update_Expense(submitedEvent) {
    const event_handler = submitedEvent.value;
    // ** convert date to Unix timestamp
    const expense_date =
      new Date(event_handler.u_expense_date).getTime() / 1000;

    const update_data = {
      expense_title: event_handler.u_expense_title,
      expense_desc: event_handler.u_expense_desc,
      expense_date: expense_date,
      expense_amount: event_handler.u_expense_amount,
      expense_id: this.u_expense_id
    };

    this._expenseService.update_expense(update_data).subscribe(result => {
      if (result.status === 1) {
        this._commonService.successToaster('Updated Successfully', 'Success!');
        this.getExpense_details(); // call function to reload the data after inserting new data
      } else {
        this._commonService.errorToaster('Server Error, Try Again', 'Failed!');
        console.log(result.msg);
      }
    });
  }

  // ************************************************************************************************************* */
  /*********************************************General   Methods************************************************ */
  // ************************************************************************************************************* */
  // new modal
  openNgModal(content, size) {
      this.modalRef = this.modalService.open(content, { size: size });
  }

  public onClickSideBar(category) {

    let expense_category_id = category.id;
    let expense_category_name = category.expense_category_name;
    this.selectedCategoryName = expense_category_name;
    this.selectedCategoryId = expense_category_id;

    this.getExpenseHeads(expense_category_id);
    
  }

  // //********* Open expense update modal */

  public openViewExpenseModal(modal, index) {
    this.openNgModal(modal, 'md');
	/*
    const expense_details_string = this.expense_details[index];

    this.u_expense_amount = expense_details_string.expense_amount;

    this.u_expense_date = this._commonService.get_date_from_unix(
      expense_details_string.expense_date
    );
    this.u_expense_title = expense_details_string.expense_title;
    this.u_expense_desc = expense_details_string.expense_desc;
    this.u_expense_id = expense_details_string.expense_id;
	*/
  }
  
  
   // //********* Open expense update modal */

  public OpenAddExpense(modal, index) {

      //set expense date as current date
      this.expense_date = this._commonService.get_today_date();

      this.openNgModal(modal, 'md');
	    const expense_head_details = this.expense_head_details[index];
      this.u_expense_head = expense_head_details.head_name;
      this.u_expenses_head_id = expense_head_details.expenses_head_id;
	
  }

  /********************************* pagination Info ****************************/
  public pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  // open modal
  public openModal(modal) {
    modal.open();
  }

  public closeModal() {
    this.modalService.dismissAll();
  }

}
