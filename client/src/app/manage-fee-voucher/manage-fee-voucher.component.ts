import { Component,ViewChild, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../shared/services/common.service';
import { ClassDataService } from './../classes/manageClass.service';
import { ManageFeeHeadsService } from './../manage-fee-heads/manage-fee-heads.service';
import { ManageFeeStructureService } from './../manage-fee-structure/manage-fee-structure.service';
import { SettingsService } from './../settings/settings.service';
import { StudentsInfoService } from './../students/student-information.service';
import { SectionDataService } from '../sections/manageSection.service';
import { ManageFeeVoucherService } from './manage-fee-voucher.service';
import { ManageFeeDiscountsService } from './../manage-fee-discounts/manage-fee-discounts.service';
import swal from 'sweetalert2';



@Component({
  selector: 'app-manage-fee-voucher',
  templateUrl: './manage-fee-voucher.component.html',
  styleUrls: ['./manage-fee-voucher.component.scss'],
  providers: [CommonService,ClassDataService,ManageFeeHeadsService,ManageFeeStructureService,SectionDataService,StudentsInfoService,ManageFeeVoucherService,SettingsService,ManageFeeDiscountsService]
})

export class ManageFeeVoucherComponent implements OnInit {	
	
	admin_level: any;
	/* pagination Info */
	public pageSize = 10;
	public pageNumber = 1;
	public school_logo = "";

	public  running_session = localStorage.getItem('running_session');
	public  defaultsession = localStorage.getItem('running_session');
	public  avatarImgSrc;
	public  imageThumbBaseUrl;
	public  placeholder = 'assets/images/placeholder.png';
	public  selectedClass_id = 0;
	public  selected_class_name = "";
	private showSearch = true;
	private is_subject_group_allow = false;
	private dueDate = "";
	private school_id = "";
	private school_name = "";
	private school_address = "";
	private school_template_id = "";
	private fee_template_contents = "";
	private school_phone = "";
	private fee_print_columns = "";
	private promotional_message = "";
	private lateFee = 0;
	private feemonth = 0;
	private feeyear = 0;
	
	//AS DATE MONTH START WITH 0 IN DATE FUNCTION SO WE NEED EMPTY STRING IN START OF MONTH ARRAY
	private monthNames = ["","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	private month_names_short = ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	private voucherCopies = ["Office", "Student", "Bank", "Other"];
	private printButton = false;

	// this function auto called when component loads
	ngOnInit() {
		// get admin level
		this.admin_level = localStorage.getItem('admin_level');
		this.getClassData(); // get class data
		this.getAllFeeHeadsData(); // get fee heads
		this.getSubClassData(); // get fee heads
		this.get_schoolInfo(); // get fee heads
		this.get_promotionalData(); // get promotional message
		
		//As per Sir Ibrar we don't need popup
		//Date 18 Mar,2020
		/*
		if(this.showSearch){
			this.openModal2();
		} else {
			this.getStudentsByClassID(this.selectedClass_id);
		}
		*/
	
	}
  

	// arrays
	public classdataList: Array<any>;
	public feeheadList: Array<any>;
	public feeheadDropDownList = {};
	public subClassData: Array<any>;
	public sectionData: Array<any>;
	public studentsDataList: Array<any>;
	public allStudensDataList: Array<any> = [];
	public voucherdata : Array<any> = [];
	
	public classTutionFee :Array<any> = [];
	public feeDiscountList :Array<any> = [];
	
	public selectedSection_id = 0;
	
	public selectedmonthyear = "";
	public section_id = 0;
	public disableBtn = false;
	public showForm = false;
	public showSelectioBox = true;
	public feehead_text = "";

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
			this.is_subject_group_allow = schoolInfo.is_subject_group;
			this.fee_print_columns = schoolInfo.fee_print_columns;
			this.school_template_id = schoolInfo.template_id;
			this.fee_template_contents = schoolInfo.fee_template_contents;
			
			this.school_logo =schoolInfo.logo;
		
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
	
	public getStudentFeeDiscounts(class_id: number) {
		this.feeDiscountList = [];

		// let class_id = Number(submitEvent.classid);
		this._manageFeeDiscountsService
		  .get_studentsFeeDiscountList(class_id, this.running_session)
		  .subscribe(result => {
			if (result.status === 1) {
			  this.feeDiscountList = result.data;			 
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
	
   // ***************************************************************************** **/
   // ******************* Filter Student By section  ******************/
   // ********************************************************** *******************/


	  public filterStudentBySection(section_name) {
		if (section_name !== 'all') {
		  const filterBySection = this.allStudensDataList.filter(
			student => student.section_name === section_name);

		  this.studentsDataList = filterBySection;

		} else {
		  this.studentsDataList = this.allStudensDataList;
		}
	}
	
  // ********************************************************** **********/
  // ****************** Get all Students details by class ID ************/
  // ******************************************************************* */
  public getStudentsByClassID(class_id) {
	  
	var monthyear = ((this.feemonth).toString())+((this.feeyear).toString())
	this.selectedmonthyear = monthyear;
	var voucher_data;
    //this.studentsDataList = [];

    this._StudentsInfoService
      .getStudByClassId(class_id, this.running_session)
      .subscribe(result => {
		  if(result.status == 0) {
			  
			  swal({
				  title: 'Empty Class',
				  text: 'No Student exist in this class',
				  type: 'warning',
				  showCancelButton: false,
				  confirmButtonColor: '#3085d6',
				  cancelButtonColor: '#d33',
				});
						
		  } else {
				
				this.studentsDataList = result.data;	
				this.studentsDataList.forEach((item,index)=> {					
					this.feeDiscountList.forEach((st,index)=> {
					
						if(item.std_id == st.student_id) {
							item.tuition_fee = st.discount_amount;
						}
					});
				});
				
				voucher_data = {
				  class_id: class_id,
				  monthyear: monthyear,
				  feeheads: this.feeheadList,
				  studentlist: this.studentsDataList,
				  tutionFee: this.classTutionFee,
				  classfee: 0,//this.classTutionFee,
				};	
				//verify already voucher created or not
				this._ManageFeeVoucherService
				  .checkFeeVoucher(voucher_data)
				  .subscribe(results => {
					  if(results.length > 0) {
						swal({
						  title: 'Already Exist',
						  text: 'You have already created voucher for this class.',
						  type: 'warning',
						  showCancelButton: false,
						  confirmButtonColor: '#3085d6',
						  cancelButtonColor: '#d33',
						});
					} else {
							this._ManageFeeVoucherService
						  .getFeeVoucher(voucher_data)
						  .subscribe(results => {
							this.voucherdata = results
							this.printButton = true;
						});
					}
							
				});
				
			}
      });
	
  }
  
	constructor(
		private _commonService: CommonService,
		private _classDataService: ClassDataService,
		private _manageFeeStructureService: ManageFeeStructureService,
		private _manageFeeHeadsService: ManageFeeHeadsService,
		private _sectionDataService: SectionDataService,
		private _StudentsInfoService: StudentsInfoService,
		private _ManageFeeVoucherService: ManageFeeVoucherService,
		private _settingsService: SettingsService,
		private _manageFeeDiscountsService: ManageFeeDiscountsService,
		private modalService: NgbModal
	) {}

	public OnClickUpdateFeeVoucher(submitEvent)
	{
		const formData = submitEvent.value;
		var items = document.getElementsByName('studentid') ;
		var checkedstudentList = [];
	
		for(var i=0; i<items.length; i++){
			var cItem = items[i] as HTMLInputElement;
			if(cItem.checked) {
				checkedstudentList.push(eval(cItem.value));
			}					
		}
		
		if(checkedstudentList.length <= 0) {
			swal({
			  title: 'Empty List',
			  text: 'Please select the student from list.',
			  type: 'question',
			  showCancelButton: false,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			});
		} else {
			
			var voucher_data;
			voucher_data = {
				  class_id: this.selectedClass_id,
				  monthyear: this.selectedmonthyear,
				  feeheads: this.feeheadList,
				  studentlist: this.studentsDataList,
				  students: checkedstudentList,
				  classfee: 0,//this.classTutionFee,
				  tutionFee:this.classTutionFee,
				  amount: formData.amount,
				  fee_heads_id: formData.fee_heads_id,
				};				
				this._ManageFeeVoucherService
				  .updateFeeVoucherDraft(voucher_data)
				  .subscribe(results => {
					this.voucherdata = results;
					this.showForm = false; 
					submitEvent.reset();
				});
		}
	}
	
  
	
	public onClickCreateVoucherInvoice(){
		
		swal({
		  title: 'Are you sure?',
		  text: 'You want to generate the voucher! for this class',
		  type: 'question',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, '
		}).then(result => {
		  if (typeof result.value != 'undefined' && result.value) {
			 
			var voucher_data;
			voucher_data = {
			  class_id: this.selectedClass_id,
			  monthyear: this.selectedmonthyear,
			  year: this.running_session,
			  duedate: this.dueDate,
			};	
			
			//verify already voucher created or not
			this._ManageFeeVoucherService
			  .checkFeeVoucher(voucher_data)
			  .subscribe(results => {
				  if(results.length > 0) {
					swal({
					  title: 'Already Exist',
					  text: 'You have already created voucher for this class.',
					  type: 'warning',
					  showCancelButton: false,
					  confirmButtonColor: '#3085d6',
					  cancelButtonColor: '#d33',
					});
				} else {	
					// if user confirm then call delete API
					this._ManageFeeVoucherService
					  .createFeeVouchers(voucher_data)
					  .subscribe(resultresp => {
						if (resultresp.status === 1) {
						  this._commonService.successToaster(
							'Vouchers Successfully generated.',
							'Success'
						  );
						  this.onClickPrintVoucherInvoice();
						} else {
						  this._commonService.successToaster(resultresp.msg, 'Error!');
						}
					  });
				}
						
			});			  
			 
		  }
		});
		
		
	}
	public showTextFields(value) {
	  this.feehead_text= this.feeheadDropDownList[value];
	  this.showForm = true;
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
		selectAllChecked.checked = allCheck;
		
	}
	
	@ViewChild('searchStudentFee') searchStudentFee;
	public openModal2() {
		this.openNgModal(this.searchStudentFee, 'md');
		this.showSearch = false;
	}
	
	public openNgModal(content, size) {
		this.modalService.open(content, { size: size, backdrop: 'static'});
	}
	
	public onClickSearchClassFee(submitEvent)	{
		let class_id = submitEvent.value.class_id;
		let section_id = submitEvent.value.section_id;
		this.selectedClass_id = class_id;
		this.selectedSection_id = section_id;
		this.classdataList.forEach((item,index)=> {
			if(class_id == item.class_id) {
				this.selected_class_name = item.class_name;
			}
		});		
		this.getClassTuitionFee(class_id)
		this.getStudentsByClassID(class_id);
		this.getStudentFeeDiscounts(class_id);
	}
	
	public closeModal() {
		this.modalService.dismissAll();
	}
	
	
	/************************ PRINT **********************/
	public onClickPrintVoucherInvoice() {
		
		var print_text = "";
		var width = 30;
		var feadHeadsHTML;
		var date = new Date();	
		
		var currentDate = date.getDate().toString() +"-"  +this.month_names_short[date.getMonth()+1] +"-" +date.getFullYear().toString();
		var feeprintColumns = parseInt(this.fee_print_columns);
		
		
		var feeprintColumns = parseInt(this.fee_print_columns);
		var SHORT_DUEDATE = this.dueDate+'-'+this.month_names_short[this.feemonth];
		var FULL_DUEDATE = this.dueDate+'-'+this.month_names_short[this.feemonth]+'-'+this.feeyear;
		var FEE_MONTH = this.monthNames[this.feemonth]+'-'+this.feeyear;
		var templateTextOringal = this.fee_template_contents
		var templateText;
			
		this.voucherdata.forEach((item,st_index)=> {
			
			print_text  += '<div style="width:100%">';
			for(var i = 1; i <= feeprintColumns; i++){
				
				if(feeprintColumns > 3 ) {
					width = (100/feeprintColumns);
				}
				templateText = templateTextOringal;
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
				templateText = templateText.replace("##LATE_FEE##", item.lateFee);
				templateText = templateText.replace("##TOTAL_LATE_FEE##", (item.dueDate + item.lateFee ));
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
			if((st_index+1) < this.voucherdata.length ) {
				print_text += '<div class="pagebreak"></div>';
			}
		});	
			
		this._commonService.PrintPreview(print_text);
	}
	
	
}



