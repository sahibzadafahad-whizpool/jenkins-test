import { Component,ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassDataService } from './../classes/manageClass.service';
import { ManageFeeStructureService } from '../manage-fee-structure/manage-fee-structure.service';
import { ManageFeeInvoiceService } from './manage-fee-invoice.service';
import { CommonService } from '../shared/services/common.service';
import { ManageFeeHeadsService } from './../manage-fee-heads/manage-fee-heads.service';
import { SectionDataService } from '../sections/manageSection.service';
import { StudentsInfoService } from './../students/student-information.service';
import { ManageFeeVoucherService } from './../manage-fee-voucher/manage-fee-voucher.service';
import { SettingsService } from './../settings/settings.service';

@Component({
  selector: 'app-manage-fee-invoice',
  templateUrl: './manage-fee-invoice.component.html',
  styleUrls: ['./manage-fee-invoice.component.scss'],
  providers: [
    ClassDataService,
    ManageFeeStructureService,
    ManageFeeInvoiceService,
    ManageFeeHeadsService,
    SectionDataService,
    StudentsInfoService,
    StudentsInfoService,
    ManageFeeVoucherService,
    SettingsService,
    CommonService
  ]
})
export class ManageFeeInvoiceComponent implements OnInit {
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
	
	public classTutionFee :Array<any> = [];
	
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
	private showFormField = false;
	
	private school_id = "";
	private school_name = "";
	private school_address = "";
	private school_phone = "";
	private fee_print_columns = "";
	private promotional_message = "";
	
	//public paidTypes:Array<any> ;
	paidTypes = [{id:1,name:'Paid'}, {id:2,name:'Unpaid'}, {id:3,name:'Late Payment'}];//, {id:4,name:'Writeoff Late Payment'}, {id:5,name:'Discount'}]
	
	private monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	private month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	private voucherCopies = ["Office", "Student", "Bank", "Other"];

	
	
  constructor(
    private _router: Router,
    private _classDataService: ClassDataService,
    private _manageFeeStructureService: ManageFeeStructureService,
	private _sectionDataService: SectionDataService,
	private _StudentsInfoService: StudentsInfoService,
    private _manageFeeInvoiceService: ManageFeeInvoiceService,
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
			this.fee_print_columns = schoolInfo.fee_print_columns;			
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

	//Fetch Tution Fee 
	public getClassTuitionFee(class_id) {
		this._ManageFeeVoucherService.getclassTutionFee(class_id, this.running_session).subscribe(result => {
		  let tutionFee = result.data;
		  tutionFee.forEach((item,index)=> {	
				if(item.sub_class_id) {
					this.classTutionFee[item.sub_class_id] = item.fee_amount;
				} else {
					this.classTutionFee[0] = item.fee_amount;
				}
			});		
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
		this.getClassTuitionFee(class_id)
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
							//console.log(this.classInvoiceData[12].fee_status);
							this.voucher_data = JSON.parse(results[0].voucher_data)
							this.printButton = true
							
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
		this._manageFeeInvoiceService
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
	  this.showDueDate  = false;
	  this.PaidDate = false;
	  this.showFormField = false;
	
	  if(value ==1) {
		//this.feehead_text= this.feeheadDropDownList[value];
		this.showDueDate = true;
	  }
 	   
	  if(value ==3) {
		//this.feehead_text= this.feeheadDropDownList[value];
		this.PaidDate = true;
	  }
	  if(value ==5) {
		//this.feehead_text= this.feeheadDropDownList[value];
		this.showFormField = true;
	  }
	}
	
	// ********************************************************** **********/
	// *************************Update Payment Status ***************************/
	// ******************************************************************* */

	public OnClickUpdateFeeVoucher(submittedEvent) {
		
		
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
			
		}  else {
			
			swal({
			  title: 'Are you sure?',
			  text: 'This action is irreversible, once paid you can not change it.',
			  type: 'question',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Yes, '
			}).then(result => {	
				
				if (typeof result.value != 'undefined' && result.value) {					
					
					let invoice_data;
					let paymentDate = "";
					let paymentDueDate = "";
					let discount = 0;
					if( submittedEvent.value.actions == 3 ) {
						paymentDate = submittedEvent.value.paiddate
					}
					if( submittedEvent.value.actions == 1 ) {
						paymentDueDate = submittedEvent.value.dueDate
					}
					if( submittedEvent.value.actions == 5 ) {
						discount = submittedEvent.value.discount
					}
					invoice_data = {
					  class_id: this.selectedclass_id,
					  type: submittedEvent.value.actions,
					  fee_month: this.feemonth,
					  fee_year: this.feeyear,
					  dueDate: this.dueDate,
					  lateFee: this.lateFee,
					  paymentDate: paymentDate,
					  discount: discount,
					  monthyear: this.selectedmonthyear,
					  studentlist: studentList,
					  year: this.running_session
					};
					
					//verify already voucher created or not
					this._manageFeeInvoiceService
					  .updateClassStudentsInvoices(invoice_data)
					  .subscribe(results => {
						if(submittedEvent.value.actions == 1 && paymentDueDate !+ this.dueDate) {
							//Update the due date as well
							const school_id = submittedEvent.value.school_id;
							const update_data = {
							  fee_due_date: paymentDueDate,
							  late_fee: this.lateFee,
							  school_name : this.school_name ,
							  school_num : this.school_phone,
							  school_address : this.school_address,
							  fee_print_columns : this.fee_print_columns
							};
							this._settingsService
							  .update_schoolInfo(this.school_id, update_data)
							  .subscribe(result => {});
				  
						}
						//console.log(results);
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
			
			var date = new Date();	
			
			var currentDate = date.getDate().toString() +"-"  +this.month_names_short[date.getMonth()+1] +"-" +date.getFullYear().toString();
			var feeprintColumns = parseInt(this.fee_print_columns);
			
			
			this.voucher_data.forEach((item,index)=> {
				
				//print_text  += item.std_id;
				if(studentList.includes(item.std_id)) {
				
					print_text  += '<div style="width:100%">';
					for(var i = 1; i <= feeprintColumns; i++){
						
						
						if(this.classInvoiceData[item.std_id].is_writeoff) {
							StudenlateFee = 0 ;
						}
						
						if(feeprintColumns > 3 ) {
							width = (100/feeprintColumns);
						}
						print_text += '<div style="width:'+width+'%;float:left;padding:15px;">';
						print_text += '<table width="340" border="1" cellspacing="5" cellpadding="5"  style="background:#FFFFFF;text-align:center;">';
						print_text += '<tr>';
						print_text += '<td style="text-align:center;border:0;">';
						print_text += '<div style="background:#FFFFFF;;">';
						print_text += '<table width="340" border="0" cellspacing="0" cellpadding="0"  style="background-color:#FFFFFF;">';
						print_text += '<tr>';
						print_text += '<td>';
						print_text += '<div style="float: left; width: 100px;">';
						print_text += '<img src="assets/images/faces/face1.png" alt="" style="max-width: 100%;width:80px" />';
						print_text += '</div>';
						print_text += '<div style=" float: left; width: 150px; text-align: center;margin-top:20px">';
						print_text += '<p style="color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:700;  padding:0px; margin:0px;">'+this.school_name+'</p>';
						print_text += '<p style="color:#000; font-family:Arial, Helvetica, sans-serif;font-size:12px; font-weight:400;; padding:0px; 	margin:0px;">'+this.school_address+'</p>';
						print_text += '<p style="color:#000; font-family:Arial, Helvetica, sans-serif;font-size:12px; font-weight:400; ;padding:0px; margin:0px;">Ph#:'+this.school_phone+'</p>';
						print_text += '</div>';
						print_text += '</td>';
						print_text += '</tr>';
						print_text += '</table>';
						print_text += '<table width="340" border="0" cellspacing="0" cellpadding="2"  style="background-color:#FFFFFF;">';
						print_text += '<tr>';
						print_text += '<th style="border: 1px solid #000; text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:700; ">FAYSAL BANK ISLAMIC</th>';
						print_text += '</tr>';
						print_text += '<tr>';
						print_text += '<th style="border: 1px solid #000;border-top:0; text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500; ">HAFIZ ASLAM ROAD KOTLI BRANCH KOTLI AK</th>';
						print_text += '</tr>';
						print_text += '<tr>';
						print_text += '<th style="border: 1px solid #000;border-top:0; text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500; ">335830100123123130</th>';
						print_text += '</tr>';
						print_text += '</table>';
						print_text += '<p style="height:10px;padding:0;margin:0" ></p>';
						print_text += '<table width="340" border="0" cellspacing="0" cellpadding="0" style="background-color:#FFFFFF; ">';
						print_text += '<tr>';
						print_text += '<th style="border: 1px solid #000; border-right:0;text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500;width:120px ;padding:3px">Chalan No.</th>';
						print_text += '<td style="border: 1px solid #000; text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:13px;font-weight:500;;padding:3px">0031</td>';
						print_text += '</tr>';
						print_text += '<tr>';
						print_text += '<th style="border: 1px solid #000;border-top:0; border-right:0; text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500;width:120px ;padding:3px ">Addmission No.</th>';
						print_text += '<td style="border: 1px solid #000; border-top:0;  text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500;padding:3px">'+item.roll_num+'</td>';
						print_text += '</tr>';
										
						print_text += '<tr>';
						print_text += '<th style="border: 1px solid #000;border-top:0; border-right:0; text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500;width:120px ;padding:3px ">Name</th>';
						print_text += '<td style="border: 1px solid #000; border-top:0;  text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500;padding:3px"><b>'+item.std_name+'</b></td>';
						print_text += '</tr>';
						print_text += '<tr>';
						print_text += '<th style="border: 1px solid #000;border-top:0; border-right:0; text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500;width:120px  ;padding:3px">Father Name</th>';
						print_text += '<td style="border: 1px solid #000; border-top:0;  text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500;padding:3px"><b></b></td>';
						print_text += '</tr>';
						print_text += '<tr>';
						print_text += '<th style="border: 1px solid #000;border-top:0; border-right:0; text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500;width:120px  ;padding:3px">Class</th>';
						print_text += '<td style="border: 1px solid #000; border-top:0;  text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500;padding:3px">'+item.class_name+'</td>';
						print_text += '</tr>';
						print_text += '<tr>';
						print_text += '<td colspan="2" style="border: 1px solid #000;border-top:0;">';
						print_text += '<table  border="0" cellspacing="0" cellpadding="0" style="background-color:#FFFFFF; ">';
						print_text += '<tr>	';									
						print_text += '<th style=" text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500;width:120px ;border-right: 1px solid #000;padding:3px;">Last Fee Dep.</th>';
						print_text += '<td style="border-right: 1px solid #000; text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:500;padding:3px;width:69px">'+this.dueDate+'-'+this.month_names_short[this.feemonth]+'</td>';
						print_text += '<td style=" text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:13px; font-weight:500;padding:3px;width:125px;text-align:center;background:#ccc">';
						print_text += '<b>DUE DATE<br/>'+this.dueDate+'-'+this.month_names_short[this.feemonth]+'-'+this.feeyear+'</b>';
						print_text += '</td>';
						print_text += '</tr>';
						print_text += '</table>';
										
					
						print_text += '</td>';
						print_text += '</tr>';
						print_text += '</table>';
						print_text += '<p style="height:10px;padding:0;margin:0" ></p>';
						print_text += '<table width="340" border="0" cellspacing="0" cellpadding="2"  style="background-color:#ccc;">';
						print_text += '<tr>';
						print_text += '<th style="border: 1px solid #000; text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:700; text-align:center;">Fee Month : '+this.monthNames[this.feemonth]+'-'+this.feeyear+'</th>';
						print_text += '</tr>';
						print_text += '</table>';
						print_text += '<p style="height:5px;padding:0;margin:0" ></p>';
						print_text += '<table width="340" border="0" cellspacing="0" cellpadding="2"  style="background-color:#FFFFFF;">';
						print_text += '<tr>';
						print_text += '<th style="border: 1px solid #000;border-right:0; text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500;width:120px ">Tuttion Fee</th>';
						print_text += '<td style="border: 1px solid #000;  text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500;padding:3px;text-align:right">'+item.fee+'</td>';
						print_text += '</tr>';			
					
						this.feeheadList.forEach((head,index)=> {
							print_text += '<tr>';	
							//this.feeheadDropDownList[item.fee_heads_id] = item.head_name;
							print_text += '<th style="border: 1px solid #000;border-top:0; border-right:0; text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500;width:120px ">'+head.head_name+'</th>';
							print_text += '<td style="border: 1px solid #000; border-top:0;  text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500;padding:3px;text-align:right">'+item['heads'][head.fee_heads_id]+' </td>';		
							print_text += '<tr>';
						});
						if(this.classInvoiceData[item.std_id].discount_amount > 0 ) {
							print_text += '<tr>';
							print_text += '<th style="border: 1px solid #000;border-top:0; border-right:0; text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500;width:120px ">Discount</th>';
							print_text += '<td style="border: 1px solid #000; border-top:0;  text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500;padding:3px;text-align:right">'+this.classInvoiceData[item.std_id].discount_amount+'</td>';
							print_text += '</tr>';
						}					

						print_text += '<tr>';
						print_text += '<th style="border: 1px solid #000;border-top:0; border-right:0; text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500;width:120px;background-color:#ccc; ">With In Due Date</th>';
						print_text += '<td style="border: 1px solid #000; border-top:0; border-left:0;  text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500;padding:3px;text-align:right;background-color:#ccc;">'+this.classInvoiceData[item.std_id].total_fee+' </td>';
						print_text += '</tr>';
						print_text += '<tr>';
						print_text += '<th style="border: 1px solid #000;border-top:0; border-right:0; text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500;width:120px ">Late Fee</th>';
						print_text += '<td style="border: 1px solid #000; border-top:0;  text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500;padding:3px;text-align:right">'+StudenlateFee+'</td>';
						print_text += '</tr>';

						
						print_text += '<tr>';
						print_text += '<th style="border: 1px solid #000;border-top:0; border-right:0; text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500;width:120px;background-color:#ccc; ">After Due Date</th>';
						print_text += '<td style="border: 1px solid #000; border-top:0; border-left:0;  text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500;padding:3px;text-align:right;background-color:#ccc;">'+  (this.classInvoiceData[item.std_id].total_fee + StudenlateFee )  +' </td>';
						print_text += '</tr>';
						print_text += '<tr>';
						print_text += '<td colspan="2" style="border: 1px solid #000;border-top:0;text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500;width:120px ">Note: The Fee once paid will not be refunded. </td>';
						print_text += '</tr>';
						print_text += '</table>';	
						print_text += '<p style="height:5px;padding:0;margin:0" ></p>';
						print_text += '<table width="340" border="0" cellspacing="0" cellpadding="2"  style="background-color:#fff;">';
						print_text += '<tr>';
						print_text += '<th style="border:0; text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:10px; font-weight:500; ">1. The Chalan form must be despisted with in due date to avoid late pyament fine.</th>';
						print_text += '</tr>';
						print_text += '<tr>';		
						print_text += '<th style="border:0;text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:10px; font-weight:500; ">2. The fee may only be deposited in Designated bank.</th>';
						print_text += '</tr>';	
						print_text += '<tr>';	
						print_text += '<th style="border:0;border-top:0; text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:10px; font-weight:500; ">3. BANK will not entertain this voicher after '+this.dueDate+'-'+this.month_names_short[this.feemonth]+'-'+this.feeyear+' without late fee</th>';
						print_text += '</tr>';
						print_text += '</table>';
						print_text += '<table width="340px" border="0" cellspacing="5" cellpadding="5"  style="background-color:#fff;">';
						print_text += '<tr>';
						print_text += '<th style=" text-align: left;color:#000; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:500; text-align:right;">'+this.promotional_message+'</th>';		
						print_text += '</tr>';
						print_text += '</table>';
						
						print_text += '<table width="340px" border="0" cellspacing="0" cellpadding="0"  style="background-color:#fff;">';
						print_text += '<tr>';
						print_text += '<th style="text-align:left;padding-left:50px;color:#000; font-family:Arial, Helvetica, sans-serif; ">';
						print_text += '<span  style="font-size:19px; font-weight:700; ">'+this.voucherCopies[i]+' Copy</span><Br/>';
						print_text += '<span  style=" font-size:12px; font-weight:500; ">Issue Date : '+currentDate+'</span>';
						print_text += '</th>';					
						print_text += '</tr>';
						print_text += '</table>';
						
						print_text += '</div>';
						print_text += '</td>';
						print_text += '</tr>';
						print_text += '</table>';
						
						
						print_text += '</div>';
					}
					print_text += '</div>';
					print_text += '<p style="page-break-before: always">';
				}
			});	
				
			var printContent = "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'> <html xmlns='http://www.w3.org/1999/xhtml'> <head> <meta http-equiv='Content-Type' content='text/html; charset=windows-1251' /> <title>Fee Voucher</title> </head> <body> " + print_text+ "</body></html>";		
			var WinPrint = window.open('', '', 'width=900,height=650');
			WinPrint.document.write(printContent);
			WinPrint.document.close();
			WinPrint.focus();
			WinPrint.print();
			WinPrint.close();
		}
	}


	  
}
