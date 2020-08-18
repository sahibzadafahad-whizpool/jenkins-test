const express = require("express");
const router = express.Router();
const funcs = require("../backend/functions");
const ovh_functions = require("../backend/ovh_functions");
var generator = require("generate-password");
var md5 = require("md5");
var multer = require("multer");
const constants = require('../backend/constants');
const middlewares = require("../backend/middleware");
const mobileApisController = require("../backend/controllers/mobileApisController");
const suggestionsController = require("../backend/controllers/suggestionsController");
const studentsController = require("../backend/controllers/studentsController");
const teachersController = require("../backend/controllers/teachersController");
const classManagementController = require("../backend/controllers/classManagementController");
const sectionsManagementController = require("../backend/controllers/sectionsManagementController");
const subjManagementController = require("../backend/controllers/subjManagementController");
const parentsManagementController = require("../backend/controllers/parentsManagementController");
const attendaceManagementController = require("../backend/controllers/attendaceManagementController");
const examsManagementController = require("../backend/controllers/examsManagementController");
const announcementsController = require("../backend/controllers/announcementsController");
const feeManagementController = require("../backend/controllers/feeManagementController");
const adminManagementController = require("../backend/controllers/adminManagementController");
const settingsController = require("../backend/controllers/settingsController");
const assignmentsController = require("../backend/controllers/assignmentsController");
const expensesManagementController = require("../backend/controllers/expensesManagementController");
const quizesController = require("../backend/controllers/quizesController");
const resultController = require("../backend/controllers/resultController");
const employeesController = require("../backend/controllers/employeesController");
const xrefController = require("../backend/controllers/xrefController");
const diaryController = require("../backend/controllers/diaryController");



// ******** default page ***********
router.get("/", (req, res) => {
    res.send("API Testing");
});

router.get("/test", (req, res) => {
    res.send("Default Page API local  ");
});

var storage = multer.diskStorage({
    // destination
    destination: function(req, file, cb) {
        cb(null, constants.IMAGES_DIR);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});


// upload images library
var upload = multer({
    storage: storage
});

// add profile images

var profile_storage = multer.diskStorage({
    // destination
    destination: function(req, file, cb) {
        cb(null, constants.PROFILE_IMAGE_DIR);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var profile_upload = '';

try {
    // upload images library
    profile_upload = multer({
    storage: profile_storage
    });
} catch (err) {

              console.log(err);
}

var transcript_storage = multer.diskStorage({
    // destination
    destination: function(req, file, cb) {
        cb(null, constants.TRANSCRIPT_IMAGE_DIR);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var transcript_upload = '';

try {
    // upload images library
    transcript_upload = multer({
    storage: transcript_storage
    });
} catch (err) {

    console.log(err);
}
/******************************************************/

var image_storage = multer.diskStorage({
    // destination
    destination: function(req, file, cb) {
        cb(null, constants.IMAGES_DIR);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var image_upload = '';

try {
    // upload images library
    image_upload = multer({
    storage: image_storage
    });
} catch (err) {

  console.log(err);
}

router.post("/get_file_from_ovh",function(req,res){
    
    let data = {file_name:req.body.file_name};
    let response = ovh_functions.get_file_from_ovh(data);
    res.json(response)

});

router.post("/upload_file_to_ovh",upload.array("uploads[]", 6),(req,res)=>{

    let data = {file:req.files[0],file_size:"large"}
    ovh_functions.upload_file_to_ovh(data).then(function(response){
        res.json(response)
    });
    
});

//********************************************************************************************************* */
// ******************************** Mobile App APIs for parent portal ***************************************/
//******************************************************************************************************** */

//********************************************************************* */
// ************** Get student attendance report on parent ID  ***********/
//********************************************************************* */

/**
 *
 * @param {*} student_id
 * @param {*} attendStartDate
 * @param {*} attendEndDate
 * @returns {*} Attendance for the selected month
 */
router.post("/student_attendance", middlewares.jwt_auth, (req, res) => {
    let student_id = req.body.student_id;
    let attendStartDate = req.body.attendStartDate;
    let attendEndDate = req.body.attendEndDate;


    if (student_id && attendStartDate && attendEndDate) {
     mobileApisController.get_studAttendReportP(req, res);
    } else {
        let response = {
            isAuthToken: 0,
            status: 500,
            error: "All params are required"
        };
        res.json(response);
    }
});

//********************************************************************* */
// ************** Get announcements  ************************************/
//********************************************************************* */

/**
 *
 * @param {*} class_id
 * @param {*} current_timestamp
 * @returns {*} Announcements classwise or for announcements for all
 */

router.post("/announcemnts", middlewares.jwt_auth, (req, res) => {

    let class_id = req.body.class_id;
    let current_timestamp = req.body.current_timestamp;

    if (class_id && current_timestamp) {
        mobileApisController.get_announcemntsF(req, res);
    } else {
        let response = {
            isAuthToken: 0,
            status: 500,
            error: "All paramas are required"
        };
        res.json(response);
    }
});

//********************************************************************* */
// ************** Get Fee Invoice  ************************************/
//********************************************************************* */

/**
 *
 * @param {*} student_id
 * @returns {*} Fee Invoice details aginst student
 */
router.post("/fee_details", middlewares.jwt_auth, (req, res) => {
    let student_id = req.body.student_id;

    if (student_id) {
        mobileApisController.get_feeInvoiceF(req, res);
    } else {
        let response = {
            isAuthToken: 0,
            status: 500,
            error: "All params are required"
        };
        res.json(response);
    }
});

//********************************************************************* */
// ************** Get Exam Details ************************************/
//********************************************************************* */

/**
 *
 * @param {*} student_id
 * @returns {*} Exam mark details aginst student
 */

router.post("/exam_mark", middlewares.jwt_auth, (req, res) => {
    let student_id = req.body.student_id;

    if (student_id) {
        mobileApisController.get_examMarksF(req, res);
    } else {
        let response = {
            status: 500,
            error: "All params are required"
        };
        res.json(response);
    }
});

//********************************************************************* */
// ************** Get subjects against student  ************************/
//********************************************************************* */

/**
 *
 * @param {*} class_id
 * @param {*} section_id
 * @param {*} student_id
 * @returns {*} Subject details aginst student
 */

router.post("/subjects", middlewares.jwt_auth, (req, res) => {
    let student_id = req.body.student_id;
    let class_id = req.body.class_id;
    let section_id = req.body.section_id;

    if (student_id && class_id && section_id) {
        mobileApisController.get_subjectsF(req, res).then(function(subjectDetails) {
            if (subjectDetails.status == 1) {
                res.json({
                    status: 1,
                    msg: "success",
                    data: subjectDetails.data
                });
            } else if (subjectDetails.status == 0) {
                let arr = [];
                res.json({
                    status: 1,
                    msg: "No Subjects Data available",
                    data: arr
                });
            } else {
                res.json({
                    status: 402,
                    msg: subjectDetails
                });
            }
        });
    } else {
        let response = {
            status: 500,
            error: "All params are required"
        };
        res.json(response);
    }
});

//********************************************************************* */
// ************** Get subjects details against student  ************************/
//********************************************************************* */

/**
 *
 * @param {*} class_id
 * @param {*} section_id
 * @param {*} student_id
 * @returns {*} Subject details aginst student
 */

router.post("/subject_details", middlewares.jwt_auth, (req, res) => {
    let student_id = req.body.student_id;
    let subject_id = req.body.subject_id;

    if (student_id && subject_id) {
        mobileApisController.get_OnesubjectsF(req, res).then(function(subjectDetails) {
            if (subjectDetails.status == 1) {
                // call function to get details abt quizes and assignments against subject

                let subjects_data = subjectDetails.data;

                mobileApisController.get_subQuiz_Assign_Details(
                    req,
                    res,
                    subjects_data
                );
            } else if (subjectDetails.status == 0) {
                let arr = [];
                res.json({
                    status: 1,
                    msg: "No Subjects Data available",
                    data: arr
                });
            } else {
                res.json({
                    status: 402,
                    msg: subjectDetails
                });
            }
        });
    } else {
        let response = {
            status: 500,
            error: "All params are required"
        };
        res.json(response);
    }
});

//********************************************************************* */
// ************** Get Exam Details  new ************************************/
//********************************************************************* */

/**
 *
 * @param {*} student_id
 * @returns {*} Exam mark details aginst student
 */

router.post("/exam_marks", middlewares.jwt_auth, (req, res) => {
    let student_id = req.body.student_id;

    if (student_id) {
        mobileApisController.get_studentExamsF(req, res).then(function(examData) {
            console.log(examData);
            if (examData.status == 1) {
                // call function to get details abt quizes and assignments against subject

                let exam_data = examData.data;

                mobileApisController.get_student_exam_marks(req, res, exam_data);
            } else if (examData.status == 0) {
                let arr = [];
                res.json({
                    status: 1,
                    msg: "No exam marks data available",
                    data: arr
                });
            } else {
                res.json({
                    status: 402,
                    error: examData
                });
            }
        });
    } else {
        let response = {
            status: 500,
            error: "All params are required"
        };
        res.json(response);
    }
});

//********************************************************************* */
// ************** Get Quiz Assignment against student  ******************/
//********************************************************************* */

router.post("/quiz_asignments", middlewares.jwt_auth, (req, res) => {
    let student_id = req.body.student_id;

    if (student_id) {
        mobileApisController.get_quiz_assignmentF(req, res);
    } else {
        let response = {
            status: 500,
            error: "All params are required"
        };
        res.json(response);
    }
});

//********************************************************************* */
// ************** Get Quiz Assignment Details  ******************/
//********************************************************************* */

router.post("/quiz_asignment_details", middlewares.jwt_auth, (req, res) => {
    let id = req.body.id;
    let type = req.body.type;

    if (id && type) {
        mobileApisController.get_quiz_assignment_details(req, res);
    } else {
        let response = {
            status: 500,
            error: "All params are required"
        };
        res.json(response);
    }
});

// Mobile Apps APIs developed by Dilpazir

// ************************* Teacher login  *******************************/

router.post("/teacher_login", (req, res) => {
    mobileApisController.teacher_login(req, res);
});

// ************************* GET teacher schedule  *******************************/

router.post("/get_teacher_schedule",middlewares.jwt_auth, (req, res) => {
    mobileApisController.get_teacher_schedule(req, res);
});

// ************************* GET teacher default classes  *******************************/

router.post("/get_teacher_default_classes",middlewares.jwt_auth, (req, res) => {
    mobileApisController.get_teacher_default_classes(req, res);
});

router.post("/get_teacher_default_classes_list",middlewares.jwt_auth, (req, res) => {
    mobileApisController.get_teacher_default_classes_list(req, res);
});

router.post("/get_teacher_default_sections_list",middlewares.jwt_auth, (req, res) => {
    mobileApisController.get_teacher_default_sections_list(req, res);
});

router.post("/get_class_students_for_attendance",middlewares.jwt_auth, (req, res) => {
    mobileApisController.get_class_students_for_attendance(req, res);
});

router.post("/mark_class_attendance",middlewares.jwt_auth, (req, res) => {
    mobileApisController.mark_class_attendance(req, res);
});

router.post("/add_class_assignment",middlewares.jwt_auth, function(req,res){
    mobileApisController.add_class_assignment(req, res);
});

router.post("/add_class_quiz",middlewares.jwt_auth, function(req,res){
    mobileApisController.add_class_quiz(req, res);
});

//********************************************************************* */
// ************************* Parent login Check  *******************************/
//********************************************************************* */
router.post("/login", (req, res, next) => {
    mobileApisController.loginCheck_Fun(req, res);
});



// this middleware provide jwt auth to APIs

// router.use(middlewares.web_api_auth);




//********************************************************************* */
// ************************* Test API *******************************/
//********************************************************************* */

router.get("/api/test", (req, res) => {
    res.json("Hi, API test");
});



//********************************************************************* */
// ************************* Log out  *******************************/
//********************************************************************* */
router.get("/logout", (req, res) => {
    let header = req.headers;
    let public_key = header.public_key;
    let private_key = header.private_key;

    if (public_key && private_key) {
        funcs.authTokenCheckF(req, res).then(function(authResp) {
            if (authResp[0].isAuthToken == 1) {
                funcs.logoutFun(req, res);
            } else {
                res.json({
                    status: 403,
                    msg: "Invalid Auth Token"
                });
            }
        });
    } else {
        let response = {
            isAuthToken: 0,
            status: 500,
            error: "Auth Keys are required"
        };
        res.json(response);
    }

    // if (authResp[0].isAuthToken == 1) {
    //     //if AuthToken is valid call Auth key reset function

    //

    // } else {

    //
    // }
});

//********************************************************************************************************* */
// ********************************** Teachers Management APIs *********************************************/
//******************************************************************************************************** */

//********************************************************************* */
// ******************** get teachers data *******************************/
//********************************************************************* */

router.get("/get/teachers/:role_xref_id", (req, res) => {
    teachersController.get_teachersFun(req, res);
});

//********************************************************************* */
// ********** get teachers data with pagination **************************/
//********************************************************************* */

router.post("/list/teachers_with_pagination", (req, res) => {
    teachersController.get_teachersWithPaginFun(req, res);
});

//********************************************************************* */
// ******************** get teachers Name and ID only *******************/
//***********************************************************************/

router.get("/get/teacherNameId", (req, res) => {
    teachersController.get_teacherNameIdFun(req, res);
});

//********************************************************************* */
// ******************** get Singal teacher data *************************/
//********************************************************************* */

router.get("/get/teacher/:id", (req, res) => {
    teachersController.get_teacherFun(req, res);
});

router.post("/get/teacher/schedule", (req, res) => {
    teachersController.get_teacher_schedule(req, res);
});

//********************************************************************* */
// ******************** Add teachers data *******************************/
//********************************************************************* */

router.post("/add/teacher", (req, res) => {
    teachersController.add_teacherFun(req, res);
});

//********************************************************************* */
// ******************** Update teachers data ****************************/
//********************************************************************* */

router.put("/update/teacher/:id", (req, res) => {
    teachersController.update_teacherFun(req, res);
});

//********************************************************************* */
// ******************** Delete Teachers Data ***************************//
//********************************************************************* */

router.delete("/delete/teacher/:id", (req, res) => {
    teachersController.delete_teacher_logicalFun(req, res);
});

router.get("/get_salary_template", (req, res) => {
    teachersController.get_salary_template(req, res);
});

//********************************************************************************************************* */
// ***************************************** Class Management APIs ******************************************/
//******************************************************************************************************** */

//********************************************************************* */
// ************************ get sub class data ******************************/
//********************************************************************* */

router.get("/get/subclasses", (req, res) => {
    classManagementController.get_subclassData(req, res);
});

//********************************************************************* */
// ************************ get class data ******************************/
//********************************************************************* */

router.get("/get/classes/:mode?",middlewares.jwt_auth, (req, res) => {
    let user_info = req.body.jwt_data;
    let role_xref_id = user_info.role_xref_id
    
    let mode = req.params.mode
    //for admin we need all classes, for teacher if mode is default then return only default classes(i.e. in which the teacher is class teacher) otherwise return current classes in which teacher is teaching

    //if this is admin, get all classes, if this is teacher get current classes
    if(role_xref_id==-1){
        //admin
    classManagementController.get_classFun(req, res);
    }
    else if(role_xref_id!=-1 && mode=='default'){
        mobileApisController.get_teacher_default_classes_list(req,res);
    }
    else{
        mobileApisController.get_teacher_current_classes_list(req,res);
    }
    
});

//********************************************************************* */
// ******************** get Single Class data by class ID ***************/
//********************************************************************* */

router.get("/get/classById/:id", (req, res) => {
    classManagementController.get_classById(req, res);
});

//********************************************************************* */
// ******************** Check Class Already Added ***********************/
//********************************************************************* */

router.get("/get/classByName/:c_name", (req, res) => {
    classManagementController.get_classByNameFun(req, res);
});

//********************************************************************* */
// ******************** Add Class data **********************************/
//********************************************************************* */

router.post("/add/class",middlewares.jwt_auth, (req, res) => {
    classManagementController.add_classFun(req, res);
});

//********************************************************************* */
// ******************** Add Sub Class data **********************************/
//********************************************************************* */
router.post("/add/subclass", (req, res) => {
    classManagementController.add_SubClass(req, res);
});

//********************************************************************* */
// ******************** Update sub Class Data *******************************/
//********************************************************************* */

router.put("/update/subclass/:id", (req, res) => {
    classManagementController.update_subclass(req, res);
})

//********************************************************************* */
// ******************** Delete Class Data *******************************/
//********************************************************************* */

router.put("/delete/subclass/:id", (req, res) => {
    classManagementController.delete_sub_class(req, res);
});

//********************************************************************* */
// ******************** Delete Class Data *******************************/
//********************************************************************* */

router.put("/delete/class/:id", (req, res) => {
    classManagementController.delete_classFun(req, res);
});

//********************************************************************* */
// ******************** Update Class Data *******************************/
//********************************************************************* */

router.put("/update/class/:id", (req, res) => {
    classManagementController.update_classFun(req, res);
});

//********************************************************************************************************* */
// ***************************************** Section Management APIs ***************************************/
//******************************************************************************************************** */

//********************************************************************* */
// **************** get only section Data by Class ID *******************/
//********************************************************************* */

router.get("/get/sectionData/:class_id", (req, res) => {
    sectionsManagementController.get_sectionDataFun(req, res);
});

//********************************************************************* */
// ********* get section related all Data by Class ID *******************/
//********************************************************************* */

router.get("/get/sectionRelatedData/:class_id/:mode?",middlewares.jwt_auth, (req, res) => {
    let user_info = req.body.jwt_data;
    let role_xref_id = user_info.role_xref_id

    let mode = req.params.mode
    //for admin we need all sections, for teacher if mode is default then return only default sections(i.e. in which the teacher is class teacher) otherwise return current sections in which teacher is teaching

    if(role_xref_id==-1){
        //admin
    sectionsManagementController.get_sectionRealtedDataFun(req, res);
    }
    else if(role_xref_id!=-1 && mode=='default'){
        req.body.class_id = req.params.class_id
        mobileApisController.get_teacher_default_sections_list(req,res);
    }
    else{
        req.body.class_id = req.params.class_id
        mobileApisController.get_teacher_current_sections_list(req,res);
    }
    
});

//********************************************************************* */
// ****** get Single section Data by Class ID , Section ID *************/
//********************************************************************* */

router.get("/get/singleSection/:section_id/:class_id", (req, res) => {
    sectionsManagementController.get_singleSectionFun(req, res);
});

//********************************************************************* */
// ******************** Add Section data ********************************/
//********************************************************************* */

router.post("/add/section",middlewares.jwt_auth, (req, res) => {
    //call isSection already added against class
    sectionsManagementController.check_sectionExists(req, res).then(function(isSection) {
        if (isSection == 1) {
            res.json({
                status: 0,
                msg: "Section already added against class"
            });
        } else if (isSection == 0) {
            // call function to add
            sectionsManagementController.add_sectionFun(req, res);
        } else {
            res.json({
                status: 402,
                msg: isSection
            });
        }
    });
});

//********************************************************************* */
// ******************** Check Section Already Added ***********************/
//********************************************************************* */

router.get("/check/sectionExists/:class_id/:section_name", (req, res) => {
    sectionsManagementController.check_sectionExists(req, res);
});

//************************************************************************ */
// ******************** Select Section by class ID ************************/
//********************************************************************* ***/

router.get("/get/sectionByClassId/:class_id", (req, res) => {
    sectionsManagementController.get_sectionByClassIdFun(req, res);
});

//************************************************************************/
// ******************* Delete Section Data by class ID ******************/
//************************************************************************/

router.put("/delete/sectionByClassId/:class_id", (req, res) => {
    sectionsManagementController.delete_sectionByClassIdFun(req, res);
});

//************************************************************************/
// ******************* Delete Section Data by Section ID ******************/
//************************************************************************/

router.put("/delete/section/:class_id/:section_id", (req, res) => {
    sectionsManagementController.delete_sectionFun(req, res);
});

//************************************************************************/
// ******************* Update Section Data *******************************/
//************************************************************************/

router.put("/update/section/:class_id/:section_id", (req, res) => {
    sectionsManagementController.update_sectionFun(req, res);
});

//********************************************************************************************************* */
// ***************************************** Subject Management APIs ***************************************/
//******************************************************************************************************** */

//********************************************************************* */
// ******************** get Elective Subject Data by Class ID ************************/
//********************************************************************* */

router.get("/get/eSubject/:class_id/:running_session", (req, res) => {
    subjManagementController.get_eSubjectFun(req, res);
});

//********************************************************************* */
// ******************** get Core Subject Data by Class ID ************************/
//********************************************************************* */

router.get("/get/cSubject/:class_id/:running_session", (req, res) => {
    subjManagementController.get_cSubjectFun(req, res);
});

//********************************************************************* */
// ********** get Core Subject Data by Class and Section ID **************/
//********************************************************************* */

router.get(
    "/get/cSubjectByClassSec/:class_id/:section_id/:running_session",
    (req, res) => {
        subjManagementController.get_cSubjectByClassSec(req, res);
    }
);

//********************************************************************* */
// ******************** Add Subject data ********************************/
//********************************************************************* */

router.post("/add/subject", (req, res) => {
    subjManagementController.add_subjectFun(req, res);
});

//********************************************************************* */
// ******** Check subject is already added against class ***************/
//********************************************************************* */

router.post("/check/subject", (req, res) => {
    subjManagementController.check_subjectFun(req, res);
});

//********************************************************************* */
// ****get Single Subject Data by Class ID ,Section ID , Subject ID ****/
//********************************************************************* */

router.get(
    "/get/singleSubject/:class_id/:section_id/:subject_id/:running_session",
    (req, res) => {
        subjManagementController.get_singleSubjectFun(req, res);
    }
);

//********************************************************************* */
// ********************* Update subject details *************************/
//********************************************************************* */

router.put("/update/subject/:class_id/:section_id/:subject_id", (req, res) => {
    subjManagementController.update_subjectFun(req, res);
});

//********************************************************************* */
// ********************* Update subject details *************************/
//********************************************************************* */

router.put("/delete/subject/:class_id/:section_id/:subject_id", (req, res) => {
    subjManagementController.delete_subjectFun(req, res);
});

//********************************************************************* */
// ********************* Get student elective subjects ******************/
//********************************************************************* */

router.get("/get/stdElectiveSubj/:student_id/:running_session", (req, res) => {
    subjManagementController.stdElectiveSubjFun(req, res);
});

//********************************************************************* */
// ************** Get class , section elective subjects ******************/
//********************************************************************* */

router.get(
    "/get/classSecElectSubj/:class_id/:section_id/:running_session",
    (req, res) => {
        subjManagementController.classSecElectiveSubjFun(req, res);
    }
);

//********************************************************************* */
// ******** Check elective subject is assigned to student  ***************/
//********************************************************************* */

router.post("/check/elecSubAdded", (req, res) => {
    subjManagementController.check_elecSubAddedFun(req, res);
});

//********************************************************************* */
// **************** Assign elective subjects to student  ***************/
//********************************************************************* */

router.post("/assign/electiveSubj", (req, res) => {
    subjManagementController.assign_electiveSubjFun(req, res);
});

//********************************************************************* */
// **************** Delete student elective subjects ***  ***************/
//********************************************************************* */

router.delete("/delete/stdElectiveSubj/:elective_subId", (req, res) => {
    subjManagementController.delete_stdElectiveSubjFun(req, res);
});

//********************************************************************************************************* */
// ***************************************** Parents Management APIs ***************************************/
//******************************************************************************************************** */

//********************************************************************* */
// ******************** Add Parent data ********************************/
//********************************************************************* */

router.post("/add/parent", (req, res) => {
    parentsManagementController.add_parentFun(req, res);

});

//********************************************************************* */
// ******************** Get Parents data ********************************/
//********************************************************************* */

router.get("/get/parents", (req, res) => {
    parentsManagementController.get_parentsFun(req, res);
});

//********************************************************************* */
// ******* Get Parents data with pagination ********************************/
//********************************************************************* */

router.post("/list/parentsWithPagination", (req, res) => {
    parentsManagementController.get_parentsWithPagnFun(req, res);
});

//********************************************************************* */
// ******************** Get Single Parents data **************************/
//********************************************************************* */

router.get("/get/singleParent/:parent_id", (req, res) => {
    parentsManagementController.get_singleParentFun(req, res);
});

//********************************************************************* */
// ******************** Update Parents data **************************/
//********************************************************************* */

router.put("/update/parent/:parent_id", (req, res) => {
    parentsManagementController.update_parentFun(req, res);
});

//********************************************************************* */
// ******************** Update Parents password **************************/
//********************************************************************* */

router.put("/update/pPassword/:parent_id", (req, res) => {
    parentsManagementController.update_parentPassFun(req, res);
});

//********************************************************************* */
// ******************** Delete Parents data **************************/
//********************************************************************* */

router.put("/delete/parent/:parent_id", (req, res) => {
    parentsManagementController.delete_parentFun(req, res);
});

//********************************************************************************************************* */
// ***************************************** Student Management APIs ***************************************/
//******************************************************************************************************** */

//********************************************************************* */
// ******************** Add Student data ********************************/
//********************************************************************* */

router.post("/add/student", (req, res) => {
    studentsController.add_studentFun(req, res);
});

//********************************************************************* */
// ******************** Verify Student Parent ***************************/
//********************************************************************* */

router.post("/verify/parent", (req, res) => {
    studentsController.verify_parentFun(req, res);
});

//********************************************************************* */
// ******************** Enroll Student data ********************************/
//********************************************************************* */

router.post("/enroll/student", (req, res) => {
    studentsController.enroll_studentFun(req, res);
});

router.post("/get/parent_from_cnic", (req, res) => {
    studentsController.get_parent_from_cnic(req, res);
});

//********************************************************************* */
// ******************** Get Student data Against Class *******************/
//********************************************************************* */

router.get("/get/students/:class_id/:running_session", (req, res) => {
    studentsController.get_studentsFun(req, res)
    .then(function(response){
        res.json(response)
    });
});

//********************************************************************* */
// ************ Get Student  data Against Class and Section **************/
//********************************************************************* */

router.get(
    "/get/studentsByClassSecId/:class_id/:section_id/:running_session/:data_required",
    (req, res) => {
        studentsController.get_studentsByClassSecId(req, res);
    }
);

//********************************************************************* */
// ************** Get Single Student data Against student id ************/
//********************************************************************* */

router.get("/get/singleStudent/:student_id/:running_session", (req, res) => {
    studentsController.get_singleStudentFun(req, res);
});

router.get("/get/parent_info_from_student/:student_id", (req, res) => {
    studentsController.parent_info_from_studentFun(req, res);
});

//********************************************************************* */
// ************** Get Student Exam result against exam , std id ************/
//********************************************************************* */

router.get(
    "/get/std_result/:exam_id/:student_id/:running_session",
    (req, res) => {
        studentsController.get_stdExamResultFun(req, res);
    }
);

//********************************************************************* */
// ************** Get Student ALl Exam result ************/
//********************************************************************* */

router.get("/get/std_result/:student_id/:running_session", (req, res) => {
    studentsController.get_stdExamResultFun(req, res);
});

//********************************************************************* */
// ************** Update Student Personal data Against student id ********/
//********************************************************************* */

router.put("/update/studentInfo/:std_id", (req, res) => {
    studentsController.update_studentInfoFun(req, res);
});

//********************************************************************* */
// **** Update Student educational data Against student id , enroll id ***/
//********************************************************************* */

router.put("/update/studentEduInfo/:std_id", (req, res) => {
    studentsController.update_studentEduInfoFun(req, res);
});

//********************************************************************* */
// ********** Delete student from student table and enroll table *********/
//********************************************************************* */

router.put("/delete/student/:std_id", (req, res) => {
    studentsController.delete_studentFun(req, res);
});

//********************************************************************* */
// ******************* Get student info for promotion *******************/
//********************************************************************* */

router.get(
    "/get/std_promotionInfo/:class_id/:current_session/:next_session",
    (req, res) => {
        studentsController.get_std_promotionInfoF(req, res);
    }
);

//********************************************************************* */
// *********** Student new enrollment after promotion *******************/
//********************************************************************* */

router.post("/new/enrollment", (req, res) => {
    //check student alreadyenrolled in selected session class , section
    studentsController.check_isEnrolled(req, res).then(function(isEnrolled) {
        if (isEnrolled.status == 1) {
            res.json({
                status: 3,
                msg: "Student already enrolled in selected next session."
            });
        } else if (isEnrolled.status == 0) {
            // if attendance not  marked on selected timestamp , call function to mark  attendance

            studentsController.add_newStdEnrollmentFun(req, res);
        } else {
            res.json({
                status: 405,
                msg: isEnrolled
            });
        }
    });
});

//********************************************************************* */
// *********** Student new enrollment in bulk after promotion**************/
//********************************************************************* */

router.post("/new/bulk_enrollment", (req, res) => {
    studentsController.bulk_std_promotion(req, res);
});

//********************************************************************************************************* */
// ***************************************** Attendance Management APIs ***************************************/
//******************************************************************************************************** */

//********************************************************************* */
// ***************** Get student details for attendance  ***************/
//********************************************************************* */

router.get(
    "/get/stdForMrkAttendance/:class_id/:section_id/:running_session/:timestamp",
    (req, res) => {
        attendaceManagementController.get_stdForMrkAttendance(req, res);
    }
);

//********************************************************************* */
// ******************** Mark Attendance  ********************************/
//********************************************************************* */

router.post("/mark/attendance", (req, res) => {

      // check attendace already marked on selected timestamp
    attendaceManagementController.check_isMarkedAttend(req, res).then(function(isAttendMark) {
        if (isAttendMark == 1) {
            // if attendance already marked on selected timestamp , call function to update attendance
            attendaceManagementController.update_attendanceFun(req, res);
        } else if (isAttendMark == 0) {
            // if attendance not  marked on selected timestamp , call function to mark  attendance

            attendaceManagementController.mark_attendanceFun(req, res);
        } else {
            res.json({
                status: 405,
                msg: isAttendMark
            });
        }
    });

});

//********************************************************************* */
// ******************** Mark Attendance in bulk *************************/
//********************************************************************* */

router.post("/mark/bulk_attendance", (req, res) => {
    attendaceManagementController.mark_attend_inBulk(req, res);
});

//********************************************************************* */
// ******************** Mark Attendance in bulk *************************/
//********************************************************************* */

router.post("/update/absent_reason", (req, res) => {
    attendaceManagementController.update_absent_reason(req, res);
});

//********************************************************************* */
// ***************** Get student Attendance report  ********************/
//********************************************************************* */

router.post("/get/EmployeesAttendanceReport", (req, res) => {
    employeesController.get_employees_attendance_report(req, res).then(function(data) {
        res.json({
            status: 1,
            data: data
        });
    });
});

router.get(
    "/get/stdAttendReport/:class_id/:section_id/:student_id/:attendStartDate/:attendEndDate/:running_session",
    (req, res) => {

        //we need different results in case of attendance of 1 month and in case of more than one months
        //so lets find out what are we doing

        let start_date = req.params.attendStartDate;
        let end_date = req.params.attendEndDate;
        
        let st = new Date(start_date*1000);
        let en = new Date(end_date*1000);

        let start_date_month = st.getMonth();
        let end_date_month = en.getMonth();
        
        //if these months are not = then we need to calculate monthly attendance otherwise daily

        if(start_date_month==end_date_month){
        attendaceManagementController.get_stdAttendReportData(req, res).then(function(studentsData) {
            res.json({
                status: 1,
                data: studentsData
            });
        });
    }
        else{
            attendaceManagementController.get_stdAttendReportMonthlyData(req, res).then(function(studentsData) {
                res.json({
                    status: 1,
                    data: studentsData
                });
            });
        }
        
    }
    
);

router.get(
    "/get/role_xref",
    (req, res) => {
        xrefController.get_role_xref(req, res);
    }
);

router.get(
    "/get/expense_category_type_xref",
    (req, res) => {
        xrefController.get_expense_category_type_xref(req, res);
    }
);

router.get(
    "/get/students_of_class_section/:class_id/:section_id/:running_session",
    (req, res) => {
        attendaceManagementController.get_students_of_class_section(req, res);
    }
);
//********************************************************************************************************* */
// ***************************************** Exam Management APIs ***************************************/
//******************************************************************************************************** */

//********************************************************************* */
// ************************** Add new exam  *****************************/
//********************************************************************* */

router.post("/add/newExam", (req, res) => {
    examsManagementController.add_examFun(req, res);
});

router.post("/mark_employee_attendance", (req, res) => {
    employeesController.mark_employee_attendance(req, res).then(function(data) {
        res.json({
            status: 1
        });
    });
});

router.post("/get/employees_for_attendance", (req, res) => {
    employeesController.get_employees_for_attendance(req, res).then(function(data) {
        res.json({
            status: 1,
            data: data
        });
    });
});

router.post("/get/employees", (req, res) => {
    employeesController.get_employees(req, res);
});

//********************************************************************* */
// ************************** Get exams list  ***************************/
//********************************************************************* */

router.get("/get/examList/:running_session", (req, res) => {
    examsManagementController.get_examListFun(req, res);
});

//********************************************************************* */
// ************************** Get Single exams data**********************/
//********************************************************************* */

router.get("/get/singleExamList/:exam_id", (req, res) => {
    examsManagementController.get_singleExamListFun(req, res);
});

//********************************************************************* */
// ************************** Delete exams   ***************************/
//********************************************************************* */

router.delete("/delete/exam/:exam_id", (req, res) => {
    examsManagementController.delete_examFun(req, res);
});

//********************************************************************* */
// ************************** update exam data   ***************************/
//********************************************************************* */

router.put("/update/exam/:exam_id", (req, res) => {
    examsManagementController.update_examFun(req, res);
});

//********************************************************************* */
// **************** get students to manage marks   **********************/
//********************************************************************* */

router.get(
    "/get/stdForMngMarks/:class_id/:section_id/:exam_id/:subject_id/:running_session/:subject_type",
    (req, res) => {
        examsManagementController.get_stdForMngMarksFun(req, res);
    }
);

//********************************************************************* */
// ******************** Add / update exam marks  ********************************/
//********************************************************************* */

router.post("/add/examMarks", (req, res) => {
      //check result already marked on selected timestamp
    examsManagementController.check_isMarkedExmMarks(req, res).then(function(isMarkedExmMarks) {
        if (isMarkedExmMarks.status == 1) {
            // if marks already marked against exam then update
            examsManagementController.update_examMarksFun(req, res, isMarkedExmMarks.marks_id);
        } else if (isMarkedExmMarks.status == 0) {
            // if marks doesnt already marked against exam then add new marks

            examsManagementController.mark_examMarksFun(req, res);
        } else {
            res.json({
                status: 405,
                msg: isMarkedExmMarks
            });
        }
    });
});


// ****** Get quizes Details *****************

router.post("/get/quiz/details", (req, res) => {

    quizesController.get_quizes_details(req, res);
});



// ****** Add quizes Details *****************

router.post("/add/quiz/details", (req, res) => {

    quizesController.add_quizes_details(req, res);

});

// ****** Get student quizes Details *****************

router.post("/get/students/quiz_details", (req, res) => {

    quizesController.get_stdquizes_marks(req, res);
});


// ****** Update/Add student quizes Marks *****************

router.post("/add/students/quiz_marks", (req, res) => {
    // check attendace already marked on selected timestamp
    quizesController
        .check_isMarkedQuizMarks(req, res)
        .then(function(isMarkedQuizMarks) {
            if (isMarkedQuizMarks.status == 1) {
                // if marks already marked against quiz then update
                quizesController.update_quizMarksFun(
                    req,
                    res,
                    isMarkedQuizMarks.std_quiz_id
                );
            } else if (isMarkedQuizMarks.status == 0) {
                // if marks doesnt already marked against assignment then add new marks

                quizesController.mark_quizMarksFun(req, res);
            } else {
                res.json({
                    status: 405,
                    msg: isMarkedQuizMarks
                });
            }
        });
});







//********************************************************************* */
// *************************Quiz Image upload API *******************************/
//********************************************************************* */

router.post("/quiz/images", upload.array("uploads[]", 6), async function(
    req,
    res,
    next
) {

    let image_upload_response = await funcs.upload_images(req, res, next);
    res.json(image_upload_response);

});


//********************************************************************************************************* */
// ***************************************** Result Management APIs **********************************/
//******************************************************************************************************** */

// ******************* Fetch Result Summary  ********************/

router.post("/get/result/summary", (req, res) => {
    resultController.fetch_resultSummary(req, res);
});



//********************************************************************************************************* */
// ***************************************** Announcement Management APIs **********************************/
//******************************************************************************************************** */

//********************************************************************* */
// ******************* Add new announcement details  ********************/
//********************************************************************* */

router.post("/add/new_announcement", (req, res) => {
    announcementsController.add_new_announcementFun(req, res);
});

//********************************************************************* */
// ******************* Get active announcement details  ********************/
//********************************************************************* */

router.get("/get/active/announcements", (req, res) => {
    announcementsController.get_activeAnnouncementFun(req, res);
});

//********************************************************************* */
// ******************* Get expired announcement details  ********************/
//********************************************************************* */

router.get("/get/expired/announcements", (req, res) => {
    announcementsController.get_expiredAnnouncementFun(req, res);
});

//********************************************************************* */
// ******************* Get Single announcement details  ********************/
//********************************************************************* */

router.get("/get/single_announcement/:announcement_id", (req, res) => {
    announcementsController.get_single_announcementFun(req, res);
});

//********************************************************************* */
// ************************** update announcement data   ***************************/
//********************************************************************* */

router.put("/update/announcement/:announcement_id/:update_type", (req, res) => {
    announcementsController.update_announcementFun(req, res);
});

//********************************************************************* */
// ************************** Delete announcement data   ***************************/
//********************************************************************* */

router.delete("/delete/announcement/:announcement_id", (req, res) => {
    announcementsController.delete_announcementFun(req, res);
});

//********************************************************************************************************* */
// ***************************************** Fee Management APIs ***************************************/
//******************************************************************************************************** */

//********************************************************************* */
// ************************** Add new fee struct  *****************************/
//********************************************************************* */

router.post("/add/FeeStruct", (req, res) => {
    feeManagementController
    .check_isFeeAlreadyStructSet(req, res)
    .then(function(isFeeAlreadyStructSet) {
        if (isFeeAlreadyStructSet.status == 1) {
            // if fee struct is already set
            res.json({
                status: 3,
                msg: "Fee structure is already set for selected class , kindly update from update section "
            });
        } else if (isFeeAlreadyStructSet.status == 0) {
            // if fee struct is not already set
            feeManagementController.add_feeStructFun(req, res);
        } else {
            res.json({
                status: 402,
                msg: isFeeAlreadyStructSet
            });
        }
    });
});

//********************************************************************* */
// ************************** Get fee struct details *********************/
//********************************************************************* */

router.get("/get/fee_structDetails/:running_session", (req, res) => {
    feeManagementController.get_fee_structDetailsFun(req, res);
});

//********************************************************************* */
// ************************** Get fee struct details by class id *********************/
//********************************************************************* */

router.get(
    "/get/getFeeStructByClassId/:class_id/:running_session",
    (req, res) => {
        feeManagementController.getFeeStructByClassId(req, res);
    }
);

//********************************************************************* */
// ************** Get Single class fee struct details *******************/
//********************************************************************* */

router.get("/get/single_ClassfeeStructData/:fee_struct_id", (req, res) => {
    feeManagementController.get_single_ClassfeeStructData(req, res);
});

//********************************************************************* */
// ************************** Delete fee struct details *********************/
//********************************************************************* */

router.delete("/delete/fee_structure/:fee_struct_id", (req, res) => {
    feeManagementController.delete_feeStructFun(req, res);
});

//********************************************************************* */
// ************************** Update fee struct details *********************/
//********************************************************************* */

router.put("/update/class_feeStruct", (req, res) => {
    feeManagementController.update_feeStructFun(req, res);
});

//********************************************************************* */
// ***************** Get class students details ************************ /
//********************************************************************* */

router.get("/get/class_students/:class_id/:section_id/:running_session", (req, res) => {
    // check fee structure against selected class
    feeManagementController
        .check_isFeeStructSet(req, res, "forFdiscount")
        .then(function(isFeeStructSet) {
            if (isFeeStructSet.status == 1) {
                // if fee struct is  set
                feeManagementController.get_classStudentsF(req, res);
            } else if (isFeeStructSet.status == 0) {
                // if fee struct is not already set
                res.json({
                    status: 0,
                    msg: "Kindly set fee structure for selected class"
                });
            } else {
                res.json({
                    status: 402,
                    msg: isFeeAlreadyStructSet
                });
            }
        });
});

//********************************************************************* */
// ***************** Get class fee details by class id *****************/
//********************************************************************* */

router.get("/get/class_feeDetails/:class_id/:running_session", (req, res) => {
    feeManagementController.get_classFeeF(req, res);
});

//********************************************************************* */
// ***************** Set student fee discount  *****************/
//********************************************************************* */

router.post("/set/studentFeeDiscount", (req, res) => {
    feeManagementController.set_studentFeeDiscountFun(req, res);
});

//********************************************************************* */
// ******************* List students fee discounts  *****************/
//********************************************************************* */

router.get(
    "/get/studentsFeeDiscList/:class_id/:running_session",
    (req, res) => {
        feeManagementController.get_studentsFeeDiscListFun(req, res);
    }
);

//********************************************************************* */
// ********** gwt single students fee discounts details  *****************/
//********************************************************************* */

router.get("/get/singleStdFeeDiscDetails/:discount_id", (req, res) => {
    feeManagementController.get_singleStdFeeDiscDetailsFun(req, res);
});

//********************************************************************* */
// ********** update students fee discounts details  *****************/
//********************************************************************* */

router.put("/update/stdFeeDiscountDetails/:discount_id", (req, res) => {
    feeManagementController.update_stdFeeDiscountDetails(req, res);
});

//********************************************************************* */
// ********** disable students fee discounts   *****************/
//********************************************************************* */

router.put("/change/stdFeeDiscount_status/:discount_id/:status", (req, res) => {
    feeManagementController.change_stdFeeDiscountStatus(req, res);
});

//********************************************************************* */
// ****************** create Class Fee invoice   ************************/
//********************************************************************* */

router.post("/create/classFeeInvoice", (req, res) => {
    feeManagementController
    .check_classFeeInvoiceFunGenerated(req, res)
    .then(function(feeInvoiceCheck) {
        if (feeInvoiceCheck.status !== 1) {
            // get all students against selected class
            feeManagementController
                .get_allClassStudents(req, res)
                .then(function(getAllStudentsRes) {
                    if (getAllStudentsRes.status == 1) {
                        // if students present  for the class then call API to create invoice
                        feeManagementController
                            .create_classFeeInvoice(req, res, getAllStudentsRes.data)
                            .then(function(createInvoiceResp) {
                                if (createInvoiceResp.status == 1) {
                                    //add fee previous month pending amount in current invoice

                                    feeManagementController
                                        .add_pendingAmount(req, res)
                                        .then(function(pending_amount_added) {
                                            if (pending_amount_added.status == 1) {
                                                // if invoice created , then deduct amount from fee for those students who got scholrship
                                                feeManagementController.deduct_discountFeeAmount(req, res);
                                            } else {
                                                res.json({
                                                    status: 402,
                                                    msg: pending_amount_added // send db error
                                                });
                                            }
                                        });
                                } else {
                                    res.json({
                                        status: 402,
                                        msg: createInvoiceResp // send db error
                                    });
                                }
                            });
                    } else if (getAllStudentsRes.status == 0) {
                        res.json({
                            status: 0,
                            msg: "No student available for selected class"
                        });
                    } else {
                        res.json({
                            status: 402,
                            msg: getAllStudentsRes // send db error
                        });
                    }
                });
        } else if (feeInvoiceCheck.status == 1) {
            // invoice already generated for the class
            res.json({
                status: 3,
                msg: "Class Fee Invoice already created for the selected month ."
            });
        } else {
            res.json({
                status: 402,
                msg: feeDisCheck // send db error
            });
        }
    })
    .catch(function(error) {
        res.json({
            status: 404,
            msg: error.message
        });
    });
});

//********************************************************************* */
// ****************** Get Student Fee invoice details  ******************/
//********************************************************************* */

router.get(
    "/get/getStdFeeInvoiceDetails/:class_id/:fee_month/:running_session",
    (req, res) => {
        feeManagementController.get_StdFeeInvoiceDetailsF(req, res);
    }
);

//********************************************************************* */
// ****************** Update Student Fee invoice details  ******************/
//********************************************************************* */

router.put("/update/feeInvoiceDetails/:invoice_id", (req, res) => {
    feeManagementController.update_feeInvoiceDetailsFun(req, res);
});

//********************************************************************* */
// ****************** Update Student Fee payment details  ******************/
//********************************************************************* */

router.put("/update/feePaymentDetails/:invoice_id", (req, res) => {
    feeManagementController.update_feePaymentDetailsFun(req, res);
});

//********************************************************************* */
// ****************** Get Student Fee payment Histroy  ******************/
//********************************************************************* */

router.get(
    "/get/studentFeeHistroy/:student_id/:running_session",
    (req, res) => {
        feeManagementController.get_studentFeeHistroyFun(req, res);
    }
);

router.get(
    "/get_role_xref",
    (req, res) => {
        funcs.get_role_xref(req, res);
    }
);

//********************************************************************************************************* */
// ***************************************** Admin User Management APIs ***************************************/
//******************************************************************************************************** */


//********************************************************************* */
// ************************* Admin Login API *******************************/
//********************************************************************* */

router.post("/admin/login", (req, res, next) => {
    if(req.body.role_xref_id!='-1' && req.body.role_xref_id!=''){
        adminManagementController.employee_login(req, res, next);
    }
    else{
    adminManagementController.admin_login(req, res, next);
    }
});


//********************************************************************* */
// ************************** Add new user  *****************************/
//********************************************************************* */

router.post("/add/new_user", (req, res) => {
    adminManagementController.check_userEmail(req, res).then(function(userAlreadyAdded) {
        if (userAlreadyAdded.status !== 1) {
            adminManagementController.set_addNewUserFun(req, res);
        } else if (userAlreadyAdded.status == 1) {
            // user email already exists
            res.json({
                status: 3,
                msg: "User already added against given email."
            });
        } else {
            res.json({
                status: 402,
                msg: userAlreadyAdded
            });
        }
    });
});

//********************************************************************* */
// ************************** Get user data  *****************************/
//********************************************************************* */

router.get("/get/user_data", (req, res) => {
    adminManagementController.get_userdataFun(req, res);
});

//********************************************************************* */
// ************************** Update user Info  *****************************/
//********************************************************************* */

router.put("/update/update_userInfo/:login_id", (req, res) => {
    adminManagementController.check_onUpdateUserEmail(req, res).then(function(emailcheck) {
        if (emailcheck.status !== 1) {
            adminManagementController.update_userInfoFun(req, res);
        } else if (emailcheck.status == 1) {
            // user email already exists
            res.json({
                status: 3,
                msg: "Email is already in use."
            });
        } else {
            res.json({
                status: 402,
                msg: emailcheck
            });
        }
    });
});

//********************************************************************* */
// ************************** Update user password  *****************************/
//********************************************************************* */

router.put("/update/userPassword", (req, res) => {
    adminManagementController.update_userPasswordF(req, res);
});

//********************************************************************* */
// ************************** Forget password *****************************/
//********************************************************************* */

router.post("/forget/password", (req, res) => {
    adminManagementController.check_userEmail(req, res).then(function(userAlreadyAdded) {
        let user_email = req.body.user_email;
        if (userAlreadyAdded.status !== 1) {
            res.json({
                status: 3,
                msg: "Email isnt registered"
            });
        } else if (userAlreadyAdded.status == 1) {
            // check email is registered

            let password = generator.generate({
                // generate random password
                length: 10,
                numbers: true
            });

            let hash_password = md5(password); // hash generated password
            adminManagementController
                .reset_passwordUpdate(req, res, hash_password)
                .then(function(newpasswordreset) {
                    if (newpasswordreset.status == 1) {
                        funcs.sendEmail(req, res, password, user_email);
                    } else {
                        res.json({
                            status: 0,
                            msg: newpasswordreset
                        });
                    }
                });
        } else {
            res.json({
                status: 402,
                msg: userAlreadyAdded
            });
        }
    });
});



//********************************************************************* */
// ************************** Delete User ***********************/
//********************************************************************* */

router.post("/delete/user", (req, res) => {
    adminManagementController.delete_user(req, res);
});


//********************************************************************************************************* */
// ************************************************** Settings APIs ***************************************/
//******************************************************************************************************** */



// ************************** Get session Details *****************************/


router.get("/get/session_details/:data", (req, res) => {
    settingsController.get_session_detailsF(req, res);
});


// ************************** Get Active session Details ****************/


router.get("/get/active_session", (req, res) => {
    settingsController.get_ActiveSessionF(req, res);
});



// ************************** Get Promotional Messages ****************/
router.get("/get/promotionalmessages", (req, res) => {
    settingsController.get_promotionalMessages(req, res);
});

// ************************** Update Promotional Messages ****************/
router.post("/update/promotionalmessages", (req, res) => {
    settingsController.update_promotionalMessages(req, res);
});



// *********** Update session data *************//

router.post("/update/session_date", (req, res) => {

    settingsController.update_sessionInfo(req, res);
});

// ************************** Add new session *****************************/


router.post("/add/new_session", (req, res) => {
    settingsController.checkSessionName(req, res).then(function(sessionname) {
        if (sessionname.status !== 1) {
            settingsController.add_newSessionFun(req, res);
        } else if (sessionname.status == 1) {
            // session name already exists
            res.json({
                status: 3,
                msg: "Session Name is already in use."
            });
        } else {
            res.json({
                status: 402,
                msg: sessionname
            });
        }
    });
});

//********************************************************************* */
// ************************** Set session active *****************************/
//********************************************************************* */

router.post("/set/session_active", (req, res) => {

    settingsController.set_sessionActiveF(req, res);

});

//********************************************************************* */
// ************************** Get School Info *****************************/
//********************************************************************* */

router.get("/get/school_info", (req, res) => {
    settingsController.get_school_infoF(req, res);
});

//********************************************************************* */
// ************************** Update School Info *****************************/
//********************************************************************* */

router.put("/update/school_info/:school_id", (req, res) => {
    settingsController.update_school_info(req, res);
});

//********************************************************************************************************* */
// ************************************************** Dashboard APIs ***************************************/
//******************************************************************************************************** */

//********************************************************************* */
// *********** Count students , teachers etc *****************************/
//********************************************************************* */

router.get("/get_count/:running_session", (req, res) => {
    funcs.get_totalcount(req, res);
});


// individal counting by seting count type
router.get("/get_count/:count_type/:running_session", (req, res) => {
    funcs.get_count(req, res);
});
//********************************************************************************************************* */
// ******************************** Assignments management  ***************************************/
//******************************************************************************************************** */

//********************************************************************* */
// ***************************** Add assignment   ***********************/
//********************************************************************* */

router.post("/add/new_assignment", (req, res) => {
    assignmentsController.add_assignmentF(req, res);
});

//********************************************************************* */
// *************************Assignment Image upload API *******************************/
//********************************************************************* */

router.post("/upload/assignment", upload.array("uploads[]", 6), async function(
    req,
    res,
    next
) {
    // console.log('files', req.files);
    // console.log('data', req.body.id);
    // res.send(req.files);

    let image_upload_response = await funcs.upload_images(req, res, next);
    res.json(image_upload_response);
});

//********************************************************************* */
// *************************Quiz Image upload API *******************************/
//********************************************************************* */

router.post("/upload/quiz", upload.array("uploads[]", 6), async function(
    req,
    res,
    next
) {

    let image_upload_response = await funcs.upload_images(req, res, next);
    res.json(image_upload_response);
});

//********************************************************************* */
// ***************************** Get assignment details  ***********************/
//********************************************************************* */

router.post("/get_assignment_details", (req, res) => {
    assignmentsController.get_assignment_details(req, res);
});

//********************************************************************* */
// ************** Get Student assignment details  ***********************/
//********************************************************************* */

router.post("/get/student/assign_details", (req, res) => {
    assignmentsController.get_Stud_assignment_details(req, res);
});

//********************************************************************* */
// ************** Update student Assignment marks  ***********************/
//********************************************************************* */

router.post("/update/std_assignment_marks", (req, res) => {
    // check attendace already marked on selected timestamp
    assignmentsController
    .check_isMarkedAssignMarks(req, res)
    .then(function(isMarkedAssignMarks) {
        if (isMarkedAssignMarks.status == 1) {
            // if marks already marked against assignment then update
            assignmentsController.update_assignMarksFun(
                req,
                res,
                isMarkedAssignMarks.std_assign_id
            );
        } else if (isMarkedAssignMarks.status == 0) {
            // if marks doesnt already marked against assignment then add new marks

            assignmentsController.mark_assignMarksFun(req, res);
        } else {
            res.json({
                status: 405,
                msg: isMarkedExmMarks
            });
        }
    });
});

//********************************************************************************************************* */
// ******************************** Expenses APIs  ***************************************/
//******************************************************************************************************** */

router.post("/add/expense_head", (req, res) => {
    expensesManagementController.add_newExpenseHead(req, res);
});

router.post("/edit/expense_head", (req, res) => {
    expensesManagementController.edit_ExpenseHead(req, res);
});

router.post("/delete/expense_head", (req, res) => {
    expensesManagementController.delete_ExpenseHead(req, res);
});

router.post("/get/expenses_head", (req, res) => {
    expensesManagementController.get_expense_heads(req, res);
});

router.post("/add/expense_category", (req, res) => {
    expensesManagementController.add_newExpenseCategory(req, res);
});

router.get("/get/expense_categories", (req, res) => {
    expensesManagementController.get_expense_categories(req, res);
});

router.post("/delete/expense_category", (req, res) => {
    expensesManagementController.delete_ExpenseCategory(req, res);
});

router.post("/get/expense_heads_from_expense_category", (req, res) => {
    expensesManagementController.expense_heads_from_expense_category(req, res);
});


//********************************************************************* */
// *************************** Add new expenses   ***********************/
//********************************************************************* */

router.post("/add/new_expense", (req, res) => {
    expensesManagementController.add_expensesF(req, res);
});

router.post("/edit/expense", (req, res) => {
    expensesManagementController.edit_expense(req, res);
});

router.post("/delete/expense", (req, res) => {
    expensesManagementController.delete_expense(req, res);
});

//********************************************************************* */
// ************************ Get expenses  Details ***********************/
//********************************************************************* */

router.get("/get/expenses", (req, res) => {
    expensesManagementController.get_expense_details(req, res);
});

router.post("/get/expenses_on_filters", (req, res) => {
    expensesManagementController.get_expenses_on_filters(req, res);
});

router.post("/get/expenses_from_time_period", (req, res) => {
    expensesManagementController.expenses_from_time_period(req, res);
});

router.post("/get/expenses_stats_on_filters", (req, res) => {
    expensesManagementController.get_expenses_stats_on_filters(req, res);
});

//********************************************************************* */
// ************************ Update  expenses  Details ***********************/
//********************************************************************* */

router.post("/update/expense_date", (req, res) => {
    expensesManagementController.update_expense_details(req, res);
});

//********************************************************************************************************* */
// ******************************** Common APIs  ***************************************/
//******************************************************************************************************** */

//********************************************************************* */
// ***************** cheque unique number/ cnic   ***********************/
//********************************************************************* */

router.post("/check/unique", (req, res) => {
    funcs.check_uniqueF(req, res);
});

//********************************************************************* */
// ******************** check username already added ********************/
//********************************************************************* */

router.post("/isUserName/present", (req, res) => {
    funcs.isUserNamePresentFun(req, res);
});

//********************************************************************* */
// ******************** Upload profile Image *******************************/
//********************************************************************* */

router.post(
    "/upload/profile_image",
    profile_upload.array("uploads[]", 2),
    function(req, res, next) {
        funcs.upload_profile_images(req, res, next);
    }
);

//********************************************************************* */
// ******************** Upload profile transcript *******************************/
//********************************************************************* */

router.post(
    "/upload/profile_transcript",
    transcript_upload.array("uploads[]", 2),
    function(req, res, next) {
        funcs.upload_profile_transcript(req, res, next);
    }
);

//********************************************************************* */
// ******************** searching by phonenum/ Nic ********************/
//********************************************************************* */

router.post("/search_by_NiCPhonenum", (req, res) => {
    funcs.searchByNicPhoneNum(req, res);
});

//********************************************************************* */
// ******************** check unique on update ********************/
//********************************************************************* */

router.post("/check_unique_onUpdate", (req, res) => {
    funcs.check_unique_onUpdateFun(req, res);
});


//********************************************************************* */
// ************ Parent Forget password , set default ********************/
//********************************************************************* */

router.post("/api/forget_password", (req, res) => {
    funcs.check_parentEmail(req, res).then(function(userAlreadyAdded) {
        if (userAlreadyAdded.status !== 1) {
            res.json({
                status: 0,
                error: "User name not found. Try again or contact school administrator"
            });
        } else if (userAlreadyAdded.status == 1) {
            // check email is registered

            let password = generator.generate({
                // generate random password
                length: 10,
                numbers: true
            });

            let hash_password = md5(password); // hash generated password
            funcs
                .sendEmail(req, res, password, userAlreadyAdded.user_email)
                .then(function(newpasswordreset) {
                    if (newpasswordreset.status == 1) {
                        funcs.reset_parent_passwordUpdate(
                            req,
                            res,
                            hash_password,
                            userAlreadyAdded.user_id
                        );
                    } else {
                        res.json({
                            status: 0,
                            error: "sending email failed, try again"
                        });
                    }
                });
        } else {
            res.json({
                status: 402,
                msg: userAlreadyAdded
            });
        }
    });
});

//********************************************************************* */
// ************ parent set new passord ********************/
//********************************************************************* */

router.post("/api/reset_password", (req, res) => {
    funcs.resetNewPaswordF(req, res);
});


//********************************************************************* */
// ************ Add Fee Heads ********************/
//********************************************************************* */

router.post("/add/feehead", (req, res) => {
   feeManagementController.addFeeHeads(req, res);
});

//********************************************************************* */
// ************ get all Fee Heads ********************/
//*

router.get("/get/feeheads", (req, res) => {
    feeManagementController.get_fee_heads(req, res);
});

//********************************************************************* */
// ******************** Update Fee head Data *******************************/
//********************************************************************* */

router.put("/update/feeheads/:id", (req, res) => {
    feeManagementController.update_fee_heads(req, res);
})

//********************************************************************* */
// ******************** feehead Fee head Data *******************************/
//********************************************************************* */

router.put("/delete/feehead/:id", (req, res) => {
    feeManagementController.delete_fee_head(req, res);
})

//********************************************************************* */
// ******************** feehead Fee head Data *******************************/
//********************************************************************* */

router.post("/get/fee_voucher", (req, res) => {
    feeManagementController.get_fee_voucher(req, res);
})

//********************************************************************* */
// ******************** feehead Fee head Data *******************************/
//********************************************************************* */

router.post("/check/fee_voucher", (req, res) => {
    feeManagementController.check_fee_voucher(req, res);
})

//********************************************************************* */
// ******************** feehead Fee head Data *******************************/
//********************************************************************* */

router.post("/fetch/fee_class_invoice", (req, res) => {
    feeManagementController.fetch_class_invoice(req, res);
})

//********************************************************************* */
// ******************** feehead Fee head Data *******************************/
//********************************************************************* */

router.post("/update/student_clas_invoice", (req, res) => {
    feeManagementController.student_clas_invoice(req, res);
})

router.post("/update/student_clas_voucher", (req, res) => {
    feeManagementController.student_clas_voucher(req, res);
})

//********************************************************************* */
// ******************** feehead Fee head Data *******************************/
//********************************************************************* */

router.post("/update/fee_voucher_draft", (req, res) => {
    feeManagementController.update_fee_voucher_draft(req, res);
})

router.post("/create/fee_vouchers", (req, res) => {
    feeManagementController.create_fee_voucher(req, res);
})


//********************************************************************* */
// ******************** feehead Fee head Data *******************************/
//********************************************************************* */

router.put("/get/classfee/:id", (req, res) => {
    feeManagementController.getClassFee(req, res);
})

router.get(
    "/get/classfee/:class_id/:running_session",
    (req, res) => {
        feeManagementController.getClassFee(req, res);
    }
);


router.post("/get/get_student_list", (req, res) => {
    studentsController.get_studentsListByClassSecId(req, res);
})

router.post("/get/discount_by_class", (req, res) => {
    studentsController.get_DiscountByClassSecId(req, res);
})

router.post("/publish_attendance", (req, res) => {
    attendaceManagementController.publish_attendance(req, res);
})

router.post("/get_class_details",middlewares.jwt_auth, (req, res) => {
    classManagementController.get_class_details(req, res).then(function(response){
        res.json(response)
    });
})


//this API will be called by teachers and will return all subjects of that class that are assigned to them 
router.post("/get_assigned_subjects_of_section",middlewares.jwt_auth,(req, res) => {
        mobileApisController.get_assigned_subjects_of_section(req, res);
});

router.post("/view_class_assignments",middlewares.jwt_auth, (req, res) => {
    mobileApisController.view_class_assignments(req, res);
})

router.post("/get_assignment_students_for_result_marking",middlewares.jwt_auth, (req, res) => {
    mobileApisController.get_assignment_students_for_result_marking(req, res);
});

router.post("/update_assignment_marks",middlewares.jwt_auth, (req, res) => {
    mobileApisController.update_assignment_marks(req, res);
});

router.post("/view_class_quizes",middlewares.jwt_auth, (req, res) => {
    mobileApisController.view_class_quizes(req, res);
});

router.post("/get_quiz_students_for_result_marking",middlewares.jwt_auth, (req, res) => {
    mobileApisController.get_quiz_students_for_result_marking(req, res);
});

router.post("/update_quiz_marks",middlewares.jwt_auth, (req, res) => {
    mobileApisController.update_quiz_marks(req, res);
});

router.post("/get_exams_list",middlewares.jwt_auth, (req, res) => {
    mobileApisController.get_exams_list(req, res);
});

router.post("/get_exam_students_for_result_marking",middlewares.jwt_auth, (req, res) => {
    mobileApisController.get_exam_students_for_result_marking(req, res);
});

router.post("/update_exam_marks",middlewares.jwt_auth, (req, res) => {
    mobileApisController.update_exam_marks(req, res);
});

//********************************************************************* */
// ******************** Upload profile Image *******************************/
//********************************************************************* */

router.post(
    "/upload/school_logo",
    image_upload.array("uploads[]", 2),
    function(req, res, next) {
        funcs.upload_school_logo(req, res, next);
    }
);

//Parent App new APIs

router.post("/add_suggestions",middlewares.jwt_auth,function(req,res){
    mobileApisController.add_suggestions(req,res);
});

router.post("/get_list_of_children",middlewares.jwt_auth,function(req,res){
    mobileApisController.get_list_of_children(req,res);
});

router.post("/get_child_details",middlewares.jwt_auth,function(req,res){
    mobileApisController.get_child_details(req,res);
});

router.post("/get_child_diary",middlewares.jwt_auth,function(req,res){
    mobileApisController.get_child_diary(req,res);
});

//Admin new APIs
router.post("/get_suggestions",function(req,res){
    suggestionsController.get_suggestions(req,res);
});

router.get("/get_fee_templates_list",function(req,res){
    settingsController.get_fee_templates_list(req,res).then(function(response){
        res.json(response)
    });
});

//Teacher new APIs

//Get classes in which teacher is teaching
router.post("/get_teacher_current_classes_list",middlewares.jwt_auth,function(req,res){
    mobileApisController.get_teacher_current_classes_list(req,res);
});

//Get sections in which teacher is teaching
router.post("/get_teacher_current_sections_list",middlewares.jwt_auth,function(req,res){
    mobileApisController.get_teacher_current_sections_list(req,res);
});

router.post("/get_teacher_current_subjects_list",middlewares.jwt_auth,function(req,res){
    mobileApisController.get_teacher_current_subjects_list(req,res);
});

router.post("/add_class_diary",middlewares.jwt_auth,function(req,res){
    mobileApisController.add_class_diary(req,res);
});

router.post("/edit_class_diary",middlewares.jwt_auth,function(req,res){
    mobileApisController.edit_class_diary(req,res);
});

router.post("/delete_diary",middlewares.jwt_auth,function(req,res){
    diaryController.delete_diary(req,res);
});

//Teacher + Admin APIs (currently being used for admin)

router.post("/get_class_diary",middlewares.jwt_auth,function(req,res){
    mobileApisController.get_class_diary(req,res);
});

//Apps access ovh images, they pass image name and this API provides image with temp URL
router.get("/get_ovh_resource/:resource_name",middlewares.jwt_auth,function(req,res){
    mobileApisController.get_ovh_resource(req,res);
});

// export the router
module.exports = router;