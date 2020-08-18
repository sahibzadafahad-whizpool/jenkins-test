var async = require("async");
const sql_prepare = require("../prepare");
const con = require("../db_connection");
module.exports = {

    //********************************************************************************** */
    // ************************** check fee struct is already added  ************************/
    //******************************************************************************* */

    check_isFeeAlreadyStructSet: function(req, res, check) {
        return new Promise(function(resolve, reject) {
            let class_id = req.body.class_id;
            let year = req.body.running_session;
            let fee_title = req.body.fee_title;
            let is_subject_group_allow = req.body.is_subject_group_allow;
            let sub_class_id = req.body.sub_class_id;
			if(is_subject_group_allow) {
				con.query(
                sql_prepare.sql_check_isFeeAlreadyStructSet_subGroup, [class_id, year,sub_class_id],
                (err, result) => {
                    if (err) {
                        resolve("Database Error : " + err);
                    } else {
                        if (result[0].feeStruct_count >= 1) {
                            let resp = {
                                status: 1,
                                msg: "available"
                            };
                            resolve(resp);
                        } else {
                            let resp = {
                                status: 0,
                                msg: "not available"
                            };
                            resolve(resp);
                        }
                    }
                }
            );
				
			} else {
				con.query(
					sql_prepare.sql_check_isFeeAlreadyStructSet, [class_id, year],
					(err, result) => {
						if (err) {
							resolve("Database Error : " + err);
						} else {
							if (result[0].feeStruct_count >= 1) {
								let resp = {
									status: 1,
									msg: "available"
								};
								resolve(resp);
							} else {
								let resp = {
									status: 0,
									msg: "not available"
								};
								resolve(resp);
							}
						}
					}
				);
			}
        });
    },

    //********************************************************************************** */
    // ************************** check fee struct is set or not  ************************/
    //******************************************************************************* */

    check_isFeeStructSet: function(req, res) {
        return new Promise(function(resolve, reject) {
            let class_id = req.params.class_id;
            let year = req.params.running_session;

            con.query(
                sql_prepare.sql_check_isFeeStructSet, [class_id, year],
                (err, result) => {
                    if (err) {
                        resolve("Database Error : " + err);
                    } else {
                        if (result[0].feeStruct_count >= 1) {
                            let resp = {
                                status: 1,
                                msg: "available"
                            };
                            resolve(resp);
                        } else {
                            let resp = {
                                status: 0,
                                msg: "not available"
                            };
                            resolve(resp);
                        }
                    }
                }
            );
        });
    },

    //********************************************************************* */
    // ************************** Add new fee struct  ************************/
    //********************************************************************* */

    add_feeStructFun: function(req, res) {
        let feeStructData = {
            class_id: req.body.class_id,
            fee_title: req.body.fee_title,
            fee_amount: req.body.fee_amount,
            sub_class_id: req.body.sub_class_id,
            year: req.body.running_session
        };

        let sql_prepare_statement = sql_prepare.sql_addFeeStructure;

        //call function to insert data into db
        let query = sql_prepare.run_add_query(
            req,
            res,
            con,
            sql_prepare_statement,
            feeStructData
        );
    },

    //********************************************************************* */
    // ************************** Get fee struct details  ********************/
    //********************************************************************* */

    get_fee_structDetailsFun: function(req, res) {
        let year = req.params.running_session;
        let sql_prepare_statement = sql_prepare.sql_getFeeStructureDetails;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            year
        );
    },

    //********************************************************************* */
    // ************************** Get fee struct details by class id  ********************/
    //********************************************************************* */

    getFeeStructByClassId: function(req, res) {
        let year = req.params.running_session;
        let class_id = req.params.class_id;
        let sql_prepare_statement = sql_prepare.sql_getFeeStructureByClassId;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement, [class_id, year]
        );
    },

    //********************************************************************* */
    // ********* Get Single class fee struct details  ************************/
    //********************************************************************* */
    get_single_ClassfeeStructData: function(req, res) {
        let id = req.params.fee_struct_id;
        let sql_prepare_statement = sql_prepare.sql_getSingleClassFeeStruct;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            id
        );
    },

    //********************************************************************* */
    // ************************** Delete fee struct   ************************/
    //********************************************************************* */

    delete_feeStructFun: function(req, res) {
        let id = req.params.fee_struct_id;
        let sql_prepare_statement = sql_prepare.sql_deleteFeeStruct;
        sql_prepare.run_delete_query(req, res, con, sql_prepare_statement, id);
    },

    //********************************************************************* */
    // ************************** Update class fee structure  ************************/
    //********************************************************************* */

    update_feeStructFun: function(req, res) {
        let id = req.body.id;
        let fee_struct_data = {
            fee_amount: req.body.fee_amount,
            fee_title: req.body.fee_title,
            sub_class_id: req.body.sub_class_id,
        };
        let update_params = [fee_struct_data, id];
        let sql_prepare_statement = sql_prepare.sql_updateFeeStruct;
        //call to update data from db
        let query = sql_prepare.run_update_query(
            req,
            res,
            con,
            sql_prepare_statement,
            update_params
        );
    },

    //********************************************************************* */
    // ************************** Get class students data  ************************/
    //********************************************************************* */

    get_classStudentsF: function(req, res) {
        let query_params = [req.params.class_id, req.params.section_id, req.params.running_session, 1];
        let sql_prepare_statement = sql_prepare.sql_getClassStudents;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_params
        );
    },

    //********************************************************************* */
    // ************************* Get class fee by class id  *****************/
    //********************************************************************* */

    get_classFeeF: function(req, res) {
        let query_params = [req.params.class_id, req.params.running_session];
        let sql_prepare_statement = sql_prepare.sql_getClassFee;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_params
        );
    },

    //********************************************************************* */
    // ************************* check fee discount already set  *****************/
    //********************************************************************* */

    check_studentFeeDiscountFun: function(req, res) {
        return new Promise(function(resolve, reject) {
            let class_id = req.body.class_id;
            let year = req.body.running_session;
            let student_id = req.body.student_id;

            con.query(
                sql_prepare.sql_check_isFeeDiscountSet, [student_id, class_id, year],
                (err, result) => {
                    if (err) {
                        resolve("Database Error : " + err);
                    } else {
                        if (result[0].feeDisc_count >= 1) {
                            let resp = {
                                status: 1,
                                msg: "available"
                            };
                            resolve(resp);
                        } else {
                            let resp = {
                                status: 0,
                                msg: "not available"
                            };
                            resolve(resp);
                        }
                    }
                }
            );
        });
    },

    //********************************************************************* */
    // ************************* set student fee discount  *****************/
    //********************************************************************* */

    set_studentFeeDiscountFun: function(req, res) {
		
		let class_id = req.body.class_id;
		let year = req.body.running_session;
		let student_id = req.body.student_id;
		let sql = sql_prepare.sql_check_isFeeDiscount;
		let query_params = [student_id, class_id, year];		
				
		let query = con.query(sql, query_params, (err, results) => {
				if (err) {
					res.json({
						status: 403,
						msg: "fail to load class details" + err
					});
				} else {
					
		
					if (results.length >= 1) {							
						
						let discount_id = results[0].discount_id;
						let update_data = {
							comments: req.body.comment,
							discount_amount: req.body.discount_amount
						};

						let update_params = [update_data, discount_id];
						let sql_prepare_statement = sql_prepare.sql_updateStdFeeDiscDetails;
						//call to update data from db
						let query = sql_prepare.run_update_query(
							req,
							res,
							con,
							sql_prepare_statement,
							update_params
						);
						
						
					} else {
        let fee_discount_data = {
            class_id: req.body.class_id,
            year: req.body.running_session,
            student_id: req.body.student_id,
            discount_amount: req.body.discount_amount,
            comments: req.body.comment,
            status: req.body.status
        };

        let sql_prepare_statement = sql_prepare.sql_set_studentFeeDiscount;

        //call function to insert data into db
        let query = sql_prepare.run_add_query(
            req,
            res,
            con,
            sql_prepare_statement,
            fee_discount_data
        );
					}
				
			}
		});
       
		/*
		
       
		*/
    },

    //********************************************************************* */
    // ************************* get student fee discount list  *************/
    //********************************************************************* */

    get_studentsFeeDiscListFun: function(req, res) {
        let query_params = [
            req.params.class_id,
            req.params.running_session,
            req.params.running_session
        ];

        let sql_prepare_statement = sql_prepare.sql_getStdFeeDiscountsList;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_params
        );
    },

    //********************************************************************* */
    // *************** get single student fee discount details  *************/
    //********************************************************************* */

    get_singleStdFeeDiscDetailsFun: function(req, res) {
        let discount_id = req.params.discount_id;
        let sql_prepare_statement = sql_prepare.sql_getSingleStdFeeDiscountDetails;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            discount_id
        );
    },

    //********************************************************************* */
    // *************** Update student fee discount details  *************/
    //********************************************************************* */

    update_stdFeeDiscountDetails: function(req, res) {
        let discount_id = req.params.discount_id;
        let update_data = {
            comments: req.body.comments,
            discount_amount: req.body.discount_amount
        };

        let update_params = [update_data, discount_id];
        let sql_prepare_statement = sql_prepare.sql_updateStdFeeDiscDetails;
        //call to update data from db
        let query = sql_prepare.run_update_query(
            req,
            res,
            con,
            sql_prepare_statement,
            update_params
        );
    },

    //********************************************************************* */
    // *************** disable student fee discounts  *************/
    //********************************************************************* */

    change_stdFeeDiscountStatus: function(req, res) {
        let discount_id = req.params.discount_id;
        let status = req.params.status;
        let update_status = {
            status: status
        };
        let update_params = [update_status, discount_id];
        let sql_prepare_statement = sql_prepare.sql_updateStdFeeDiscDetails; // use sql query to update status
        //call to update data from db
        let query = sql_prepare.run_update_query(
            req,
            res,
            con,
            sql_prepare_statement,
            update_params
        );
    },

    //********************************************************************* */
    // ****** check whether fee invoice is laready generated ****************/
    //********************************************************************* */

    check_classFeeInvoiceFunGenerated: function(req, res) {
        return new Promise(function(resolve, reject) {
            let class_id = req.body.class_id;
            let year = req.body.running_session;

            let fee_month = req.body.fee_month;

            con.query(
                sql_prepare.sql_check_isFeeInvoiceCreated, [class_id, fee_month, year],
                (err, result) => {
                    if (err) {
                        resolve("Database Error : " + err);
                    } else {
                        if (result[0].feeInvoice_count >= 1) {
                            let resp = {
                                status: 1,
                                msg: "available"
                            };
                            resolve(resp);
                        } else {
                            let resp = {
                                status: 0,
                                msg: "not available"
                            };
                            resolve(resp);
                        }
                    }
                }
            );
        });
    },

    //********************************************************************* */
    // ********* get all students for fee invoice generation  **************/
    //********************************************************************* */

    get_allClassStudents: function(req, res) {
        return new Promise(function(resolve, reject) {
            let query_params = [req.body.class_id, req.body.running_session, 1];
            let sql_prepare_statement = sql_prepare.sql_getClsStudents;

            con.query(
                sql_prepare_statement,
                query_params,
                (err, result) => {
                    if (err) {
                        resolve("Mysql error for getting all students :  " + err);
                    } else {
                        if (result.length >= 1) {
                            let resp = {
                                status: 1,
                                data: result
                            };
                            resolve(resp);
                        } else {
                            let resp = {
                                status: 0,
                                msg: "no data available"
                            };
                            resolve(resp);
                        }
                    }
                }
            );
        });
    },

    //********************************************************************* */
    // ******************** create class fee invoice  ***********************/
    //********************************************************************* */

    create_classFeeInvoice: function(req, res, studentsData) {
        return new Promise(function(resolve, reject) {
            let class_id = req.body.class_id;
            let fee_month = req.body.fee_month;
            let creation_timestamp = req.body.creation_timestamp;
            let duedate_timestamp = req.body.duedate_timestamp;
            let fee_desc = req.body.fee_desc;
            let month = req.body.month;
            let fee_year = req.body.fee_year;
            let fee_amount = req.body.fee_amount;
            let fee_title = req.body.fee_title;
            let total_fee = req.body.total_fee;
            let running_session = req.body.running_session;
            let amount_due = req.body.total_fee;
            let fee_status = "unpaid";

            async.forEachOf(
                studentsData,
                function(data, key, callback) {
                    // It will be executed one by one
                    let invoice_data = {
                        student_id: studentsData[key].std_id,
                        class_id: class_id,
                        fee_month: fee_month,
                        creation_timestamp: creation_timestamp,
                        duedate_timestamp: duedate_timestamp,
                        fee_desc: fee_desc,
                        month: month,
                        fee_year: fee_year,
                        fee_amount: fee_amount,
                        fee_title: fee_title,
                        total_fee: total_fee,
                        year: running_session,
                        amount_due: amount_due,
                        fee_status: fee_status
                    };
                    let query = con.query(
                        sql_prepare.create_bulkInvoice,
                        invoice_data,
                        (err, result) => {
                            if (err) {
                                return callback(err);
                            }

                            callback();
                        }
                    );
                },
                function(err, result) {
                    if (err) {
                        resolve("Msql error, for creating invoice :" + err);
                    } else {
                        let resp = {
                            status: 1,
                            msg: "Invoice created successfully"
                        };
                        resolve(resp);
                    }
                }
            );
        });
    },

    //******************************************************************************* */
    // *****deduct student fee discount amount after fee invoice generated *********/
    //******************************************************************************* */

    deduct_discountFeeAmount: function(req, res) {
        let query_params = [req.body.class_id, req.body.running_session, 1];
        let sql_prepare_statement =
            sql_prepare.sql_getStdFeeDiscountsForAmountDecduction;

        // get students and discount amount who got discounts in their fee
        con.query(sql_prepare_statement, query_params, (err, result) => {
            if (err) {
                res.json({
                    status: 402,
                    msg: "Mysql error, for fee dicount amount deduction" + err // send db error
                });
            } else {
                if (result.length >= 1) {
                    // if there are any students who go discounts in their fee
                    let feemonth = req.body.fee_month;
                    async.forEachOf(
                        result,
                        function(data, key, callback) {
                            // It will be executed one by one
                            let fee_month = feemonth;
                            let student_id = result[key].student_id;
                            let class_id = result[key].class_id;
                            let year = result[key].year;

                            let discount_data = {
                                fee_discount: result[key].discount_amount,
                                total_fee: result[key].total_fee - result[key].discount_amount,
                                amount_due: result[key].total_fee - result[key].discount_amount
                            };

                            let update_params = [discount_data, student_id, year, fee_month];

                            // update fee amount against each student who got fee discount
                            let query = con.query(
                                sql_prepare.update_studentFeeDiscountsInInvoice,
                                update_params,
                                (err, result) => {
                                    if (err) {
                                        return callback(err);
                                    }

                                    callback();
                                }
                            );
                        },
                        function(err, result) {
                            if (err) {
                                res.json({
                                    status: 402,
                                    msg: "Mysql error, deduct discount amount " + err // send db error
                                });
                            } else {
                                res.json({
                                    status: 1,
                                    msg: "discount fee deducted from invoice successfully"
                                });
                            }
                        }
                    );
                } else {
                    res.json({
                        status: 1,
                        msg: "No student got discount in fee"
                    });
                }
            }
        });
    },

    //********************************************************************* */
    // **** add previous month pending amount to next month  ****************/
    //********************************************************************* */

    add_pendingAmount: function(req, res, studentsData) {
        return new Promise(function(resolve, reject) {
            let prev_month = req.body.month - 1;
            let fee_year = req.body.fee_year;
            let query_params = [
                req.body.class_id,
                req.body.running_session,
                prev_month,
                fee_year
            ];
            let sql_prepare_statement =
                sql_prepare.sql_getStdPendingAmountToAddInNextMonth;

            // get students and discount amount who got discounts in their fee
            con.query(sql_prepare_statement, query_params, (err, result) => {
                if (err) {
                    resolve("Mysql error, for previous month  pending fee adding" + err);
                } else {
                    if (result.length >= 1) {
                        // if there are any students whose fee is pending
                        let feemonth = req.body.fee_month;
                        async.forEachOf(
                            result,
                            function(data, key, callback) {
                                // It will be executed one by one
                                let fee_month = feemonth;
                                let student_id = result[key].student_id;
                                let class_id = result[key].class_id;
                                let year = result[key].year;

                                let pending_fee_data = {
                                    fee_extra_charges: result[key].amount_due,
                                    extra_charges_desc: "Last month pending fee " +
                                        result[key].amount_due +
                                        " added",
                                    total_fee: req.body.total_fee + result[key].amount_due,
                                    amount_due: req.body.total_fee + result[key].amount_due
                                };

                                let update_params = [
                                    pending_fee_data,
                                    student_id,
                                    year,
                                    fee_month
                                ];

                                // update fee amount against each student who has previous month pending fee
                                let query = con.query(
                                    sql_prepare.update_studentFeeDiscountsInInvoice,
                                    update_params,
                                    (err, result) => {
                                        if (err) {
                                            return callback(err);
                                        } else {
                                            let due_date_update = {
                                                duedate_timestamp: req.body.duedate_timestamp
                                            };
                                            let query_params2 = [
                                                due_date_update,
                                                student_id,
                                                fee_year,
                                                prev_month
                                            ];
                                            let sql_prepare_statement2 =
                                                sql_prepare.sql_updatePrevMonthFeeDueDate;
                                            let query2 = con.query(
                                                sql_prepare_statement2,
                                                query_params2
                                            );
                                        }
                                        callback();
                                    }
                                );
                            },
                            function(err, result) {
                                if (err) {
                                    resolve("Mysql error, add previous month pending fee " + err);
                                } else {
                                    let resp = {
                                        status: 1,
                                        msg: "added previous month pending fee in invoice successfully"
                                    };

                                    resolve(resp);
                                }
                            }
                        );
                    } else {
                        let resp = {
                            status: 1,
                            msg: "No student has pending fee"
                        };

                        resolve(resp);
                    }
                }
            });
        });
    },

    //*********************************************************************************** */
    // ******************** Get student fee invoive details   *****************************/
    //*********************************************************************************** */

    get_StdFeeInvoiceDetailsF: function(req, res) {
        let class_id = req.params.class_id;
        let fee_month = req.params.fee_month;
        let year = req.params.running_session;

        let query_paramas = [fee_month, class_id, year, year];

        let sql_prepare_statement = sql_prepare.sql_getStudentFeeInvoiceDetails;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_paramas
        );
    },

    //*********************************************************************************** */
    // ******************** Update student fee invoive details   *****************************/
    //*********************************************************************************** */

    update_feeInvoiceDetailsFun: function(req, res) {
        let invoice_id = req.params.invoice_id;
        let update_data = {
            duedate_timestamp: req.body.duedate_timestamp,
            extra_charges_desc: req.body.extra_charges_desc,
            fee_amount: req.body.fee_amount,
            fee_discount: req.body.fee_discount,
            fee_extra_charges: req.body.fee_extra_charges,
            fee_title: req.body.fee_title,
            total_fee: req.body.total_fee
        };
        let update_params = [update_data, invoice_id];
        let sql_prepare_statement = sql_prepare.sql_updateStdFeeInvoiceDetails;
        //call to update data from db
        let query = sql_prepare.run_update_query(
            req,
            res,
            con,
            sql_prepare_statement,
            update_params
        );
    },

    //*********************************************************************************** */
    // ******************** Update student fee payement status details   *****************************/
    //*********************************************************************************** */

    update_feePaymentDetailsFun: function(req, res) {
        let invoice_id = req.params.invoice_id;
        let update_data = {
            amount_paid: req.body.amount_paid,

            fee_status: req.body.fee_status,
            amount_due: req.body.amount_due,
            feepaid_date: req.body.feepaid_date
        };

        let update_params = [update_data, invoice_id];
        let sql_prepare_statement = sql_prepare.sql_updateStdFeeInvoiceDetails;
        //call to update data from db
        let query = sql_prepare.run_update_query(
            req,
            res,
            con,
            sql_prepare_statement,
            update_params
        );
    },

    //*********************************************************************************** */
    // ******************** Get student fee payment histroy   ********************/
    //*********************************************************************************** */

    get_studentFeeHistroyFun: function(req, res) {
        let student_id = req.params.student_id;
        let year = req.params.running_session;

        let query_paramas = [student_id, year];

        let sql_prepare_statement = sql_prepare.sql_getStudentFeePaymentsHistroy;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_paramas
        );
    },
	
	
	addFeeHeads: function(req, res) {
        let formData = {
      
            head_name: req.body.head_name
        };

        let sql_prepare_statement = sql_prepare.sql_add_fee_head;

        //call function to insert data into db
        let query = sql_prepare.run_add_query(
            req,
            res,
            con,
            sql_prepare_statement,
            formData
        );
    },
	
	
	//********************************************************************* */
    // ********************* Get Fee Heads  ***********************/
    //********************************************************************* */
	get_fee_heads: function(req, res) {
        let sql = "SELECT * FROM tbl_sub_class WHERE status = ? ";
        let query = con.query(sql_prepare.sql_get_fee_head, [1], (err, results) => {
            if (err) {
                res.json({
                    status: 403,
                    msg: "fail to load class details" + err
                });
            } else {
                res.json(results);
            }
        });
    },    
	
	//********************************************************************* */
    // ********************* update Fee Heads  ***********************/
    //********************************************************************* */
	update_fee_heads: function(req, res) {
        let id = req.params.id;
        let formData = {
           head_name: req.body.head_name,
        };
        let sql = "UPDATE tbl_fee_heads SET ? WHERE fee_heads_id= ?";
        let query = con.query(
            sql, [formData, id],
            (err, result) => {
                if (err) {
                    res.json({
                        status: 402,
                        msg: "Mysql error : " + err
                    });
                } else {
                    res.json({
                        msg: "Successfully Updated",
                        status: 1
                    });
                }
            }
        );
    },
    //********************************************************************* */
    // ******************** Delete Fee Head *******************************/
    //********************************************************************* */

    delete_fee_head: function(req, res) {
        let id = req.params.id;
        let status = req.body.status;
        let sql = "UPDATE tbl_fee_heads SET status = ? WHERE fee_heads_id= ?";
        let query = con.query(sql, [status, id], (err, result) => {
            if (err) {
                res.json({
                    msg: "fail to Delete Class" + err
                });
            } else {
                res.json({
                    msg: "Deleted successfully"
                });
            }
        });
    }, 
	
	//********************************************************************* */
    // ******************** check voucher created or not *******************************/
    //********************************************************************* */
	check_fee_voucher: function(req, res) {
		
		//Get fee voutcher from draf or create one. 
		let class_id = req.body.class_id;
		let voucher_date = req.body.monthyear;
		let studentlist = req.body.studentlist;        
		let feeheads = req.body.feeheads;
		let totalAmount =0;
		

		let query_params = [req.body.class_id,req.body.monthyear];
		let sql = "SELECT * FROM tbl_vouchers WHERE  class_id = ? AND voucher_month_year = ? ";
	
		let query = con.query(sql, query_params, (err, results) => {
            if (err) {
                res.json({
                    status: 403,
                    msg: "fail to load class details" + err
                });
            } else {
                res.json(results);
            }
        });
    }, 
	
	//********************************************************************* */
    // ******************** fetc class invoices  *******************************/
    //********************************************************************* */
	fetch_class_invoice: function(req, res) {
		
		//Get fee voutcher from draf or create one. 
		let query_params = [req.body.class_id,req.body.fee_month,req.body.fee_year];
		let sql = "SELECT * FROM tbl_fee_invoice WHERE  class_id = ? AND month = ? AND fee_year = ? ";
	
		let query = con.query(sql, query_params, (err, results) => {
            if (err) {
                res.json({
                    status: 403,
                    msg: "fail to load class details" + err
                });
            } else {
                res.json(results);
            }
        });
    }, 
	
	//********************************************************************* */
    // ******************** update student invoices voucher created or not *******************************/
    //********************************************************************* */
	student_clas_invoice: function(req, res) {
		
		let class_id = req.body.class_id;
		let type = req.body.type;
		let fee_month = req.body.fee_month;
		let fee_year = req.body.fee_year;
		let dueDate = req.body.dueDate;
		let studentlist = req.body.studentlist;        
		let lateFee = req.body.lateFee;        
		let paymentDate = req.body.paymentDate;        
		let discount = req.body.discount;        
		let session_year = req.body.year;        
		let sql_prepare_statement;        
		let query;        
       
		/***************************************/
		
		const d = new Date();
		const month = d.getMonth() + 1;
		const day = d.getDate();
		const current_date = d.getFullYear() + '-' +(('' + month).length < 2 ? '0' : '') + month +'-' +(('' + day).length < 2 ? '0' : '') + day;

		// ** convert selected time to Unix timestamp

		const unix_today_date = new Date(current_date).getTime() / 1000;
		
		/***************************************/
		
		
			studentlist.forEach((item,index)=> {	
					
					var fee_status = 'unpaid';
					var amount_paid = 0;
					var total_amount_fee = 0;
					var total_fee = 0;
					var invoice_total_fee = 0;
					var student_late_fee = 0;
					var amount_due = 0;
					var feepaid_date;
					var isWriteoff = false;
					
					let query_params = [class_id,fee_month,fee_year,session_year, item];
					let sql = "SELECT * FROM tbl_fee_invoice WHERE class_id = ? AND month = ? AND fee_year = ? AND year = ? AND student_id= ?";
				
				   let select_query = con.query(sql, query_params, (err, results) => {
						if (err) {
							res.json({
								status: 403,
								msg: "fail to load class details" + err
							});
						} else {
							total_amount_fee = results[0].total_fee;
							student_late_fee = results[0].late_fee;
							//console.log(total_amount_fee);
							//Piad on Time
							if(type == 1) {
								fee_status = 'paid';
								feepaid_date = unix_today_date;
								total_fee = total_amount_fee;
							}
							if(type == 2) {
								fee_status = 'unpaid';
								feepaid_date = "";
								total_fee = 0;
								
							}
							//Piad after Due Time
							if(type == 3) {
								fee_status = 'paid';
								feepaid_date = new Date(paymentDate).getTime() / 1000
								if(results[0].isWriteoff) {
									total_fee = parseInt(total_amount_fee)  
								} else if(student_late_fee > 0) {
									total_fee = parseInt(total_amount_fee) + parseInt(student_late_fee)
								} else {
									total_fee = parseInt(total_amount_fee) + parseInt(lateFee)
								}								
							}
							//WiretOff Late Payment
							if(type == 4) {
								isWriteoff = true;								
							}
							//Applied Discount
							if(type == 5) {
								total_amount_fee = parseInt(total_amount_fee) - parseInt(discount);
								discount_amount = discount;
							}
							
							invoiceData = {
								fee_status: fee_status,
								amount_paid :total_fee,
								amount_due : total_fee,
								total_fee : total_amount_fee,
								feepaid_date: feepaid_date,
								is_writeoff: isWriteoff,
								discount_amount: discount
							};
							
							//call function to insert data into db
							sql_prepare_statement = 'UPDATE tbl_fee_invoice SET  ? WHERE class_id = ? AND month = ? AND fee_year = ? AND year = ? AND student_id= ?';					
							query = sql_prepare.run_update_query_v2(
								req,
								res,
								con,
								sql_prepare_statement,
								[invoiceData, class_id,fee_month,fee_year,session_year, item]
							);
							
						}
					});	
					
				
			});
			res.json({status: 1});
					
    }, 
	
	//********************************************************************* */
    // ******************** Create voucher Drafts *******************************/
    //********************************************************************* */

	
    get_fee_voucher: function(req, res) {
		
		//Get fee voutcher from draf or create one. 
        let class_id = req.body.class_id;
        let voucher_date = req.body.monthyear;
        let studentlist = req.body.studentlist;        
		let feeheads = req.body.feeheads;
		let classfee = req.body.classfee;
		let tutionFee = req.body.tutionFee;
		let totalAmount =0;
		

        let query_params = [req.body.class_id,req.body.monthyear];
	    let sql = "SELECT * FROM tbl_voucher_drafts WHERE  class_id = ? AND voucher_month_year = ? ";
	
       let query = con.query(sql, query_params, (err, results) => {
            if (err) {
                res.json({
                    status: 403,
                    msg: "fail to load class details" + err
                });
            } else {
				if (results.length >= 1) {
					//res.json(results);
					res.json(JSON.parse(results[0].voucher_data));
				
				} else {	
					
					var studentdata = {};	
					var headdata = {};
					var voucherdata = [];
					studentlist.forEach((item,index)=> {	
						totalAmount =0;
						classfee =0;
						studentdata = {};
						studentdata["std_id"] = item.std_id;
						studentdata["std_name"] = item.std_name;
						studentdata["roll_num"] = item.roll_num;
						studentdata["class_id"] = item.class_id;
						studentdata["class_name"] = item.class_name;
						studentdata["section_id"] = item.section_id;
						studentdata["section_name"] = item.section_name;
						studentdata["subject_group"] = item.sub_class_id;
						studentdata["parent_name"] = item.parent_name;
						if(item.sub_class_id) {							
							classfee = parseInt(tutionFee[item.sub_class_id])
						}
						else {
							classfee = parseInt(tutionFee[0]) 
						}
						if(item.tuition_fee > 0) {							
							classfee = classfee - ((parseInt(classfee) * parseInt(item.tuition_fee))/100); 
						}
						studentdata["fee"] = classfee
						totalAmount += parseInt(totalAmount) + parseInt(classfee);;
						headdata = {};
						feeheads.forEach((head,ind)=> {						
							headdata[head.fee_heads_id] = "";

						});
						studentdata["dueDate"] = totalAmount;
						studentdata["lateFee"] = "";
						studentdata["heads"] = headdata
						voucherdata.push(studentdata);				
						
					});
					
					let feeVoucherData = {
						class_id: class_id,
						voucher_data: JSON.stringify(voucherdata),
						voucher_month_year: voucher_date
					};
				
					let sql_prepare_statement = 'INSERT INTO tbl_voucher_drafts SET ?';
					//call function to insert data into db
					query = sql_prepare.run_add_query_v2(
						req,
						res,
						con,
						sql_prepare_statement,
						feeVoucherData
					);
					res.json(voucherdata);
					
			
				}
            }
        });
    }, 
	
	//********************************************************************* */
    // ******************** Create voucher Drafts *******************************/
    //********************************************************************* */

	
    update_fee_voucher_draft: function(req, res) {
		
		//Get fee voutcher from draf or create one. 
        let class_id = req.body.class_id;
        let voucher_date = req.body.monthyear;
        let studentlist = req.body.studentlist;        
		let feeheads = req.body.feeheads;
		let amount = req.body.amount;
		let fee_heads_id = req.body.fee_heads_id;
		let classfee = req.body.classfee;
		let students = req.body.students;
		let tutionFee = req.body.tutionFee;
		var studentdata = {};	
		var headdata = {};
		var voucherdata = [];
		
        let query_params = [req.body.class_id,req.body.monthyear];
	    let sql = "SELECT * FROM tbl_voucher_drafts WHERE  class_id = ? AND voucher_month_year = ? ";
		
        let query = con.query(sql, query_params, (err, results) => {
            if (err) {
                res.json({
                    status: 403,
                    msg: "fail to load class details" + err
                });
            } else {
				if (results.length >= 1) {
					
					let draftID = results[0].voucher_drafts_id;	
					let stList = JSON.parse(results[0].voucher_data);
					let totalAmount = 0;
					stList.forEach((item,index)=> {						
						studentdata = {};
						totalAmount = 0;
						classfee = 0;
						studentdata["std_id"] = item.std_id;
						studentdata["std_name"] = item.std_name;
						studentdata["roll_num"] = item.roll_num;
						studentdata["class_id"] = item.class_id;
						studentdata["class_name"] = item.class_name;
						studentdata["section_id"] = item.section_id;
						studentdata["section_name"] = item.section_name;
						studentdata["parent_name"] = item.parent_name;
						studentdata["fee"] = item.fee;
						classfee = item.fee;
						totalAmount = parseInt(totalAmount) + parseInt(classfee);
						//console.log(totalAmount);
						//console.log(classfee);
						headdata = {};
						feeheads.forEach((head,ind)=> {
							
							if(fee_heads_id == head.fee_heads_id && students.includes(item.std_id)) {
								headdata[head.fee_heads_id] = amount;
								totalAmount = totalAmount + parseInt(amount);
								
							} else {
								headdata[head.fee_heads_id] = item['heads'][head.fee_heads_id];
								if(item['heads'][head.fee_heads_id] > 0 )
									totalAmount = totalAmount + parseInt(item['heads'][head.fee_heads_id]);
							}
						});		
						studentdata["dueDate"] = totalAmount;
						studentdata["lateFee"] = "";
						studentdata["heads"] = headdata;
						voucherdata.push(studentdata);						
					});
					
					let feeVoucherData = {
						class_id: class_id,
						voucher_data: JSON.stringify(voucherdata),
						voucher_month_year: voucher_date
					};
				
					//call function to insert data into db
					let sql_prepare_statement = 'UPDATE tbl_voucher_drafts SET ? WHERE voucher_drafts_id = ?';					
					let query = sql_prepare.run_update_query_v2(
						req,
						res,
						con,
						sql_prepare_statement,
						[feeVoucherData, draftID]
					);				
					
					res.json(voucherdata);
				} else {
					
					studentlist.forEach((item,index)=> {
						studentdata = {};
						studentdata["std_id"] = item.std_id;
						studentdata["std_name"] = item.std_name;
						studentdata["roll_num"] = item.roll_num;
						studentdata["class_id"] = item.class_id;
						studentdata["class_name"] = item.class_name;
						studentdata["section_id"] = item.section_id;
						studentdata["section_name"] = item.section_name;
						studentdata["subject_group"] = item.sub_class_id;
						studentdata["parent_name"] = item.parent_name;
						headdata = {};
						feeheads.forEach((head,ind)=> {						
							headdata[head.fee_heads_id] = "";
						});
						studentdata["dueDate"] = "";
						studentdata["lateFee"] = "";
						studentdata["heads"] = headdata
						voucherdata.push(studentdata);		
						
					});
					
					let feeVoucherData = {
						class_id: class_id,
						voucher_data: JSON.stringify(voucherdata),
						voucher_month_year: voucher_date
					};
				
					let sql_prepare_statement = 'INSERT INTO tbl_voucher_drafts SET ?';
					//call function to insert data into db
					let query = sql_prepare.run_add_query(
						req,
						res,
						con,
						sql_prepare_statement,
						feeVoucherData
					);
					res.json(voucherdata);
					
			
				}
            }
        });
    }, 
	
	
	//********************************************************************* */
    // ******************** Create voucher  *******************************/
    //********************************************************************* */

	
    create_fee_voucher: function(req, res) {
		return new Promise(function(resolve, reject) {
			//Get fee voutcher from draf or create one. 
			let class_id = req.body.class_id;
			let voucher_date = req.body.monthyear;
			let year = req.body.year;
			let duedate = req.body.duedate;
			let totalAmount =0;
			let query_params = [req.body.class_id,req.body.monthyear];
			let sql = "SELECT * FROM tbl_voucher_drafts WHERE  class_id = ? AND voucher_month_year = ? ";
			
			let query = con.query(sql, query_params, (err, results) => {
				if (err) {
					res.json({
						status: 403,
						msg: "fail to load class details" + err
					});
				} else {
					
		
					if (results.length >= 1) {
						//res.json(results);
						var date = new Date();
						//let draftID = results[0].tbl_voucher_drafts_id;	
						let studentsData = JSON.parse(results[0].voucher_data);
						//let totalAmount = 0;
						
						const fee_year = date.getFullYear();
							
						var fee_month_num = voucher_date.replace(fee_year.toString(),'');
		
						let feeVoucherData = {
							class_id: class_id,
							voucher_data: results[0].voucher_data,
							voucher_month_year: voucher_date
						};
					
						let sql_prepare_statement = 'INSERT INTO tbl_vouchers SET ?';
						//call function to insert data into db
						let query = sql_prepare.run_add_query(
							req,
							res,
							con,
							sql_prepare_statement,
							feeVoucherData
						);
						
						async.forEachOf(
							studentsData,
							function(data, key, callback) {
								// It will be executed one by one
								const d = new Date();
								const month = d.getMonth() + 1;
								const day = d.getDate();
								const current_date = d.getFullYear() + '-' +(('' + month).length < 2 ? '0' : '') + month +'-' +(('' + day).length < 2 ? '0' : '') + day;
								
								const duedate_timestamp = fee_year + '-' +(('' + fee_month_num).length < 2 ? '0' : '') + fee_month_num +'-' +(('' + duedate).length < 2 ? '0' : '') + duedate;
								
								const fee_month = fee_month_num + '-1-' + fee_year;
								const unix_fee_month = new Date(fee_month).getTime() / 1000;
								const unix_duedate_timestamp = new Date(duedate_timestamp).getTime() / 1000;
								 
								const invoice_data = {
								  student_id: studentsData[key].std_id,
								  class_id:  studentsData[key].class_id,
								  total_fee:  studentsData[key].dueDate,
								  month: fee_month_num,	
								  fee_month: unix_fee_month,	
								  fee_year:fee_year, 	
								  year:year, 	
								  duedate_timestamp:unix_duedate_timestamp, 	
								  fee_status: "unpaid",
								  
								};	
								let query = con.query(
									sql_prepare.create_bulkInvoice,
									invoice_data,
									(err, result) => {
										if (err) {
											return callback(err);
										}

										callback();
									}
								);
							},
							function(err, result) {
								if (err) {
									resolve("Msql error, for creating invoice :" + err);
								} else {
									let resp = {
										status: 1,
										msg: "Invoice created successfully"
									};
									resolve(resp);
								}
							}
						);
					
					}
				}
			});
		});
    }, 
	//********************************************************************* */
    // ******************** update student invoices voucher created or not *******************************/
    //********************************************************************* */
	student_clas_voucher: function(req, res) {
		
		let class_id = req.body.class_id;
		let type = req.body.type;
		let fee_month = req.body.fee_month;
		let fee_year = req.body.fee_year;
		let dueDate = req.body.dueDate;
		let studentlist = req.body.studentlist;        
		let lateFee = req.body.lateFee;        
		let paymentDate = req.body.paymentDate;        
		let discount = req.body.discount;        
		let session_year = req.body.year;        
		let feeheads = req.body.feeheads;
		let fee_heads_id = req.body.fee_heads_id;
		let amount = req.body.amount;	
        var voucherUpdateData = [];

		/***************************************/
		
		const d = new Date();
		const month = d.getMonth() + 1;
		const day = d.getDate();
		const current_date = d.getFullYear() + '-' +(('' + month).length < 2 ? '0' : '') + month +'-' +(('' + day).length < 2 ? '0' : '') + day;

		// ** convert selected time to Unix timestamp

		const unix_today_date = new Date(current_date).getTime() / 1000;
		
		/***************************************/
			//First get vocher drafts.
		/***************************************/
		let query_params = [req.body.class_id,req.body.monthyear];
		let sql = "SELECT * FROM tbl_vouchers WHERE  class_id = ? AND voucher_month_year = ? ";
		let sql_prepare_statement;	
		let query = con.query(sql, query_params, (err, results) => {
				if (err) {
					res.json({
						status: 403,
						msg: "fail to load class details" + err
					});
				} else {
					
		
					if (results.length >= 1) {

							/***********************************************************************************************/
							let draftID = results[0].voucher_id;	
							let stList = JSON.parse(results[0].voucher_data);
							let totalAmount = 0;
							stList.forEach((item,index)=> {						
								studentdata = {};
								totalAmount = 0;
								classfee = 0;
								studentdata["std_id"] = item.std_id;
								studentdata["std_name"] = item.std_name;
								studentdata["roll_num"] = item.roll_num;
								studentdata["class_id"] = item.class_id;
								studentdata["class_name"] = item.class_name;
								studentdata["section_id"] = item.section_id;
								studentdata["section_name"] = item.section_name;
								studentdata["parent_name"] = item.parent_name;
								studentdata["lateFee"] = "";
								studentdata["fee"] = item.fee;
								classfee = item.fee;
		
								//Update the tution fee if its set from admin panel
								//Tution Fee = -1
								if(parseInt(fee_heads_id) == -1 && studentlist.includes(item.std_id)) {
									
									studentdata["fee"] = amount;
									classfee = amount;
									console.log(amount);
								}
								
								//Update the late fee if its set from admin panel
								//Tution Fee = -1
								if(parseInt(fee_heads_id) == -2 && studentlist.includes(item.std_id)) {
									studentdata["lateFee"] = amount;
								} 
								
								totalAmount = parseInt(totalAmount) + parseInt(classfee);
								//console.log(totalAmount);
								//console.log(classfee);
								headdata = {};
								feeheads.forEach((head,ind)=> {
									
									if(fee_heads_id == head.fee_heads_id && studentlist.includes(item.std_id)) {
										headdata[head.fee_heads_id] = amount;
										totalAmount = totalAmount + parseInt(amount);
										
										
									} else {
										headdata[head.fee_heads_id] = item['heads'][head.fee_heads_id];
										if(item['heads'][head.fee_heads_id] > 0 )
											totalAmount = totalAmount + parseInt(item['heads'][head.fee_heads_id]);
									}
									
								});	
	
								
								//Late Fee = -2
								studentdata["dueDate"] = totalAmount;
								
								studentdata["heads"] = headdata;
								voucherUpdateData.push(studentdata);	

								//Update student invoice. 
								//sql_updateFeeInvoice: 'UPDATE tbl_fee_invoice SET ? WHERE student_id  = ? AND class_id = ? AND fee_year = ? AND month = ?',
								let InvoiceData;									
								if(parseInt(fee_heads_id) == -2 && studentlist.includes(item.std_id)) {
									if(amount == 0 ) {
										InvoiceData = {
											is_writeoff:true,
											total_fee: totalAmount,	
										}
									} else {
										InvoiceData = {
											is_writeoff:false,	
											total_fee: totalAmount,	
											late_fee: amount
										}
									}
									
								}
								else if(parseInt(fee_heads_id) == -1 && studentlist.includes(item.std_id)) {
									InvoiceData = {
										total_fee: totalAmount,	
										tuition_fee : amount
									}
									
								} else if(parseInt(fee_heads_id) == -3 && studentlist.includes(item.std_id)) {
									/****************** DISCOUNT ************/
									InvoiceData = {
										discount_amount: amount,
										total_fee : parseInt(totalAmount) - parseInt(amount)
										
									}
								} else {
									InvoiceData = {
										total_fee: totalAmount
									}
								}
								//console.log([InvoiceData, item.std_id,item.class_id,fee_year,fee_month]);
								sql_prepare_statement = sql_prepare.sql_updateFeeInvoice;	
								sql_prepare.run_update_query_v2(
									req,
									res,
									con,
									sql_prepare_statement,
									[InvoiceData, item.std_id,item.class_id,fee_year,fee_month]
								);

							});
							
							let feeVoucherData = {
								voucher_data: JSON.stringify(voucherUpdateData)
							};
							sql_prepare_statement = 'UPDATE tbl_vouchers SET ? WHERE voucher_id = ?';					
							sql_prepare.run_update_query_v2(
								req,
								res,
								con,
								sql_prepare_statement,
								[feeVoucherData, draftID]
							);
							
							res.json({status: 1,data: voucherUpdateData});
					
						/***********************************************************************************************/
					}
				}	
		});
					
    }, 
	
	
};