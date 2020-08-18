var async = require("async");
const sql_prepare = require("../prepare");
const con = require("../db_connection");
var moment = require('moment');

module.exports = {
    //******************************************************************** */
    // ***** Get Student data for mark attendance  **************************/
    //********************************************************************* */
    /**
     *
     * JOIN tables tbl_students , tbl_enroll , tbl_attendance , tbl_class , tbl_section
     * get data of student and attendance to mark attendance
     *
     */
    get_stdForMrkAttendance: function(req, res) {
        let class_id = req.params.class_id;
        let section_id = req.params.section_id;
        let year = req.params.running_session;
        let timestamp = req.params.timestamp;

        let query = con.query(
            sql_prepare.sql_getStdAtdDetails, [timestamp, class_id, section_id, year, 1],
            (err, result) => {
                if (err) {
                    res.json({
                        msg: "Failed to get std data" + err,
                        status: 0
                    });
                } else {
                    res.json({
                        data: result,
                        status: 1
                    });
                }
            }
        );
    },

    //********************************************************************* */
    // ******************** Check is attendce marked already *****************/
    //********************************************************************* */

    check_isMarkedAttend: function(req, res) {
        return new Promise(function(resolve, reject) {
            let class_id = req.body.class_id;
            let section_id = req.body.section_id;
            let student_id = req.body.student_id;
            let timestamp = req.body.timestamp;

            let query = con.query(
                sql_prepare.sql_isAttendMarked, [class_id, section_id, student_id, timestamp],
                (err, result) => {
                    if (err) {
                        resolve("fail to count attendance" + err);
                    } else {
                        if (result[0].attendance_count) {
                            let isAttendMark = 1;
                            resolve(isAttendMark);
                        } else {
                            let isAttendMark = 0;
                            resolve(isAttendMark);
                        }
                    }
                }
            );
        });
    },

    //********************************************************************* */
    // ******************** Mark Student Attendance *************************/
    //********************************************************************* */

    mark_attendanceFun: function(req, res) {
        let dailyAttendanceObj = {
            class_id: req.body.class_id,
            section_id: req.body.section_id,
            student_id: req.body.student_id,
            timestamp: req.body.timestamp,
            date: req.body.dayDate,
            month: req.body.month,
            year: req.body.year,

            attend_status: req.body.attend_status
        };

        let query = con.query(
            sql_prepare.sql_markAttendance,
            dailyAttendanceObj,
            (err, result) => {
                if (err) {
                    res.json({
                        msg: "fail to mark Attendence" + err,
                        status: 0
                    });
                } else {
                    res.json({
                        msg: "Attendence Marked",
                        status: 1
                    });
                }
            }
        );
    },

    //********************************************************************* */
    // ******************** Update Student Attendance *************************/
    //********************************************************************* */

    update_attendanceFun: function(req, res) {
        let class_id = req.body.class_id;
        let section_id = req.body.section_id;
        let student_id = req.body.student_id;
        let timestamp = req.body.timestamp;

        let updateAttendanceObj = {
            attend_status: req.body.attend_status,
            date: req.body.dayDate,
            month: req.body.month
        };

        let query2 = con.query(
            sql_prepare.sql_updateAttendance, [updateAttendanceObj, class_id, student_id, timestamp],
            (err, result) => {
                if (err) {
                    res.json({
                        status: 402,
                        msg: "Mysql error " + err
                    });
                } else {
                    res.json({
                        status: 1,
                        msg: "Updated Successfully"
                    });
                }
            }
        );
    },

    //********************************************************************* */
    // ******************** Update Absent Reason *************************/
    //********************************************************************* */

    update_absent_reason: function(req, res) {
        let attendance_id = req.body.attendance_id;
        let comment = {
            comment: req.body.comment
        };

        let sql_prepare_statement = sql_prepare.sql_update_absent_reason;
        let sql_query_params = [comment, attendance_id];

        //call function to assign elective subj  against student
        let query = sql_prepare.run_update_query(
            req,
            res,
            con,
            sql_prepare_statement,
            sql_query_params
        );
    },

    //********************************************************************* */
    // ******************** Mark Attendance in Bulk *************************/
    //********************************************************************* */
    mark_attend_inBulk(req, res) {
        let timestamp = req.body.timestamp;
        let dayDate = req.body.dayDate;
        let month = req.body.month;
        let attend_year = req.body.attend_year;
        let year = req.body.year;
        let count = 0;

        let bulk_attend_array = req.body.bulk_attendance;

        // loop through the student vulk attendance array
        let error_marking_attendance = false

        async.forEachOf(
            bulk_attend_array,
            function(data, key, callback) {
                // It will be executed one by one

                if (bulk_attend_array[key].attend_status == null) {
                    // check whether user mark any status or not
                    count++;
                    callback();
                } else {
                    let class_id = bulk_attend_array[key].class_id;
                    let section_id = bulk_attend_array[key].section_id;
                    let student_id = bulk_attend_array[key].student_id;

                    // count attendance whether already marked or not

                    let query = con.query(
                        sql_prepare.sql_isAttendMarked, [class_id, section_id, student_id, timestamp],
                        (err, result) => {
                            if (err) {
                                callback();
                                console.log("fail to count attendance" + err);
                            } else {
                                // get attendance status
                                var attend_status =
                                    bulk_attend_array[key].attend_status == true ?
                                    "P" :
                                    bulk_attend_array[key].attend_status == false ?
                                    "A" :
                                    bulk_attend_array[key].attend_status == "P" ?
                                    "P" :
                                    "A";

                                var late_arrival_min = 0;
                                if(bulk_attend_array[key].hasOwnProperty("late_arrival_min") && bulk_attend_array[key].late_arrival_min!=='' && bulk_attend_array[key].late_arrival_min!==null){
                                    late_arrival_min = bulk_attend_array[key].late_arrival_min;
                                }

                                if (result[0].attendance_count) {
                                    // if atendace is already marked than , update the attendance

                                    let updateAttendanceObj = {
                                        attend_status: attend_status,
                                        date: dayDate,
                                        month: month,
                                        late_arrival_min:late_arrival_min
                                    };

                                    let query2 = con.query(
                                        sql_prepare.sql_updateAttendance, [updateAttendanceObj, class_id, student_id, timestamp],
                                        (err, result) => {
                                            if (err) {
                                                error_marking_attendance = true
                                                return callback(err);
                                            }
                                        }
                                    );
                                    callback();
                                } else {
                                    // if student attendance isnt marked on selected timestamp then insert
                                    let dailyAttendanceObj = {
                                        class_id: bulk_attend_array[key].class_id,
                                        section_id: bulk_attend_array[key].section_id,
                                        student_id: bulk_attend_array[key].student_id,
                                        timestamp: timestamp,
                                        date: dayDate,
                                        month: month,
                                        year: year,
                                        attend_status: attend_status,
                                        late_arrival_min:late_arrival_min
                                    };

                                    let query = con.query(
                                        sql_prepare.sql_markAttendance,
                                        dailyAttendanceObj,
                                        (err, result) => {
                                            if (err) {
                                                error_marking_attendance = true
                                                console.log("Insert student attendance error : " + err);
                                            }
                                        }
                                    );
                                    callback();
                                }
                            }
                        }
                    );
                }
            },
            function(err, result) {
                if (err) {
                    res.json({
                        status: 402,
                        msg: "Mysql error, mark bulk attendance " + err // send db error
                    });
                } else {

                    if(error_marking_attendance){
                        res.json({
                            status: 0,
                            msg: "Error marking attendance"
                        });
                    }
                    else{
                    res.json({
                        status: 1,
                        msg: "Successfully Marked",
                        count: count
                    });
                }
            }
            }
        );
    },

    //********************************************************************* */
    // ****************** Get student attendance report data ***********/
    //********************************************************************* */

    get_stdAttendReportMonthlyData: function(req,res){
        return new Promise(function(resolve, reject) {
            let class_id = req.params.class_id;
            let section_id = req.params.section_id;
            let student_id = req.params.student_id;
            let attendStartDate = req.params.attendStartDate;
            let attendEndDate = req.params.attendEndDate;
            let year = req.params.running_session;

            let attend_status = "P";

            let sql_statement = 'SELECT tbl_students.std_name , tbl_enroll.* , ' +
            ' tbl_section.section_name, tbl_class.class_name' +
            ' FROM tbl_students INNER JOIN tbl_enroll on tbl_students.std_id = tbl_enroll.student_id' +
            ' LEFT JOIN tbl_section on tbl_enroll.section_id = tbl_section.section_id LEFT JOIN tbl_class' +
            ' ON tbl_enroll.class_id = tbl_class.class_id ';

            let where = [];
            where.push("tbl_enroll.class_id="+con.escape(class_id));
            where.push("tbl_enroll.year="+con.escape(year));
            where.push("tbl_students.status=1");

            if(section_id!="all"){
                where.push("tbl_enroll.section_id="+con.escape(section_id));
            }
            
            if(student_id!="all"){
                where.push("tbl_students.std_id="+con.escape(student_id));
            }

            let where_clause = "WHERE "+where.join(" AND ");
            sql_statement = sql_statement+where_clause;

            let query = con.query(
                sql_statement,
                (err, result) => {
                    if (err) {
                        let resut_resp = err + "Error fatching query";
                        resolve(resut_resp);
                    } else {
                        async.forEachOf(
                            result,
                            function(data, key, callback) {
                                // It will be executed one by one
                                let query = con.query(
                                    sql_prepare.sql_getAttendMonthlyReport, [
                                        class_id,
                                        section_id,
                                        result[key].student_id,
                                        attend_status,
                                        attendEndDate,
                                        attendStartDate
                                    ],
                                    (err, result1) => {
                                        if (err) {
                                            let resut_resp = err + "Error fatching query";
                                            resolve(resut_resp);
                                        } else {
                                            result[key].attendance = result1; // store attendance against each student
                                        }
                                        callback();
                                    }
                                );
                            },
                            function(err, results) {
                                resolve(result); // return the result array.
                            }
                        );
                    }
                }
            );

        });
    },
    
    get_stdAttendReportData: function(req, res) {
        return new Promise(function(resolve, reject) {
            let class_id = req.params.class_id;
            let section_id = req.params.section_id;
            let student_id = req.params.student_id;
            let attendStartDate = req.params.attendStartDate;
            let attendEndDate = req.params.attendEndDate;
            let year = req.params.running_session;

            let attend_status = "P";

            let sql_statement = 'SELECT tbl_students.std_name , tbl_enroll.* , ' +
            ' tbl_section.section_name, tbl_class.class_name' +
            ' FROM tbl_students INNER JOIN tbl_enroll on tbl_students.std_id = tbl_enroll.student_id' +
            ' LEFT JOIN tbl_section on tbl_enroll.section_id = tbl_section.section_id LEFT JOIN tbl_class' +
            ' ON tbl_enroll.class_id = tbl_class.class_id ';    
            
            let where = [];
            where.push("tbl_enroll.class_id="+con.escape(class_id));
            where.push("tbl_enroll.year="+con.escape(year));
            where.push("tbl_students.status=1");

            if(section_id!="all"){
                where.push("tbl_enroll.section_id="+con.escape(section_id));
            }
            
            if(student_id!="all"){
                where.push("tbl_students.std_id="+con.escape(student_id));
            }

            let where_clause = "WHERE "+where.join(" AND ");
            sql_statement = sql_statement+where_clause;

            let query = con.query(
                sql_statement,
                (err, result) => {
                    if (err) {
                        let resut_resp = err + "Error fatching query";
                        resolve(resut_resp);
                    } else {
                        async.forEachOf(
                            result,
                            function(data, key, callback) {
                                // It will be executed one by one

                                let sql_statement_2 = '';
                                let sql_data_2 = '';
                                if(section_id=="all"){
                                    sql_statement_2 = sql_prepare.sql_getAttendReportAllSections;
                                    sql_data_2 = [
                                        class_id,
                                        result[key].student_id,
                                        attendEndDate,
                                        attendStartDate
                                    ];
                                }
                                else{
                                    sql_statement_2 = sql_prepare.sql_getAttendReport;
                                    sql_data_2 = [
                                        class_id,
                                        section_id,
                                        result[key].student_id,
                                        attendEndDate,
                                        attendStartDate
                                    ];
                                }

                                let query = con.query(
                                    sql_statement_2, sql_data_2,
                                    (err, result1) => {
                                        if (err) {
                                            let resut_resp = err + "Error fatching query";
                                            resolve(resut_resp);
                                        } else {
                                            result[key].attendance = result1; // store attendance against each student
                                        }
                                        //callback();
                                    }
                                );
								
                                
                                let sql_statement_3 = '';
                                let sql_data_3 = '';
                                
                                if(section_id=="all"){
                                    sql_statement_3 = sql_prepare.sql_totalAttendanceAllSections;
                                    sql_data_3 = [
                                        class_id,
                                        result[key].student_id,
										attend_status,
                                        attendEndDate,
                                        attendStartDate
                                    ];
                                }
                                else{
                                    sql_statement_3 = sql_prepare.sql_totalAttendance;
                                    sql_data_3 = [
                                        class_id,
                                        section_id,
                                        result[key].student_id,
										attend_status,
                                        attendEndDate,
                                        attendStartDate
                                    ];
                                }

								let query2 = 
								con.query(
                                    sql_statement_3, sql_data_3,
                                    (err, result2) => {
                                        if (err) {
                                            let resut_resp = err + "Error fatching query";
										    resolve(resut_resp);
                                        } else {
                                            result[key].totalattendance = result2[0].totalattendance; // store attendance against each student
                                        }
                                        callback();
                                    }
                                );
								
                            },
                            function(err, results) {
                                resolve(result); // return the result array.
                            }
                        );
                    }
                }
            );
        });
    },

    get_students_of_class_section: function(req,res){
        
        let class_id = req.params.class_id;
        let section_id = req.params.section_id;
        let running_session = req.params.running_session;
        
        let sql = '';
        let sql_data = [];
        if(section_id=="all"){
            sql = sql_prepare.sql_getStdByClassId;
            sql_data = [class_id,running_session,1];
        }
        else{
            sql = sql_prepare.sql_getStdByClassSectionId;
            sql_data = [class_id,section_id,running_session,1];
        }

        let query = con.query(sql,sql_data, (err, result) => {
            if (err) {
                res.json({
                    msg: 'fail to fetch students' + err,
                    status:0
                });
            } else {
                res.json({
                    status: 1,
                    data:result,
                });
    }
        });  
    },

    publish_attendance(req,res){
        let class_id = req.body.class_id;
        let section_id = req.body.section_id;
        let timestamp = req.body.timestamp;
        let running_session = req.body.running_session;

        let where = [];
        
        
        where.push("a.year="+con.escape(running_session));
        where.push("a.timestamp>="+con.escape(timestamp));

        if(class_id && class_id!="all"){
            where.push("a.class_id="+con.escape(class_id));
        }

        if(section_id && section_id!="all"){
            where.push("a.section_id="+con.escape(section_id));
        }

        let where_clause = "WHERE "+where.join(" AND ");

        let sql = "SELECT p.device_token,p.parent_email,p.mother_email,p.guardian_email,p.primary_parent_type,s.std_name,a.attend_status,a.late_arrival from tbl_attendance a JOIN tbl_students s ON a.student_id=s.std_id JOIN tbl_parents p on s.std_parentId=p.parent_id "+where_clause;
        console.log(sql);
        let query = con.query(sql, (err, result) => {
            if (err) {
                res.json({
                    msg: 'fail to fetch students' + err,
                    status:0
                });
            } else {

                res.json({
                    msg: 'Notifications sent successfully',
                    data:result,
                    status:1
                });

            }
        });  

    }

};

