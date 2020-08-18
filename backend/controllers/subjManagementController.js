var async = require("async");
const sql_prepare = require("../prepare");
const con = require("../db_connection");
module.exports = {
    //********************************************************************* */
    // ******************** get Elective subjects Data by Class ID ********************/
    //********************************************************************* */

    get_eSubjectFun: function(req, res) {
        let sql =
            "SELECT tbl_subjects.* , tbl_employees.employee_name as teacher_name , tbl_section.section_name, tbl_class.class_name" +
            " FROM tbl_subjects INNER JOIN tbl_employees on tbl_subjects.teacher_id = tbl_employees.employee_id" +
            " LEFT JOIN tbl_section on tbl_subjects.section_id = tbl_section.section_id LEFT JOIN tbl_class " +
            " ON tbl_subjects.class_id = tbl_class.class_id " +
            " WHERE tbl_employees.role_xref_id=1 AND tbl_subjects.class_id=? AND tbl_subjects.year=? AND tbl_subjects.status= ? AND subject_type =?";

        let query = con.query(
            sql, [req.params.class_id, req.params.running_session, 1, 2],
            (err, result) => {
                if (err) {
                    res.json({
                        msg: "fail to get class data" + err
                    });
                } else {
                    res.json(result);
                }
            }
        );
    },

    //********************************************************************* */
    // ******************** get Core subjects Data by Class ID ********************/
    //********************************************************************* */

    get_cSubjectFun: function(req, res) {
        let sql =
            "SELECT tbl_subjects.* , tbl_employees.employee_name as teacher_name , tbl_section.section_name, tbl_class.class_name" +
            " FROM tbl_subjects INNER JOIN tbl_employees on tbl_subjects.teacher_id = tbl_employees.employee_id " +
            " LEFT JOIN tbl_section on tbl_subjects.section_id = tbl_section.section_id LEFT JOIN tbl_class" +
            " ON tbl_subjects.class_id = tbl_class.class_id" +
            " WHERE tbl_employees.role_xref_id=1 AND tbl_subjects.class_id= ?" +
            " AND tbl_subjects.year=? AND tbl_subjects.status= ? AND subject_type =?";

        let query = con.query(
            sql, [req.params.class_id, req.params.running_session, 1, 1],
            (err, result) => {
                if (err) {
                    res.json({
                        msg: "fail to get class data" + err
                    });
                } else {
                    res.json(result);
                }
            }
        );
    },

    //********************************************************************* */
    // ******** get Core subjects Data by Class and section ID ***************/
    //********************************************************************* */

    get_cSubjectByClassSec: function(req, res) {
        // let s_type;
        // if (req.params.subjects_type == "c") {
        //     s_type = 1;
        // } else {
        //     s_type = 2;

        // }
        let sql_prepare_statement = sql_prepare.sql_getCsubjByclassSecId;
        let query_data = [
            req.params.class_id,
            req.params.section_id,
            req.params.running_session,
            1
        ];

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
    // **** get Single Subject Data by Class ID , Section ID , subject ID ***/
    //********************************************************************* */

    get_singleSubjectFun: function(req, res) {
        let sql =
            "SELECT tbl_subjects.* , tbl_employees.employee_name as teacher_name , tbl_section.section_name, tbl_class.class_name" +
            " FROM tbl_subjects INNER JOIN tbl_employees on tbl_subjects.teacher_id = tbl_employees.employee_id" +
            " LEFT JOIN tbl_section on tbl_subjects.section_id = tbl_section.section_id LEFT JOIN tbl_class" +
            " ON tbl_subjects.class_id = tbl_class.class_id" +
            " WHERE tbl_subjects.class_id= ? AND tbl_subjects.section_id = ? AND tbl_subjects.subject_id=? " +
            " AND tbl_subjects.year=? AND tbl_subjects.status= ? ";

        let query = con.query(
            sql, [
                req.params.class_id,
                req.params.section_id,
                req.params.subject_id,
                req.params.running_session,
                1
            ],
            (err, result) => {
                if (err) {
                    res.json({
                        msg: "fail to get class data" + err
                    });
                } else {
                    res.json(result);
                }
            }
        );
    },

    //********************************************************************* */
    // ****************** get student elective subjects  ********************/
    //********************************************************************* */
    stdElectiveSubjFun: function(req, res) {
        let student_id = req.params.student_id;
        let year = req.params.running_session;

        let sql_prepare_statement = sql_prepare.sql_getStdElectiveSubj;
        let query_data = [student_id, year, 1];

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
    // ****************** get class , section elective subjects  ************/
    //********************************************************************* */

    classSecElectiveSubjFun: function(req, res) {
        let class_id = req.params.class_id;
        let section_id = req.params.section_id;
        let year = req.params.running_session;

        let sql_prepare_statement = sql_prepare.sql_getClassSecElecSubj;
        let query_data = [class_id, section_id, year, 1, 2];

        //call function to get data from database
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_data
        );
    },

    //********************************************************************* */
    // ******** Check elective subject is assigned to student  ***************/
    //********************************************************************* */

    check_elecSubAddedFun: function(req, res) {
        subject_id = req.body.subject_id;
        student_id = req.body.student_id;
        year = req.body.running_session;

        let sql_prepare_statement = sql_prepare.sql_checkElecSubj;
        let query_data = [student_id, subject_id, year, 1];

        //call function to check elective subj added against student
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_data
        );
    },

    //********************************************************************* */
    // ***************** Assign Elective Subject to student ******************/
    //********************************************************************* */

    assign_electiveSubjFun: function(req, res) {
        let electSubj_info = {
            subject_id: req.body.subject_id,
            student_id: req.body.student_id,
            year: req.body.running_session,
            status: 1
        };

        let sql_prepare_statement = sql_prepare.sql_assignElecSubj;

        //call function to assign elective subj  against student
        let query = sql_prepare.run_add_query(
            req,
            res,
            con,
            sql_prepare_statement,
            electSubj_info
        );
    },

    //********************************************************************* */
    // ***************** Delete Student Elective Subject  ******************/
    //********************************************************************* */

    delete_stdElectiveSubjFun: function(req, res) {
        let electiveSub_id = req.params.elective_subId;
        let sql_prepare_statement = sql_prepare.sql_deleteStdElecSubj;

        //call function to delete
        let query = sql_prepare.run_add_query(
            req,
            res,
            con,
            sql_prepare_statement,
            electiveSub_id
        );
    },

    //********************************************************************* */
    // ******************** Add Subject data ********************************/
    //********************************************************************* */

    add_subjectFun: function(req, res) {
        let subjectDetails = {
            subject_name: req.body.subject_name,
            class_id: req.body.class_id,
            section_id: req.body.section_id,
            teacher_id: req.body.teacher_id,
            subject_type: req.body.subject_type,
            year: req.body.year
        };

        let sql = "INSERT INTO tbl_subjects SET ?";
        let query = con.query(sql, subjectDetails, (err, result) => {
            if (err) {
                res.json({
                    status: 402,
                    msg: "Mysql error" + err
                });
            } else {
                res.json({
                    status: 1,
                    msg: "subject added successfully"
                });
            }
        });
    },

    //********************************************************************* */
    // ******** Check subject is already added against class ***************/
    //********************************************************************* */

    check_subjectFun: function(req, res) {
        let class_id = req.body.class_id;
        let section_id = req.body.section_id;
        let subject_name = req.body.subject_name;
        let year = req.body.running_session;
        let sql =
            "Select COUNT(*) AS subject_present from tbl_subjects Where class_id = ? AND section_id =? AND subject_name = ? AND status = ? AND year = ?";
        let query = con.query(
            sql, [class_id, section_id, subject_name, 1, year],
            (err, result) => {
                if (err) {
                    res.json({
                        msg: "fail to get class data" + err
                    });
                } else {
                    res.json(result);
                }
            }
        );
    },

    //********************************************************************* */
    // ****************** update subject details ***************************/
    //********************************************************************* */

    update_subjectFun: function(req, res) {
        let section_id = req.params.section_id;
        let class_id = req.params.class_id;
        let subject_id = req.params.subject_id;
        let subjectUpdateData = {
            teacher_id: req.body.teacher_id,
            subject_type: req.body.subject_type,
            subject_name: req.body.subject_name
        };

        let sql =
            "Update tbl_subjects SET ? WHERE class_id = ? AND section_id = ? AND subject_id =? ";
        let query = con.query(
            sql, [subjectUpdateData, class_id, section_id, subject_id],
            (err, result) => {
                if (err) {
                    res.json({
                        status: 402,
                        msg: "Mysqli error :" + err
                    });
                } else {
                    res.json({
                        status: 1,
                        msg: "Updated successfully"
                    });
                }
            }
        );
    },

    //********************************************************************* */
    // ****************** delete subjects details ***************************/
    //********************************************************************* */

    delete_subjectFun: function(req, res) {
        let section_id = req.params.section_id;
        let class_id = req.params.class_id;
        let subject_id = req.params.subject_id;
        let deleteStatus = {
            status: req.body.status
        };

        let sql =
            "Update tbl_subjects SET ? WHERE class_id = ? AND section_id = ? AND subject_id =? ";
        let query = con.query(
            sql, [deleteStatus, class_id, section_id, subject_id],
            (err, result) => {
                if (err) {
                    res.json({
                        msg: "fail to update Subject" + err
                    });
                } else {
                    res.json({
                        msg: "Deleted  successfully"
                    });
                }
            }
        );
    }
};