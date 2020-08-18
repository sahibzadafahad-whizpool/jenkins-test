var async = require('async');
const sql_prepare = require('../prepare');
const con = require('../db_connection');
module.exports = {
    fetch_resultSummary: (req, res) => {
        fetch_resultSummaryFun(req, res);
    }
};

//********** Function to get students against class , section , selected session **********/

function findStudents(req, res) {
    return new Promise(resolve => {
        con.query(
            sql_prepare.sql_getClassStudents, [req.body.class_id, req.body.section_id, req.body.session, 1],
            (err, result) => {
                if (err) {
                    resp = {
                        msg: 'Msql error :' + err,
                        status: 402
                    };
                } else {
                    resp = {
                        status: 1,
                        students_info: result
                    };
                }

                resolve(resp);
            }
        );
    });
}


// return total exams aganist class , section , and session

function findTotalExamsAgainstClassSection(session, class_id, section_id) {

    return new Promise(resolve => {

        con.query(sql_prepare.sql_getExamsPerClassSectionSession, [class_id, section_id, session], (err, result) => {

            if (err) {
                resp = {
                    msg: 'Msql error function findTotalExamsAgainstClassSection :' + err,
                    status: 402
                };

            } else {

                resp = {
                    status: 1,
                    exams_data: result
                };
            }
            resolve(resp);
        });

    });
}


// return total quizs aganist class , section , and session and student_id

function findQuizsDetialslAgainstClassSectStdid(session, class_id, section_id, student_id) {

    return new Promise(resolve => {

        con.query(sql_prepare.sql_getQuizsPerClassSecYearStdId, [class_id, section_id, session, student_id], (err, result) => {

            if (err) {
                resp = {
                    msg: 'Msql error function findQuizsDetialslAgainstClassSectStdid :' + err,
                    status: 402
                };

            } else {

                resp = {
                    status: 1,
                    quizs_data: result
                };
            }
            resolve(resp);
        });

    });
}



// return total assignemnts aganist class , section , and session and student_id

function findAssignmentsDetialslAgainstClassSectStdid(session, class_id, section_id, student_id) {

    return new Promise(resolve => {

        con.query(sql_prepare.sql_getAssignmentPerClassSecYearStdId, [class_id, section_id, session, student_id], (err, result) => {

            if (err) {
                resp = {
                    msg: 'Msql error function findAssignmentsDetialslAgainstClassSectStdid :' + err,
                    status: 402
                };

            } else {

                resp = {
                    status: 1,
                    assignment_data: result
                };
            }
            resolve(resp);
        });

    });
}


//****** Function to get student marks against exam  ********************/

function findStudentResultSummary(
    exam_id,
    student_id,
    session,
    class_id,
    section_id
) {
    return new Promise(resolve => {
        con.query(
            sql_prepare.sql_getStdSubjectsExamMarks, [exam_id, student_id, class_id, section_id],
            (err, result) => {
                if (err) {
                    resp = {
                        msg: 'Msql error :' + err,
                        status: 402
                    };
                } else {
                    resp = {
                        status: 1,
                        result_summary: result
                    };
                }

                resolve(resp);
            }
        );
    });
}

//******** Student exam result summary   **/

async function fetch_resultSummaryFun(req, res) {
    try {

    const resultSummaryResp = await findStudents(req, res);

    if (resultSummaryResp.status != 1) {
        res.json({
            status: 402,
            msg: 'Server error : ' + resultSummaryResp.msg
        });
    } else {
        if (resultSummaryResp.students_info.length > 0) {

                if (req.body.result_type == 'exam') {

            // get all results against student exam

                    // get exams per section class and get all exams against each class section against student
            for (let i = 0; i < resultSummaryResp.students_info.length; i++) {
                const student_id = resultSummaryResp.students_info[i].std_id;
                        const total_exams = await findTotalExamsAgainstClassSection(req.body.session, req.body.class_id, req.body.section_id);

                        if (total_exams.status == 1) {

                            resultSummaryResp.students_info[i].exams = total_exams.exams_data;

                            for (let j = 0; j < total_exams.exams_data.length; j++) {
                const student_result_summary_resp = await findStudentResultSummary(
                                    total_exams.exams_data[j].exam_id,
                    student_id,
                    req.body.session,
                    req.body.class_id,
                    req.body.section_id
                );


                                resultSummaryResp.students_info[i].exams[j].student_info = student_result_summary_resp.result_summary;

                }

                        } else {
                            res.json({
                                status: 402,
                                msg: 'Server error : ' + total_exams.msg
                            });
            }


                    }



                } else if (req.body.result_type == 'quiz') {


                    // get quizs per section class and get all quizs against each class section against student
                    for (let i = 0; i < resultSummaryResp.students_info.length; i++) {
                        const student_id = resultSummaryResp.students_info[i].std_id;
                        const total_quizs_Info = await findQuizsDetialslAgainstClassSectStdid(req.body.session, req.body.class_id, req.body.section_id, student_id);

                        if (total_quizs_Info.status == 1) {

                            resultSummaryResp.students_info[i].quiz_results_info = total_quizs_Info.quizs_data;

                        } else {
                            res.json({
                                status: 402,
                                msg: 'Server error : ' + total_quizs_Info.msg
                            });
                        }


                    }


                } else {

                    // get assignment per section class and get all quizs against each class section against student
                    for (let i = 0; i < resultSummaryResp.students_info.length; i++) {
                        const student_id = resultSummaryResp.students_info[i].std_id;
                        const total_assignment_Info = await findAssignmentsDetialslAgainstClassSectStdid(req.body.session, req.body.class_id, req.body.section_id, student_id);
                        if (total_assignment_Info.status == 1) {

                            resultSummaryResp.students_info[i].assignment_results_info = total_assignment_Info.assignment_data;

                        } else {
                            res.json({
                                status: 402,
                                msg: 'Server error : ' + total_assignment_Info.msg
                            });
                        }


                    }

                }


            res.json({
                status: 1,
                data: resultSummaryResp.students_info
            });

        } else {
            res.json({
                status: 2,
                msg: 'No Student Available'
            });
        }


    }

    } catch (error) {
        console.error(error);
        res.json({
            status: 402,
            msg: 'Server error' + error
        });
    }

}