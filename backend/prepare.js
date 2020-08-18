module.exports = {
    //*********************************Fetch data from db ******************************* */

    run_fetch_query: function(req, res, con, sql_prepare_statement, query_data) {
        con.query(sql_prepare_statement, query_data, (err, result) => {
            if (err) {
                res.json({
                    msg: 'Msql error :' + err,
                    status: 402
                });
            } else {
                if (result.length >= 1) {
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
	 
	//*********************************update data in db function v2 ******************************* */
	run_update_query_v2: function(req, res, con, sql_prepare_statement, query_data) {
        con.query(sql_prepare_statement, query_data, (err, result) => {});
    },
 //*********************************Add data in db function ******************************* */

    run_add_query_v2: function(req, res, con, sql_prepare_statement, query_data) {
        con.query(sql_prepare_statement, query_data, (err, result) => {});
    },
    //*********************************update data in db function ******************************* */

    run_update_query: function(req, res, con, sql_prepare_statement, query_data) {
        con.query(sql_prepare_statement, query_data, (err, result) => {
            if (err) {
                res.json({
                    msg: 'Msql error :' + err,
                    status: 402
                });
            } else {
                res.json({
                    msg: 'Updated Successfully',
                    status: 1
                });
            }
        });
    },

    //*********************************update quiz data in db function ******************************* */

    run_examMarks_update_query: function(
        req,
        res,
        con,
        sql_prepare_statement,
        query_data,
        marks_id
    ) {
        con.query(sql_prepare_statement, query_data, (err, result) => {
            if (err) {
                res.json({
                    msg: 'Msql error :' + err,
                    status: 402
                });
            } else {
                res.json({
                    msg: 'Updated Successfully',
                    status: 1,
                    inserted_id: marks_id
                });
            }
        });
    },

    //*********************************Add data in db function ******************************* */

    run_add_query: function(req, res, con, sql_prepare_statement, query_data) {
        con.query(sql_prepare_statement, query_data, (err, result) => {
            if (err) {
                res.json({
                    msg: 'Msql error :' + err,
                    status: 402
                });
            } else {
                res.json({
                    msg: 'Added Successfully',
                    status: 1,
                    inserted_id: result.insertId
                });
            }
        });
    },
	
    //*********************************Delete data in db function ******************************* */

    run_delete_query: function(req, res, con, sql_prepare_statement, query_data) {
        con.query(sql_prepare_statement, query_data, (err, result) => {
            if (err) {
                res.json({
                    msg: 'Msql error :' + err,
                    status: 402
                });
            } else {
                res.json({
                    msg: 'Deleted Successfully',
                    status: 1
                });
            }
        });
    },

    //*********************************Check Unique On Update******************************* */

    run_uniqueOnUpdate_query: function(
        req,
        res,
        con,
        sql_prepare_statement,
        query_data,
        notificationVar
    ) {
        con.query(sql_prepare_statement, query_data, (err, result) => {
            if (err) {
                res.json({
                    msg: 'Msql error :' + err,
                    status: 402
                });
            } else {
                if (result[0].count_data >= 1) {
                    res.json({
                        status: 1,
                        notificationVar: notificationVar
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

    //***************************** constants ************** */
    //**  get this value from db later  */
    // running_session: '2018-2019',

    //********************************************************************************************** */
    // *************************** SQL prepare statements for Common Methods   **********************/
    //********************************************************************* *************************/

    // ********** checkuser parent username already added **************//

    sql_checkPUserNameAdded: 'Select COUNT(*) as userName_present FROM tbl_parents WHERE parent_userName = ? and status = ? ',

    // ********** checkuser parent username already added **************//
    sql_checkEUserNameAdded: 'Select COUNT(*) as userName_present FROM tbl_employees WHERE role_xref_id = ? AND user_name = ? and status = ? ',
    sql_checkTUserNameAdded: 'Select COUNT(*) as userName_present FROM tbl_teachers WHERE user_name = ? and status = ? ',

    sql_checkSUserNameAdded: 'Select COUNT(*) as userName_present FROM tbl_students WHERE std_username = ? and status = ? ',

    // ********** checkuser parent unique cnic **************//
    sql_checkParent_cnic_unique: 'Select COUNT(*) as parent_cnic_count from tbl_parents WHERE parent_cnic = ? and status = ? ',

    // ********** checkuser teacher unique cnic **************//
    sql_checkTeacher_cnic_unique: "Select COUNT(*) as teacher_cnic_count from tbl_employees WHERE employee_cnic = ? and status = ? AND role_xref_id=1",
    sql_checkStaff_cnic_unique: "Select COUNT(*) as teacher_cnic_count from tbl_employees WHERE employee_cnic = ? and status = ? AND role_xref_id=2",

    // ********** checkuser parent phone num unique **************//

    sql_checkParent_phone_unique: ' Select COUNT(*) as parent_phone_count from tbl_parents WHERE parent_phoneNum = ? and status = ? ',

    // ********** check teacher phone num unique **************//

    sql_checkTeacher_phone_unique: " Select COUNT(*) as teacher_phone_count from tbl_employees WHERE phone_num = ? and status = ?  AND role_xref_id=1",
    sql_checkStaff_phone_unique: " Select COUNT(*) as teacher_phone_count from tbl_employees WHERE phone_num = ? and status = ? AND role_xref_id=2",

    // ********** checkuser parent email num unique **************//

    sql_checkParent_email_unique: ' Select COUNT(*) as parent_email_count from tbl_parents WHERE parent_email = ? and status = ?  ',

    // ********** checkuser parent email num unique **************//

    sql_checkTeacher_email_unique: " Select COUNT(*) as teacher_email_count from tbl_employees WHERE email = ? and status = ? AND role_xref_id=1",
    sql_checkStaff_email_unique: " Select COUNT(*) as teacher_email_count from tbl_employees WHERE email = ? and status = ? AND role_xref_id=2",

    //************** */parents

    // ********** checkuser parent email  unique on update **************//
    sql_p_emailUniqueCheckOnUpdate: 'SELECT COUNT(*) as count_data FROM tbl_parents WHERE status = ? AND parent_email != ? AND parent_email = ?',

    // ********** checkuser parent phone  unique on update **************//
    sql_p_phoneUniqueCheckOnUpdate: 'SELECT COUNT(*) as count_data FROM tbl_parents WHERE status = ? AND parent_phoneNum != ? AND parent_phoneNum = ?',

    // ********** checkuser parent cnic   unique on update **************//
    sql_p_cnicUniqueCheckOnUpdate: 'SELECT COUNT(*) as count_data FROM tbl_parents WHERE status = ? AND parent_cnic != ? AND parent_cnic = ?',

    // ********** checkuser parent username  unique on update **************//
    sql_p_usernameUniqueCheckOnUpdate: 'SELECT COUNT(*) as count_data FROM tbl_parents WHERE status = ? AND parent_userName != ? AND parent_userName = ?',

    //************** */ teachers

    // ********** checkuser parent email  unique on update **************//
    sql_t_emailUniqueCheckOnUpdate: 'SELECT COUNT(*) as count_data FROM tbl_teachers WHERE status = ? AND email != ? AND email = ?',

    // ********** checkuser parent phone  unique on update **************//
    sql_t_phoneUniqueCheckOnUpdate: 'SELECT COUNT(*) as count_data FROM tbl_teachers WHERE status = ? AND phone_num != ? AND phone_num = ?',

    // ********** checkuser parent cnic   unique on update **************//
    sql_t_cnicUniqueCheckOnUpdate: 'SELECT COUNT(*) as count_data FROM tbl_teachers WHERE status = ? AND teacher_cnic != ? AND teacher_cnic = ?',

    // ********************* searching by teacher NIC / phone number  **************

    sql_searchTeacherByNiCPhoneNum: 'SELECT * from tbl_employees WHERE role_xref_id = ? AND status = ? AND (employee_cnic LIKE ? OR phone_num Like ? ) LIMIT 10 ',

    // ********************* searching by Parent  NIC / phone number  **************
    sql_searchParentsByNiCPhoneNum: 'Select parent_id , parent_name , parent_userName , parent_email , ' +
        ' parent_cnic , parent_address , parent_phoneNum , parent_profession  from tbl_parents Where status = ? ' +
        '  AND parent_cnic LIKE ? OR parent_phoneNum LIKE ?  LIMIT 10',

    //********************************************************************************************** */
    // ***************** SQL prepare statements for Login and Auth validation   **********************/
    //********************************************************************* *************************/

    // ********** check private and public keys **************//

    sql_AuthCheck: 'Select  COUNT(*) AS isAuthToken from tbl_parents Where public_key = ? AND status = ? AND private_key = ? ',

    //********************************************************************************************** */
    // ******************** SQL prepare statements for Parent Mobile App APIs   ****************************/
    //********************************************************************* *************************/

    // ********** get exam marks for students *************//

    sql_getmarks: 'SELECT tbl_marks.total_marks, tbl_marks.obtained_marks , tbl_marks.comment,' +
        ' tbl_exams.exam_name , tbl_exams.exam_date , tbl_exams.exam_type , tbl_employees.employee_name as teacher_name , ' +
        ' tbl_subjects.subject_name FROM tbl_marks ' +
        ' INNER JOIN tbl_exams ON tbl_marks.exam_id = tbl_exams.exam_id ' +
        ' LEFT JOIN tbl_subjects ON tbl_marks.subject_id = tbl_subjects.subject_id ' +
        ' LEFT JOIN tbl_employees ON tbl_subjects.teacher_id = tbl_employees.employee_id  ' +
        ' WHERE tbl_marks.student_id = ?',

    // ********** get core elective combine subjects  for students *************//

    sql_getCandElectSubjects: 'SELECT tbl_subjects.subject_id , tbl_subjects.subject_name , tbl_subjects.subject_id , ' +
        ' tbl_employees.employee_name as teacher_name , tbl_subjects.year as session , tbl_class.class_name , tbl_section.section_name FROM tbl_subjects ' +
        ' INNER JOIN tbl_employees ON tbl_subjects.teacher_id = tbl_employees.employee_id LEFT JOIN tbl_class ON tbl_subjects.class_id = tbl_class.class_id  ' +
        ' LEFT JOIN tbl_section ON tbl_section.section_id = tbl_subjects.section_id WHERE tbl_subjects.class_id = ? AND tbl_subjects.section_id = ? AND tbl_subjects.subject_type = 1 ' +
        ' AND tbl_subjects.year= ? AND tbl_subjects.status = 1 AND tbl_subjects.subject_type = 1;' +
        ' SELECT tbl_subjects.subject_id , tbl_subjects.subject_name ,tbl_subjects.subject_id , tbl_employees.employee_name as teacher_name , tbl_subjects.year as session , tbl_class.class_name , tbl_section.section_name ' +
        ' FROM tbl_subjects INNER JOIN tbl_std_electivesubj ON ' +
        ' tbl_subjects.subject_id = tbl_std_electivesubj.subject_id ' +
        ' LEFT JOIN tbl_employees ON tbl_subjects.teacher_id = tbl_employees.employee_id LEFT JOIN tbl_class ON tbl_subjects.class_id = tbl_class.class_id ' +
        ' LEFT JOIN tbl_section ON tbl_section.section_id = tbl_subjects.section_id  WHERE tbl_std_electivesubj.student_id = ? AND tbl_std_electivesubj.year = ? ' +
        ' AND tbl_subjects.year= ? AND tbl_subjects.status = 1 AND tbl_subjects.subject_type = 2 ; ',

    // ********** get core elective combine subjects  for students *************//

    sql_getONECandElectSubjects: 'SELECT tbl_subjects.subject_id , tbl_subjects.subject_name , tbl_subjects.subject_id , ' +
        ' tbl_employees.employee_name as teacher_name , tbl_subjects.year as session , tbl_class.class_name , tbl_section.section_name FROM tbl_subjects ' +
        ' INNER JOIN tbl_employees ON tbl_subjects.teacher_id = tbl_employees.employee_id LEFT JOIN tbl_class ON tbl_subjects.class_id = tbl_class.class_id  ' +
        ' LEFT JOIN tbl_section ON tbl_section.section_id = tbl_subjects.section_id WHERE tbl_subjects.subject_type = 1 ' +
        ' AND tbl_subjects.year= ? AND tbl_subjects.subject_id= ? AND tbl_subjects.status = 1 AND tbl_subjects.subject_type = 1;' +
        ' SELECT tbl_subjects.subject_id , tbl_subjects.subject_name ,tbl_subjects.subject_id , tbl_employees.employee_name as teacher_name , tbl_subjects.year as session , tbl_class.class_name , tbl_section.section_name ' +
        ' FROM tbl_subjects INNER JOIN tbl_std_electivesubj ON ' +
        ' tbl_subjects.subject_id = tbl_std_electivesubj.subject_id ' +
        ' LEFT JOIN tbl_employees ON tbl_subjects.teacher_id = tbl_employees.employee_id LEFT JOIN tbl_class ON tbl_subjects.class_id = tbl_class.class_id ' +
        ' LEFT JOIN tbl_section ON tbl_section.section_id = tbl_subjects.section_id  WHERE tbl_std_electivesubj.student_id = ? AND tbl_std_electivesubj.year = ? ' +
        ' AND tbl_subjects.year= ? AND tbl_subjects.subject_id= ? AND tbl_subjects.status = 1 AND tbl_subjects.subject_type = 1 ; ',

    // ********** get elective subjects  for students *************//

    sql_getESubjects: ' SELECT tbl_subjects.subject_name , tbl_employees.employee_name as teacher_name , tbl_subjects.year , tbl_class.class_name , tbl_section.section_name ' +
        ' FROM tbl_subjects INNER JOIN tbl_std_electivesubj ON ' +
        ' tbl_subjects.subject_id = tbl_std_electivesubj.subject_id ' +
        ' LEFT JOIN tbl_employees ON tbl_subjects.teacher_id = tbl_employees.employee_id LEFT JOIN tbl_class ON tbl_subjects.class_id = tbl_class.class_id ' +
        ' LEFT JOIN tbl_section ON tbl_section.section_id = tbl_subjects.subject_id  WHERE tbl_std_electivesubj.student_id = ? AND tbl_std_electivesubj.year = ? ' +
        ' AND tbl_subjects.year= ? AND tbl_subjects.status = 1 ;',

    // ********* get fee invoive against student for selected month *******//

    sql_getFeeInvoice: "Select FROM_UNIXTIME(tbl_fee_invoice.fee_month , '%M %Y' ) AS fee_month , total_fee ,duedate_timestamp ,amount_due , " +
        ' amount_paid , feepaid_date ,fee_status from tbl_fee_invoice where student_id = ? ',

    // ********* get attendance against student for selected month *******//

    sql_getStdAttendance: 'SELECT * from tbl_attendance WHERE student_id = ?' +
        ' AND timestamp >= ? AND timestamp <= ?  ORDER BY timestamp DESC ; ' +
        ' SELECT count(*) as absent from tbl_attendance WHERE student_id = ?' +
        ' AND timestamp >= ? AND timestamp <= ? AND attend_status = ? ;' +
        ' SELECT count(*) as present from tbl_attendance WHERE student_id = ?' +
        ' AND timestamp >= ? AND timestamp <= ? AND attend_status = ? ;',

    // ********************* get new announcements *************************//

    sql_getAnnouncements: ' Select * from tbl_announcements where  ' +
        ' announcement_expire >= ? AND status = ? AND announc_for LIKE ? OR announc_for Like ? ORDER BY announcement_date DESC ',

    // ********************* get student details aginst parent id *************************//

    sql_getStdDetails: 'SELECT tbl_students.std_id , tbl_students.thumb_path as image_path, tbl_students.std_name , tbl_students.school_name, tbl_enroll.year , tbl_section.section_name, tbl_section.section_id, tbl_section.class_id ,tbl_class.class_name' +
        ' FROM tbl_students INNER JOIN tbl_enroll on tbl_students.std_id = tbl_enroll.student_id' +
        ' LEFT JOIN tbl_section on tbl_enroll.section_id = tbl_section.section_id LEFT JOIN tbl_class' +
        ' ON tbl_enroll.class_id = tbl_class.class_id' +
        ' WHERE tbl_students.std_parentId= ?  ' +
        ' AND tbl_students.status= ? AND tbl_enroll.year = ? ',

    // ********************* get quizes assignments against student *************************//

    sql_assign: 'SELECT tbl_assignments.title , tbl_assignments.assign_tMarks as total_marks , tbl_std_assignment.obtained_marks , tbl_std_assignment.std_assign_id as id, tbl_assignments.assign_created_date as date, tbl_assignments.type , ' +
        ' tbl_subjects.subject_name FROM tbl_assignments  ' +
        'INNER JOIN tbl_std_assignment ON tbl_std_assignment.assign_id = tbl_assignments.assign_id WHERE tbl_std_assignment.student_id = ? ',

    sql_get_std_quizes: 'SELECT tbl_exams.exam_name as title , tbl_exams.exam_date as date , tbl_exams.exam_type as type , ' +
        " tbl_marks.marks_id as id FROM tbl_exams INNER JOIN tbl_marks ON  tbl_exams.exam_id = tbl_marks.exam_id WHERE tbl_marks.student_id = ? AND tbl_marks.marks_type = 'quiz' ",

    // ********************* get quizes assignments combine  *************************//
    sql_assign_quizes: ' SELECT tbl_assignments.title , tbl_assignments.assign_tMarks as total_marks , tbl_std_assignment.obtained_marks , tbl_std_assignment.std_assign_id as id, tbl_assignments.assign_created_date as date_time, tbl_assignments.type , ' +
        ' tbl_subjects.subject_name FROM tbl_assignments  ' +
        ' INNER JOIN tbl_std_assignment ON tbl_std_assignment.assign_id = tbl_assignments.assign_id LEFT JOIN tbl_subjects ON tbl_assignments.subject_id = tbl_subjects.subject_id ' +
        '  WHERE tbl_std_assignment.student_id = ? ; ' +
        ' SELECT tbl_quizes.quiz_title as title , quiz_t_marks as total_marks , tbl_quiz_marks.obtained_marks , tbl_quiz_marks.quiz_marks_id as id  , tbl_quizes.quiz_date as date_time , "quiz" as type , ' +
        ' tbl_subjects.subject_name  FROM tbl_quizes INNER JOIN tbl_quiz_marks ON tbl_quizes.quiz_id = tbl_quiz_marks.quiz_id LEFT JOIN tbl_subjects ON tbl_quizes.subject_id = tbl_subjects.subject_id ' +
        "  WHERE tbl_quiz_marks.student_id = ? ",

    // ********************* get quizes assignments combine details against subject *************************//
    sql_assign_quizes_against_subj: ' SELECT tbl_assignments.title , tbl_assignments.assign_tMarks as total_marks , tbl_std_assignment.obtained_marks , tbl_std_assignment.std_assign_id as id, tbl_assignments.assign_created_date as date_time, tbl_assignments.type , ' +
        ' tbl_subjects.subject_name FROM tbl_assignments  ' +
        ' INNER JOIN tbl_std_assignment ON tbl_std_assignment.assign_id = tbl_assignments.assign_id LEFT JOIN tbl_subjects ON tbl_assignments.subject_id = tbl_subjects.subject_id ' +
        '  WHERE tbl_std_assignment.student_id = ? AND tbl_assignments.subject_id = ? ; ' +
        ' SELECT tbl_quizes.quiz_title as title , quiz_t_marks as total_marks , tbl_quiz_marks.obtained_marks , tbl_quiz_marks.quiz_marks_id as id  , tbl_quizes.quiz_date as date_time , "quiz" as type , ' +
        ' tbl_subjects.subject_name  FROM tbl_quizes INNER JOIN tbl_quiz_marks ON tbl_quizes.quiz_id = tbl_quiz_marks.quiz_id LEFT JOIN tbl_subjects ON tbl_quizes.subject_id = tbl_subjects.subject_id ' +
        "  WHERE tbl_quiz_marks.student_id = ? AND tbl_quizes.subject_id = ?",

    // ************************** quiz details  ****************************************//
    sql_quizes_details: 'SELECT tbl_quizes.quiz_t_marks as total_marks , tbl_quiz_marks.obtained_marks , tbl_quizes.quiz_title as title , tbl_quizes.quiz_date as date_time , ' +
        ' tbl_subjects.subject_name , tbl_employees.employee_name as teacher_name FROM   ' +
        'tbl_quizes INNER JOIN tbl_quiz_marks ON tbl_quiz_marks.quiz_id = tbl_quizes.quiz_id LEFT JOIN tbl_subjects ON tbl_quizes.subject_id = tbl_subjects.subject_id ' +
        " LEFT JOIN tbl_employees ON tbl_subjects.teacher_id = tbl_employees.employee_id WHERE tbl_quizes.quiz_id = ? ; " +
        " SELECT image_name  , thumb from tbl_images WHERE source_id = ? and source_type = 'quiz' ;",

    // ************************** assignment details  ****************************************//
    sql_assign_details: 'SELECT tbl_assignments.assign_tMarks as total_marks , tbl_std_assignment.obtained_marks , tbl_assignments.title , tbl_assignments.assign_created_date as date_time , tbl_subjects.subject_name , tbl_employees.employee_name as teacher_name FROM ' +
        ' tbl_assignments INNER JOIN tbl_std_assignment ON tbl_assignments.assign_id = tbl_std_assignment.assign_id LEFT JOIN tbl_subjects ON tbl_assignments.subject_id = tbl_subjects.subject_id ' +
        ' LEFT JOIN tbl_employees ON tbl_subjects.teacher_id = tbl_employees.employee_id WHERE tbl_std_assignment.std_assign_id = ? ; ' +
        " SELECT image_name  , thumb  from tbl_images WHERE source_id = ? and source_type = 'assignment' ;",

    // ************************** check user has already account  ****************************************//
    sql_check_parentUsername: 'SELECT parent_id , parent_email , COUNT(*) as username_exist FROM tbl_parents WHERE `parent_userName` = ? AND status = ?',

    // ************************** Update forget password, set default password  ****************************************//
    sql_reset_Parent_forgetPassword: 'UPDATE tbl_parents SET parent_password = ? WHERE parent_userName = ? AND parent_id = ? ',

    sql_reset_Parent_newPassword: 'UPDATE tbl_parents SET parent_password = ? WHERE parent_userName = ? AND parent_id = ?',

    // ************************** get student total exams  ****************************************//

    sql_getStudentExams: 'SELECT tbl_marks.exam_id , tbl_exams.exam_name , tbl_exams.year as session , tbl_exams.exam_date FROM tbl_exams INNER JOIN tbl_marks ON ' +
        "tbl_exams.exam_id =  tbl_marks.exam_id WHERE tbl_marks.student_id = ? AND tbl_marks.marks_type != 'quiz' AND tbl_marks.year = ? " +
        ' GROUP BY tbl_marks.exam_id ORDER BY tbl_exams.exam_date ASC ',

    // ************************** get student exam marks  ****************************
    sql_stud_exam_marks: 'SELECT tbl_marks.total_marks , tbl_marks.obtained_marks , tbl_subjects.subject_name ' +
        ' FROM tbl_marks LEFT JOIN tbl_subjects ON tbl_marks.subject_id = tbl_subjects.subject_id WHERE tbl_marks.exam_id = ? ' +
        ' AND tbl_marks.student_id = ? AND tbl_marks.year = ? ',

    //********************************************************************************************** */
    // *************** SQL prepare statements for Attendance management APIs   **********************/
    //********************************************************************* *************************/

    // ********************* get student data to mark , update attendance *************************//
    /**
     *
     * JOIN tables tbl_students , tbl_enroll , tbl_attendance , tbl_class , tbl_section
     * get data of student and attendance to mark attendance
     *
     */

    sql_getStdAtdDetails: 'SELECT p.parent_name,tbl_students.std_name , tbl_students.std_id, tbl_enroll.* , tbl_attendance.late_arrival_min, tbl_attendance.timestamp ,tbl_attendance.attendance_id , IFNULL(tbl_attendance.attend_status,"P") as attend_status , ' +
        ' tbl_section.section_name, tbl_class.class_name , tbl_attendance.comment ' +
        ' FROM tbl_students INNER JOIN tbl_enroll on tbl_students.std_id = tbl_enroll.student_id' +
        ' LEFT JOIN tbl_parents p on tbl_students.std_parentId=p.parent_id'+
        ' LEFT JOIN tbl_section on tbl_enroll.section_id = tbl_section.section_id LEFT JOIN tbl_class' +
        ' ON tbl_enroll.class_id = tbl_class.class_id ' +
        ' LEFT JOIN tbl_attendance ON ( tbl_enroll.student_id = tbl_attendance.student_id AND tbl_attendance.timestamp = ? ) ' +
        ' WHERE tbl_enroll.class_id= ? AND tbl_enroll.section_id = ? ' +
        ' AND tbl_enroll.year=? AND tbl_students.status= ? ORDER BY tbl_enroll.roll_num ASC ',

    // ********************* Mark Student attendance  *************************//

    sql_markAttendance: 'Insert into tbl_attendance SET ? ',

    // ********************* Update Student attendance  *************************//

    sql_updateAttendance: 'Update tbl_attendance SET ? WHERE class_id = ? AND student_id = ? AND timestamp = ?',

    // ********************* Get all stds for monthly attendace report   *************************//

    sql_getStdForReport: 'SELECT tbl_students.std_name , tbl_enroll.* , ' +
        ' tbl_section.section_name, tbl_class.class_name' +
        ' FROM tbl_students INNER JOIN tbl_enroll on tbl_students.std_id = tbl_enroll.student_id' +
        ' LEFT JOIN tbl_section on tbl_enroll.section_id = tbl_section.section_id LEFT JOIN tbl_class' +
        ' ON tbl_enroll.class_id = tbl_class.class_id ' +
        ' WHERE tbl_enroll.class_id= ? AND tbl_enroll.section_id = ? ' +
        ' AND tbl_enroll.year=? AND tbl_students.status= ? ',

    // ********************* Get list of attend report against each std   *************************//

    sql_getAttendReportAllSections: 'SELECT * from tbl_attendance WHERE class_id = ? ' +
        ' AND student_id = ? AND timestamp <= ? AND timestamp >= ?',
    
    sql_getAttendReport: 'SELECT * from tbl_attendance WHERE class_id = ? ' +
        ' AND section_id = ? AND student_id = ? AND timestamp <= ? AND timestamp >= ?',

    sql_getAttendMonthlyReport: 'SELECT month, count(attendance_id) as total_attendance from tbl_attendance WHERE class_id = ? ' +
        ' AND section_id = ? AND student_id = ? AND attend_status= ? AND timestamp <= ? AND timestamp >= ? GROUP BY `month`',

    // ********************* check attend already marked agaist date  *************************//

    sql_isAttendMarked: 'Select COUNT(*) AS attendance_count from tbl_attendance WHERE class_id = ? AND section_id = ? AND student_id = ? AND timestamp = ? ',

	// ********************* Total Count of student Attendance  *************************//
	
    sql_totalAttendanceAllSections: 'SELECT count(*) as totalattendance from tbl_attendance WHERE class_id = ? ' +
        ' AND student_id = ? AND attend_status = ? AND timestamp <= ? AND timestamp >= ?',

	sql_totalAttendance: 'SELECT count(*) as totalattendance from tbl_attendance WHERE class_id = ? ' +
        ' AND section_id = ? AND student_id = ? AND attend_status = ? AND timestamp <= ? AND timestamp >= ?',
	

    sql_update_absent_reason: 'UPDATE tbl_attendance SET ? WHERE attendance_id = ?',

    //******************************************************************************************************************* */
    // ***************************************** Student Management SQL prepare statements **********************************/
    //****************************************************************************************************************** */

    // ************************** Add new students   *************************//

    sql_addStudents: 'INSERT INTO tbl_students SET ?',

    sql_verifyParentNumber: 'Select parent_id, parent_name from tbl_parents WHERE parent_phoneNum = ? AND status = ?',

    // ********************* Enroll Students  *************************//

    sql_enrollStudent: 'INSERT INTO tbl_enroll SET ?',

    // ********************* Get student by class id *************************//

    sql_getStdByClassSectionId: 'SELECT tbl_students.* , tbl_enroll.* , tbl_section.section_name, tbl_class.class_name' +
        ' FROM tbl_students INNER JOIN tbl_enroll on tbl_students.std_id = tbl_enroll.student_id' +
        ' LEFT JOIN tbl_section on tbl_enroll.section_id = tbl_section.section_id LEFT JOIN tbl_class' +
        ' ON tbl_enroll.class_id = tbl_class.class_id' +
        ' WHERE tbl_enroll.class_id= ? AND tbl_enroll.section_id = ? ' +
        ' AND tbl_enroll.year=? AND tbl_students.status= ? ORDER BY  tbl_section.section_name ASC ',

    sql_getStdByClassId: 'SELECT tbl_students.* ,tbl_enroll.*,tbl_section.section_name, tbl_class.class_name,tbl_parents.parent_name ' +
        ' FROM tbl_students INNER JOIN tbl_enroll on tbl_students.std_id = tbl_enroll.student_id' +
        ' LEFT JOIN tbl_section on tbl_enroll.section_id = tbl_section.section_id LEFT JOIN tbl_class' +
        ' ON tbl_enroll.class_id = tbl_class.class_id JOIN tbl_parents ON' +
        ' tbl_students.std_parentId = tbl_parents.parent_id' +
        ' WHERE tbl_enroll.class_id= ?  ' +
        ' AND tbl_enroll.year=? AND tbl_students.status= ? ORDER BY  tbl_section.section_name ASC ',

    // ********************* Get student all data by class id and section id *************************//

    sql_getStdByClassSecId: 'SELECT tbl_students.* , tbl_enroll.* , tbl_section.section_name, tbl_class.class_name' +
        ' FROM tbl_students INNER JOIN tbl_enroll on tbl_students.std_id = tbl_enroll.student_id' +
        ' LEFT JOIN tbl_section on tbl_enroll.section_id = tbl_section.section_id LEFT JOIN tbl_class' +
        ' ON tbl_enroll.class_id = tbl_class.class_id' +
        ' WHERE tbl_enroll.class_id= ? AND tbl_enroll.section_id = ? ' +
        ' AND tbl_enroll.year=? AND tbl_students.status= ? ',

    // ********************* Get student required data by class id and section id *************************//
    sql_getStdReqData: 'SELECT tbl_students.std_name , tbl_students.std_id , tbl_enroll.enroll_id , tbl_enroll.roll_num , ' +
        ' tbl_section.section_name,tbl_section.section_id, tbl_class.class_name , tbl_class.class_id' +
        ' FROM tbl_students INNER JOIN tbl_enroll on tbl_students.std_id = tbl_enroll.student_id' +
        ' LEFT JOIN tbl_section on tbl_enroll.section_id = tbl_section.section_id LEFT JOIN tbl_class' +
        ' ON tbl_enroll.class_id = tbl_class.class_id' +
        ' WHERE tbl_enroll.class_id= ? AND tbl_enroll.section_id = ? ' +
        ' AND tbl_enroll.year=? AND tbl_students.status= ? ',

    // ********************* Get Single student by student id *************************//

    sql_getSingleStdData: 'SELECT tbl_students.* , tbl_enroll.* , tbl_section.section_name, tbl_class.class_name , ' +
        ' tbl_parents.parent_name , tbl_parents.parent_email, tbl_parents.parent_profession , tbl_parents.parent_phoneNum,' +
        ' tbl_parents.parent_address ' +
        ' FROM tbl_students INNER JOIN tbl_enroll on tbl_students.std_id = tbl_enroll.student_id' +
        ' LEFT JOIN tbl_section on tbl_enroll.section_id = tbl_section.section_id LEFT JOIN tbl_class' +
        ' ON tbl_enroll.class_id = tbl_class.class_id LEFT JOIN tbl_parents ON' +
        ' tbl_students.std_parentId = tbl_parents.parent_id' +
        ' WHERE tbl_enroll.student_id= ?  ' +
        ' AND tbl_enroll.year=? AND tbl_students.status= ? ',

    sql_get_parent_from_student_id: "select p.* from tbl_students s join tbl_parents p on s.std_parentId=p.parent_id WHERE s.std_id = ? AND p.status = 1",

    // ********************* Get student result against exam id *************************//
    sql_getStdExamMarks: 'SELECT tbl_marks.total_marks, tbl_marks.obtained_marks , tbl_exams.exam_name , ' +
        ' tbl_exams.exam_date , tbl_subjects.subject_name FROM tbl_marks INNER JOIN  ' +
        ' tbl_exams ON tbl_marks.exam_id = tbl_exams.exam_id LEFT JOIN tbl_subjects ' +
        'ON tbl_marks.subject_id = tbl_subjects.subject_id WHERE tbl_marks.exam_id = ? ' +
        ' AND tbl_marks.student_id = ? AND tbl_marks.year = ?',

    // ********************* Get student all subjects and result against exam id *************************//
    sql_getStdSubjectsExamMarks: 'SELECT tbl_subjects.subject_name , tbl_marks.total_marks, tbl_marks.obtained_marks , tbl_exams.exam_name , tbl_exams.exam_date ' +
        ' FROM tbl_subjects LEFT JOIN tbl_marks ON tbl_subjects.subject_id = tbl_marks.subject_id AND tbl_marks.exam_id = ? AND tbl_marks.student_id = ? ' +
        ' LEFT JOIN tbl_exams ON tbl_marks.exam_id = tbl_exams.exam_id  WHERE tbl_subjects.class_id = ? AND tbl_subjects.section_id = ? AND tbl_subjects.status = 1 ORDER BY tbl_subjects.subject_name ASC ',


    // ********************* Get student all subjects and result against quiz id *************************//
    sql_getStdSubjectsQuizMarks: 'SELECT tbl_subjects.subject_name , tbl_marks.total_marks, tbl_marks.obtained_marks , tbl_exams.exam_name , tbl_exams.exam_date ' +
        ' FROM tbl_subjects LEFT JOIN tbl_marks ON tbl_subjects.subject_id = tbl_marks.subject_id AND tbl_marks.exam_id = ? AND tbl_marks.student_id = ? ' +
        ' LEFT JOIN tbl_exams ON tbl_marks.exam_id = tbl_exams.exam_id  WHERE tbl_subjects.class_id = ? AND tbl_subjects.section_id = ? AND tbl_subjects.status = 1 ORDER BY tbl_subjects.subject_name ASC ',



    // ********************* Get exams against class section session *************************//
    sql_getExamsPerClassSectionSession: "Select tbl_marks.exam_id , tbl_exams.exam_name , tbl_exams.grading_method from tbl_marks JOIN tbl_exams ON tbl_marks.exam_id = tbl_exams.exam_id" +
        " where tbl_marks.class_id =? AND tbl_marks.section_id = ? AND tbl_marks.year = ? AND tbl_marks.marks_type = 'exam' GROUP BY tbl_marks.exam_id",


    // ********************* Get quizs against class section session *************************//
    sql_getQuizsPerClassSecYearStdId: "Select tbl_quiz_marks.obtained_marks,tbl_quiz_marks.marked_date ,tbl_quizes.quiz_title , tbl_quizes.quiz_date ," +
        " tbl_quizes.quiz_t_marks, tbl_subjects.subject_name FROM tbl_quiz_marks JOIN tbl_quizes " +
        " ON tbl_quiz_marks.quiz_id = tbl_quizes.quiz_id JOIN tbl_subjects ON tbl_quizes.subject_id = tbl_subjects.subject_id " +
        " WHERE tbl_quizes.class_id = ? AND tbl_quizes.section_id = ? AND tbl_quizes.year = ? AND tbl_quiz_marks.student_id = ? ORDER By tbl_subjects.subject_name ASC ",


    // ********************* Get Assignments against class section session *************************//
    sql_getAssignmentPerClassSecYearStdId: "Select tbl_std_assignment.obtained_marks,tbl_std_assignment.assign_submit_date ,tbl_assignments.title , " +
        " tbl_assignments.assign_created_date , tbl_assignments.assign_created_date , tbl_assignments.assign_due_date , tbl_assignments.assign_tMarks ," +
        " tbl_subjects.subject_name FROM tbl_std_assignment JOIN tbl_assignments " +
        " ON tbl_std_assignment.assign_id = tbl_assignments.assign_id JOIN tbl_subjects ON tbl_assignments.subject_id = tbl_subjects.subject_id " +
        " WHERE tbl_assignments.class_id = ? AND tbl_assignments.section_id = ? AND tbl_assignments.year = ? AND tbl_std_assignment.student_id = ? ORDER By tbl_subjects.subject_name ASC ",




    // ********************* Get student result against exam id *************************//
    sql_getStdAllExamMarks: 'SELECT tbl_marks.total_marks, tbl_marks.obtained_marks , tbl_exams.exam_name , ' +
        ' tbl_exams.exam_date , tbl_subjects.subject_name FROM tbl_marks INNER JOIN  ' +
        ' tbl_exams ON tbl_marks.exam_id = tbl_exams.exam_id LEFT JOIN tbl_subjects ' +
        ' ON tbl_marks.subject_id = tbl_subjects.subject_id WHERE ' +
        ' tbl_marks.student_id = ? AND tbl_marks.year = ? ',

    // ********************* Update Student Personal Data *************************//

    sql_updateStdPerData: 'Update tbl_students SET ? WHERE std_id = ? AND status = ? ',

    // ********************* Update Student Educational Data *************************//

    sql_updateStdEduData: 'Update tbl_enroll set ? WHERE student_id =?  AND enroll_id = ? ',

    // ********************* Delete Student from Tbl_students *************************//

    sql_deleteStudent: 'Update tbl_students SET ? WHERE std_id = ?',

    // ********************* Delete Student Enrollment *************************//

    sql_delStudEnroll: 'Update tbl_enroll SET ? WHERE student_id = ?',

    //*************** Get students for promotion ****************************** */
    sql_getStdInfoForPromotion: 'SELECT tbl_students.std_name , tbl_enroll.student_id , tbl_enroll.class_id , tbl_enroll.section_id , ' +
        ' tbl_enroll.roll_num , tbl_class.class_name , tbl_section.section_name FROM tbl_students INNER JOIN tbl_enroll ON ' +
        ' tbl_students.std_id = tbl_enroll.student_id LEFT JOIN tbl_class ON tbl_enroll.class_id = tbl_class.class_id LEFT JOIN tbl_section ' +
        ' ON tbl_enroll.section_id = tbl_section.section_id WHERE tbl_enroll.class_id = ? AND tbl_enroll.year = ? AND tbl_enroll.status = 1 AND tbl_students.status = 1 ORDER by tbl_section.section_name',

    //*************** check student already enroll in next session ****************************** */
    sql_check_isStdAlreadyEnrolled: 'SELECT COUNT(*) as enroll_exist FROM tbl_enroll WHERE student_id = ? AND year = ? AND status = ?',

    //********************************************************************************************************* */
    // ************************************ Parents Management Sql prepare statements ***************************/
    //************************************************************************************************************ */

    // ********************* Add parent data  *************************//

    sql_addParent: 'INSERT INTO tbl_parents SET ?',

    // ********************* Get parent data  *************************//

    sql_getParentData: 'Select * from tbl_parents Where status = ? ORDER BY parent_id ASC ',

    // ********************* Get parent data with pagination  *************************//

    sql_getParentDataWithPagin: 'Select * from tbl_parents Where status = ?  LIMIT ? , ? ',

    // ********************* Get Single parent data  *************************//

    sql_getSingleParentData: 'Select * FROM tbl_parents WHERE parent_id =? AND status = ? ',

    // ********************* for Update and delete parent data  *************************//

    sql_updateParentData: 'Update tbl_parents SET ? WHERE parent_id = ? ',

    //********************************************************************************************************* */
    // ************************************ Teachers Management Sql prepare statements ***************************/
    //************************************************************************************************************ */

    sql_getTeachersDataWithPagin: 'SELECT * from tbl_employees WHERE status = ? AND role_xref_id = ? order by employee_id desc LIMIT ? , ?',

    //********************************************************************************************************* */
    // ************************************ Subjects Management Sql prepare statements ***************************/
    //************************************************************************************************************ */

    // ********************* get elective subjects against student  *************************//

    sql_getStdElectiveSubj: 'SELECT tbl_std_electivesubj.electiveSub_id , tbl_subjects.subject_name FROM tbl_std_electivesubj ' +
        ' INNER JOIN tbl_subjects ON tbl_std_electivesubj.subject_id = tbl_subjects.subject_id WHERE tbl_std_electivesubj.student_id = ? ' +
        ' AND tbl_std_electivesubj.year = ? ',

    // ********************* get elective students against class , section  ********************//

    sql_getClassSecElecSubj: 'SELECT subject_name , subject_id from tbl_subjects where class_id = ? AND section_id= ? AND year = ? AND status = ? AND subject_type = ? ',

    // ********************* query to check elective subject added against student  *******************//
    sql_checkElecSubj: 'Select * from tbl_std_electivesubj WHERE student_id = ? AND subject_id = ? AND year = ? AND status = ?',

    // ********************* query to assign elective subject added against student  *******************//
    sql_assignElecSubj: 'INSERT INTO tbl_std_electivesubj SET ?',

    // ********************** Delete student elective subject ****************************************//
    sql_deleteStdElecSubj: 'DELETE from tbl_std_electivesubj WHERE electiveSub_id = ?',

    //********************************************************************************************************* */
    // ************************************ Exam Management Sql prepare statements ***************************/
    //************************************************************************************************************ */

    // ********************** Add new Exam data  ****************************************//

    sql_addExam: 'INSERT INTO tbl_exams SET ?',

    // ***************************** List exams  ****************************************//

    sql_ListExams: 'Select * from tbl_exams WHERE year = ? ORDER BY exam_date DESC',

    sql_getSelectedTypeExams: 'Select * from tbl_exams WHERE exam_type = ? AND  year = ? ',

    //********************************Delete Exam**************************************** */

    sql_deleteExam: 'DELETE FROM tbl_exams WHERE exam_id = ?',

    // ***************************** List single exams  *************************************//
    sql_listSingleExams: 'SELECT * from tbl_exams WHERE exam_id = ?',

    //*********************************Update exams data********************************* */

    sql_updateExam: 'Update tbl_exams SET ? WHERE exam_id = ?',

    // ********************* get subject details against class and section id  *************************//

    sql_getCsubjByclassSecId: 'SELECT tbl_subjects.* , tbl_employees.employee_name as teacher_name , tbl_section.section_name, tbl_class.class_name' +
        ' FROM tbl_subjects INNER JOIN tbl_employees on tbl_subjects.teacher_id = tbl_employees.employee_id' +
        ' LEFT JOIN tbl_section on tbl_subjects.section_id = tbl_section.section_id LEFT JOIN tbl_class' +
        ' ON tbl_subjects.class_id = tbl_class.class_id' +
        ' WHERE tbl_subjects.class_id= ? AND tbl_subjects.section_id = ?' +
        ' AND tbl_subjects.year=? AND tbl_subjects.status= ? AND tbl_employees.role_xref_id=1',

    // ********************* get student data to mark , update marks against selected core subject *************************//
    /**
     *
     * JOIN tables tbl_students , tbl_enroll , tbl_marks , tbl_class , tbl_section
     * get data of student and marks to mark  , update exam marks
     *
     */

    sql_getStdMangeExmMarkDetails: 'SELECT tbl_students.std_id , tbl_students.std_name , ' +
        ' tbl_enroll.roll_num , tbl_enroll.class_id , tbl_enroll.section_id , tbl_exams.exam_name , tbl_exams.exam_date , ' +
        ' tbl_marks.obtained_marks , tbl_marks.total_marks ' +
        ' FROM tbl_enroll  INNER JOIN tbl_students on tbl_students.std_id = tbl_enroll.student_id ' +
        ' LEFT JOIN tbl_section on tbl_enroll.section_id = tbl_section.section_id LEFT JOIN tbl_class ' +
        ' ON tbl_enroll.class_id = tbl_class.class_id ' +
        ' LEFT JOIN tbl_marks ON ( tbl_enroll.student_id = tbl_marks.student_id AND tbl_marks.exam_id = ? AND tbl_marks.year = ? AND tbl_marks.subject_id = ? ) ' +
        ' LEFT JOIN tbl_exams ON (tbl_exams.exam_id = ?) ' +
        ' WHERE tbl_enroll.class_id= ? AND tbl_enroll.section_id = ? AND tbl_enroll.year=? AND tbl_students.status= ?  ORDER BY tbl_enroll.roll_num ASC ',

    // ********************* get student data to mark , update marks against selected elective subject *************************//
    /**
     *
     * JOIN tables tbl_students , tbl_enroll , tbl_std_electivesubj, tbl_marks , tbl_class , tbl_section
     * get data of student and marks to mark  , update exam marks
     *
     */

    sql_getStdElecSubMangeExmMarkDetails: 'SELECT tbl_students.std_id , tbl_students.std_name , tbl_std_electivesubj.electiveSub_id , ' +
        ' tbl_enroll.roll_num , tbl_enroll.class_id , tbl_enroll.section_id , tbl_exams.exam_name , tbl_exams.exam_date , ' +
        ' tbl_marks.obtained_marks ,  tbl_marks.total_marks ' +
        ' FROM tbl_enroll  INNER JOIN tbl_students on tbl_students.std_id = tbl_enroll.student_id ' +
        ' LEFT JOIN tbl_std_electivesubj ON ( tbl_students.std_id = tbl_std_electivesubj.student_id AND tbl_std_electivesubj.subject_id = ? ) ' +
        ' LEFT JOIN tbl_section on tbl_enroll.section_id = tbl_section.section_id LEFT JOIN tbl_class ' +
        ' ON tbl_enroll.class_id = tbl_class.class_id ' +
        ' LEFT JOIN tbl_marks ON ( tbl_enroll.student_id = tbl_marks.student_id AND tbl_marks.exam_id = ? ' +
        ' AND tbl_marks.year = ? AND tbl_marks.subject_id = ? ) ' +
        ' LEFT JOIN tbl_exams ON (tbl_exams.exam_id = ?) ' +
        ' WHERE tbl_enroll.class_id= ? AND tbl_enroll.section_id = ? AND tbl_enroll.year=? AND ' +
        ' tbl_students.status= ? AND tbl_std_electivesubj.subject_id = ? ORDER BY tbl_enroll.roll_num ASC ',

    // ********************* check marks already marked agaist subject exam  *************************//

    sql_isMarkedExamMarks: 'Select marks_id, COUNT(*) AS examMarks_count from tbl_marks WHERE class_id = ? AND section_id = ? ' +
        ' AND student_id = ? AND exam_id = ? AND subject_id = ? AND year = ? ',

    // ********************** Add new Exam marks data  ****************************************//

    sql_addExamMarks: 'INSERT INTO tbl_marks SET ?',

    //*********************************Update exams marks********************************* */

    sql_updateExamMarks: 'Update tbl_marks SET ? WHERE marks_id = ?',

    //********************************************************************************************************* */
    // ************************************ Announcements Management Sql prepare statements ***********************/
    //************************************************************************************************************ */

    // ********************** Add new announcement data  ****************************************//

    sql_addNewAnnouncment: 'INSERT INTO tbl_announcements SET ?',

    // ************************** Get active announcements  ****************************************//

    sql_getActiveAnnouncements: 'SELECT * from tbl_announcements WHERE status = ? AND announcement_expire >= ? ORDER BY announcement_id DESC',

    // ************************** Get active announcements  ****************************************//

    sql_getExpiredAnnouncements: 'SELECT * from tbl_announcements WHERE status = ? AND announcement_expire <= ? ORDER BY announcement_id DESC',

    // ************************** Get Single announcements  ****************************************//
    sql_getSingleAnnouncements: 'SELECT * from tbl_announcements WHERE announcement_id = ?',

    // ************************** Update announcements  ****************************************//
    sql_updateAnnouncements: 'UPDATE tbl_announcements SET ? WHERE announcement_id = ? ',

    // ************************** Delete announcements  ****************************************//
    sql_deleteAnnouncements: 'DELETE FROM tbl_announcements WHERE announcement_id = ? ',

    //********************************************************************************************************* */
    // ************************************ Fee Management Sql prepare statements ***************************/
    //************************************************************************************************************ */

    // ************************** Add new Fee structure  ****************************************//
    sql_addFeeStructure: 'INSERT INTO tbl_fee_structure SET ?',

    // ************************** Get Fee structure Details ****************************************//
    sql_getFeeStructureDetails: 'SELECT tbl_fee_structure.* , tbl_class.class_name, tbl_sub_class.sub_class_name FROM tbl_fee_structure INNER JOIN tbl_class ' +
        ' ON tbl_fee_structure.class_id = tbl_class.class_id LEFT JOIN tbl_sub_class ' +
        ' ON tbl_sub_class.sub_class_id = tbl_fee_structure.sub_class_id WHERE tbl_fee_structure.year= ?',

    // ************************** Get Fee structure Details by class id ****************************************//
    sql_getFeeStructureByClassId: 'SELECT fee_amount , fee_title, sub_class_id from tbl_fee_structure where class_id = ? AND year = ? ',

    // ************************** check fee struct already added  ****************************************//
    sql_check_isFeeAlreadyStructSet: 'SELECT COUNT(*) as feeStruct_count from tbl_fee_structure where class_id = ? AND year = ?  ',
	
	 // ************************** check fee struct already added in case of subject is allowed  ****************************************//
    sql_check_isFeeAlreadyStructSet_subGroup: 'SELECT COUNT(*) as feeStruct_count from tbl_fee_structure where class_id = ? AND year = ?  and sub_class_id = ?',

    // ************************** Delete Fee struct ****************************************//
    sql_deleteFeeStruct: 'DELETE FROM tbl_fee_structure WHERE id = ?',

    // ************************** get single class fee struct  ****************************************//
    sql_getSingleClassFeeStruct: 'SELECT tbl_fee_structure.* , tbl_class.class_name, tbl_sub_class.sub_class_name FROM tbl_fee_structure INNER JOIN tbl_class ' +
        ' ON tbl_fee_structure.class_id = tbl_class.class_id LEFT JOIN tbl_sub_class ' +
        ' ON tbl_sub_class.sub_class_id = tbl_fee_structure.sub_class_id WHERE tbl_fee_structure.id=?',

    // ************************** Update Class Fee struct ****************************************//
    sql_updateFeeStruct: 'UPDATE tbl_fee_structure SET ? WHERE id = ? ',

    // ************************** get class students by class and section id ****************************************//
    sql_getClassStudents: 'SELECT tbl_students.std_id ,tbl_parents.parent_name , tbl_students.std_name , tbl_enroll.roll_num, tbl_enroll.sub_class_id FROM tbl_students ' +
        ' INNER JOIN tbl_enroll on tbl_students.std_id = tbl_enroll.student_id LEFT JOIN tbl_parents ON tbl_parents.parent_id = tbl_students.std_parentId' +
        ' WHERE tbl_enroll.class_id = ? AND tbl_enroll.section_id = ? AND tbl_enroll.year = ? AND tbl_students.status = ? ',

    // ************************** get class students by class id ****************************************//
    sql_getClsStudents: 'SELECT tbl_students.std_id , tbl_students.std_name , tbl_enroll.roll_num FROM tbl_students ' +
        ' INNER JOIN tbl_enroll on tbl_students.std_id = tbl_enroll.student_id WHERE tbl_enroll.class_id = ? AND tbl_enroll.year = ? AND tbl_students.status = ? ',

    // ************************** check fee struct set or not ****************************************//
    sql_check_isFeeStructSet: 'SELECT  COUNT(*) as feeStruct_count from tbl_fee_structure where class_id = ? AND year = ? ',

    // ************************** check fee struct set or not ****************************************//
    sql_getClassFee: 'SELECT  fee_amount from tbl_fee_structure where class_id = ? AND year = ? ',

    // ************************** check fee struct set or not ****************************************//
    sql_check_isFeeDiscountSet: 'SELECT COUNT(*) as feeDisc_count FROM tbl_fee_discounts WHERE student_id = ? AND class_id = ? AND year = ? ',

    // ************************** set student fee discount ****************************************//
    sql_set_studentFeeDiscount: 'INSERT INTO tbl_fee_discounts SET ? ',

    // ************************** get all student fee discount details ****************************************//

    sql_getStdFeeDiscountsList: 'SELECT tbl_students.std_name , tbl_parents.parent_name , tbl_section.section_name ,tbl_enroll.roll_num ,tbl_enroll.sub_class_id, tbl_class.class_name , ' +
        ' tbl_fee_discounts.* , tbl_fee_structure.fee_amount FROM tbl_fee_discounts INNER JOIN tbl_students ON tbl_fee_discounts.student_id = tbl_students.std_id ' +
        ' LEFT JOIN tbl_class ON tbl_fee_discounts.class_id = tbl_class.class_id LEFT JOIN tbl_enroll ON tbl_fee_discounts.student_id = tbl_enroll.student_id ' +
        ' LEFT JOIN tbl_parents ON tbl_students.std_parentId = tbl_parents.parent_id LEFT JOIN tbl_section ON tbl_enroll.section_id = tbl_section.section_id ' +
        ' LEFT JOIN tbl_fee_structure ON tbl_fee_discounts.class_id =tbl_fee_structure.class_id WHERE tbl_fee_discounts.class_id = ? AND tbl_fee_discounts.year = ?  AND tbl_fee_structure.year = ? GROUP BY tbl_fee_discounts.student_id ',

    // sql_getStdFeeDiscountsList: ' SELECT tbl_fee_discounts.discount_amount, tbl_fee_discounts.comments , tbl_students.std_name ,tbl_enroll.section_id , tbl_enroll.roll_num , ' +
    //     'tbl_class.class_name , tbl_section.section_name , tbl_fee_structure.fee_amount FROM tbl_fee_discounts INNER JOIN tbl_students ON tbl_fee_discounts.student_id = tbl_students.std_id ' +
    //     'LEFT JOIN tbl_class ON tbl_fee_discounts.class_id = tbl_class.class_id LEFT JOIN tbl_enroll ON tbl_fee_discounts.student_id = tbl_enroll.student_id ' +
    //     'LEFT JOIN tbl_section ON tbl_enroll.section_id = tbl_section.section_id LEFT JOIN tbl_fee_structure ON tbl_fee_discounts.class_id = tbl_fee_structure.class_id ' +
    //     'WHERE tbl_fee_discounts.class_id = ? AND tbl_fee_discounts.year = ?  AND tbl_fee_structure.year = ? ',

    // ************************** get all single student fee discount details ****************************************//

    sql_getSingleStdFeeDiscountDetails: 'SELECT tbl_students.std_name , tbl_fee_discounts.* FROM tbl_fee_discounts INNER JOIN tbl_students ' +
        ' ON tbl_fee_discounts.student_id = tbl_students.std_id WHERE tbl_fee_discounts.discount_id = ?  ',

    // ************************** update students fee discount details ****************************************//
    sql_updateStdFeeDiscDetails: 'UPDATE tbl_fee_discounts SET ? WHERE discount_id = ?',

    // ************************** check fee invoice generated for the selected class ****************************************//
    sql_check_isFeeInvoiceCreated: 'SELECT COUNT(*) as feeInvoice_count FROM tbl_fee_invoice WHERE class_id = ? AND fee_month = ? AND year = ?',

    // ************************** create bulk free invoice ****************************************//
    create_bulkInvoice: 'INSERT INTO tbl_fee_invoice SET ?',

    //************************** get student fee discount amount to deduct from fee invoice **********************//

    sql_getStdFeeDiscountsForAmountDecduction: 'SELECT tbl_fee_discounts.* , tbl_fee_invoice.total_fee FROM tbl_fee_discounts ' +
        ' INNER JOIN  tbl_fee_invoice ON tbl_fee_discounts.student_id = tbl_fee_invoice.student_id WHERE tbl_fee_discounts.class_id = ? AND tbl_fee_discounts.year = ? AND tbl_fee_discounts.status = ?',

    //************************** get student with pending and unpaid status **********************//

    sql_getStdPendingAmountToAddInNextMonth: 'SELECT * FROM tbl_fee_invoice WHERE class_id = ? AND year = ? AND month = ? AND fee_year = ? AND amount_due != 0',
	sql_updateFeeInvoice: 'UPDATE tbl_fee_invoice SET ? WHERE student_id  = ? AND class_id = ? AND fee_year = ? AND month = ?',
    //************************** Update student pending fee due date after transfer to next month **********************//

    sql_updatePrevMonthFeeDueDate: 'UPDATE tbl_fee_invoice SET ? WHERE student_id  = ? AND fee_year = ? AND month = ?',
    //************************** decuct the student discount amount from  fee invoice  **********************//
    update_studentFeeDiscountsInInvoice: 'UPDATE tbl_fee_invoice SET ? WHERE student_id = ? AND year = ? AND fee_month = ?',

    sql_getStudentFeeInvoiceDetails: 'SELECT tbl_fee_invoice.* , tbl_students.std_name, tbl_enroll.roll_num , tbl_class.class_name , ' +
        ' tbl_section.section_name  FROM tbl_fee_invoice INNER JOIN tbl_students ON tbl_fee_invoice.student_id = tbl_students.std_id  ' +
        ' LEFT JOIN tbl_enroll ON tbl_fee_invoice.student_id = tbl_enroll.student_id LEFT JOIN tbl_class ON tbl_fee_invoice.class_id = tbl_class.class_id ' +
        ' LEFT JOIN tbl_section ON tbl_enroll.section_id = tbl_section.section_id WHERE tbl_fee_invoice.fee_month = ? AND tbl_fee_invoice.class_id = ? AND tbl_fee_invoice.year = ? AND tbl_enroll.year = ? ORDER BY tbl_section.section_name',

    //************************** update std fee invoice **********************//
    sql_updateStdFeeInvoiceDetails: 'UPDATE tbl_fee_invoice SET ? WHERE invoice_id = ?',

    //************************** get student fee payment histroy **********************//
    sql_getStudentFeePaymentsHistroy: 'SELECT * FROM tbl_fee_invoice WHERE student_id = ? AND year = ? ',

    //********************************************************************************************************* */
    // ************************************ User Management Sql prepare statements ***************************/
    //************************************************************************************************************ */

    // ************************** check user has already account  ****************************************//
    sql_check_isUserAlreadyAdded: 'SELECT COUNT(*) as email_exist FROM tbl_users WHERE user_email = ? AND status = ?',

    // ************************** Add new user  ****************************************//
    sql_addNewUser: 'INSERT INTO tbl_users SET ? ',

    // ************************** Get Users Data  ****************************************//
    sql_getUsersData: 'SELECT login_id , thumb_path , image_path, user_email , user_name , phone_num , user_level , status from tbl_users ORDER BY user_level ASC ',

    // ************************** Check user email on update data  ****************************************//
    sql_checkOnUpdate_userEmail: 'SELECT COUNT(*) as email_exist FROM tbl_users WHERE status = ? AND user_email != ? AND user_email = ?',

    // ************************** Update user data ****************************************//
    sql_updateUserData: 'Update tbl_users SET ? WHERE login_id = ?',
    // ************************** Delete user  ****************************************//
    sql_deleteUser: 'Delete from tbl_users WHERE login_id = ?',

    /********************************************************************************************************* */
    // ************************************ Settings Sql prepare statements ***************************/
    //************************************************************************************************************ */

    // ************************** get non active session details  ****************************************//

    sql_getSessionDetails: 'SELECT * from tbl_sessions WHERE status = 0',

    // ************************** get all session details  ****************************************//

    sql_getAllSessionDetails: 'SELECT * from tbl_sessions ',

    // ************************** get active session  ****************************************//
    sql_getActiveSession: 'SELECT * from tbl_sessions WHERE status = 1',

    // ************************** check whether session name is already in use  ****************************************//
    sql_check_sessionName: 'SELECT COUNT(*) as sessionName_exists FROM tbl_sessions WHERE session_name = ? ',

    // ************************** get active session  ****************************************//
    sql_add_newSession: 'INSERT INTO tbl_sessions SET ? ',

    //********************  set session active *************************************** */

    sql_set_session_active: 'UPDATE tbl_sessions SET status = (CASE WHEN session_id = ? THEN 1 WHEN session_id != ? THEN 0 END) ',

    //********************  get school info *************************************** */
    sql_getSchoolInfo: 'SELECT * FROM tbl_school_info',

    sql_updateSchoolInfo: 'UPDATE tbl_school_info SET ? WHERE school_id = ? ',

    // update session
    sql_updateSessionInfo: 'UPDATE tbl_sessions SET ? WHERE session_id = ? ',

    /********************************************************************************************************* */
    // **************************************************** Dashboard queries *************************************/
    //************************************************************************************************************ */

    // ************************** total students count  ****************************************//

    //   sql_getStudentsCount:
    // 'SELECT COUNT(*) as count_total FROM tbl_students WHERE status = ?',
    sql_getStudentsCount: 'SELECT COUNT(*) as count_total FROM tbl_students INNER JOIN tbl_enroll ON tbl_students.std_id = tbl_enroll.student_id WHERE tbl_students.status = 1 AND tbl_enroll.year = ?',

    // ************************** total teachers count  ****************************************//

    sql_getTeachersCount: "SELECT COUNT(*) as count_total FROM tbl_employees WHERE status = 1 AND role_xref_id=1",
    sql_getStaffCount: "SELECT COUNT(*) as count_total FROM tbl_employees WHERE status = 1 AND role_xref_id=2",

    // ************************** total parents count  ****************************************//

    sql_getParentsCount: 'SELECT COUNT(*) as count_total FROM tbl_parents WHERE status = 1',

    // ************************** total users count  ****************************************//

    sql_getUsersCount: 'SELECT COUNT(*) as count_total FROM tbl_users WHERE status = 1',

    // ************************** total class count  ****************************************//

    sql_getClassesCount: 'SELECT COUNT(*) as count_total FROM tbl_class WHERE status = 1',

    // ************************** total section count  ****************************************//

    sql_getSectionsCount: 'SELECT COUNT(*) as count_total FROM tbl_section WHERE status = 1',

    // ************************** Update forget , reset password  ****************************************//
    sql_reset_forgetPassword: 'UPDATE tbl_users SET user_password = ? WHERE user_email = ?',
	
	
    // ************************** promotional_messages queries  ****************************************//
	
    // ************************** get all promotional_messages  ****************************************//
    sql_getAllPromotionalMessages: 'SELECT * from tbl_promotional_message ',
	
    // ************************** udpate promotional_messages  ****************************************//
    sql_updatePromotionalMessages: 'UPDATE tbl_promotional_message SET ? WHERE promotional_message_id = ? ',
	

    /********************************************************************************************************* */
    // **************************************************** Quizes Management queries *************************************/
    //************************************************************************************************************ */

    // ************************** Get all Quiz details  ****************************************//
    sql_get_quiz_details: 'Select tbl_quizes.* , tbl_class.class_name , tbl_section.section_name , tbl_subjects.subject_name ' +
        ' FROM tbl_quizes INNER JOIN tbl_subjects ON tbl_quizes.subject_id = tbl_subjects.subject_id ' +
        ' LEFT JOIN tbl_class ON tbl_quizes.class_id = tbl_class.class_id LEFT JOIN tbl_section ' +
        ' ON tbl_quizes.section_id = tbl_section.section_id ' +
        ' WHERE tbl_quizes.year = ? AND tbl_quizes.class_id = ? AND tbl_quizes.subject_id = ? AND tbl_quizes.section_id = ?',

    // ************************** Add new quiz  ****************************************//
    sql_add_newQuiz: 'INSERT INTO tbl_quizes SET ?',

    // getting students for updating quiz marks
    // need to chnage
    sql_getStdMangeQuizMarkDetails: 'SELECT tbl_students.std_id , tbl_students.std_name , ' +
        ' tbl_enroll.roll_num , tbl_enroll.class_id , tbl_enroll.section_id , tbl_quizes.quiz_title , tbl_quizes.quiz_t_marks, ' +
        " tbl_quiz_marks.obtained_marks ,tbl_quizes.quiz_id, FROM_UNIXTIME(tbl_quiz_marks.marked_date , '%Y-%m-%d') as marked_date " +
        ' FROM tbl_students INNER JOIN tbl_enroll on tbl_students.std_id = tbl_enroll.student_id ' +
        ' LEFT JOIN tbl_section on tbl_enroll.section_id = tbl_section.section_id LEFT JOIN tbl_class ' +
        ' ON tbl_enroll.class_id = tbl_class.class_id ' +
        ' LEFT JOIN tbl_quiz_marks ON ( tbl_enroll.student_id = tbl_quiz_marks.student_id AND tbl_quiz_marks.quiz_id = ? ' +
        ' ) ' +
        ' JOIN tbl_quizes ON (tbl_quizes.quiz_id = ? AND tbl_quizes.year = ? AND tbl_quizes.subject_id = ? ) ' +
        ' WHERE tbl_enroll.class_id= ? AND tbl_enroll.section_id = ? AND tbl_enroll.year=? AND tbl_students.status= ?  ORDER BY tbl_enroll.roll_num ASC ',


    // getting students for core subj quiz marks update

    sql_getStdElecSubMangeQuizMarkDetails: 'SELECT tbl_students.std_id , tbl_students.std_name , tbl_std_electivesubj.electiveSub_id , ' +
        ' tbl_enroll.roll_num , tbl_enroll.class_id , tbl_enroll.section_id ,tbl_quizes.quiz_title , tbl_quizes.quiz_t_marks, ' +
        " tbl_quiz_marks.obtained_marks ,tbl_quizes.quiz_id, FROM_UNIXTIME(tbl_quiz_marks.marked_date , '%Y-%m-%d') as marked_date " +
        ' FROM tbl_students INNER JOIN tbl_enroll on tbl_students.std_id = tbl_enroll.student_id ' +
        ' LEFT JOIN tbl_std_electivesubj ON ( tbl_students.std_id = tbl_std_electivesubj.student_id AND tbl_std_electivesubj.subject_id = ? ) ' +
        ' LEFT JOIN tbl_section on tbl_enroll.section_id = tbl_section.section_id LEFT JOIN tbl_class ' +
        ' ON tbl_enroll.class_id = tbl_class.class_id ' +
        ' LEFT JOIN tbl_quiz_marks ON ( tbl_enroll.student_id = tbl_quiz_marks.student_id AND tbl_quiz_marks.quiz_id = ? ' +
        ' ) ' +
        ' JOIN tbl_quizes ON (tbl_quizes.quiz_id = ? AND tbl_quizes.year = ? AND tbl_quizes.subject_id = ? ) ' +
        ' WHERE tbl_enroll.class_id= ? AND tbl_enroll.section_id = ? AND tbl_enroll.year=? AND ' +
        ' tbl_students.status= ? AND tbl_std_electivesubj.subject_id = ? ORDER BY tbl_enroll.roll_num ASC ',



    // ********************* check quiz marks already marked agaist subject exam  *************************//

    sql_isMarkedQuizMarks: 'Select quiz_marks_id, COUNT(*) AS quizMarks_count from tbl_quiz_marks WHERE ' +
        ' student_id = ? AND quiz_id = ? ',

    // ********************* Update Student Marks  *************************//
    sql_updateQuizMarks: 'UPDATE tbl_quiz_marks SET ? WHERE quiz_marks_id = ?',

    // ********************* Insert Quiz Marks  *************************//
    sql_addQuizMarks: 'INSERT INTO tbl_quiz_marks SET ? ',



    /********************************************************************************************************* */
    // **************************************************** Assignment Management queries *************************************/
    //************************************************************************************************************ */

    // ************************** Add new assignment  ****************************************//
    sql_add_newAssignment: 'INSERT INTO tbl_assignments SET ?',

    // ************************** Get all assignment  ****************************************//
    sql_get_assignment_details: 'Select tbl_assignments.* , tbl_class.class_name , tbl_section.section_name , tbl_subjects.subject_name ' +
        ' FROM tbl_assignments INNER JOIN tbl_subjects ON tbl_assignments.subject_id = tbl_subjects.subject_id ' +
        ' LEFT JOIN tbl_class ON tbl_assignments.class_id = tbl_class.class_id LEFT JOIN tbl_section ' +
        ' ON tbl_assignments.section_id = tbl_section.section_id ' +
        ' WHERE tbl_assignments.year = ? AND tbl_assignments.class_id = ? AND tbl_assignments.subject_id = ? AND tbl_assignments.section_id = ?',

    // getting students for elective subj assignment marks update

    sql_getStdMangeAssignMarkDetails: 'SELECT tbl_students.std_id , tbl_students.std_name , ' +
        ' tbl_enroll.roll_num , tbl_enroll.class_id , tbl_enroll.section_id , tbl_assignments.title , tbl_assignments.assign_tMarks , ' +
        " tbl_std_assignment.obtained_marks , tbl_std_assignment.comments ,tbl_assignments.assign_id, FROM_UNIXTIME(tbl_std_assignment.assign_submit_date , '%Y-%m-%d') as assign_submit_date " +
        ' FROM tbl_students INNER JOIN tbl_enroll on tbl_students.std_id = tbl_enroll.student_id ' +
        ' LEFT JOIN tbl_section on tbl_enroll.section_id = tbl_section.section_id LEFT JOIN tbl_class ' +
        ' ON tbl_enroll.class_id = tbl_class.class_id ' +
        ' LEFT JOIN tbl_std_assignment ON ( tbl_enroll.student_id = tbl_std_assignment.student_id AND tbl_std_assignment.assign_id = ? ' +
        ' ) ' +
        ' JOIN tbl_assignments ON (tbl_assignments.assign_id = ? AND tbl_assignments.year = ? AND tbl_assignments.subject_id = ? ) ' +
        ' WHERE tbl_enroll.class_id= ? AND tbl_enroll.section_id = ? AND tbl_enroll.year=? AND tbl_students.status= ?  ORDER BY tbl_enroll.roll_num ASC ',

    // getting students for core subj assignment marks update

    sql_getStdElecSubMangeAssignMarkDetails: 'SELECT tbl_students.std_id , tbl_students.std_name , tbl_std_electivesubj.electiveSub_id , ' +
        ' tbl_enroll.roll_num , tbl_enroll.class_id , tbl_enroll.section_id ,tbl_assignments.assign_id, tbl_assignments.title , tbl_assignments.assign_tMarks , ' +
        " tbl_std_assignment.obtained_marks , tbl_std_assignment.comments , FROM_UNIXTIME(tbl_std_assignment.assign_submit_date , '%Y-%m-%d') as assign_submit_date " +
        ' FROM tbl_students INNER JOIN tbl_enroll on tbl_students.std_id = tbl_enroll.student_id ' +
        ' LEFT JOIN tbl_std_electivesubj ON ( tbl_students.std_id = tbl_std_electivesubj.student_id AND tbl_std_electivesubj.subject_id = ? ) ' +
        ' LEFT JOIN tbl_section on tbl_enroll.section_id = tbl_section.section_id LEFT JOIN tbl_class ' +
        ' ON tbl_enroll.class_id = tbl_class.class_id ' +
        ' LEFT JOIN tbl_std_assignment ON ( tbl_enroll.student_id = tbl_std_assignment.student_id AND tbl_std_assignment.assign_id = ? ' +
        ' ) ' +
        ' JOIN tbl_assignments ON (tbl_assignments.assign_id = ? AND tbl_assignments.year = ? AND tbl_assignments.subject_id = ? ) ' +
        ' WHERE tbl_enroll.class_id= ? AND tbl_enroll.section_id = ? AND tbl_enroll.year=? AND ' +
        ' tbl_students.status= ? AND tbl_std_electivesubj.subject_id = ? ORDER BY tbl_enroll.roll_num ASC ',

    // ********************* check marks already marked agaist subject exam  *************************//

    sql_isMarkedAssignMarks: 'Select std_assign_id, COUNT(*) AS assignMarks_count from tbl_std_assignment WHERE ' +
        ' student_id = ? AND assign_id = ?  ',

    // ********************* Update Assignment Marks  *************************//
    sql_updateAssignmentMarks: 'UPDATE tbl_std_assignment SET ? WHERE std_assign_id = ?',

    // ********************* Insert Assignment Marks  *************************//
    sql_addAssignmentMarks: 'INSERT INTO tbl_std_assignment SET ? ',

    /********************************************************************************************************* */
    // **************************************************** Expenses Management queries *************************************/
    //************************************************************************************************************ */

	 // ************************** Add new expense head  ****************************************//
    sql_add_expense_category: 'INSERT INTO tbl_expense_categories SET ?',
    sql_add_expense_head: 'INSERT INTO tbl_expenses_head SET ?',
	sql_get_expenses_head: 'SELECT * FROM tbl_expenses_head WHERE expense_category_id = ? AND status=1 ORDER BY created_at DESC ',
	sql_get_expenses_categories: 'SELECT * FROM tbl_expense_categories ORDER BY created_at DESC ',
	
    // ************************** Add new expense  ****************************************//
    sql_add_newExpense: 'INSERT INTO tbl_expenses SET ?',

    // ************************** get expense  ****************************************//

    sql_get_expenses: 'SELECT * FROM tbl_expenses ORDER BY expense_date DESC ',

    // ************************** Update expense  ****************************************//

    sql_update_expense: 'UPDATE tbl_expenses SET ? WHERE expense_id = ?',
	
	// ************************** Add Fee Head  ****************************************//

    sql_add_fee_head: 'INSERT INTO tbl_fee_heads SET ?',
	
	sql_get_fee_head: 'SELECT * FROM tbl_fee_heads WHERE status = ?  ORDER BY created_date DESC ',
	
	// ********************* Get student required data by class id and section id *************************//
    get_Std_By_ClassId: 'SELECT tbl_students.std_name , tbl_students.std_id , tbl_enroll.enroll_id , tbl_enroll.roll_num ,tbl_section.section_name,tbl_section.section_id, tbl_class.class_name , tbl_class.class_id ,tbl_parents.parent_name,tbl_enroll.sub_class_id FROM tbl_students ' +
		' INNER JOIN tbl_enroll on tbl_students.std_id = tbl_enroll.student_id ' + 
		' INNER JOIN tbl_parents on tbl_students.std_parentId = tbl_parents.parent_id' + 
        ' LEFT JOIN tbl_section on tbl_enroll.section_id = tbl_section.section_id ' +
		' LEFT JOIN tbl_class ON tbl_enroll.class_id = tbl_class.class_id' +
        ' WHERE tbl_enroll.class_id= ? AND tbl_enroll.year=? AND tbl_students.status= ? ',
		
	get_Std_By_sectionId: 'SELECT tbl_students.std_name , tbl_students.std_id , tbl_enroll.enroll_id , tbl_enroll.roll_num ,tbl_section.section_name,tbl_section.section_id, tbl_class.class_name , tbl_class.class_id ,tbl_parents.parent_name,tbl_enroll.sub_class_id FROM tbl_students ' +
		' INNER JOIN tbl_enroll on tbl_students.std_id = tbl_enroll.student_id ' + 
		' INNER JOIN tbl_parents on tbl_students.std_parentId = tbl_parents.parent_id' + 
        ' LEFT JOIN tbl_section on tbl_enroll.section_id = tbl_section.section_id ' +
		' LEFT JOIN tbl_class ON tbl_enroll.class_id = tbl_class.class_id' +
        ' WHERE tbl_enroll.class_id= ? AND tbl_enroll.section_id = ? ' +
        ' AND tbl_enroll.year=? AND tbl_students.status= ? ',
		
	get_std_dis_by_ClassId: 'SELECT * FROM tbl_fee_discounts WHERE class_id = ? AND year = ?',
	
	sql_check_isFeeDiscount: 'SELECT * FROM tbl_fee_discounts WHERE student_id = ? AND class_id = ? AND year = ? ',
		
};