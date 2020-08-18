var async = require("async");
const sql_prepare = require("../prepare");
var jwt = require("jsonwebtoken");
const con = require("../db_connection");
var md5 = require("md5");
const constants = require("../constants");
const funcs = require("../functions");
const ovh_functions = require("../ovh_functions");
const schoolinfo = require('../schoolinfo');
var moment = require('moment');

//jwt_data Readme
//Note If you ever got into suspense that how jwt_data is in body where client is not sending it
//then see middlewares.jwt_auth method 

module.exports = {

    //apps send resource name and API returns the actual resource

    async get_ovh_resource(req,res){
        let resource_name = req.params.resource_name
        let url = await ovh_functions.create_ovh_temp_url(resource_name)
        
        res.redirect(url.url)

    },

    //Teacher functions start from here
    
    edit_class_diary(req,res){
        let user_info = req.body.jwt_data;
        let year = user_info.current_session;
        let employee_id = user_info.employee_id;

        let diary_id = req.body.diary_id;
        let class_id = req.body.class_id;
        let section_id = req.body.section_id;   
        let subject_id = req.body.subject_id;
        let diary_text = req.body.diary_text;

        let diary_topic = null;
        if(req.body.hasOwnProperty('diary_topic') && req.body.diary_topic!=''){
            diary_topic = req.body.diary_topic
        }

        //by default this diary is for today, but if client sends the date then it is for that date
        let diary_date = moment().format("YYYY-MM-DD");
        if(req.body.hasOwnProperty('diary_date') && req.body.diary_date!=''){
            diary_date = parseInt(req.body.diary_date)
        }

        if(diary_id && diary_id!='' && class_id && class_id!='' && section_id && section_id!='' && subject_id && subject_id!='' && diary_text && diary_text!=''){
            
            //lets check that diary already added or not
            let sql_check = "select diary_id from tbl_diary WHERE diary_id!=? &&  class_id=? AND section_id=? AND subject_id=? AND diary_date=? AND year=?"
            let sql_check_data = [diary_id,class_id,section_id,subject_id,diary_date,year]

            con.query(
                sql_check,sql_check_data,
                (error_check, result_check) => {
                    if (error_check) {

                        let error_message = funcs.get_error_message(error);

                        res.json({
                            status:0,
                            msg:'Unable to edit diary',
                            error:error_message
                        })

                    } else {
                        
                        if(result_check.length){
                            //
                            res.json({
                                status:0,
                                msg:'Diary already added'
                            })
                        }
                        else{
                            let sql = "UPDATE tbl_diary SET class_id=?,section_id=?,subject_id=?,diary_date=?,diary_text=?,diary_topic=? WHERE diary_id=?"

                            let sql_data = [class_id,section_id,subject_id,diary_date,diary_text,diary_topic,diary_id]

                            con.query(
                                sql,sql_data,
                                (error, result) => {
                                    if (error) {

                                        let error_message = funcs.get_error_message(error);

                                        res.json({
                                            status:0,
                                            msg:'Unable to edit diary',
                                            error:error_message
                                        })

                                    } else {
                                        
                                        res.json({
                                            status:1,
                                            msg:"Diary editted successfully"
                                        })

                                    }
                                }
                            );
                        }

                    }
                }
            );
        }
        else{
            res.json({
                status:0,
                error:'Required params are missing'
            })
        }

    },
    
    add_class_diary(req,res){
        let user_info = req.body.jwt_data;
        let year = user_info.current_session;
        let employee_id = user_info.employee_id;

        let class_id = req.body.class_id;   
        let section_id = req.body.section_id;   
        let subject_id = req.body.subject_id;
        let diary_text = req.body.diary_text;

        let diary_topic = null;
        if(req.body.hasOwnProperty('diary_topic') && req.body.diary_topic!=''){
            diary_topic = req.body.diary_topic
        }

        //by default this diary is for today, but if client sends the date then it is for that date
        let diary_date = moment().format("YYYY-MM-DD");
        if(req.body.hasOwnProperty('diary_date') && req.body.diary_date!=''){
            diary_date = req.body.diary_date
            diary_date = moment(diary_date*1000).format("YYYY-MM-DD");
        }

        if(class_id && class_id!='' && section_id && section_id!='' && subject_id && subject_id!='' && diary_text && diary_text!=''){
            
            //lets check that diary already added or not
            let sql_check = "select diary_id from tbl_diary WHERE class_id=? AND section_id=? AND subject_id=? AND diary_date=? AND year=?"
            let sql_check_data = [class_id,section_id,subject_id,diary_date,year]

            con.query(
                sql_check,sql_check_data,
                (error_check, result_check) => {
                    if (error_check) {

                        let error_message = funcs.get_error_message(error_check);

                        res.json({
                            status:0,
                            msg:'Unable to add diary',
                            error:error_message,
                            error2:error_check
                        })

                    } else {
                        
                        if(result_check.length){
                            //
                            res.json({
                                status:0,
                                msg:'Diary already added'
                            })
                        }
                        else{
            let sql = "INSERT INTO tbl_diary (class_id,section_id,subject_id,diary_date,year,diary_text,diary_topic) VALUES(?,?,?,?,?,?,?)"

            let sql_data = [class_id,section_id,subject_id,diary_date,year,diary_text,diary_topic]

                            con.query(
                sql,sql_data,
                (error, result) => {
                    if (error) {

                        let error_message = funcs.get_error_message(error);

                        res.json({
                            status:0,
                                            msg:'Unable to add diary',
                            error:error_message
                        })

                    } else {
                        
                        res.json({
                            status:1,
                            msg:"Diary added successfully"
                        })

                    }
                }
            );
        }

                    }
                }
            );
        }
        else{
            res.json({
                status:0,
                error:'Required params are missing'
            })
        }

    },

    update_exam_marks(req,res){
        let user_info = req.body.jwt_data;
        let year = user_info.current_session;

        let class_id = req.body.class_id;
        let section_id = req.body.section_id;
        let exam_id = req.body.exam_id;
        let subject_id = req.body.subject_id;
        let marks_array = req.body.marks_array;
        let total_marks = req.body.total_marks;

        async.forEachOf(marks_array,function(data, key, callback) {

            let student_id = data['student_id'];
            let marks = data['marks'];

            //lets check result is already updated or not

            let sql_check = "SELECT * from tbl_marks WHERE class_id = ? AND section_id = ? AND subject_id = ? AND student_id = ? AND exam_id = ? AND year = ?";
            let sql_check_data = [class_id,section_id,subject_id,student_id,exam_id,year];

            let query = con.query(
                sql_check,sql_check_data,
                (err, result) => {
                    if (err) {
                        callback(err,result);
                    } else {
                        let sql2 = "";
                        let sql2_data = [];
                        if(result.length){
                            //record exists, update it
                            let record_id = result[0].marks_id;
                            sql2 = "UPDATE tbl_marks SET obtained_marks = ? WHERE marks_id = ?";
                            sql2_data = [marks,record_id];

                        }
                        else{
                            //result does not exist, insert it
                            sql2 = "INSERT INTO tbl_marks (student_id,subject_id,class_id,section_id,exam_id,total_marks,obtained_marks,year) VALUES(?,?,?,?,?,?,?,?)";
                            sql2_data = [student_id,subject_id,class_id,section_id,exam_id,total_marks,marks,year];
                        }

                        let query = con.query(
                            sql2,sql2_data,
                            (err, result) => {
                                if (err) {
                                } else {
                                }
                                callback(err,result);
                            }
                        );

                    }
                }
            );

        },function(err,result){
            if (err) {
                res.json({
                    status: 0,
                    msg: "Unable to update results " + err // send db error
                });
            } else {
                res.json({
                    status: 1,
                    msg: "Results updated Successfully"
                });
            }
        });

    },

    get_exam_students_for_result_marking(req,res){
        
        let user_info = req.body.jwt_data;
        let year = user_info.current_session;

        let class_id = req.body.class_id;
        let section_id = req.body.section_id;
        let exam_id = req.body.exam_id;
        let subject_id = req.body.subject_id;
        let subject_type = req.body.subject_type;

        let sql_prepare_statement;
        let query_params;
        if (subject_type == 1) {
            sql_prepare_statement = sql_prepare.sql_getStdMangeExmMarkDetails;
            query_params = [
                exam_id,
                year,
                subject_id,
                exam_id,
                class_id,
                section_id,
                year,
                1
            ];
        } else {
            sql_prepare_statement = sql_prepare.sql_getStdElecSubMangeExmMarkDetails;
            query_params = [
                subject_id,
                exam_id,
                year,
                subject_id,
                exam_id,
                class_id,
                section_id,
                year,
                1,
                subject_id
            ];
        }

        //call function to get exams list
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_params
        );

    },

    get_exams_list(req,res){
        let user_info = req.body.jwt_data;
        let year = user_info.current_session;
        let sql_prepare_statement;

        sql_prepare_statement = sql_prepare.sql_ListExams;
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            year
        );
    },

    update_quiz_marks(req,res){
        let quiz_id = req.body.quiz_id;
        let timestamp = Math.floor(new Date().getTime()/1000);

        let marks_array = req.body.marks_array;
        async.forEachOf(marks_array,function(data, key, callback) {

            let marks = marks_array[key]['marks'];
            let student_id = marks_array[key]['student_id'];

            //lets check whether record already exists ?
            let sql_check = "select quiz_marks_id from tbl_quiz_marks WHERE student_id = ? AND quiz_id = ?";
            let sql_check_data = [student_id,quiz_id];

            let query_check = con.query(
                sql_check,sql_check_data,
                (err, result) => {
                    if (err) {
                        callback(err,result);
                    } else {
                        
                        let sql2 = "";
                        let sql2_data = [];

                        if(result.length){
                            //record already exists, so update existing record
                            sql2 = "UPDATE tbl_quiz_marks SET marked_date = ? , obtained_marks = ? WHERE student_id = ? AND quiz_id = ?";
                            sql2_data = [timestamp,marks,student_id,quiz_id];
                        }
                        else{
                            // record does not exist, so insert new one
                            sql2 = "INSERT INTO tbl_quiz_marks (student_id,quiz_id,obtained_marks,marked_date) VALUES(?,?,?,?)";
                            sql2_data = [student_id,quiz_id,marks,timestamp];
                        }

                        let query = con.query(
                            sql2,sql2_data,
                            (err, result) => {
                                if (err) {
                                } else {
                                }
                                callback(err,result);
                            }
                        );
                    }
                }
            );

            },function(err, result) {
                if (err) {
                    res.json({
                        status: 0,
                        msg: "Unable to update results " + err // send db error
                    });
                } else {
                    res.json({
                        status: 1,
                        msg: "Results updated Successfully"
                    });
                }
            }
        );
    },

    update_assignment_marks(req,res){
        let assign_id = req.body.assign_id;
        let timestamp = Math.floor(new Date().getTime()/1000);

        let marks_array = req.body.marks_array;
        async.forEachOf(marks_array,function(data, key, callback) {

            let marks = marks_array[key]['marks'];
            let student_id = marks_array[key]['student_id'];

            //lets check whether record already exists ?
            let sql_check = "select std_assign_id from tbl_std_assignment WHERE student_id = ? AND assign_id = ?";
            let sql_check_data = [student_id,assign_id];

            let query_check = con.query(
                sql_check,sql_check_data,
                (err, result) => {
                    if (err) {
                        callback(err,result);
                    } else {
                        
                        let sql2 = "";
                        let sql2_data = [];

                        if(result.length){
                            //record already exists, so update existing record
                            sql2 = "UPDATE tbl_std_assignment SET assign_submit_date = ? , obtained_marks = ? WHERE student_id = ? AND assign_id = ?";
                            sql2_data = [timestamp,marks,student_id,assign_id];
                        }
                        else{
                            // record does not exist, so insert new one
                            sql2 = "INSERT INTO tbl_std_assignment (student_id,assign_id,obtained_marks,assign_submit_date) VALUES(?,?,?,?)";
                            sql2_data = [student_id,assign_id,marks,timestamp];
                        }

                        let query = con.query(
                            sql2,sql2_data,
                            (err, result) => {
                                if (err) {
                                } else {
                                }
                                callback(err,result);
                            }
                        );
                    }
                }
            );

        },function(err, result) {
            if (err) {
                res.json({
                    status: 0,
                    msg: "Unable to update results " + err // send db error
                });
            } else {
                res.json({
                    status: 1,
                    msg: "Results updated Successfully"
                });
            }
        }
        );
    },

    get_quiz_students_for_result_marking(req,res){
        
        let user_info = req.body.jwt_data;
        let year = user_info.current_session;

        let quiz_id = req.body.quiz_id;
        let class_id = req.body.class_id;
        let section_id = req.body.section_id;
        let subject_type = req.body.subject_type;
        let subject_id = req.body.subject_id;
        

        let sql_prepare_statement;
        let query_params;
        if (subject_type == 1) {
            sql_prepare_statement = sql_prepare.sql_getStdMangeQuizMarkDetails;
            query_params = [
                quiz_id,
                quiz_id,
                year,
                subject_id,
                class_id,
                section_id,
                year,
                1
            ];
        } else {
            sql_prepare_statement =
                sql_prepare.sql_getStdElecSubMangeQuizMarkDetails;
            query_params = [
                subject_id,
                quiz_id,
                quiz_id,
                year,
                subject_id,
                class_id,
                section_id,
                year,
                1,
                subject_id
            ];
        }

        //call function to get quiz list
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_params
        );
    },
    
    get_assignment_students_for_result_marking(req,res){
        
        let user_info = req.body.jwt_data;
        let year = user_info.current_session;

        let assign_id = req.body.assign_id;
        let class_id = req.body.class_id;
        let section_id = req.body.section_id;
        let subject_type = req.body.subject_type;
        let subject_id = req.body.subject_id;

        let sql_prepare_statement;
        let query_params;
        if (subject_type == 1) {
            
            sql_prepare_statement = sql_prepare.sql_getStdMangeAssignMarkDetails;
            query_params = [
                assign_id,
                assign_id,
                year,
                subject_id,
                class_id,
                section_id,
                year,
                1
            ];
        } else {
            
            sql_prepare_statement =
                sql_prepare.sql_getStdElecSubMangeAssignMarkDetails;
            query_params = [
                subject_id,
                assign_id,
                assign_id,
                year,
                subject_id,
                class_id,
                section_id,
                year,
                1,
                subject_id
            ];
        }

        //call function to get exams list
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_params
        );

    },

    get_assigned_subjects_of_section(req,res){
        let user_info = req.body.jwt_data;
        let year = user_info.current_session;
        let class_id = req.body.class_id;
        let section_id = req.body.section_id;
        let teacher_id = user_info.employee_id;

        let data = [class_id,section_id,teacher_id,year];

        let sql = "select * from tbl_subjects where class_id=? AND section_id=? AND teacher_id=? AND year=? AND status=1";
        let query = con.query(
            sql,data,
            (err, result) => {
                if (err) {
                    res.json({
                        msg: "Failed to get subjects",
                        error:err,
                        status: 0
                    });
                } else {
                    
                    res.json({
                        data:result,
                        msg: 'Success',
                        status: 1
                    });

                }
            }
        );
    },

    view_class_quizes(req,res){
        let user_info = req.body.jwt_data;
        let year = user_info.current_session;

        let class_id = req.body.class_id;
        let section_id = req.body.section_id;
        let subject_id = req.body.subject_id;

        let sql = "select s.subject_name,s.subject_type,q.* from tbl_quizes q JOIN tbl_subjects s on q.subject_id=s.subject_id WHERE q.year="+con.escape(year)+" AND q.class_id="+con.escape(class_id)+" AND q.section_id="+con.escape(section_id)+" AND q.subject_id="+con.escape(subject_id)+" GROUP by q.quiz_id ORDER BY q.quiz_id DESC";

        let query = con.query(
            sql,
            async (err, result) => {
                if (err) {
                    res.json({
                        msg: "Failed to get quizes",
                        error:err,
                        status: 0
                    });
                } else {
                    
                    for(let i=0;i<result.length;i++){

                        let images = await funcs.get_images({source_type:'quiz',source_id:result[i].quiz_id});
                        result[i].images = images

                            }
                            
                    res.json({
                        data:result,
                        msg: 'Success',
                        status: 1
                    });

                }
            }
        );
    },

    view_class_assignments(req,res){
        let user_info = req.body.jwt_data;
        let year = user_info.current_session;

        let class_id = req.body.class_id;
        let section_id = req.body.section_id;
        let subject_id = req.body.subject_id;

        let sql = "select s.subject_name,s.subject_type,a.* from tbl_assignments a JOIN tbl_subjects s on s.subject_id = a.subject_id WHERE a.year="+con.escape(year)+" AND a.class_id="+con.escape(class_id)+" AND a.section_id="+con.escape(section_id)+" AND a.subject_id="+con.escape(subject_id)+" GROUP BY a.assign_id ORDER BY a.assign_id DESC";
        let query = con.query(
            sql,
            async (err, result) => {
                if (err) {
                    res.json({
                        msg: "Failed to get assignments",
                        error:err,
                        status: 0
                    });
                } else {
                    
                    for(let i=0;i<result.length;i++){
                        let images = await funcs.get_images({source_type:'assignment',source_id:result[i].assign_id});
                        result[i].images = images
                            }

                    res.json({
                        data:result,
                        msg: 'Success',
                        status: 1
                    });

                }
            }
        );
    },

    get_user_info_from_jwt(req,res){
        return new Promise(function(resolve, reject) {
        let token = '';
        if(req.headers.hasOwnProperty('jwt')){
            token = req.headers.jwt;
        }
        else{
            token = req.body.jwt;
        }
        jwt.verify(token, "45745c60-7b1a-11e8-9c9c-2d42b21b1a3e", function(err,result) {
            if (err) {
                    resolve({status:0});
            } else {
                // we need data in this jwt, so put it in the body
                    resolve({status:1,jwt_data:result.user_data});
            }
        });
            
        });
    },

    async add_class_quiz(req,res,next){
        
        //this is a form data request, here user data is not appended with request from jwtauth middleware
        let user_info = await this.get_user_info_from_jwt(req,res);
        let jwt_data = user_info.jwt_data;
        let year = jwt_data.current_session;
        
        let class_id = req.body.class_id;
        let section_id = req.body.section_id;
        let subject_id = req.body.subject_id;
        let title = req.body.title;
        let description = req.body.description;

        let timestamp_from_api = req.body.due_date;

        //this timestamp may include time, but we need to save it in form of just date
        //so that we can say that this is attendance for this day
        let current_date_from_api = moment(parseInt(timestamp_from_api)*1000).format("YYYY-MM-DD");

        let due_date = Math.floor(new Date(current_date_from_api).getTime() / 1000)

        let total_marks = req.body.total_marks;
        let images = req.body.images

        let sql_statement = "Insert INTO tbl_quizes (class_id,section_id,subject_id,quiz_title,description,quiz_date,quiz_t_marks,year) VALUES(?,?,?,?,?,?,?,?)";

        let query = con.query(
            sql_statement, [class_id, section_id, subject_id, title,description,due_date,total_marks,year],
            async (err, result) => {
                if (err) {
                    res.json({
                        msg: "Failed to add quiz" + err,
                        status: 0
                    });
                } else {

                    let images_data = {}
                    images_data['source_id'] = result.insertId;
                    images_data['source_type'] = 'quiz';
                    images_data['images'] = images
                    await funcs.add_images(images_data);

                    res.json({
                        inserted_id:result.insertId,
                        msg: 'Quiz added successfully',
                        status: 1
                    });

                }
            }
        );

    },

    async add_class_assignment(req,res,next){
        
        //this is a form data request, here user data is not appended with request from jwtauth middleware
        let user_info = await this.get_user_info_from_jwt(req,res);
        let jwt_data = user_info.jwt_data;
        let year = jwt_data.current_session;
        
        let class_id = req.body.class_id;
        let section_id = req.body.section_id;
        let subject_id = req.body.subject_id;
        let title = req.body.title;
        let description = req.body.description;
        let type = 'assignment';
        
        let timestamp_from_api = req.body.due_date;

        //this timestamp may include time, but we need to save it in form of just date
        //so that we can say that this is attendance for this day
        let current_date_from_api = moment(parseInt(timestamp_from_api)*1000).format("YYYY-MM-DD");

        let due_date = Math.floor(new Date(current_date_from_api).getTime() / 1000)

        let total_marks = req.body.total_marks;
        let images = req.body.images


        let sql_statement = "Insert INTO tbl_assignments (class_id,section_id,subject_id,title,description,type,assign_created_date,assign_due_date,assign_tMarks,year) VALUES(?,?,?,?,?,?,UNIX_TIMESTAMP(),?,?,?)";

        let query = con.query(
            sql_statement, [class_id, section_id, subject_id, title,description,type,due_date,total_marks,year],
            async (err, result) => {
                if (err) {
                    res.json({
                        msg: "Failed to add assignment" + err,
                        status: 0
                    });
                } else {

                    let images_data = {}
                    images_data['source_id'] = result.insertId;
                    images_data['source_type'] = 'assignment';
                    images_data['images'] = images
                    await funcs.add_images(images_data);

                    res.json({
                        inserted_id:result.insertId,
                        msg: 'Assignment added successfully',
                        status: 1
                    });

                }
            }
        );

    },
    
    mark_class_attendance(req,res){
        
        let user_info = req.body.jwt_data;
        let year = user_info.current_session;

        let class_id = req.body.class_id;
        let section_id = req.body.section_id;
        let timestamp_from_api = req.body.timestamp;

        //this timestamp may include time, but we need to save it in form of just date
        //so that we can say that this is attendance for this day
        let current_date_from_api = moment(parseInt(timestamp_from_api)*1000).format("YYYY-MM-DD");

        let current_date_from_api_splitted = current_date_from_api.split("-");

        let date = parseInt(current_date_from_api_splitted[2])
        let month = parseInt(current_date_from_api_splitted[1])

        let timestamp = Math.floor(new Date(current_date_from_api).getTime() / 1000)

        let bulk_attend_array = req.body.bulk_attendance;

        let error_marking_attendance = false

        async.forEachOf(
            bulk_attend_array,
            function(data, key, callback) {
                // It will be executed one by one

                if (bulk_attend_array[key].attend_status =="" || bulk_attend_array[key].attend_status == null) {
                    // check whether user mark any status or not
                    count++;
                    callback();
                } else {
                    // count attendance whether already marked or not

                    let student_id = bulk_attend_array[key].student_id;

                    let query = con.query(
                        sql_prepare.sql_isAttendMarked, [class_id, section_id, student_id, timestamp],
                        (err, result) => {
                            if (err) {
                                callback(err,result);
                            } else {
                                // get attendance status
                                var attend_status = bulk_attend_array[key].attend_status;
                                
                                var late_arrival_min = 0;

                                if(bulk_attend_array[key].hasOwnProperty("late_arrival_min") && bulk_attend_array[key].late_arrival_min!=='' && bulk_attend_array[key].late_arrival_min!==null){
                                    late_arrival_min = bulk_attend_array[key].late_arrival_min;
                                }


                                if (result[0].attendance_count) {
                                    // if atendace is already marked than , update the attendance

                                    let updateAttendanceObj = {
                                        attend_status: attend_status,
                                        date: date,
                                        month: month,
                                        late_arrival_min:late_arrival_min
                                    };

                                    let query2 = con.query(
                                        sql_prepare.sql_updateAttendance, [updateAttendanceObj, class_id, student_id, timestamp],
                                        (err, result) => {
                                            if (err) {
                                                error_marking_attendance = true
                                                return callback(err,result);
                                            }
                                        }
                                    );
                                    callback();
                                } else {
                                    // if student attendance isnt marked on selected timestamp then insert
                                    let dailyAttendanceObj = {
                                        class_id: class_id,
                                        section_id: section_id,
                                        student_id: student_id,
                                        timestamp: timestamp,
                                        date: date,
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
                        msg: "Successfully Marked"
                    });
                }
            }
            }
        );

    },

    get_class_students_for_attendance(req,res){
        let class_id = req.body.class_id;
        let section_id = req.body.section_id;
        let timestamp_from_api = req.body.timestamp;

        //this timestamp may include time, but we need to save it in form of just date
        //so that we can say that this is attendance for this day
        let current_date_from_api = moment(parseInt(timestamp_from_api)*1000).format("YYYY-MM-DD");

        let timestamp = Math.floor(new Date(current_date_from_api).getTime() / 1000)

        let user_info = req.body.jwt_data;

        let year = user_info.current_session;
        
        let query = con.query(
            sql_prepare.sql_getStdAtdDetails, [timestamp, class_id, section_id, year, 1],
            (err, result) => {
                if (err) {
                    res.json({
                        msg: "Failed to get std data" + err,
                        status: 0
                    });
                } else {
                    
                    //replace null values by empty
                    for(let i=0;i<result.length;i++){
                        for(key in result[i]){
                            if(result[i][key] == null ){

                                if(key==="attendance_id" || key==="timestamp" || key==="late_arrival_min"){
                                    result[i][key] = 0;
                                }
                                else{
                                result[i][key] = '';
                            }
                                
                            }
                        }
                    }
                    
                    res.json({
                        data: result,
                        status: 1
                    });

                }
            }
        );
        
    },
    
    get_teacher_default_sections_list: function(req,res){
        let user_info = req.body.jwt_data;
        
        let id = user_info.employee_id;
        let class_id = req.body.class_id;

        let sql = "select * from tbl_section where teacher_id="+con.escape(id)+" AND class_id="+con.escape(class_id)+" AND status=1";
     
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql
        );
        
    },

    //get the sections in which teacher is teaching
    get_teacher_current_sections_list: function(req,res){
        let user_info = req.body.jwt_data;
        let year = user_info.current_session
        let employee_id = user_info.employee_id;
        let class_id = req.body.class_id;        
        
        let sql = "select ss.*,ss.teacher_id as default_teacher_id,e.employee_name as teacher_name,e.employee_id as teacher_id from tbl_section ss JOIN tbl_subjects s ON s.section_id=ss.section_id LEFT JOIN tbl_employees e ON s.teacher_id = e.employee_id WHERE s.class_id="+con.escape(class_id)+" AND s.teacher_id="+con.escape(employee_id)+" AND s.year="+con.escape(year)+" AND s.status=1 GROUP BY s.class_id,s.section_id"
        
        con.query(sql, (err, result) => {
            if (err) {
                res.json({
                    msg: 'Msql error :' + err,
                    status: 402
                });
            } else {
                if (result.length >= 1) {
                    
                    let response_array = []

                    for(let i=0;i<result.length;i++){

                        let single_result = result[i]

                        if(single_result.default_teacher_id==employee_id){
                            single_result['is_default'] = 1
                        }
                        else{
                            single_result['is_default'] = 0
                        }

                        response_array.push(single_result)

                    }

                    res.json({
                        status: 1,
                        data: response_array
                    });
                } else {
                    res.json({
                        status: 1,
                        msg: 'No Data Available'
                    });
                }
            }
        });
        
    },

    //we need to get the subjects which this teacher is teaching
    get_teacher_current_subjects_list:function(req,res){
        let user_info = req.body.jwt_data;
        
        let year = user_info.current_session
        let employee_id = user_info.employee_id

        let class_id = req.body.class_id;
        let section_id = req.body.section_id;

        let sql = "select s.subject_id,s.subject_name from tbl_subjects s WHERE s.class_id="+con.escape(class_id)+" AND s.section_id="+con.escape(section_id)+" AND s.teacher_id="+con.escape(employee_id)+" AND s.year="+con.escape(year)+" AND s.status=1"
        
        let query = con.query(sql, (err, result) => {
            if (err) {
                res.json({
                    error: "Internal server Error",
                    status: 0
                });
            }
            else{
                    res.json({
                        status:1,
                        data:result
                    })
                }
        });

    },

    get_teacher_default_classes_list: function(req,res){
        let user_info = req.body.jwt_data;
        let year = user_info.current_session
        
        let id = user_info.employee_id;

        let sql = "select c.class_name,c.numeric_name as class_numeric_name,s.class_id from tbl_section s JOIN tbl_class c ON s.class_id=c.class_id where s.teacher_id="+con.escape(id)+" AND s.status=1 AND c.status=1 AND c.year="+con.escape(year)+" group by s.class_id ORDER BY c.class_name ASC";
     
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql
        );
        
    },

    get_teacher_current_classes_list: function(req,res){
        let user_info = req.body.jwt_data;
        let year = user_info.current_session
        let id = user_info.employee_id;

        let sql = "select c.class_name,c.numeric_name as class_numeric_name,s.class_id from tbl_subjects s JOIN tbl_class c ON s.class_id=c.class_id where s.teacher_id="+con.escape(id)+" AND s.status=1 AND c.status=1 AND c.year="+con.escape(year)+" AND s.year="+con.escape(year)+" group by s.class_id ORDER BY c.class_name ASC";
     
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql
        );
    },

    get_teacher_default_classes: function(req,res){
        let user_info = req.body.jwt_data;
        let year = user_info.current_session
        
        let id = user_info.employee_id;

        let sql = "select c.class_name,s.* from tbl_section s JOIN tbl_class c ON s.class_id = c.class_id where s.teacher_id="+con.escape(id)+" AND s.status=1 AND c.status=1 AND c.year="+con.escape(year);
     
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql
        );
        
    },
    
    get_teacher_schedule: function(req,res){
        let user_info = req.body.jwt_data;
        
        let id = user_info.employee_id;
        let current_session = user_info.current_session;

        let sql_statement = 'Select s.*,c.class_name,ss.section_name from tbl_subjects s JOIN tbl_class c on s.class_id=c.class_id JOIN tbl_section ss on ss.section_id=s.section_id Where s.status=1 AND s.teacher_id = ' + con.escape(id)+' AND s.year='+con.escape(current_session);
        
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_statement
        );
        
    },

    teacher_login : async function (req,res){
        let user_name = req.body.user_name;
        let password = req.body.password;

        if (user_name == "" || password == "") {
            res.json({
                status: 405,
                error: "Failed : required username or password is missing"
            });
        }
        else{
            let hashPass = md5(password);
            let sql = "select * from tbl_employees WHERE (user_name="+con.escape(user_name)+" OR phone_num="+con.escape(user_name)+") AND password="+con.escape(hashPass)+" AND status=1 AND role_xref_id=1";
            
            let query = con.query(sql, async (err, result) => {
                if (err) {
                    res.json({
                        error: "Mysql Error" + err,
                        status: 402
                    });
                }
                else{
                    if(result.length){
                        //credentials correct

                        //lets get current session
                        let current_session = await funcs.get_active_session();

                        var user_data = {};
                        user_data['employee_id'] = result[0].employee_id
                        user_data['email'] = result[0].email;
                        user_data['user_name'] = result[0].user_name;
                        user_data['image_path'] = result[0].image_path;
                        user_data['current_session'] = current_session;

                        jwt.sign({
                            user_data
                        },
                        "45745c60-7b1a-11e8-9c9c-2d42b21b1a3e",
                            function(err, token) {
                                if (err) {
                                    res.json({
                                    error: "jwt generating error" + err,
                                        status: 0
                                    });
                                } else {
                                    
                                    let data = {};
                                    
                                    data['jwt'] = token
                                    data['current_session'] = current_session;

                                    let teacher_info = result[0];

                                    for(key in teacher_info){
                                        if(teacher_info[key] == null ){
                                            teacher_info[key] = '';
                                        }
                                    }

                                    data['teacher_info'] = teacher_info;

                                    let s3_info = schoolinfo
                                    data['s3_info'] = s3_info

                                    res.json({
                                        msg: "Successfully logged in",
                                        status: 1,
                                        data:data,
                                    });
                                }
                            }
                        );

                    }
                    else{
                        res.json({
                            error: "Invalid username or password",
                            status: 0
                        });
                    }
                }
            });
        }
    },

    //Teacher functions end here

    add_suggestions(req,res){
        let user_info = req.body.jwt_data;
        var current_session = user_info.current_session;
        var user_id = user_info.user_id

        let suggestion_text = req.body.suggestion_text
        let user_type = req.body.user_type

        let input_data = {
            'user_type':user_type,
            'suggestion_text':suggestion_text,
            'user_id':user_id
};

        let sql = "INSERT INTO tbl_suggestions SET ?";
        
        var query = con.query(sql,input_data,function(err,result){
            if(err){
                console.log(err)
                res.json({
                    status: 0,
                    error: "Failed to add suggestion"
                });
            }
            else{
                res.json({
                    status: 1,
                    msg: "Suggestion added successfully"
                });
            }
        });

        
    },

    async get_diary(req,res,params){

        let sql = ""

        if(params.multiple_days){
            //we have to return diaries for weeks say, last constants.DIARY_DAYS_TO_FETCH days if last record id is empty (means it is page 1), then previous constants.DIARY_DAYS_TO_FETCH days for page 2 and so on
            let days_to_fetch = constants.DIARY_DAYS_TO_FETCH
        
        let last_check = ''
            if(params.date && params.date!=""){
                last_check = "AND d.diary_date<"+con.escape(params.date);
        }

            sql = "select GROUP_CONCAT(d.section_id SEPARATOR '___separator___') as section_ids,GROUP_CONCAT(d.class_id SEPARATOR '___separator___') as class_ids,GROUP_CONCAT(diary_id SEPARATOR '___separator___') as diary_ids,GROUP_CONCAT(IFNULL(d.diary_topic,'') SEPARATOR '___separator___') as diary_topics,GROUP_CONCAT(s.subject_name SEPARATOR '___separator___') as subject_names,d.diary_date,GROUP_CONCAT(d.subject_id SEPARATOR '___separator___') as subject_ids,GROUP_CONCAT(d.diary_text SEPARATOR '___separator___') as diary_texts from tbl_diary d JOIN tbl_subjects s ON d.subject_id=s.subject_id WHERE d.class_id="+params.class_id+" AND d.section_id="+params.section_id+" "+last_check+" AND d.year='"+params.year+"' GROUP BY d.diary_date ORDER BY d.diary_date DESC LIMIT "+days_to_fetch

        }
        else{
            sql = "select GROUP_CONCAT(d.section_id SEPARATOR '___separator___') as section_ids,GROUP_CONCAT(d.class_id SEPARATOR '___separator___') as class_ids,GROUP_CONCAT(diary_id SEPARATOR '___separator___') as diary_ids,GROUP_CONCAT(IFNULL(d.diary_topic,'') SEPARATOR '___separator___') as diary_topics,GROUP_CONCAT(s.subject_name SEPARATOR '___separator___') as subject_names,d.diary_date,GROUP_CONCAT(d.subject_id SEPARATOR '___separator___') as subject_ids,GROUP_CONCAT(d.diary_text SEPARATOR '___separator___') as diary_texts from tbl_diary d JOIN tbl_subjects s ON d.subject_id=s.subject_id WHERE d.class_id="+params.class_id+" AND d.section_id="+con.escape(params.section_id)+" AND d.diary_date="+con.escape(params.date)+" AND d.year='"+params.year+"' GROUP BY d.diary_date ORDER BY d.diary_date DESC"
        }

            let query = con.query(sql,function(err,result){
                if(err){

                    let error = funcs.get_error_message(err)

                    res.json({status:0,error:error,msg:'Could not get diary',data:{}})
                }
                else{
                    
                    if(result.length){
                        
                        let diaries = [];

                        async.forEachOf(result,function(data,key,callback){
                            
                            let inner_array = {};

                            let date_formatted = moment(data['diary_date']).format("YYYY-MM-DD");
                            
                            inner_array['date'] = date_formatted
                            let diary_texts = data['diary_texts']
                            let subject_ids = data['subject_ids']
                        let class_ids = data['class_ids']
                        let section_ids = data['section_ids']
                            let subject_names = data['subject_names']
                            let diary_topics = data['diary_topics']
                        let diary_ids = data['diary_ids']

                            let diary_texts_array = diary_texts.split("___separator___")
                            let diary_topics_array = diary_topics.split("___separator___")
                        let diary_ids_array = diary_ids.split("___separator___")
                            let subjects_ids_array = subject_ids.split("___separator___")
                        let class_ids_array = class_ids.split("___separator___")
                        let section_ids_array = section_ids.split("___separator___")
                            let subjects_names_array = subject_names.split("___separator___")

                            let diary = []
                            async.forEachOf(subjects_ids_array,function(subject_id,iteration,callback2){

                                let inner_array2 = {};
                                inner_array2['subject_id'] = subject_id
                            inner_array2['class_id'] = class_ids_array[iteration]
                            inner_array2['section_id'] = section_ids_array[iteration]
                            
                                inner_array2['subject_name'] = subjects_names_array[iteration]

                                inner_array2['diary'] = diary_texts_array[iteration]
                                inner_array2['diary_topic'] = diary_topics_array[iteration]
                            inner_array2['diary_id'] = diary_ids_array[iteration]

                                diary.push(inner_array2)
                                
                                callback2()

                            },function(){
                                //this will be called when this foreach ends
                                inner_array['diary'] = diary
                            })

                            diaries.push(inner_array)

                            callback()

                        },function(){
                            //for each done
                            res.json({status:1,data:diaries,msg:'Diaries loaded successfully'})
                        })

                    }
                    else{
                    res.json({status:1,msg:'No diaries added',data:[]})
                    }

                }
            }); 
    },

    //Parents functions start from here

    async get_child_diary(req,res){
        let user_info = req.body.jwt_data;
        var year = user_info.current_session;
        let student_id = req.body.student_id;
        let last_diary_date = req.body.last_diary_date
        
        let enroll_fetch_data = {student_id:student_id,session:year}
        //lets get class and section of this student
        let student_details = await this.get_student_enroll_information(enroll_fetch_data);
        
        if(student_details.status==0){
            res.json({
                status: 0,
                msg: "Failed to get diary"
            });
        }
        else if(student_details.status==1 && student_details.data.length==0){
            res.json({
                status: 0,
                msg: "No enroll information found for the student"
            });
        }
        else{

            //we have got student enroll info
            let enroll_info = student_details.data
            
            let class_id = enroll_info.class_id
            let section_id = enroll_info.section_id

            let data = {
                class_id:class_id,
                section_id:section_id,
                date:last_diary_date,
                year:year,
                multiple_days:true
            }

            await this.get_diary(req,res,data)

        }
    },
    
    //Teacher + Admin diary listing API

    //in case of admin, multiple_days should be false

    async get_class_diary(req,res){
        let user_info = req.body.jwt_data;
        var year = user_info.current_session;
        let class_id = req.body.class_id
        let section_id = req.body.section_id
        let date = parseInt(req.body.date);
        let diary_date = moment(date*1000).format("YYYY-MM-DD");

        let multiple_days = true;
        if(req.body.hasOwnProperty('multiple_days')){
            multiple_days = req.body.multiple_days
        }

        let data = {
            class_id:class_id,
            section_id:section_id,
            date:diary_date,
            year:year,
            multiple_days:multiple_days
        }

        await this.get_diary(req,res,data)

    },

    async get_subject_data(subject_id){
        return new Promise(function(resolve,reject){
            let sql = "select subject_name from tbl_subjects where subject_id = "+subject_id
            let query = con.query(sql,function(err,result){
                if(err){
                    resolve({status:0,data:{}})
                }
                else{
                    
                    if(result.length){
                        resolve({status:1,data:result[0]})
                    }
                    else{
                        resolve({status:1,data:{}})
                    }

                }
            }); 
        });
    },

    async get_student_enroll_information(data){
        return new Promise(function(resolve,reject){

            let sql = "select * from tbl_enroll where status = 1 AND student_id = "+con.escape(data['student_id']+" AND year = "+con.escape(data['session']));

            let query = con.query(sql,function(err,result){
                if(err){
                    resolve({status:0,data:{}})
                }
                else{
                    
                    if(result.length){
                        resolve({status:1,data:result[0]})
                    }
                    else{
                        resolve({status:1,data:{}})
                    }

                }
            }); 
        })
    },

    get_child_details(req,res){
        let user_info = req.body.jwt_data;

        var current_session = user_info.current_session;
        let student_id = req.body.student_id;
        let sql = "select s.*,e.class_id,e.section_id,ss.section_name,cc.class_name from tbl_students s LEFT JOIN tbl_enroll e on s.std_id=e.student_id AND e.year="+con.escape(current_session)+" LEFT JOIN tbl_section ss on e.section_id=ss.section_id LEFT JOIN tbl_class cc on e.class_id=cc.class_id WHERE s.std_id="+con.escape(student_id)+" AND s.status=1";

        //we need to get students of this parent
        let query = con.query(sql,async function(err,result){
            if(err){
                res.json({
                    status: 0,
                    msg: "Failed : to get children"
                });
            }
            else{

                if(result[0].image_path && result[0].image_path!=''){
                    let temp_url_response = await ovh_functions.create_ovh_temp_url(result[0].image_path);
                    result[0].image_path = temp_url_response.url
                }

                if(result[0].thumb_path && result[0].thumb_path!=''){
                    let temp_url_response = await ovh_functions.create_ovh_temp_url(result[0].thumb_path);
                    result[0].thumb_path = temp_url_response.url
                }

                for (const key in result[0]) {
                    
                    if(result[0][key]==null){
                        result[0][key] = '';
                    }
                }

                res.json({
                    status: 1,
                    msg: "Child details fetched successfully",
                    data:result
                });
            }
        });

    },

    get_list_of_children(req,res){
        let user_info = req.body.jwt_data;

        var current_session = user_info.current_session;
        var parent_id = user_info.user_id;

        let sql = "select s.std_id,s.std_name,e.class_id,e.section_id,ss.section_name,cc.class_name from tbl_students s LEFT JOIN tbl_enroll e on s.std_id=e.student_id AND e.year="+con.escape(current_session)+" LEFT JOIN tbl_section ss on e.section_id=ss.section_id LEFT JOIN tbl_class cc on e.class_id=cc.class_id WHERE s.std_parentId="+con.escape(parent_id)+" AND s.status=1";

        //we need to get students of this parent
        let query = con.query(sql,function(err,result){
            if(err){
                res.json({
                    status: 0,
                    msg: "Failed : to get children"
                });
            }
            else{
                res.json({
                    status: 1,
                    msg: "Children list fetched successfully",
                    data:result
                });
            }
        });
        
    },

//********************************************************************* */
// ******************** Parents Login check Function **********************/
//********************************************************************* */

    loginCheck_Fun(req, res){
            let username = req.body.user_name;
            let password = req.body.user_password;

            if (username == "" || password == "") {
                res.json({
                    status: 405,
                    error: "Failed : required username or password is missing"
                });
            } else {
                let hashPass = md5(password);
                let sql =
                "Select parent_id , parent_name , parent_email ,parent_userName , public_key , private_key from tbl_parents WHERE parent_userName = ? AND status = ? AND parent_password = " +
                    con.escape(hashPass);
            let query = con.query(sql, [username, 1], async (err, result) => {
                    if (err) {
                        res.json({
                            error: "Mysql Error" + err,
                            status: 402
                        });
                    } else {
                    if (result.length) {
                            // if username and password correct

                            //update auth tocken against user
                            let private_key = result[0].private_key;
                            let public_key = result[0].public_key;
                            let user_name = result[0].parent_userName;
                            let user_id = result[0].parent_id;
                            let name = result[0].parent_name;
                            let user_email = result[0].parent_email;

                        //lets get current session
                        let current_session = await funcs.get_active_session();

                            var user_data = {
                                user_id: user_id,
                                user_name: user_name,
                            user_email: user_email,
                            current_session:current_session
                            };
                            let query = con.query(
                                sql_prepare.sql_getStdDetails, [user_id, 1, "2018-2019"],
                                (err, result3) => {
                                    if (err) {
                                        res.json({
                                            error: "Mysql Error" + err,
                                            status: 402
                                        });
                                    } else {
                                        // generate jwt  for parent info
                                        jwt.sign({
                                                user_data
                                            },
                                        "45745c60-7b1a-11e8-9c9c-2d42b21b1a3e",
                                            function(err, token) {
                                                if (err) {
                                                    res.json({
                                                    error: "jwt generating error" + err,
                                                        status: 0
                                                    });
                                                } else {
                                                    user_data.jwt = token;
                                                user_data['current_session'] = current_session;
                                                    res.json({
                                                        msg: "Successfully logged in",
                                                        status: 1,

                                                        user_info: user_data,
                                                        student_info: result3
                                                    });
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        } else {
                            // if username and password wrong
                            res.json({
                                error: "Invalid username or password",
                                status: 0
                            });
                        }
                    }
                });
            }
    },

//********************************************************************* */
// ****************** Get Single student attendance report data ***********/
//********************************************************************* */

    get_studAttendReportP(req, res){
    let student_id = req.body.student_id;
    let attendStartDate = req.body.attendStartDate;
    let attendEndDate = req.body.attendEndDate;

    let query = con.query(
        sql_prepare.sql_getStdAttendance, [
            student_id,
            attendStartDate,
            attendEndDate,
            student_id,
            attendStartDate,
            attendEndDate,
            "A",
            student_id,
            attendStartDate,
            attendEndDate,
            "P"
        ],
        (err, result) => {
            if (err) {
                res.json({
                    status: 402,
                    error: "Mysql Error : " + err
                });
            } else {
                if (result.length >= 1) {
                    let resp = {};
                    resp.attendance = result[0];
                    // resp.total = (attendEndDate - attendStartDate) / 86400;
                    resp.absent = result[1][0].absent;
                    resp.present = result[2][0].present;

                    res.json({
                        status: 1,
                        data: resp
                    });
                } else {
                    res.json({
                        status: 1,
                        data: result,
                        msg: "no data found"
                    });
                }
            }
        }
    );
    },

//********************************************************************* */
// ******************** Get Announcements   *****************************/
//********************************************************************* */

    get_announcemntsF(req, res){
    let c_id = req.body.class_id;
    let forall = 999;
    let current_timestamp = req.body.current_timestamp;
    let all_stud = "%" + forall + "%";
    let class_id = "%" + c_id + "%";
    let query = con.query(
        sql_prepare.sql_getAnnouncements, [current_timestamp, 1, all_stud, class_id],
        (err, result) => {
            if (err) {
                res.json({
                    status: 402,
                    error: "Mysql error " + err
                });
            } else {
                if (result.length >= 1) {
                    res.json({
                        status: 1,
                        data: result
                    });
                } else {
                    res.json({
                        status: 1,
                        msg: "No Announcements",
                        data: result
                    });
                }
            }
        }
    );
    },

//********************************************************************* */
// ******************** Get Fee Invoice   *****************************/
//********************************************************************* */

    get_feeInvoiceF(req, res){
    let student_id = req.body.student_id;

    let query = con.query(
        sql_prepare.sql_getFeeInvoice, [student_id],
        (err, result) => {
            if (err) {
                res.json({
                    status: 402,
                    error: "Mysql error " + err
                });
            } else {
                if (result.length >= 1) {
                    // var totalReamingAmount = 0; // Variable to hold your total

                    // for (var i = 0, len = result.length; i < len; i++) {
                    //     totalReamingAmount += result[i].amount_due;
                    // }

                    // find the maximu due amount

                    var max = Math.max.apply(
                        null,
                        Object.keys(result).map(function(e) {
                            return result[e].amount_due;
                        })
                    );

                    res.json({
                        status: 1,
                        remaining_amount: max,
                        data: result
                    });
                } else {
                    res.json({
                        status: 1,
                        msg: "No Fee Invoice Added",
                        data: result
                    });
                }
            }
        }
    );
    },

//********************************************************************* */
// ******************** Get exam Marks   *****************************/
//********************************************************************* */

    get_examMarksF(req, res){
    let student_id = req.body.student_id;
    let query = con.query(
        sql_prepare.sql_getmarks, [student_id],
        (err, result) => {
            if (err) {
                res.json({
                    status: 402,
                    error: "Mysql error " + err
                });
            } else {
                if (result.length >= 1) {
                    res.json({
                        status: 1,
                        data: result
                    });
                } else {
                    res.json({
                        status: 1,
                        msg: "No Exam Data available",
                        data: result
                    });
                }
            }
        }
    );
    },

//********************************************************************* */
// ******************** Get Subjects against student , class  ***********/
//********************************************************************* */

    get_subjectsF(req, res){
    return new Promise(function(resolve, reject) {
        let class_id = req.body.class_id;
        let section_id = req.body.section_id;
        let student_id = req.body.student_id;
        let year = "2018-2019";
        let query = con.query(
            sql_prepare.sql_getCandElectSubjects, [class_id, section_id, year, student_id, year, year],
            (err, result) => {
                if (err) {
                    msg = "Mysql error fetching subjects" + err;
                    resolve(msg);
                } else {
                    if (result.length >= 1) {
                        let merg_array = result[0].concat(result[1]);

                        let resp = {
                            status: 1,
                            data: merg_array
                        };

                        resolve(resp);
                    } else {
                        let arr = [];
                        let resp = {
                            status: 0,
                            msg: "no data available",
                            data: arr
                        };

                        resolve(resp);
                    }
                }
            }
        );
    });
    },

//******************************************************************** /
// ********* Get Subjects quiz , assignment details by sub id  **********/
//******************************************************************** /

    get_subQuiz_Assign_Details(req, res, subjects_data){
    let student_id = req.body.student_id;
    async.forEachOf(
        subjects_data,
        function(data, key, callback) {
            // It will be executed one by one
            let subject_id = subjects_data[key].subject_id;
            let query = con.query(
                sql_prepare.sql_assign_quizes_against_subj, [student_id, subject_id, student_id, subject_id],
                (err, result) => {
                    if (err) {
                        let resut_resp = err + "Error fatching query";

                            //console.log(resut_resp);
                        callback(err);
                    } else {
                        let merg_quiz_assign = result[0].concat(result[1]);
                        subjects_data[key].details = merg_quiz_assign; // store attendance against each student

                        callback();
                    }
                }
            );
        },
        function(err, results) {
            let resp = {
                status: 1,
                data: subjects_data
            };
            res.json(resp);
        }
    );
    },

//********************************************************************* */
// ******************** Get student total exams  ***********/
//********************************************************************* */

    get_studentExamsF(req, res){
    return new Promise(function(resolve, reject) {
        let student_id = req.body.student_id;

            let user_info = req.body.jwt_data;
            let year = user_info.current_session;

        let query = con.query(
            sql_prepare.sql_getStudentExams, [student_id, year],
            (err, result) => {
                if (err) {
                    error = "Mysql error fetching students exam marks.  " + err;
                    resolve(error);
                } else {
                    if (result.length >= 1) {
                        let resp = {
                            status: 1,
                            data: result
                        };

                        resolve(resp);
                    } else {
                        let arr = [];
                        let resp = {
                            status: 0,
                            msg: "no data available",
                            data: arr
                        };

                        resolve(resp);
                    }
                }
            }
        );
    });
    },

//********************************************************************* */
// ******************** Get Quiz assignments against students ***********/
//********************************************************************* */
    get_quiz_assignmentF(req, res){
    let student_id = req.body.student_id;
    let query = con.query(
        sql_prepare.sql_assign_quizes, [student_id, student_id],
        (err, result) => {
            if (err) {
                res.json({
                    status: 402,
                    error: "Mysql error " + err
                });
            } else {
                if (result.length >= 1) {
                    let merg_array = result[0].concat(result[1]);
                    res.json({
                        status: 1,
                        data: merg_array
                    });
                } else {
                    res.json({
                        status: 1,
                        msg: "No  Data available",
                        data: result
                    });
                }
            }
        }
    );
    },

//********************************************************************* */
// ******************** Get Quiz assignments details ***********/
//********************************************************************* */
    get_quiz_assignment_details(req, res){
    let id = req.body.id;
    let type = req.body.type;

    let sql_assign_quizes_details;

    if (type == "quiz") {
        sql_assign_quizes_details = sql_prepare.sql_quizes_details;
    } else {
        sql_assign_quizes_details = sql_prepare.sql_assign_details;
    }
    let query = con.query(sql_assign_quizes_details, [id, id], (err, result) => {
        if (err) {
            res.json({
                status: 402,
                error: "Mysql error " + err
            });
        } else {
            if (result[0].length >= 1 || result[1].length >= 1) {
                let data1 = result[0][0];
                let data2 = result[1];

                    async.forEachOf(
                        data2,
                        async function(data, key, callback) {
                            let temp_url_response = await ovh_functions.create_ovh_temp_url(data2[key].image_name);
                            data2[key].image_name = temp_url_response.url
                            temp_url_response = await ovh_functions.create_ovh_temp_url(data2[key].thumb);
                            data2[key].thumb = temp_url_response.url
                            callback();

                        },function(){

                // let imageArr = [];
                // // //loop
                // for (i = 0; i < data2.length; i++) {
                //     imageArr.push(data2[i].image_name);
                // }

                // data1.img = imageArr;

                            data1.img = data2;
                res.json({
                    status: 1,
                    data: data1
                });
                    });
                    
            } else {
                let a = [];
                res.json({
                    status: 1,
                    msg: "No  Data available",
                    data: a
                });
            }
        }
    });
    },

//******************************************************************** /
// ****************** get student marks against each exam   **********/
//******************************************************************** /

    get_student_exam_marks(req, res, exam_data){
    let student_id = req.body.student_id;
    let year = "2018-2019";
    async.forEachOf(
        exam_data,
        function(data, key, callback) {
            // It will be executed one by one
            let exam_id = exam_data[key].exam_id;
            let query = con.query(
                sql_prepare.sql_stud_exam_marks, [exam_id, student_id, year],
                (err, result) => {
                    if (err) {
                        let resut_resp = err + "Error fatching query";
                        callback();
                            //console.log(resut_resp);
                    } else {
                        exam_data[key].details = result; // store attendance against each student
                        //   delete exam_data[key].session;
                    }
                    callback();
                }
            );
        },
        function(err, results) {
            let session = exam_data[0].session;
            let resp = {
                status: 1,
                final_result: "combine",
                session: session,
                data: exam_data
            };
            res.json(resp);
        }
    );
    },

//********************************************************************* */
// ******************** Get one Subjects against student , class  ***********/
//********************************************************************* */

    get_OnesubjectsF(req, res) {
    return new Promise(function(resolve, reject) {
        let class_id = req.body.class_id;
        let section_id = req.body.section_id;
        let student_id = req.body.student_id;
        let subject_id = req.body.subject_id;
        let year = "2018-2019";
        let query = con.query(
            sql_prepare.sql_getONECandElectSubjects, [year, subject_id, student_id, year, year, subject_id],
            (err, result) => {
                if (err) {
                    msg = "Mysql error fetching subjects" + err;
                    resolve(msg);
                } else {
                    if (result.length >= 1) {
                        let merg_array = result[0].concat(result[1]);

                        let resp = {
                            status: 1,
                            data: merg_array
                        };

                        resolve(resp);
                    } else {
                        let arr = [];
                        let resp = {
                            status: 0,
                            msg: "no data available",
                            data: arr
                        };

                        resolve(resp);
                    }
                }
            }
        );
    });
    },

};