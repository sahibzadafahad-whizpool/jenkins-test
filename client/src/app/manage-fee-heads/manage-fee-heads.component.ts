import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageFeeHeadsService } from './manage-fee-heads.service';
import { CommonService } from '../shared/services/common.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-manage-fee-heads',
  templateUrl: './manage-fee-heads.component.html',
  styleUrls: ['./manage-fee-heads.component.scss'],
  providers: [ManageFeeHeadsService, CommonService]
})
export class ManageFeeHeadsComponent implements OnInit {

	// variable for add fee head
	
	feedHeadsData: Array<any>;
	 
	public feeHeadTitleText:string;
	public head_name:string;
	public fee_heads_id:number;
   
	
	// variable for update fee head
	public updateFeeHeadTitleText:string = "Tuition Fee";
	admin_level: any;
	constructor(
		private _commonService: CommonService,
		private _manageFeeHeadsService: ManageFeeHeadsService,
		private modalService: NgbModal
	) { }

	// new modal
	openNgModal(content, size) {
	  this.modalService.open(content, { size: size });
	}

	// open modal
	public openModal(modal) {
	  this.openNgModal(modal, 'md');
	}

	// close modal
	public closeModal() {
	  this.modalService.dismissAll();
	}

	// this function auto called when component loads
	ngOnInit() {
		// get admin level
		this.admin_level = localStorage.getItem('admin_level');
		this.getAllFeeHeadsData();
		
		//this.getFeeStructInfo();
	}
  
	public onClickAddFeeHead(submitEvent)
	{
		//alert(submitEvent.value.feeHeadTitle);
		const data = submitEvent.value;
		
		const formdata = {
		  head_name: data.feeHeadTitle,
		};
		this._manageFeeHeadsService.addNewFeeHead(formdata).subscribe(result => {
		  if (result.status === 1) {
			this._commonService.successToaster('Added Successfully', 'Success!');
			submitEvent.reset(); // reset form after submission
			this.getAllFeeHeadsData();
			this.closeModal();
		  } else {
			this._commonService.successToaster(result.msg, 'Failed!');
		  }
		});
	}
	
	// ********************************************************** **********/
	// *********************** Get all Sub Classes data ************************ */
	// ******************************************************************* */
	 public openEditFeeHeadsModal(modal, id, index) {	
	   // call method to get single class data for updating
		this.getSingleRowData(index);
		this.openNgModal(modal, 'md');
	}

	// ********************************************************** **********/
	// *********************** Get all Sub Classes data ************************ */
	// ******************************************************************* */

	public getAllFeeHeadsData() {
		this._manageFeeHeadsService.getFeeHeads().subscribe(result => {
		  this.feedHeadsData = result;
		});
	}
  
  
	public getSingleRowData(index) {
		let singleRow = null;
		
		singleRow = this.feedHeadsData[index];

		this.fee_heads_id = singleRow.fee_heads_id;
		this.head_name = singleRow.head_name;
	  }
  

	public onClickDeleteHeadTitle(headID)
	{
	  var confrm = confirm("Are you sure want to delete?");
	  if(confrm)
	  {
		alert('Deleted '+headID);
	  }
	}

	
	
	  // *************************************************************** */
	  // ******************* Update Record  ******************/
	  // *************************************************************** */

	public onClickUpdateFeeHeadDetail(submitEvent) {
		const data = submitEvent.value;
		const id = data.fee_heads_id;

		const formData = {
		  head_name: data.head_name
		};
		this._manageFeeHeadsService
		  .updateFeeHeads(formData, id)
		  .subscribe(result => {
			if (result.status === 1) {
			  submitEvent.reset();		
			  this._commonService.successToaster('Updated Successfully', 'Success!');
			  // load data from db after update
			  this.getAllFeeHeadsData();
			  this.closeModal();
			} else {
			  this._commonService.errorToaster(result.msg, 'Failed!');
			}
		  });
	}
	
  // **************************************************************** */
  // ******************* Delete Fee head  ******************/
  // ********************************************************** ******/

  public deleteFeeHead(id) {

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
        const deleteStatus = {
          status: 0
        };
        // if user confirm then call delete API
        this._manageFeeHeadsService
          .deletesingleFeeHead(deleteStatus, id) // delete class service calling
          .subscribe(resdata => {});
        // show deleted notification
		this.getAllFeeHeadsData();
        this._commonService.successToaster('Deleted Successfully', 'Success!');
        this.closeModal();
      }
    });
  }
	
}
