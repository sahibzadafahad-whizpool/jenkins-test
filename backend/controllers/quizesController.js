var async = require('async');
const sql_prepare = require('../prepare');
const con = require('../db_connection');
module.exports = {
    //********************************************************************* */
    // ********************* Add Quiz function  ***********************/
    //********************************************************************* */

    add_quizes_details(req, res) {
        let add_quiz_data = {
            class_id: req.body.class_id,
            section_id: req.body.section_id,
            subject_id: req.body.subject_id,
            quiz_title: req.body.title,
            description: req.body.description,
            quiz_date: req.body.quiz_date,
            quiz_t_marks: req.body.quiz_t_marks,
            year: req.body.year
        };

        let sql_prepare_statement = sql_prepare.sql_add_newQuiz;

        //call function to insert data into db
        let query = sql_prepare.run_add_query(
            req,
            res,
            con,
            sql_prepare_statement,
            add_quiz_data
        );
    },

    //********************************************************************* */
    // ********************* Get Quiz Details  ***********************/
    //********************************************************************* */

    get_quizes_details: function(req, res) {
        let query_paramas = [
            req.body.running_session,
            req.body.class_id,
            req.body.subject_id,
            req.body.section_id
        ];

        let sql_prepare_statement = sql_prepare.sql_get_quiz_details;
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
    // ********************* Get students quiz Details  ***********************/
    //********************************************************************* */

    get_stdquizes_marks: function(req, res) {
        let class_id = req.body.class_id;
        let section_id = req.body.section_id;
        let subject_id = req.body.subject_id;
        let subject_type = req.body.subject_type;
        let year = req.body.running_session;
        let quiz_id = req.body.quiz_id;

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

    //********************************************************************* */
    // ****** Check is quiz  marks added against student  already ********/
    //********************************************************************* */

    check_isMarkedQuizMarks: function(req, res) {
        return new Promise(function(resolve, reject) {
            let student_id = req.body.student_id;
            let quiz_id = req.body.quiz_id;

            let query = con.query(
                sql_prepare.sql_isMarkedQuizMarks, [student_id, quiz_id],
                (err, result) => {
                    if (err) {
                        resolve('Database Error :' + err);
                    } else {
                        if (result[0].quizMarks_count >= 1) {
                            let isQuizMark = {
                                status: 1,
                                std_quiz_id: result[0].quiz_marks_id
                            };
                            resolve(isQuizMark);
                        } else {
                            let isQuizMark = {
                                status: 0
                            };
                            resolve(isQuizMark);
                        }
                    }
                }
            );
        });
    },

    //********************************************************************* */
    // ************************* Update Student Quiz Marks ***************/
    //********************************************************************* */

    update_quizMarksFun(req, res, quiz_marks_id) {
        let update_data = {
            obtained_marks: req.body.obtained_marks,
            marked_date: req.body.marked_date
        };
        let sql_prepare_statement = sql_prepare.sql_updateQuizMarks;
        let sql_query_params = [update_data, quiz_marks_id];

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

    mark_quizMarksFun(req, res) {
        let add_data = {
            student_id: req.body.student_id,
            obtained_marks: req.body.obtained_marks,
            marked_date: req.body.marked_date,
            quiz_id: req.body.quiz_id

        };

        let sql_prepare_statement = sql_prepare.sql_addQuizMarks;

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