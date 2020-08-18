var async = require('async');
const sql_prepare = require('../prepare');
const con = require('../db_connection');
const ovh_functions = require("../ovh_functions");

module.exports = {
    //********************************************************************* */
    // ******************** Add Student data *******************************/
    //********************************************************************* */

    add_studentFun: function(req, res) {
        let add_studentData = {
            std_name: req.body.std_name,
            std_dob: req.body.std_dob,
            std_gender: req.body.std_gender,
            std_religion: req.body.std_religion,
            std_parentId: req.body.std_parentId,
            std_phonenum: req.body.std_phonenum,
            std_bformnum:req.body.bform_number,
            emergency_number:req.body.emergency_number,
            std_email: req.body.std_email,
            std_prevSchool: req.body.previous_school,
            leaving_reason: req.body.previous_school_leaving_reason,
            std_transport: req.body.std_transport,
            std_hostel: req.body.std_hostel,
            blood_group: req.body.blood_group,
            medical_problem: req.body.medical_problem,
            disability_problem: req.body.disability_problem,
            comments:req.body.comments,
            std_address_1: req.body.std_address_1,
            std_address_2: req.body.std_address_2
        };

        let query = con.query(
            sql_prepare.sql_addStudents,
            add_studentData,
            (err, result) => {
                if (err) {
                    res.json({
                        msg: 'Mysql error :' + err,
                        status: 402
                    });
                } else {
                    res.json({
                        msg: 'student added successfully',
                        status: 1,
                        student_id: result.insertId
                    });
                }
            }
        );
    },

    //********************************************************************* */
    // ******************** verify parent number *******************************/
    //********************************************************************* */
    verify_parentFun: function(req, res) {
		//console.log(req);
		//console.log(res);
        let parent_number = req.body.parent_number;

        let sql_prepare_statement = sql_prepare.sql_verifyParentNumber;
        let query_data = [parent_number, 1];
		//console.log(query_data);

        // call fect_query function to get data from database
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_data
        );
    },

    //********************************************************************* */
    // ******************** Enroll Student  *******************************/
    //********************************************************************* */

    calculate_student_roll_number: function() {
        return new Promise(function(resolve, reject) {
            //lets get last roll num from db
            let sql = "select roll_num from tbl_enroll order by enroll_id desc limit 1";
            let query = con.query(
                sql,
                (err, result) => {
                    if (err) {
                        resolve(0);
                    }else {
                        if (result.length >= 1) {
                            let previous_roll_number = parseInt(result[0].roll_num);
                            let new_roll_num = previous_roll_number+1;
                            resolve(new_roll_num);
                        }else {
                            //no records found in database
                            //lets start from static roll num
                            resolve(1111);
                        }
                    }
                }
            );
        });
    },

    enroll_studentFun: async function(req, res) {

        let roll_number = await this.calculate_student_roll_number();
        if(roll_number==0){
            res.json({
                msg: 'Could not calculate roll number',
                status: 0
            });
        }
        else{
        let enroll_studentData = {
            student_id: req.body.student_id,
            year: req.body.enroll_session,
            class_id: req.body.std_classId,
            section_id: req.body.std_sectionId,
                roll_num: roll_number,
            sub_class_id: req.body.std_sub_class_id
        };

        let sql_prepare_statement = sql_prepare.sql_enrollStudent;
        let query_data = enroll_studentData;

        // call fect_query function to get data from database
        let query = sql_prepare.run_add_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_data
        );
        }

        
    },

    //********************************************************************* */
    // **************** Get Student data by class id Function ***************/
    //********************************************************************* */

    get_studentsFun(req, res) {
        return new Promise(function(resolve,reject){
        let class_id = req.params.class_id;
        let year = req.params.running_session;

        let sql_prepare_statement = sql_prepare.sql_getStdByClassId;
        let query_data = [class_id, year, 1];

        // call fect_query function to get data from database
        
        con.query(sql_prepare_statement,query_data, async (err, students) => {
            if (err) {
                res.json({
                    msg: 'Msql error :' + err,
                    status: 402
                });
            } else {
                if (students.length >= 1) {
                    
                    for(let i=0;i<students.length;i++){

                        if(students[i].image_path!='' && students[i].image_path!=null){
                            
                            let temp_url_response = await ovh_functions.create_ovh_temp_url(students[i].image_path);
                            students[i].image_path = temp_url_response.url
                            
                            let temp_url_response1 = await ovh_functions.create_ovh_temp_url(students[i].thumb_path);
                            students[i].thumb_path = temp_url_response1.url

                        }

                    }
                    
                    resolve({
                        status: 1,
                        data: students
                    });
                    
                } else {
                    resolve({
                        status: 0,
                        msg: 'No Data Available'
                    });
                }
            }
        });
        });
        
    },

    get_parent_from_cnic: function(req, res) {
        let cnic = req.body.cnic;
        
        let sql_statement = "select parent_id,parent_name from tbl_parents WHERE primary_parent_cnic = ? AND status = 1";
        let query_data = [cnic];
        // call fect_query function to get data from database
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_statement,
            query_data,
        );
    },

    //******************************************************************** */
    // ***** Get Student data by class id and section Function *************/
    //********************************************************************* */

    get_studentsByClassSecId: function(req, res) {
        let class_id = req.params.class_id;
        let section_id = req.params.section_id;
        let year = req.params.running_session;
        let data_required = req.params.data_required;

        var sql_prepare_statement;
        let query_data = [class_id, section_id, year, 1];

        if (data_required == 'all') {
            sql_prepare_statement = sql_prepare.sql_getStdByClassSecId;
        } else {
            sql_prepare_statement = sql_prepare.sql_getStdReqData;
        }
        // call fect_query function to get data from database
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_data
        );
    },

    //********************************************************************* */
    // ******************** Get Single Student data Function *****************/
    //********************************************************************* */

    get_singleStudentFun: function(req, res) {
        let student_id = req.params.student_id;
        let year = req.params.running_session;

        let sql_prepare_statement = sql_prepare.sql_getSingleStdData;
        let query_data = [student_id, year, 1];

        // call fect_query function to get data from database
        con.query(sql_prepare_statement, query_data, async (err, result) => {
            if (err) {
                res.json({
                    msg: 'Msql error :' + err,
                    status: 402
                });
            } else {
                if (result.length >= 1) {

                    if(result[0].image_path!='' && result[0].image_path!=null){
                            
                        let temp_url_response = await ovh_functions.create_ovh_temp_url(result[0].image_path);
                        result[0].image_path = temp_url_response.url
                        
                        let temp_url_response1 = await ovh_functions.create_ovh_temp_url(result[0].thumb_path);
                        result[0].thumb_path = temp_url_response1.url

                    }

                    res.json({
                        status: 1,
                        data: result
                    });
                } else {
                    res.json({
                        status: 0,
                        msg: 'No Data Available'
                    });
                }
            }
        });
    },

    parent_info_from_studentFun: function(req, res) {
        let student_id = req.params.student_id;

        let sql_prepare_statement = sql_prepare.sql_get_parent_from_student_id;
        let query_data = [student_id];

        // call fect_query function to get data from database
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_data
        );
    },

    //********************************************************************* */
    // ******************** Get Student exam result Function *****************/
    //********************************************************************* */

    get_stdExamResultFun: function(req, res) {
        let exam_id = req.params.exam_id;
        let student_id = req.params.student_id;
        let year = req.params.running_session;

        let sql_prepare_statement = sql_prepare.sql_getStdExamMarks;
        let query_data = [exam_id, student_id, year];

        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_data
        );
    },

    //********************************************************************* */
    // ******************** Get Student all exam result Function *****************/
    //********************************************************************* */

    get_stdAllExamResultFun: function(req, res) {
        let student_id = req.params.student_id;
        let year = req.params.running_session;

        let sql_prepare_statement = sql_prepare.sql_getStdAllExamMarks;
        let query_data = [student_id, year];
        res.json(query_data);

        // let query = sql_prepare.run_fetch_query(req, res, con, sql_prepare_statement, query_data);
    },

    //********************************************************************* */
    // ***************** Update Student Personal data Function *************/
    //********************************************************************* */

    update_studentInfoFun: function(req, res) {
        let student_id = req.params.std_id;

        let updateStdInfo = {
            std_address_1: req.body.std_address_1,
            std_address_2: req.body.std_address_2,
            std_dob: req.body.std_dob,
            std_religion: req.body.std_religion,
            std_email: req.body.std_email,
            std_gender: req.body.std_gender,
            std_name: req.body.std_name,
            std_phonenum: req.body.std_phonenum,
            emergency_number:req.body.emergency_number,
            std_bformnum: req.body.std_bformnum,
            std_prevSchool: req.body.std_prevSchool,
            leaving_reason: req.body.std_leavingReason,

            std_transport: req.body.std_transport,
            std_hostel: req.body.std_hostel,
            blood_group: req.body.blood_group,
            comments:req.body.comments,

            medical_problem:req.body.medical_problem,
            disability_problem:req.body.disability_problem,

        };

        let sql_prepare_statement = sql_prepare.sql_updateStdPerData;
        let query_data = [updateStdInfo, student_id, 1];

        // call update_query function to update data in database

        let query = sql_prepare.run_update_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_data
        );
    },

    //********************************************************************* */
    // ***************** Update Student educational data Function *************/
    //********************************************************************* */

    update_studentEduInfoFun: function(req, res) {
        let student_id = req.params.std_id;
        let enroll_id = req.body.enroll_id;

        let updateStdEduInfo = {
            section_id: req.body.std_sectionId
        };

        let sql_prepare_statement = sql_prepare.sql_updateStdEduData;
        let query_data = [updateStdEduInfo, student_id, enroll_id];

        // call update_query function to update data in database

        let query = sql_prepare.run_update_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_data
        );
    },

    //********************************************************************* */
    // ***************** delete Student Function ****************************/
    //********************************************************************* */

    delete_studentFun: function(req, res) {
        let student_id = req.params.std_id;
        let deleteStatus = {
            status: 0
        };

        let sql = 'Update tbl_students SET ? WHERE std_id = ?';
        let query = con.query(
            sql_prepare.sql_deleteStudent, [deleteStatus, student_id],
            (err, result) => {
                if (err) {
                    res.json({
                        status: 0,
                        msg: 'Error on update' + err
                    });
                } else {
                    let query2 = con.query(
                        sql_prepare.sql_delStudEnroll, [deleteStatus, student_id],
                        (err, result) => {
                            if (err) {
                                res.json({
                                    status: 0,
                                    msg: 'Error on update' + err
                                });
                            } else {
                                res.json({
                                    status: 1,
                                    msg: 'Deleted Successfully'
                                });
                            }
                        }
                    );
                }
            }
        );
    },

    //********************************************************************* */
    // ********** get student info for promotion ****************************/
    //********************************************************************* */

    get_std_promotionInfoF: function(req, res) {
        let class_id = req.params.class_id;
        let year = req.params.current_session;
        let next_session = req.params.next_session;

        let sql_prepare_statement = sql_prepare.sql_getStdInfoForPromotion;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement, [class_id, year]
        );
    },

    //********************************************************************* */
    // ********** new enrollment after promote to next session  ***************/
    //********************************************************************* */

    check_isEnrolled: function(req, res) {
        return new Promise(function(resolve, reject) {
            let student_id = req.body.student_id;
            let year = req.body.year;

            con.query(
                sql_prepare.sql_check_isStdAlreadyEnrolled, [student_id, year, 1],
                (err, result) => {
                    if (err) {
                        resolve('Database Error : ' + err);
                    } else {
                        if (result[0].enroll_exist >= 1) {
                            let resp = {
                                status: 1,
                                msg: 'available'
                            };
                            resolve(resp);
                        } else {
                            let resp = {
                                status: 0,
                                msg: 'not available'
                            };
                            resolve(resp);
                        }
                    }
                }
            );
        });
    },

    //********************************************************************* */
    // ******************** Enroll Student in next session ******************/
    //********************************************************************* */

    add_newStdEnrollmentFun: function(req, res) {
        let enroll_studentData = {
            student_id: req.body.student_id,
            year: req.body.year,
            class_id: req.body.class_id,
            section_id: req.body.section_id,
            roll_num: req.body.roll_num,
            enroll_date: req.body.enroll_date
        };

        let sql_prepare_statement = sql_prepare.sql_enrollStudent;
        let query_data = enroll_studentData;

        // call fect_query function to get data from database
        let query = sql_prepare.run_add_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_data
        );
    },

    //********************************************************************* */
    // *************** Enroll Student in next session in bulk******************/
    //********************************************************************* */

    bulk_std_promotion: function(req, res) {
        let enroll_date = req.body.enroll_date;
        let class_id = req.body.next_class_id;
        let section_id = req.body.next_section_id;
        let year = req.body.next_session;
        let count = 0;
        let enroll_count = 0;

        let student_data_array = req.body.student_data_array;

        // loop through the student bulk promotion

        async.forEachOf(
            student_data_array,
            function(data, key, callback) {
                // It will be executed one by one

                if ('promotion' in student_data_array[key]) {
                    // check whether user mark any status or not

                    let roll_num = student_data_array[key].roll_num;
                    let student_id = student_data_array[key].student_id;

                    // count attendance whether already marked or not

                    let query = con.query(
                        sql_prepare.sql_check_isStdAlreadyEnrolled, [student_id, year, 1],
                        (err, result) => {
                            if (err) {
                                console.log('fail to check student already promoted' + err);
                                callback();
                            } else {
                                console.log("1");
                                if (result[0].enroll_exist) {
                                    // if student is enrolled already

                                    enroll_count++;
                                    callback();
                                } else {
                                    // if student is not enrolled already
                                    let enroll_studentData = {
                                        student_id: student_data_array[key].student_id,
                                        year: year,
                                        class_id: class_id,
                                        section_id: section_id,
                                        roll_num: roll_num,
                                        enroll_date: enroll_date
                                    };

                                    let sql_prepare_statement = sql_prepare.sql_enrollStudent;
                                    let query_data = enroll_studentData;

                                    let query = con.query(
                                        sql_prepare_statement,
                                        query_data,
                                        (err, result) => {
                                            if (err) {
                                                console.log('Insert student attendance error : ' + err);
                                                callback(err);
                                            }
                                        }
                                    );
                                    callback();
                                }
                            }
                        }
                    );
                } else {
                    count++;
                    callback();
                }
            },
            function(err, result) {
                if (err) {
                    res.json({
                        status: 402,
                        msg: 'Mysql error,  bulk promotion ' + err // send db error
                    });
                } else {
                    res.json({
                        status: 1,
                        msg: 'Successfully promoted',
                        count: count,
                        enroll_count: enroll_count
                    });
                }
            }
        );
    },

	//**************************************************************************/
	//*********************GET LIST Of studern for fee discount*****************/
	//**************************************************************************/
 //******************************************************************** */
    // ***** Get Student data by class id and section Function *************/
    //********************************************************************* */

    get_studentsListByClassSecId: function(req, res) {
        let year = req.body.running_session;
		
        let query_data;
		
        if (parseInt(req.body.section_id) == 0) {
			query_data = [req.body.class_id, year, 1];
            sql_prepare_statement = sql_prepare.get_Std_By_ClassId;
			
        } else {
			query_data = [req.body.class_id, req.body.section_id, year, 1];	
            sql_prepare_statement = sql_prepare.get_Std_By_sectionId;
        }
		//console.log(parseInt(req.body.section_id));		

        // call fect_query function to get data from database
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_data
        );
    },
	get_DiscountByClassSecId: function(req,res){
		let class_id = req.body.class_id;
        let year = req.body.year;
		 
        let sql_prepare_statement = sql_prepare.get_std_dis_by_ClassId;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement, [class_id, year]
        );
    }
};

