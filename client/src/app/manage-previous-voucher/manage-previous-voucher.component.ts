import { Component,ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassDataService } from './../classes/manageClass.service';
import { ManagePreviousVoucherService } from './manage-previous-voucher.service';
import { CommonService } from '../shared/services/common.service';
import { ManageFeeHeadsService } from './../manage-fee-heads/manage-fee-heads.service';
import { SectionDataService } from '../sections/manageSection.service';
import { StudentsInfoService } from './../students/student-information.service';
import { ManageFeeVoucherService } from './../manage-fee-voucher/manage-fee-voucher.service';
import { SettingsService } from './../settings/settings.service';

@Component({
  selector: 'app-manage-previous-voucher',
  templateUrl: './manage-previous-voucher.component.html',
  styleUrls: ['./manage-previous-voucher.component.scss'],
  providers: [
    ClassDataService,
    ManagePreviousVoucherService,
    ManageFeeHeadsService,
    SectionDataService,
    StudentsInfoService,
    ManageFeeVoucherService,
    SettingsService,
    CommonService
  ]
})
export class ManagePreviousVoucherComponent implements OnInit {
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
	
	monthNames = [{id:1,name:'January'}, {id:2,name:'February'}, {id:3,name:'March'}, {id:4,name:'April'}, {id:5,name:'May'}, {id:6,name:'June'}, {id:7,name:'July'}, {id:8,name:'August'}, {id:9,name:'September'}, {id:10,name:'October'}, {id:11,name:'November'}, {id:12,name:'December'}];
	
	//["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	private month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	private voucherCopies = ["Office", "Student", "Bank", "Other"];

	
	
  constructor(
    private _router: Router,
    private _classDataService: ClassDataService,
	private _sectionDataService: SectionDataService,
	private _StudentsInfoService: StudentsInfoService,
    private _ManagePreviousVoucherService: ManagePreviousVoucherService,
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
		this.feemonth = date.getMonth();
		this.feeyear = date.getFullYear();
		
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
		//let section_id = submitEvent.value.section_id;
		let month_id = submitEvent.value.month_id;
		//this.selectedclass_id = class_id;
		//this.selectedSection_id = section_id;
		this.classdataList.forEach((item,index)=> {
			if(class_id == item.class_id) {
				this.selected_class_name = item.class_name;
			}
		});
		//this.getClassTuitionFee(class_id)
		this.getclassInvoiceData(class_id,month_id);
		this.getStudentsByClassID(class_id,month_id);
		
		this.closeModal();
	}
	


	
	// ********************************************************** **********/
	// ****************** Get all Students details by class ID ************/
	// ******************************************************************* */
	public getStudentsByClassID(class_id,month_id) {
	  
		var monthyear = (month_id.toString())+(this.feeyear.toString())
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
	public getclassInvoiceData(class_id,month_id) {
	  
		var invoice_data;
		//this.studentsDataList = [];
		invoice_data = {
		  class_id: class_id,
		  fee_month: month_id,
		  fee_year: this.feeyear,
		};	
		
		//verify already voucher created or not
		this._ManagePreviousVoucherService
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
	
	

	  
}
