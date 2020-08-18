var async = require('async');
const sql_prepare = require('../prepare');
const con = require('../db_connection');
module.exports = {
    //********************************************************************* */
    // ************************** Add new exam  *****************************/
    //********************************************************************* */

    add_examFun: function(req, res) {
        let exams = req.body.exams;
        sql_addExam = 'INSERT INTO tbl_exams SET ?';
        for (let i = 0; i < exams.length; i++) {
            let exam_data = {
                exam_name: exams[i],
                exam_date: req.body.exam_date,
                exam_comment: req.body.exam_comment,
                //exam_tmarks: req.body.exam_tmarks,
                year: req.body.running_session,
                exam_type: '',
                status: 1,
                grading_method: req.body.grading_method
            };
            con.query(sql_addExam, exam_data);
        }

        res.json({
            msg: 'Added Successfully',
            status: 1
        });
    },

    //********************************************************************* */
    // ************************** Get  exam List  ***************************/
    //********************************************************************* */

    get_examListFun: function(req, res) {
        let year = req.params.running_session;
        let sql_prepare_statement;

        sql_prepare_statement = sql_prepare.sql_ListExams;
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            year
        );

        //call function to get exams list
    },

    //********************************************************************* */
    // ************************** Get  single exam List  *********************/
    //********************************************************************* */

    get_singleExamListFun: function(req, res) {
        let exam_id = req.params.exam_id;
        let sql_prepare_statement = sql_prepare.sql_listSingleExams;

        //call function to get exams list
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            exam_id
        );
    },

    //********************************************************************* */
    // ************************** Delete  exam   ****************************/
    //********************************************************************* */

    delete_examFun: function(req, res) {
        let exam_id = req.params.exam_id;

        let sql_prepare_statement = sql_prepare.sql_deleteExam;

        //call function to delete exam
        let query = sql_prepare.run_delete_query(
            req,
            res,
            con,
            sql_prepare_statement,
            exam_id
        );
    },

    //********************************************************************* */
    // ************************** Update  exam data   ***********************/
    //********************************************************************* */

    update_examFun: function(req, res) {
        let exam_id = req.params.exam_id;
        let exam_UpdateData = {
            exam_name: req.body.exam_name,
            exam_comment: req.body.exam_comment,
            exam_date: req.body.exam_date,
            exam_tmarks: req.body.exam_tmarks
        };

        let sql_prepare_statement = sql_prepare.sql_updateExam;
        let sql_query_params = [exam_UpdateData, exam_id];

        //call function to update exam data
        let query = sql_prepare.run_update_query(
            req,
            res,
            con,
            sql_prepare_statement,
            sql_query_params
        );
    },

    //********************************************************************* */
    // **************** get students to manage marks   **********************/
    //********************************************************************* */

    get_stdForMngMarksFun: function(req, res) {
        let year = req.params.running_session;
        let class_id = req.params.class_id;
        let section_id = req.params.section_id;
        let exam_id = req.params.exam_id;
        let subject_id = req.params.subject_id;
        let subject_type = req.params.subject_type;

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

    //********************************************************************* */
    // ******************** Check is marks added against subje  already *****************/
    //********************************************************************* */

    check_isMarkedExmMarks: function(req, res) {
        return new Promise(function(resolve, reject) {
            let class_id = req.body.class_id;
            let section_id = req.body.section_id;
            let student_id = req.body.student_id;
            let obtained_marks = req.body.obtained_marks;
            let subject_id = req.body.subject_id;
            let exam_id = req.body.exam_id;
            let year = req.body.running_session;

            let query = con.query(
                sql_prepare.sql_isMarkedExamMarks, [class_id, section_id, student_id, exam_id, subject_id, year],
                (err, result) => {
                    if (err) {
                        resolve('Database Error :' + err);
                    } else {
                        if (result[0].examMarks_count >= 1) {
                            let isAttendMark = {
                                status: 1,
                                marks_id: result[0].marks_id
                            };
                            resolve(isAttendMark);
                        } else {
                            let isAttendMark = {
                                status: 0
                            };
                            resolve(isAttendMark);
                        }
                    }
                }
            );
        });
    },

    //********************************************************************* */
    // ******************************** Update Exam MArks********************/
    //********************************************************************* */

    update_examMarksFun(req, res, marks_id) {
        let data = {
            obtained_marks: req.body.obtained_marks,
            total_marks: req.body.total_marks
        };

        let sql_prepare_statement = sql_prepare.sql_updateExamMarks;
        let sql_query_params = [data, marks_id];

        //call function to assign elective subj  against student
        let query = sql_prepare.run_examMarks_update_query(
            req,
            res,
            con,
            sql_prepare_statement,
            sql_query_params,
            marks_id
        );
    },

    //********************************************************************* */
    // ******************************** Add Exam MArks********************/
    //********************************************************************* */

    mark_examMarksFun(req, res) {
        let exam_marks_details = {
            class_id: req.body.class_id,
            section_id: req.body.section_id,
            student_id: req.body.student_id,

            obtained_marks: req.body.obtained_marks,
            subject_id: req.body.subject_id,
            exam_id: req.body.exam_id,
            year: req.body.running_session,
            total_marks: req.body.total_marks,
            marks_type: req.body.exam_type
        };

        let sql_prepare_statement = sql_prepare.sql_addExamMarks;

        //call function to assign elective subj  against student
        let query = sql_prepare.run_add_query(
            req,
            res,
            con,
            sql_prepare_statement,
            exam_marks_details
        );
    }
};