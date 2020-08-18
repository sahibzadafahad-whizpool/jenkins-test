var async = require("async");
const sql_prepare = require("../prepare");
const con = require("../db_connection");
module.exports = {
    //********************************************************************* */
    // ********************* Add assignment function  ***********************/
    //********************************************************************* */

    add_assignmentF(req, res) {
        let add_assignment_data = {
            class_id: req.body.class_id,
            section_id: req.body.section_id,
            subject_id: req.body.subject_id,
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            assign_created_date: req.body.assign_created_date,
            assign_due_date: req.body.assign_due_date,
            assign_tMarks: req.body.assign_tMarks,
            year: req.body.year
        };

        let sql_prepare_statement = sql_prepare.sql_add_newAssignment;

        //call function to insert data into db
        let query = sql_prepare.run_add_query(
            req,
            res,
            con,
            sql_prepare_statement,
            add_assignment_data
        );
    },

    //********************************************************************* */
    // ********************* Get assignment Details  ***********************/
    //********************************************************************* */

    get_assignment_details: function(req, res) {
        let query_paramas = [
            req.body.running_session,
            req.body.class_id,
            req.body.subject_id,
            req.body.section_id
        ];

        let sql_prepare_statement = sql_prepare.sql_get_assignment_details;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_paramas
        );
    },

    //********************************************************************* */
    // ********************* Get students assignment Details  ***********************/
    //********************************************************************* */

    get_Stud_assignment_details: function(req, res) {
        let class_id = req.body.class_id;
        let section_id = req.body.section_id;
        let subject_id = req.body.subject_id;
        let subject_type = req.body.subject_type;
        let year = req.body.running_session;
        let assign_id = req.body.assign_id;

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

    //********************************************************************* */
    // ****** Check is assignment  marks added against subje  already ********/
    //********************************************************************* */

    check_isMarkedAssignMarks: function(req, res) {
        return new Promise(function(resolve, reject) {
            let student_id = req.body.student_id;
            let assign_id = req.body.assign_id;

            let query = con.query(
                sql_prepare.sql_isMarkedAssignMarks, [student_id, assign_id],
                (err, result) => {
                    if (err) {
                        console.log("Database Error :" + err);
                    } else {
                        if (result[0].assignMarks_count >= 1) {
                            let isAttendMark = {
                                status: 1,
                                std_assign_id: result[0].std_assign_id
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
    // ************************* Update Assignment Marks ***************/
    //********************************************************************* */

    update_assignMarksFun(req, res, std_assign_id) {
        let update_data = {
            obtained_marks: req.body.obtained_marks,

            comments: req.body.comments,
            assign_submit_date: req.body.assign_submit_date
        };
        let sql_prepare_statement = sql_prepare.sql_updateAssignmentMarks;
        let sql_query_params = [update_data, std_assign_id];

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
    // ************************* Insert Assignment Marks ***************/
    //********************************************************************* */

    mark_assignMarksFun(req, res) {
        let add_data = {
            student_id: req.body.student_id,
            obtained_marks: req.body.obtained_marks,
            marked: req.body.marked,
            comments: req.body.comments,
            assign_submit_date: req.body.assign_submit_date,
            assign_id: req.body.assign_id
        };

        let sql_prepare_statement = sql_prepare.sql_addAssignmentMarks;

        //call function to insert data into db
        let query = sql_prepare.run_add_query(
            req,
            res,
            con,
            sql_prepare_statement,
            add_data
        );
    }
};