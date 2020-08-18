import { Component,ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassDataService } from './../classes/manageClass.service';
import { ManageFeeStructureService } from '../manage-fee-structure/manage-fee-structure.service';
import { ManageUpdateVoucherService } from './manage-update-voucher.service';
import { CommonService } from '../shared/services/common.service';
import { ManageFeeHeadsService } from './../manage-fee-heads/manage-fee-heads.service';
import { SectionDataService } from '../sections/manageSection.service';
import { StudentsInfoService } from './../students/student-information.service';
import { ManageFeeVoucherService } from './../manage-fee-voucher/manage-fee-voucher.service';
import { SettingsService } from './../settings/settings.service';

@Component({
  selector: 'app-manage-update-voucher',
  templateUrl: './manage-update-voucher.component.html',
  styleUrls: ['./manage-update-voucher.component.scss'],
  providers: [
    ClassDataService,
    ManageFeeStructureService,
    ManageUpdateVoucherService,
    ManageFeeHeadsService,
    SectionDataService,
    StudentsInfoService,
    StudentsInfoService,
    ManageFeeVoucherService,
    SettingsService,
    CommonService
  ]
})
export class ManageUpdateVoucherComponent implements OnInit {
  /* active session */
	public running_session = localStorage.getItem('running_session');


	/* pagination Info */
	public pageSize = 10;
	public pageNumber = 1;
	public classid;
	
	public section_id;
  // arrays
	public classdataList: Array<any>;
	public feeheadList: Array<any>;
	public feeheadDropDownList = {};
	public subClassData: Array<any>;
	public sectionData: Array<any>;
	public studentsDataList: Array<any>;
	public allStudensDataList: Array<any> = [];
	public voucher_data : Array<any> = [];;
	public classInvoiceData: Array<any> = [];;
	
	public classTutionFee = 0;
	public amount = 0;
	
	public selectedSection_id = 0;
	private dueDate = "";
	private lateFee = 0;
	private feemonth = 0;
	private feeyear = 0;
	admin_level: any;
	
	public selectedclass_id = 0;
	public selectedmonthyear = "";
	public disableBtn = false;
	public showForm = false;
	public showSelectioBox = true;
	public feehead_text = "";
	public  selected_class_name = "";
	private showSearch = true;
	private showDueDate = false;
	private PaidDate = false;
	private printButton = false;
	
	private school_id = "";
	private school_name = "";
	private school_address = "";
	private school_phone = "";
	private school_template_id = "";
	private fee_template_contents = "";
	private fee_print_columns = "";
	private promotional_message = "";
	private school_logo = "";
	
	//public paidTypes:Array<any> ;
	paidTypes = [{id:10,name:'Paid'}, {id:20,name:'Unpaid'}, {id:30,name:'Late Payment'}, {id:40,name:'Writeoff Late Payment'}]
	//AS DATE MONTH START WITH 0 IN DATE FUNCTION SO WE NEED EMPTY STRING IN START OF MONTH ARRAY
	private monthNames = ["","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	private month_names_short = ["",'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	private voucherCopies = ["Office", "Student", "Bank", "Other"];

	
	
  constructor(
    private _router: Router,
    private _classDataService: ClassDataService,
    private _manageFeeStructureService: ManageFeeStructureService,
	private _sectionDataService: SectionDataService,
	private _StudentsInfoService: StudentsInfoService,
    private _ManageUpdateVoucherService: ManageUpdateVoucherService,
	private _manageFeeHeadsService: ManageFeeHeadsService,
	private _ManageFeeVoucherService: ManageFeeVoucherService,
	private _settingsService: SettingsService,
    private modalService: NgbModal,
    private _commonService: CommonService
  ) {}

	ngOnInit() {
		
		// get admin level
		var date = new Date();	
		this.admin_level = localStorage.getItem('admin_level');
		this.getClassData(); // get class data
		this.getAllFeeHeadsData(); // get fee heads
		this.getSubClassData(); // get fee heads
		this.get_schoolInfo(); // get fee heads
		this.get_promotionalData(); // get fee heads
		this.feemonth = date.getMonth();
		this.feeyear = date.getFullYear();
		
		//As per Sir Ibrar we don't need popup
		//Date 18 Mar,2020
		/*
		if(this.showSearch){
			this.openModal2();
		} else {
			this.getStudentsByClassID(this.selectedclass_id);
		}
		*/
		
	}
	
	public getClassData() {
		this._classDataService.getClassesF().subscribe(result => {
		  this.classdataList = [];
		  if(result.status==1){
			this.classdataList = result.data
		  }
		});
	}

	public getSubClassData() {
		this._classDataService.getSubClasses().subscribe(result => {
		  this.subClassData = result;
		});
	}
	
	public get_schoolInfo() {
		var date = new Date();	
		var imagesBaseServer = this._StudentsInfoService.imagesBaseServer + 'images/';
		this._settingsService.get_schoolInfoF().subscribe(result => {
		  if (result.status === 1) {
			let schoolInfo = null;
			schoolInfo = result.data[0];
			this.dueDate = schoolInfo.fee_due_date;
			this.lateFee = schoolInfo.late_fee;
			this.feemonth = (date.getMonth()+1);
			this.feeyear = date.getFullYear();
			this.school_id = schoolInfo.school_id;
			this.school_name = schoolInfo.school_name;
			this.school_phone = schoolInfo.school_num;
			this.school_address = schoolInfo.school_address;			
			this.school_logo = schoolInfo.logo;			
			this.fee_print_columns = schoolInfo.fee_print_columns;		
			this.school_template_id = schoolInfo.template_id;		
			this.fee_template_contents = schoolInfo.fee_template_contents;		
			
		  } else {
			this._commonService.errorToaster(result.msg, 'Error!');
		  }
		});
	}
	
	
	// ********************************************************** **********/
	// *************************Update school Info ***************************/
	// ******************************************************************* */

	public OnClickUpdateFeeDueDate(submittedEvent) {
		const school_id = submittedEvent.value.school_id;
		const update_data = {
		  fee_due_date: submittedEvent.value.dueDate,
		  late_fee: submittedEvent.value.lateFee,
		  school_name : this.school_name ,
		  school_num : this.school_phone,
		  school_address : this.school_address,
		  fee_print_columns : this.fee_print_columns
		};
		this._settingsService
		  .update_schoolInfo(this.school_id, update_data)
		  .subscribe(result => {
			if (result.status === 1) {
			  this._commonService.successToaster(
				'Updated Successfully',
				'Success!'
			  );
			  this.get_schoolInfo();
			} else {
			  this._commonService.errorToaster(result.msg, 'Error!');
			}
		  });
	}
	
	
	 public get_promotionalData() {
		const data = '';
		this._settingsService.get_promotionalMessages(data).subscribe(result => {
		  if (result.status === 1) {
			var promotionalData = result.data;
			this.promotional_message = promotionalData[0].message;
			//console.log(this.u_promotional_message);
		  } else if (result.status === 0) {
			this._commonService.warningToaster(result.msg, 'Failed!');
		  } else {
			this._commonService.errorToaster(result.msg, 'Error!');
		  }
		});
	  }
	  
	// ********************************************************** **********/
	// *********************** Get all fee head data ************************/
	// ******************************************************************* */
	public getAllFeeHeadsData() {
		this._manageFeeHeadsService.getFeeHeads().subscribe(result => {
			this.feeheadList = result;			  
			this.feeheadList.forEach((item,index)=> {						
				this.feeheadDropDownList[item.fee_heads_id] = item.head_name;
			});
		});
	}
	// ********************************************************************** */
	// ************ Get Section Data Against Selected Class ***************** */
	// ********************************************************************* */

	public getSectionByClassID(class_id) {
		// * disbale btn untill section selcted and empty section array when selected class change
		this.sectionData = [];
		this.section_id = null;
		this.disableBtn = true;
		this._sectionDataService.getSectionF(class_id).subscribe(result => {
			this.sectionData = [];
			if(result.status==1){
				this.sectionData = result.data
			}
		});
	}
	// *** get sections against class for dropdown
	public classSelected(class_id) {
		this.getSectionByClassID(class_id);		
	}
	
	
	public onClickSearchClassFee(submitEvent)	{
		let class_id = submitEvent.value.class_id;
		let section_id = submitEvent.value.section_id;
		this.selectedclass_id = class_id;
		this.selectedSection_id = section_id;
		this.classdataList.forEach((item,index)=> {
			if(class_id == item.class_id) {
				this.selected_class_name = item.class_name;
			}
		});
		this.getclassInvoiceData(class_id);
		this.getStudentsByClassID(class_id);
		
		this.closeModal();
	}
	
	public selectAll(){
		var items = document.getElementsByName('studentid');
		//console.log();
		var selectAllCheck = document.getElementsByName('selectAll') ;
		var selectAllChecked = selectAllCheck[0] as HTMLInputElement;
		for(var i=0; i<items.length; i++){			
			var cItem = items[i] as HTMLInputElement;
			if(selectAllChecked.checked) {
				if(cItem.type=='checkbox') 
				cItem.checked=true;
			} else {
				if(cItem.type=='checkbox') 
				cItem.checked=false;
			}			
		}
	}
	public UpdateCheckBox(obj) {
		//console.log(obj);	
		
		var selectAllCheck = document.getElementsByName('selectAll') ;
		var selectAllChecked = selectAllCheck[0] as HTMLInputElement;
		var items = document.getElementsByName('studentid');
		//console.log();
		let allCheck = true;
		for(var i=0; i<items.length; i++){			
			var cItem = items[i] as HTMLInputElement;
			if(cItem.type=='checkbox' && cItem.checked != true){// && cItem.id != obj) {
				allCheck = false;
			} 		
		}
		/*
		//if(allCheck == true ) 
		var selectedItem = document.getElementByID(obj) ;
		var selectedItemChecked = selectedItem as HTMLInputElement;	
		if(selectAllChecked.checked && allCheck ) {
			allCheck = true
		}*/			
		selectAllChecked.checked = allCheck;
		
	}
	// ********************************************************** **********/
	// ****************** Get all Students details by class ID ************/
	// ******************************************************************* */
	public getStudentsByClassID(class_id) {
	  
		var monthyear = (this.feemonth.toString())+(this.feeyear.toString())
		
		this.selectedmonthyear = monthyear;
		var voucher_data;
		//this.studentsDataList = [];

		this._StudentsInfoService
		  .getStudByClassId(class_id, this.running_session)
		  .subscribe(result => {
				
				this.studentsDataList = result.data;
				
				voucher_data = {
				  class_id: class_id,
				  monthyear: monthyear,
				};	
				
				//verify already voucher created or not
				this._ManageFeeVoucherService
				  .checkFeeVoucher(voucher_data)
				  .subscribe(results => {
						if(results.length > 0) {
							//console.log(this.classInvoiceData);
							
							this.voucher_data = JSON.parse(results[0].voucher_data);
							//console.log(this.voucher_data);		
							this.printButton = true;
							
						} else {
								
							swal({
							  title: 'Not Available',
							  text: 'Vocher for selected class is not available. ',
							  type: 'warning',
							  showCancelButton: false,
							  confirmButtonColor: '#3085d6',
							  cancelButtonColor: '#d33',
							});
						}
							
				});
		   
		  });
	
	}
	
	// ********************************************************** **********/
	// ****************** Get all Students invoice by class ID ************/
	// ******************************************************************* */
	public getclassInvoiceData(class_id) {
	  
		var invoice_data;
		//this.studentsDataList = [];
		invoice_data = {
		  class_id: class_id,
		  fee_month: this.feemonth,
		  fee_year: this.feeyear,
		};	
		
		//verify already voucher created or not
		this._ManageUpdateVoucherService
		  .getClassStudents(invoice_data)
		  .subscribe(results => {		
				this.classInvoiceData = [];
				//this.classInvoiceData = results;	
				results.forEach((item,index)=> {						
					this.classInvoiceData[item.student_id] = item;
				});
				//console.log(this.classInvoiceData)
		});
	
	}
	
	public showTextFields(value) {
	  if(value== -1){
		  this.feehead_text= "Tution Fee"
	  } else if(value == -2) {
		  this.feehead_text= "Late Fee"
		  this.amount = 0;
	  } else if(value == -3) {
		  this.feehead_text= "Discount"
	  } else {
		this.feehead_text= this.feeheadDropDownList[value];
	  }
	  this.showForm = true;
	}
	
	// ********************************************************** **********/
	// *************************Update Payment Status ***************************/
	// ******************************************************************* */

	public OnClickUpdateFeeVoucher(submittedEvent) {
		
		
		const formData = submittedEvent.value;
		var items = document.getElementsByName('studentid') ;
		var studentList = [];
	
		for(var i=0; i<items.length; i++){
			var cItem = items[i] as HTMLInputElement;
			if(cItem.checked) {
				studentList.push(eval(cItem.value));
			}					
		}
		if(studentList.length <= 0) {
			swal({
			  title: 'Empty List',
			  text: 'Please select the student from list.',
			  type: 'question',
			  showCancelButton: false,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			});
		} else {
			
			let invoice_data;
			let paymentDate = "";
			let paymentDueDate = "";
			if( formData.actions == 3 ) {
				paymentDate = formData.paiddate
			}
			if( formData.actions == 1 ) {
				paymentDueDate = formData.dueDate
			}
			invoice_data = {
			  class_id: this.selectedclass_id,
			  type: formData.actions,
			  fee_month: this.feemonth,
			  fee_year: this.feeyear,
			  dueDate: this.dueDate,
			  lateFee: this.lateFee,
			  paymentDate: paymentDate,
			  monthyear: this.selectedmonthyear,
			  feeheads: this.feeheadList,
			  studentlist: studentList,
			  fee_heads_id: formData.fee_heads_id,			
			  amount: formData.amount,	
			  year: this.running_session
			};
			
			//verify already voucher created or not
			this._ManageUpdateVoucherService
			  .updateClassStudentsVoucher(invoice_data)
			  .subscribe(results => {
				this.voucher_data = results.data;
				if (results.status === 1) {
				  this._commonService.successToaster(
					'Updated Successfully',
					'Success!'
				  );
				  this.getclassInvoiceData(this.selectedclass_id);
				} else {
				  this._commonService.errorToaster(results.msg, 'Error!');
				}
				//this.classInvoiceData = [];
				//console.log(this.classInvoiceData)
				
				//this.getStudentsByClassID(class_id);
			});
			
		}
		/*
		this._settingsService
		  .update_schoolInfo(this.school_id, update_data)
		  .subscribe(result => {
			if (result.status === 1) {
			  this._commonService.successToaster(
				'Updated Successfully',
				'Success!'
			  );
			  this.get_schoolInfo();
			} else {
			  this._commonService.errorToaster(result.msg, 'Error!');
			}
		  });
		*/
	}
	
	@ViewChild('searchStudentFee') searchStudentFee;
	public openModal2() {
		this.openNgModal(this.searchStudentFee, 'md');
		this.showSearch = false;
	}
	
	// open modal
	public openModal(modal) {
		this.openNgModal(modal, 'md');
	}
	public openNgModal(content, size) {
		this.modalService.open(content, { size: size, backdrop: 'static'});
	}
	
	// close modal
	public closeModal() {
		this.modalService.dismissAll();
	}
	
	
	/************************ PRINT **********************/
	
	public onClickPrintVoucherInvoice() {
		
		//var htmlContent = this.createPrintVoucherHTML();			
		var items = document.getElementsByName('studentid') ;
		var studentList = [];
	
		for(var i=0; i<items.length; i++){
			var cItem = items[i] as HTMLInputElement;
			if(cItem.checked) {
				studentList.push(eval(cItem.value));
			}					
		}
		if(studentList.length <= 0) {
			swal({
			  title: 'Empty List',
			  text: 'Please select the student from list.',
			  type: 'question',
			  showCancelButton: false,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			});
		} else {
		
			var print_text = "";
			var width = 30;
			var StudenlateFee = this.lateFee;
			var feadHeadsHTML;
			var date = new Date();	
			
			var currentDate = date.getDate().toString() +"-"  +this.month_names_short[date.getMonth()+1] +"-" +date.getFullYear().toString();
			var feeprintColumns = parseInt(this.fee_print_columns);
			var SHORT_DUEDATE = this.dueDate+'-'+this.month_names_short[this.feemonth];
			var FULL_DUEDATE = this.dueDate+'-'+this.month_names_short[this.feemonth]+'-'+this.feeyear;
			var FEE_MONTH = this.monthNames[this.feemonth]+'-'+this.feeyear;
			var templateTextOringal = this.fee_template_contents
			var templateText;
			
			this.voucher_data.forEach((item,st_index)=> {
				
				if(studentList.includes(item.std_id)) {
				
					print_text  += '<div style="width:100%">';
					for(var i = 1; i <= feeprintColumns; i++){
						
						templateText = templateTextOringal;
						if(this.classInvoiceData[item.std_id].is_writeoff) {
							StudenlateFee = 0 ;
						}
						if(feeprintColumns > 3 ) {
							width = (100/feeprintColumns);
						}
						print_text += '<page size="A4" layout="landscape"><div style="width:'+width+'%;float:left;padding:15px;">';
						templateText = templateText.replace("##SCHOOL_LOGO##", this.school_logo);
						templateText = templateText.replace("##SCHOOL_NAME##", this.school_name);
						templateText = templateText.replace("##SCHOOL_ADDRESS##", this.school_address);
						templateText = templateText.replace("##PHONE##", this.school_phone);
						templateText = templateText.replace("##BRANCH_NAME##", 'BRANCH_NAME');
						templateText = templateText.replace("##BRANCH_ADDRESS##", 'BRANCH_ADDRESS');
						templateText = templateText.replace("##IBAN_NO##", 'IBAN_NO');
						templateText = templateText.replace("##CHALAN_NO##", this._commonService.createChalanNo(item.roll_num,item.class_id,this.feemonth,this.feeyear));
						templateText = templateText.replace("##ST_NAME##", item.std_name);
						templateText = templateText.replace("##ROLL_NO##", item.roll_num);
						templateText = templateText.replace("##ST_FATHER_NAME##",item.parent_name);
						templateText = templateText.replace("##CLASS_NAME##", item.class_name);
						templateText = templateText.replace(/##SHORT_DUEDATE##/g, SHORT_DUEDATE);
						templateText = templateText.replace(/##FULL_DUEDATE##/g, FULL_DUEDATE);
						templateText = templateText.replace(/##FEE_MONTH##/g, FEE_MONTH);
						templateText = templateText.replace("##TUTTION_FEE##", item.fee);
						templateText = templateText.replace("##TOTAL_DUE_FEE##", item.dueDate);
						templateText = templateText.replace("##LATE_FEE##", StudenlateFee);
						templateText = templateText.replace("##TOTAL_LATE_FEE##", (item.dueDate + StudenlateFee));
						templateText = templateText.replace("##PROMOTIONAL_MESSAGE##",this.promotional_message);
						templateText = templateText.replace("##VOUCHERCOPY##", this.voucherCopies[i-1]);
						templateText = templateText.replace(/##CURRENTDATE##/g, currentDate);					
						
						feadHeadsHTML = "";
						this.feeheadList.forEach((head,index)=> {
							feadHeadsHTML += '<tr>';	
							feadHeadsHTML += '<th class="rowHead">'+head.head_name+'</th>';
							feadHeadsHTML += '<td class="rowValue">'+item['heads'][head.fee_heads_id]+' </td>';		
							feadHeadsHTML += '<tr>';
						});
						templateText = templateText.replace("##FEE_HEAD_LIST##", feadHeadsHTML);
						
						print_text += templateText;
						print_text += '</div>';
						
					}
					print_text += '</div>';
					if((st_index+1) < this.voucher_data.length ) {
						print_text += '<div class="pagebreak"></div>';
					}
				}
			});			
			this._commonService.PrintPreview(print_text);
		}
	}
	  
}
