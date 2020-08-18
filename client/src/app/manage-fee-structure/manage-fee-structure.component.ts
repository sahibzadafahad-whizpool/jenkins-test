import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassDataService } from './../classes/manageClass.service';
import { ManageFeeHeadsService } from './../manage-fee-heads/manage-fee-heads.service';
import { ManageFeeStructureService } from './manage-fee-structure.service';
import { CommonService } from '../shared/services/common.service';
import { SettingsService } from './../settings/settings.service';
@Component({
  selector: 'app-manage-fee-structure',
  templateUrl: './manage-fee-structure.component.html',
  styleUrls: ['./manage-fee-structure.component.scss'],
  providers: [ClassDataService, ManageFeeStructureService, CommonService,ManageFeeHeadsService,SettingsService]
})
export class ManageFeeStructureComponent implements OnInit {
  // default
  public running_session = localStorage.getItem('running_session');

  /* pagination Info */
  public pageSize = 10;
  public pageNumber = 1;
  private is_subject_group_allow = false;

  // add fee structure variables

  public class_id: number;
  public fee_title: string;
  public fee_amount: number;

  // update fee structure variables

  public class_idU: number;
  public fee_titleU: string;
  public fee_amountU: number;
  public fee_sructId: number;
  public fee_heads_id: number;
  public sub_class_id: number;

  // arrays
  public classdataList: Array<any>;
  public feeheadList: Array<any>;
  public subClassData: Array<any>;
  public feeTypeList = [
    { id: 'Monthly', value: 'Monthly' },
    { id: 'Anually', value: 'Anually' }
  ];
  public feeStructDataList: Array<any>;
  public singleClassFeeStructA: Array<any>;

  public showTable;

  // notifications

  successNotifi = 0;
  updateNotifi = 0;
  alertType = '';
  addFeeSNoti = '';
  updateExamNoti = '';
  dbRespMsg = '';
  updateFeeStructNoti = '';

  admin_level: any;

  constructor(
    private _commonService: CommonService,
    private _classDataService: ClassDataService,
    private _manageFeeStructureService: ManageFeeStructureService,
    private _manageFeeHeadsService: ManageFeeHeadsService,
	private _settingsService: SettingsService,
    private modalService: NgbModal
  ) {}

  // this function auto called when component loads
  ngOnInit() {
    // get admin level
    this.admin_level = localStorage.getItem('admin_level');
    this.getClassData(); // get class data
    this.getAllFeeHeadsData(); // get fee heads
    this.get_schoolInfo(); // get fee heads
    this.getSubClassData(); // get fee heads
    this.getFeeStructInfo();
  }
  // *********************************************************************************************************************** */
  /**********************************************************Read Data from DB Methods************************************** */
  // *********************************************************************************************************************** */

  // ********************************************************** **********/
  // *********************** Get all Classes data ************************/
  // ******************************************************************* */

  public getClassData() {
    this._classDataService.getClassesF().subscribe(result => {
      this.classdataList = result;
    });
  }
  
  public getSubClassData() {
    this._classDataService.getSubClasses().subscribe(result => {
      this.subClassData = result;
    });
  }
  
  // ********************************************************** **********/
  // *********************** Get all fee head data ************************/
  // ******************************************************************* */
	public getAllFeeHeadsData() {
		this._manageFeeHeadsService.getFeeHeads().subscribe(result => {
		  this.feeheadList = result;
		});
	}
 	
	public get_schoolInfo() {
		var date = new Date();	
		this._settingsService.get_schoolInfoF().subscribe(result => {
		  if (result.status === 1) {
			let schoolInfo = null;
			schoolInfo = result.data[0];
			this.is_subject_group_allow = schoolInfo.is_subject_group;	
		
		  } else {
			this._commonService.errorToaster(result.msg, 'Error!');
		  }
		});
	}

  // ********************************************************** **********/
  // *********************** Get Fee Structure Details *********************/
  // ******************************************************************* */

  public getFeeStructInfo() {
    this.feeStructDataList = [];
    this.dbRespMsg = '';
    this._manageFeeStructureService
      .getFeeStructInfoF(this.running_session)
      .subscribe(result => {
        if (result.status === 1) {
          this.showTable = true;
          this.feeStructDataList = result.data;
        }
        if (result.status === 0) {
          this.showTable = false;
          this.dbRespMsg = 'No fee structure is added';
        }

        if (result.status === 403) {
          this.dbRespMsg = result.msg;
        }
      });
  }

  // ********************************************************** **********/
  // *********************** Get single Fee struct Data ******************/
  // ******************************************************************* */

  public get_singleFeeStructData(fee_struct_id) {
    let singleClassFeeStruct = null;
    this._manageFeeStructureService
      .get_singleClassFeeStructDataF(fee_struct_id)
      .subscribe(result => {
        if (result.status === 1) {
          this.singleClassFeeStructA = result.data;

          singleClassFeeStruct = this.singleClassFeeStructA[0];
		  this.class_idU = singleClassFeeStruct.class_name;
          this.fee_titleU = singleClassFeeStruct.fee_title;
          this.fee_amountU = singleClassFeeStruct.fee_amount;
          this.fee_sructId = singleClassFeeStruct.id;
          this.sub_class_id = singleClassFeeStruct.sub_class_id;
        } else {
          this.dbRespMsg = result.msg;
        }
      });
  }

  // *********************************************************************************************************************** */
  /**********************************************************Add Update Delete Data  Methods************************************** */
  // *********************************************************************************************************************** */

  // ********************************************************** **********/
  // *********************** Add new fee structure  ************************/
  // ******************************************************************* */
  public onClickAddFeeStruc(submitEvent) {
    const fee_struct_data = submitEvent.value;

    const feeStructData = {
      class_id: Number(fee_struct_data.class_id),
      fee_title: 'Monthly',
      fee_amount: fee_struct_data.fee_amount,
      sub_class_id: fee_struct_data.sub_class_id,
      is_subject_group_allow: this.is_subject_group_allow,
      running_session: this.running_session
    };
	
    this._manageFeeStructureService
      .addNewFeeStructure(feeStructData)
      .subscribe(result => {
        if (result.status === 1) {
          this._commonService.successToaster(
            'Fee Structure added successfully',
            'Success!'
          );

          submitEvent.reset();
          this.getFeeStructInfo(); // call to reload the data
          this.closeModal();
        } else if (result.status === 3) {
          this._commonService.errorToaster(result.msg, 'Failed!');
        } else {
          this._commonService.errorToaster(result.msg, 'Failed!');
        }
      });
  }

  // ********************************************************** **********/
  // *********************** Update Class fee structure  ************************/
  // ******************************************************************* */

  public onClickUpdateFeeStruc(updateEvent) {
    const update_data = {
      id: updateEvent.value.fee_sructId,
      fee_amount: updateEvent.value.fee_amountU,
      sub_class_id: updateEvent.value.sub_class_id,
      fee_title: 'Monthly'
    };

    this._manageFeeStructureService
      .updateFeeStructF(update_data)
      .subscribe(result => {
        if (result.status === 1) {
          this._commonService.successToaster(
            'Fee Structure added successfully',
            'Success'
          );

          this.getFeeStructInfo(); // call to reload the data
          this.closeModal();
        } else {
          this._commonService.errorToaster(result.msg, 'Failed');
        }
      });
  }

  // ********************************************************** **********/
  // *********************** Delete fee structure  ************************/
  // ******************************************************************* */

  public onClickDelFeeStruct(fee_struct_id: number) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        // if user confirm then call delete API
        this._manageFeeStructureService
          .deleteFeeStructF(fee_struct_id)
          .subscribe(resultresp => {
            if (resultresp.status === 1) {
              this.getFeeStructInfo();

              this._commonService.successToaster(
                'Successfully Deleted.',
                'Deleted'
              );
            } else {
              this._commonService.successToaster(resultresp.msg, 'Error!');
            }
          });
      }
    });
  }

  // *********************************************************************************************************************** */
  /**********************************************************General Methods********************************************** */
  // *********************************************************************************************************************** */

  // new modal
  openNgModal(content, size) {
    this.modalService.open(content, { size: size });
  }

  // ********* Open  update modal */
  public openUpdateFeeStructModal(modal, fee_struct_id: number) {
    this.openNgModal(modal, 'md');
    this.get_singleFeeStructData(fee_struct_id);
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
}
