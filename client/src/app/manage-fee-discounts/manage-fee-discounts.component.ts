import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../shared/services/common.service';

import { ClassDataService } from './../classes/manageClass.service';
import { ManageFeeStructureService } from '../manage-fee-structure/manage-fee-structure.service';
import { ManageFeeDiscountsService } from './manage-fee-discounts.service';
import { SectionDataService } from './../sections/manageSection.service';
import { ManageFeeVoucherService } from './../manage-fee-voucher/manage-fee-voucher.service';
import { StudentsInfoService } from './../students/student-information.service';

@Component({
  selector: 'app-manage-fee-discounts',
  templateUrl: './manage-fee-discounts.component.html',
  styleUrls: ['./manage-fee-discounts.component.scss'],
  providers: [
    ClassDataService,
    ManageFeeStructureService,
    ManageFeeDiscountsService,
    CommonService,
    ManageFeeVoucherService,
    StudentsInfoService,
    SectionDataService
  ]
})
export class ManageFeeDiscountsComponent implements OnInit {
	/* active session */
	public running_session = localStorage.getItem('running_session');

	public searchText;

	/* pagination Info */
	public pageSize = 10;
	public pageNumber = 1;

	// add fee discount
	public section_id: number;
	public class_id: number;
	public student_id: number;
	public discount_amount: number;
	public discount_comment = '';
	public discount_id = 0;
	public student_name = '';
	// update fee discount


	// list student fee discounts

	public classid: number;

	public selected_class_id: number; // for reload the data after update
	public selected_section_id: number; // for reload the data after update
	// arrays
	public classdataList: Array<any>;
	public FeeDiscountList: Array<any> = [];
	public sectionsDataList: Array<any>;
	public classTutionFee :Array<any> = [];
	public studentsDataList :Array<any> = [];
	public showtable = false;
	
	std_sectionId;
	selectedClass = '';
	selectedClassName = '';
	selectedSectionName = '';
	selectedStudentName = '';
	selectedFatherName = '';
	selectedTutionFee = 0;
	selectedRollNum = '';
	discountFee: number;
	selectedClassId: number;
	admin_level: any;

	constructor(
		private _commonService: CommonService,
		private _classDataService: ClassDataService,
		private _manageFeeStructureService: ManageFeeStructureService,
		private _manageFeeDiscountsService: ManageFeeDiscountsService,
		private _ManageFeeVoucherService: ManageFeeVoucherService,
		private _StudentsInfoService: StudentsInfoService,
		private modalService: NgbModal,
		private _sectionDataService: SectionDataService
	) {}

	ngOnInit() {
		// get admin level
		this.admin_level = localStorage.getItem('admin_level');
		this.getClassData(); // call function on page load
	}

	// *********************************************************************************************************************** */
	/**********************************************************Read Data from DB Methods************************************** */
	// *********************************************************************************************************************** */

	// ********************************************************** **********/
	// *********************** Get all Classes data ************************/
	// ******************************************************************* */

	public getClassData() {
		this._classDataService.getClassesF().subscribe(result => {
		  this.classdataList = [];
		  if(result.status==1){
			this.classdataList = result.data
		  }
		});
	}

	// *** get sections against class for dropdown
	public classSelected(class_id) {
		this.getSectionByClassID(class_id);
	}

	public getSectionByClassID(class_id) {
		// * disbale btn untill section selcted and empty section array when selected class change
		this.sectionsDataList = [];
		this.std_sectionId = null;
		this.section_id= null;
		this._sectionDataService.getSectionF(class_id).subscribe(result => {
		  this.sectionsDataList = result.data;
		  this.selectedClassId = class_id;
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
	// ****************** Get students fee discount Details *****************/
	// ******************************************************************* */
	public onSubmitListClassStudents(submitEvent, isUpdateCalled = false){  
	  
	  if(!isUpdateCalled) {
		  this.selectedClass = "";
		  this.selectedClassName = "";
		  this.selectedSectionName = "";
		  var class_id = submitEvent.value.classid;
		  var section_id = (submitEvent.value.section_id > 0) ?  submitEvent.value.section_id : 0;
		  this.selected_class_id = class_id;
		  this.selected_section_id = section_id;
		  
	  } 	  
		let class_data = {
		  class_id: this.selected_class_id,
		  section_id: this.selected_section_id,
		  running_session: this.running_session,
		};	
		this.getScholarshipDetails(this.selected_class_id);
		this._manageFeeDiscountsService
		  .getStudentList(class_data)
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
						if(this.FeeDiscountList[item.std_id]) {
							item.discount_amount = this.FeeDiscountList[item.std_id].discount_amount;
							item.discount_comment = this.FeeDiscountList[item.std_id].comments;
						} else {
							item.discount_amount = 0;
							item.discount_comment = "";
						}
					});
					if(!isUpdateCalled) {					
						this.selectedClass = " For : "+result.data[0].class_name;
						this.selectedClassName = result.data[0].class_name;
						this.selectedSectionName = result.data[0].section_name;
						this.selected_class_id = result.data[0].class_id;
						this.getClassTuitionFee(result.data[0].class_id);
						this.showtable = true;
					}					
				}
		  });
	  
	}
 
  
	// ********************************************************** **********/
	// **************** Update Student fee discount details*****************/
	// ******************************************************************* */
	public onClickUpdateFeeDiscDetails(submitEvent) {    
	  var discount_amount = parseInt(submitEvent.value.discount_amount);	
	  if(discount_amount < 0 || discount_amount > 100) {
		  swal({
				  title: 'Wrong Discount',
				  text: 'Discount can be choosen between 0 to 100 only.',
				  type: 'warning',
				  showCancelButton: false,
				  confirmButtonColor: '#3085d6',
				  cancelButtonColor: '#d33',
				});
	  } else {
		  var fee_discount_data = {
			student_id: this.student_id,
			class_id: this.selectedClassId,
			discount_amount: submitEvent.value.discount_amount,
			running_session: this.running_session,
			comment: submitEvent.value.discount_comment,
			status: 1
		  };	  
		  // calling service to call API
		  this._manageFeeDiscountsService
			.setStudentFeeDiscount(fee_discount_data)
			.subscribe(result => {
				console.log(result);
			  if (result.status === 1) {
				  
			   this.onSubmitListClassStudents(submitEvent , true)
			   this.closeModal();	
			   this._commonService.successToaster(
				  'Successfully Updated',
				  'Success!'
				);
			   
			  } else {
				this._commonService.successToaster(
				  'Server error try again',
				  'Failed!'
				);
			  }
			});		
	  }
	}

	
	// *********************************************************************************************************************** */
	/**********************************************************General Methods********************************************** */
	// *********************************************************************************************************************** */

	// new modal
	openNgModal(content, size) {
		this.modalService.open(content, { size: size });
	}

	public getScholarshipDetails(class_id){
	   var formDate;
	   formDate = {
		  class_id: class_id,
		  year: this.running_session,
		};	
	   this._manageFeeDiscountsService
		.getDiscoutnListByClassId(formDate)
		.subscribe(result => {
			if(result.status) {
				let discounts = result.data;
				discounts.forEach((obj,index)=> {
					this.FeeDiscountList[obj.student_id] = obj;//obj.discount_amount;						
				});	
			}						
			//this.FeeDiscountList = result.data;
		});
	  
	}
	
	// ********* Open  update modal */
	public onClickUpdateFeeDiscount(modal, student_id) {
		this.discount_amount = 0;  
		this.selectedStudentName = '';
		this.selectedFatherName = '';
		this.selectedTutionFee = 0;
		this.selectedRollNum = '';
		this.discountFee = 0;
		this.student_id = Number(student_id);
		this.studentsDataList.forEach((item,index)=> {
			if(parseInt(item.std_id) == parseInt(student_id)) {
				this.selectedStudentName = item.std_name;
				this.selectedFatherName = item.parent_name;
				this.selectedRollNum = item.roll_num;
				if(item.sub_class_id == 1) {
					this.selectedTutionFee = this.classTutionFee[item.sub_class_id];
				} else {
					this.selectedTutionFee = this.classTutionFee[0];
				}
				this.discount_amount = item.discount_amount;
				this.discount_comment = item.discount_comment;
				this.discountFee =  Number(Number(this.selectedTutionFee) - ((Number(this.selectedTutionFee) * Number(item.discount_amount)) /100));					
				
			} 
			
		});			
		this.openNgModal(modal, 'md');
	}
	public onClickCalculateDiscount(discount) {
		this.discountFee = 0;  
		if(parseInt(discount) < 0 || parseInt(discount) > 100 ) {
			 swal({
				  title: 'Wrong Discount',
				  text: 'Discount can be choosen between 0 to 100 only.',
				  type: 'warning',
				  showCancelButton: false,
				  confirmButtonColor: '#3085d6',
				  cancelButtonColor: '#d33',
				});
		} else {
			this.discountFee = Number(Number(this.selectedTutionFee) - ((Number(this.selectedTutionFee) * Number(discount)) /100));
		}
	}

	// open modal
	public openModal(modal) {
		this.openNgModal(modal, 'md');
	}

	// close modal
	public closeModal() {
		this.modalService.dismissAll();
	}

	pageChanged(pN: number): void {
		this.pageNumber = pN;
	}
	
	text_truncate = function(str, length, ending) {
		if (length == null) {
		  length = 100;
		}
		if (ending == null) {
		  ending = '...';
		}
		if (str.length > length) {
		  return str.substring(0, length - ending.length) + ending;
		} else {
		  return str;
		}
  };
}
