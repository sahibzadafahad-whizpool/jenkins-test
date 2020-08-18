var md5 = require("md5");
var async = require("async");
const uuidv4 = require("uuid/v4");
const con = require("../backend/db_connection");
const sql_prepare = require("./prepare");
var jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
var Thumbnail = require("thumbnail");
var thumb = require("node-thumbnail").thumb; // generate thumb
// var sizeOf = require('image-size'); // get image size
var { promisify } = require("util");
var sizeOf = promisify(require("image-size"));
const fs = require("fs"); // file

// server path for images

var server_image_path =
    "http://dev.whizpool.com/schoolapp_new/api/uploads/images/";
var server_thumb_path =
    "http://dev.whizpool.com/schoolapp_new/api/uploads/thumb/";
var server_profile_images_path =
    "http://dev.whizpool.com/schoolapp_new/api/uploads/profile_images/";
var local_profile_images_path = "./uploads/profile_images/";

//email settings

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "developer.whizpool@gmail.com",
        pass: "developer@555"
    }
});

module.exports = {
    //*************************************send email ***************************************** */
    sendEmail: function(req, res, password, user_email) {
        return new Promise(function(resolve, reject) {
            let to = user_email;
            var mailOptions = {
                from: "unisea.pdfapplication@gmail.com",
                to: to,
                subject: "New Password",
                text: "Your new password is " +
                    password +
                    ". You can update your password by clicking the link. http://dev.whizpool.com/schoolapp_new/dist/#/reset-password"
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    let resp = {
                        status: 403,
                        msg: "Some error sending email try again"
                    };
                    console.log(error);
                    resolve(resp);
                } else {
                    let resp = {
                        status: 1,
                        msg: "New Password has been send on your email"
                    };
                    resolve(resp);
                }
            });
        });
    },

    //*************************************Check auth***************************************** */

    checkValidTokenFun: function(req, res) {
        //    let user_id = req.body.user_id;
        //    let jwtTocken = req.body.jwtTocken;

        return true;
    },

    authTokenCheck: function(req, res) {
        return new Promise(function(resolve, reject) {
            let authResp = 1;
            resolve(authResp);
            // let token = req.headers.authorization;
            // jwt.verify(token, 'shhhhh', function (err, decoded) {
            //     console.log(decoded.foo)
            // });
        });
    },

    jwtValidation: function(req, res) {
        return new Promise(function(resolve, reject) {
            let token = req.token;
            jwt.verify(token, "secretkeyschoolappadmin", function(err, decoded) {
                let authResp;
                if (err) {
                    authResp = 0;
                } else {
                    authResp = 1;
                }
            });
        });
    },

    //********************************************************************* */
    // ******************** Auth Token check function  **********************/
    //********************************************************************* */

    authTokenCheckF: function(req, res) {
        return new Promise(function(resolve, reject) {
            try {
                let token = req.body.jwt;
                // verify jet token
                jwt.verify(token, "45745c60-7b1a-11e8-9c9c-2d42b21b1a3e", function(
                    err,
                    decoded
                ) {
                    let resp;
                    if (err) {
                        resp = {
                            status: 0,
                            msg: "decode errro " + err
                        };
                    } else {
                        resp = {
                            status: 1,
                            msg: decoded
                        };
                    }
                    resolve(resp);
                });
            } catch (err) {
                return reject(err);
            }
        });
    },

    //********************************************************************* */
    // ******************** Admin Login check Function **********************/
    //********************************************************************* */

    admin_login: function(req, res) {
        let username = req.body.email.replace(/\s+/g, "");
        let password = req.body.password.replace(/\s+/g, "");
        let sql =
            "SELECT user_name, user_level , user_email , login_id , COUNT(*) LoginCount from tbl_users WHERE user_email = ? AND status=? AND user_password =" +
            con.escape(password);

        let query = con.query(sql, [username, 1], (err, result) => {
            if (err) {
                res.json({
                    msg: "Mysql Error" + err,
                    status: 402
                });
            } else {
                if (result[0].LoginCount >= 1) {
                    // user info for jwt
                    let user_info = {
                        user_name: result[0].user_name,
                        user_id: result[0].login_id,
                        user_email: result[0].user_email,
                        user_level: result[0].user_level
                    };

                    // generate jwt for user info
                    jwt.sign({
                            user_info
                        },
                        "secretkeyschoolappadmin",
                        function(err, token) {
                            if (err) {
                                res.json({
                                    msg: err,
                                    status: 0
                                });
                            } else {
                                res.json({
                                    jwt: token,
                                    data: result[0],
                                    status: 1
                                });
                            }
                        }
                    );
                } else {
                    res.json({
                        msg: "Wrong Password / Username",
                        status: 0
                    });
                }
            }
        });
    },

    // //********************************************************************* */
    // // ******************** Parents Login check Function **********************/
    // //********************************************************************* */

    // loginCheck_Fun: function (req, res) {

    //     return new Promise(function (resolve, reject) {
    //         let username = req.body.user_name;
    //         let password = req.body.user_password;

    //         if (username == "" || password == "") {
    //             res.json({
    //                 status: 405,
    //                 error: 'Failed : required username or password is missing'
    //             });
    //         } else {
    //             let hashPass = md5(password);
    //             let sql = 'Select parent_id , parent_name , parent_email ,parent_userName , public_key , private_key , COUNT(*) AS loginStatus from tbl_parents WHERE parent_userName = ? AND status = ? AND parent_password = ' + con.escape(hashPass);
    //             let query = con.query(sql, [username, 1], (err, result) => {
    //                 if (err) {
    //                     res.json({
    //                         msg: 'Mysql Error' + err,
    //                         status: 402
    //                     });
    //                 } else {
    //                     if (result[0].loginStatus >= 1) { // if username and password correct

    //                         //update auth tocken against user
    //                         let private_key = result[0].private_key;
    //                         let public_key = result[0].public_key;
    //                         let user_name = result[0].parent_userName;
    //                         let user_id = result[0].parent_id;
    //                         let name = result[0].parent_name;
    //                         let user_email = result[0].parent_email;

    //                         var user_data = {
    //                             user_id: user_id,
    //                             user_name: user_name,
    //                             user_email: user_email
    //                         };
    //                         let query = con.query(sql_prepare.sql_getStdDetails, [user_id, 1, '2018-2019'], (err, result3) => {
    //                             if (err) {
    //                                 res.json({
    //                                     error: 'Mysql Error' + err,
    //                                     status: 402
    //                                 });
    //                             } else {
    //                                 // generate jwt  for parent info
    //                                 jwt.sign({
    //                                     user_data
    //                                 }, '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e', function (err, token) {
    //                                     if (err) {
    //                                         res.json({
    //                                             error: err,
    //                                             status: 0
    //                                         });

    //                                     } else {
    //                                         user_data.jwt = token;
    //                                         res.json({
    //                                             msg: 'Successfully logged in',
    //                                             status: 1,

    //                                             user_info: user_data,
    //                                             student_info: result3
    //                                         });
    //                                     }

    //                                 });

    //                             }
    //                         });

    //                     } else { // if username and password wrong
    //                         res.json({
    //                             msg: 'Invalid username or password',
    //                             status: 401
    //                         });
    //                     }

    //                 }
    //             });
    //         }
    //     });
    // },

    //********************************************************************* */
    // ******************** logout Function **********************/
    //********************************************************************* */
    logoutFun: function(req, res) {
        let header = req.headers;
        let public_key = header.public_key;

        let private_key = uuidv4();

        let sql = "UPDATE tbl_users SET private_key = ? WHERE public_key = ?";
        let query = con.query(sql, [private_key, public_key], (err, result) => {
            if (err) {
                res.json({
                    status: 402,
                    error: "Mysql error " + err
                });
            } else {
                res.json({
                    status: 1,
                    error: "Successfully Logout"
                });
            }
        });
    },

    //********************************************************************************************************* */
    // ********************************** Teachers Management Functions *********************************************/
    //******************************************************************************************************** */

    //********************************************************************* */
    // ******************** get teachers data Function **********************/
    //********************************************************************* */
    get_teachersFun: function(req, res) {
        let sql = "Select * from tbl_teachers ";
        let query = con.query(sql, (err, results) => {
            if (err) {
                return res.json({
                    msg: "fail to load teacher" + err.message
                });
            } else {
                return res.json(results);
            }
        });
    },

    //********************************************************************* */
    // ************** get teachers data with pagination Function ****************/
    //********************************************************************* */

    get_teachersWithPaginFun: function(req, res) {
        let offset = req.body.offset;
        let itemsPerPage = req.body.itemsPerPage;
        let sql_prepare_statement = sql_prepare.sql_getTeachersDataWithPagin;
        let query_paramas = [1, offset, itemsPerPage];

        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_paramas
        );
    },

    //********************************************************************* */
    // ******************** get teachers Name and ID Function ***************/
    //***********************************************************************/
    get_teacherNameIdFun: function(req, res) {
        let sql =
            "Select teacher_id AS id , teacher_name AS text  from tbl_teachers ";
        let query = con.query(sql, (err, results) => {
            if (err) {
                res.json({
                    msg: "fail to get teachers data " + err
                });
            } else {
                res.json(results);
            }
        });
    },

    //********************************************************************* */
    // ******************** get Singal teacher data *************************/
    //********************************************************************* */

    get_teacherFun: function(req, res) {
        let id = req.params.id;
        let sql = "Select * from tbl_teachers Where teacher_id = " + con.escape(id);
        let query = con.query(sql, (err, result) => {
            if (err) {
                res.json({
                    msg: "fail to get teacher data" + err
                });
            } else {
                res.json(result);
            }
        });
    },

    //********************************************************************* */
    // ******************** Add teachers data *******************************/
    //********************************************************************* */

    add_teacherFun: function(req, res) {
        let teacherDetails = {
            teacher_name: req.body.teacher_name,
            teacher_qual: req.body.teacher_qual,
            teacher_desig: req.body.teacher_desig,
            gender: req.body.gender,
            dob: req.body.dob,
            phone_num: req.body.phone_num,
            email: req.body.email,
            teacher_cnic: req.body.teacher_nic,
            user_name: req.body.user_name,
            password: req.body.password,
            address: req.body.address,
            teacher_salary: req.body.teacher_salary,
            experience: req.body.experience,
            status: 1
        };

        let sql = "INSERT INTO tbl_teachers SET ?";
        let query = con.query(sql, teacherDetails, (err, result) => {
            if (err) {
                res.json({
                    status: 402,
                    msg: "Mysql error" + err
                });
            } else {
                res.json({
                    status: 1,
                    msg: "Teacher added successfully",
                    inserted_id: result.insertId
                });
            }
        });
    },

    //********************************************************************* */
    // ******************** Update teachers data ****************************/
    //********************************************************************* */

    update_teacherFun: function(req, res) {
        let teacher_id = parseInt(req.params.id);
        let teacherDetails = {
            teacher_name: req.body.teacher_name,
            teacher_qual: req.body.teacher_qual,
            teacher_desig: req.body.teacher_desig,
            gender: req.body.gender,
            dob: req.body.dob,
            phone_num: req.body.phone_num,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            experience: req.body.experience,
            teacher_salary: req.body.teacher_salary,
            teacher_cnic: req.body.teacher_cnic,
            status: 1
        };

        let sql =
            "Update tbl_teachers SET ? WHERE teacher_id=" + con.escape(teacher_id);
        let query = con.query(sql, [teacherDetails], (err, result) => {
            if (err) {
                res.json({
                    status: 402,
                    msg: "Mysql error" + err
                });
            } else {
                res.json({
                    status: 1,
                    msg: "updated successfully"
                });
            }
        });
    },

    //********************************************************************* */
    // ******************** Delete Teachers Data ***************************//
    //********************************************************************* */

    delete_teacherFun: function(req, res) {
        let sql =
            "Delete from tbl_teachers where teacher_id = " +
            con.escape(req.params.id);
        let query = con.query(sql, (err, result) => {
            if (err) {
                res.json({
                    msg: "fail to delete" + err
                });
            } else {
                res.json({
                    msg: "Deleted Successfully"
                });
            }
        });
    },

    //********************************************************************************************************* */
    // ***************************************** Class Management Functions ******************************************/
    //******************************************************************************************************** */

    //********************************************************************* */
    // ************************ get class data ******************************/
    //********************************************************************* */

    get_classFun: function(req, res) {
        let sql = "Select * from tbl_class WHERE status = ? ";
        let query = con.query(sql, [1], (err, results) => {
            if (err) {
                res.json({
                    status: 403,
                    msg: "fail to load class details" + err
                });
            } else {
                res.json(results);
            }
        });
    },

    //********************************************************************* */
    // ******************** get Single Class data by class ID ***************/
    //********************************************************************* */

    get_classById: function(req, res) {
        let sql =
            "Select * from tbl_class Where class_id = " +
            con.escape(req.params.id) +
            "AND status=?";
        let query = con.query(sql, [1], (err, result) => {
            if (err) {
                res.json({
                    msg: "fail to get class data" + err
                });
            } else {
                res.json(result);
            }
        });
    },

    //********************************************************************* */
    // ******************** Check Class Already Added ***********************/
    //********************************************************************* */

    get_classByNameFun: function(req, res) {
        let class_name = req.params.c_name;
        let sql =
            "Select COUNT(*) AS class_present from tbl_class Where class_name = ? AND status = ?";
        let query = con.query(sql, [class_name, 1], (err, result) => {
            if (err) {
                res.json({
                    msg: "fail to get class data" + err
                });
            } else {
                res.json(result);
            }
        });
    },

    //********************************************************************* */
    // ******************** Add Class data **********************************/
    //********************************************************************* */

    add_classFun: function(req, res) {
        let classDetails = {
            class_name: req.body.class_name,
            numeric_name: req.body.numeric_name
        };

        let sql = "INSERT INTO tbl_class SET ?";
        let query = con.query(sql, classDetails, (err, result) => {
            if (err) {
                res.json({
                    status: 402,
                    msg: "Mysql error" + err
                });
            } else {
                res.json({
                    status: 1,
                    data: result.insertId
                });
            }
        });
    },

    //********************************************************************* */
    // ******************** Delete Class Data *******************************/
    //********************************************************************* */

    delete_classFun: function(req, res) {
        let class_id = req.params.id;
        let status = req.body.status;
        let sql = "Update tbl_class SET status = ? Where class_id= ?";
        let query = con.query(sql, [status, class_id], (err, result) => {
            if (err) {
                res.json({
                    msg: "fail to Delete Class" + err
                });
            } else {
                res.json({
                    msg: "Deleted successfully"
                });
            }
        });
    },

    //********************************************************************* */
    // ******************** Update Class Data *******************************/
    //********************************************************************* */

    update_classFun: function(req, res) {
        let class_id = req.params.id;
        let classUpdateDetails = {
            numeric_name: req.body.numeric_name
        };
        let sql = "Update tbl_class SET ? where class_id= ?";
        let query = con.query(
            sql, [classUpdateDetails, class_id],
            (err, result) => {
                if (err) {
                    res.json({
                        status: 402,
                        msg: "Mysql error : " + err
                    });
                } else {
                    res.json({
                        msg: "Successfully Updated",
                        status: 1
                    });
                }
            }
        );
    },

    //********************************************************************************************************* */
    // ***************************************** Section Management Functions ***************************************/
    //******************************************************************************************************** */

    //********************************************************************* */
    // *************** get only section Data by Class ID ********************/
    //********************************************************************* */

    get_sectionDataFun: function(req, res) {
        let sql =
            "SELECT section_id , section_name from tbl_section WHERE class_id = ? AND status = ?";

        let query = con.query(sql, [req.params.class_id, 1], (err, result) => {
            if (err) {
                res.json({
                    status: 403,
                    msg: "Mysql error :" + err
                });
            } else {
                res.json(result);
            }
        });
    },

    //********************************************************************* */
    // *********** get section related all Data by Class ID *****************/
    //********************************************************************* */

    get_sectionRealtedDataFun: function(req, res) {
        let sql =
            "select * from tbl_section s INNER join tbl_class c on s.class_id = c.class_id " +
            "LEFT JOIN tbl_teachers t on s.teacher_id = t.teacher_id " +
            "Where s.class_id = ? AND s.status= ?";

        let query = con.query(sql, [req.params.class_id, 1], (err, result) => {
            if (err) {
                res.json({
                    msg: "fail to get class data" + err
                });
            } else {
                res.json(result);
            }
        });
    },

    //********************************************************************* */
    // ****** get Single section Data by Class ID , Section ID *************/
    //********************************************************************* */

    get_singleSectionFun: function(req, res) {
        let sql =
            "select * from tbl_section s INNER join tbl_class c on s.class_id = c.class_id " +
            "LEFT JOIN tbl_teachers t on s.teacher_id = t.teacher_id " +
            "Where s.class_id = ? AND s.section_id = ? AND s.status= ?";

        let query = con.query(
            sql, [req.params.class_id, req.params.section_id, 1],
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
    // ******************** Add Section data ********************************/
    //********************************************************************* */

    add_sectionFun: function(req, res) {
        let sectionDetails = {
            section_name: req.body.section_name,
            class_id: req.body.class_id,
            teacher_id: req.body.teacher_id
        };

        let sql = "INSERT INTO tbl_section SET ?";
        let query = con.query(sql, sectionDetails, (err, result) => {
            if (err) {
                res.json({
                    msg: "fail to add section" + err,
                    status: 0
                });
            } else {
                res.json({
                    msg: "section added successfully",
                    status: 1
                });
            }
        });
    },

    //********************************************************************* */
    // ******************** Check Section Already Added ***********************/
    //********************************************************************* */

    check_sectionExists: function(req, res) {
        return new Promise(function(resolve, reject) {
            let section_name = req.body.section_name;
            let class_id = req.body.class_id;
            let sql =
                "Select COUNT(*) AS section_present from tbl_section Where class_id = ? AND section_name =? AND status = ? ";
            let query = con.query(sql, [class_id, section_name, 1], (err, result) => {
                if (err) {
                    resolve("fail to check section" + err);
                } else {
                    if (result[0].section_present) {
                        let isSection = 1;
                        resolve(isSection);
                    } else {
                        let isSection = 0;
                        resolve(isSection);
                    }
                }
            });
        });
    },

    //************************************************************************ */
    // ******************** Select Section by class ID ************************/
    //********************************************************************* ***/

    get_sectionByClassIdFun: function(req, res) {
        let class_id = req.params.class_id;
        let sql = "Select * from tbl_section WHERE class_id = ? AND status = ? ";
        let query = con.query(sql, [class_id, 1], (err, result) => {
            if (err) {
                res.json({
                    msg: "failed to load section data" + err,
                    status: "0"
                });
            } else {
                res.json(result);
            }
        });
    },

    //************************************************************************/
    // ******************* Delete Section Data by class ID ******************/
    //************************************************************************/

    delete_sectionByClassIdFun: function(req, res) {
        let class_id = req.params.class_id;
        let status = 0;
        let sql = "Update tbl_section SET status = ? Where class_id= ?";
        let query = con.query(sql, [status, class_id], (err, result) => {
            if (err) {
                res.json({
                    msg: "fail to Delete Section" + err
                });
            } else {
                res.json({
                    msg: "Deleted successfully"
                });
            }
        });
    },

    //************************************************************************/
    // ******************* Delete Section Data by Section ID ******************/
    //************************************************************************/

    delete_sectionFun: function(req, res) {
        let section_id = req.params.section_id;
        let class_id = req.params.class_id;
        let deleteStatus = {
            status: req.body.status
        };

        let sql = "Update tbl_section SET  ? Where class_id = ? AND section_id= ?";
        let query = con.query(
            sql, [deleteStatus, class_id, section_id],
            (err, result) => {
                if (err) {
                    res.json({
                        status: 402,
                        msg: "fail to Delete Section" + err
                    });
                } else {
                    res.json({
                        status: 1,
                        msg: "Deleted successfully"
                    });
                }
            }
        );
    },

    //************************************************************************/
    // ******************* Update Section Data *******************************/
    //************************************************************************/

    update_sectionFun: function(req, res) {
        let section_id = req.params.section_id;
        let class_id = req.params.class_id;
        let sectionUpdateData = {
            teacher_id: req.body.teacher_id
        };
        let sql = "Update tbl_section SET ? WHERE class_id = ? AND section_id = ?";
        let query = con.query(
            sql, [sectionUpdateData, class_id, section_id],
            (err, result) => {
                if (err) {
                    res.json({
                        status: 402,
                        msg: "Mysql error :" + err
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

    //********************************************************************************************************* */
    // ***************************************** Subject Management Functions ***************************************/
    //******************************************************************************************************** */

    //********************************************************************* */
    // ******************** get Elective subjects Data by Class ID ********************/
    //********************************************************************* */

    get_eSubjectFun: function(req, res) {
        let sql =
            "SELECT tbl_subjects.* , tbl_teachers.teacher_name , tbl_section.section_name, tbl_class.class_name" +
            " FROM tbl_subjects INNER JOIN tbl_teachers on tbl_subjects.teacher_id = tbl_teachers.teacher_id " +
            " LEFT JOIN tbl_section on tbl_subjects.section_id = tbl_section.section_id LEFT JOIN tbl_class " +
            " ON tbl_subjects.class_id = tbl_class.class_id " +
            " WHERE tbl_subjects.class_id=? AND tbl_subjects.year=? AND tbl_subjects.status= ? AND subject_type =?";

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
            "SELECT tbl_subjects.* , tbl_teachers.teacher_name , tbl_section.section_name, tbl_class.class_name" +
            " FROM tbl_subjects INNER JOIN tbl_teachers on tbl_subjects.teacher_id = tbl_teachers.teacher_id" +
            " LEFT JOIN tbl_section on tbl_subjects.section_id = tbl_section.section_id LEFT JOIN tbl_class" +
            " ON tbl_subjects.class_id = tbl_class.class_id" +
            " WHERE tbl_subjects.class_id= ?" +
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
            "SELECT tbl_subjects.* , tbl_teachers.teacher_name , tbl_section.section_name, tbl_class.class_name" +
            " FROM tbl_subjects INNER JOIN tbl_teachers on tbl_subjects.teacher_id = tbl_teachers.teacher_id" +
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
    },

    //********************************************************************************************************* */
    // ***************************************** Parents Management Functions ***************************************/
    //************************************************************************************************************ */

    //********************************************************************* */
    // ******************** Add Parents data *******************************/
    //********************************************************************* */

    add_parentFun: function(req, res) {
        let parentDetails = {
            parent_name: req.body.parent_name,
            parent_userName: req.body.parent_userName,
            parent_email: req.body.parent_email,
            parent_password: req.body.parent_password,
            relationship: req.body.relationship,
            parent_cnic: req.body.parent_cnic,
            parent_address: req.body.parent_address,
            parent_phoneNum: req.body.parent_phoneNum,
            parent_profession: req.body.parent_profession
        };

        let query = con.query(
            sql_prepare.sql_addParent,
            parentDetails,
            (err, result) => {
                if (err) {
                    res.json({
                        msg: "fail to add parent" + err,
                        status: 0
                    });
                } else {
                    res.json({
                        msg: "parent added successfully",
                        status: 1
                    });
                }
            }
        );
    },

    //********************************************************************* */
    // ******************** Get Parents data *******************************/
    //********************************************************************* */

    get_parentsFun: function(req, res) {
        let query = con.query(
            sql_prepare.sql_getParentData, [1],
            (err, results) => {
                if (err) {
                    return res.json({
                        msg: "fail to load parents " + err
                    });
                } else {
                    return res.json(results);
                }
            }
        );
    },

    //********************************************************************* */
    // ******************** Get Parents data with pagination *******************************/
    //********************************************************************* */

    get_parentsWithPagnFun: function(req, res) {
        let offset = req.body.offset;
        let itemsPerPage = req.body.itemsPerPage;
        let sql_prepare_statement = sql_prepare.sql_getParentDataWithPagin;
        let query_paramas = [1, offset, itemsPerPage];

        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_paramas
        );
    },

    //********************************************************************* */
    // ******************** Get Single parent data **************************/
    //********************************************************************* */

    get_singleParentFun: function(req, res) {
        let parent_id = req.params.parent_id;

        let query = con.query(
            sql_prepare.sql_getSingleParentData, [parent_id, 1],
            (err, results) => {
                if (err) {
                    return res.json({
                        msg: "fail to load parents " + err
                    });
                } else {
                    return res.json(results);
                }
            }
        );
    },

    //********************************************************************* */
    // ******************** Update Parent data **************************/
    //********************************************************************* */

    update_parentFun: function(req, res) {
        let parent_id = req.params.parent_id;
        let updateParentData = {
            parent_address: req.body.parent_address,
            parent_email: req.body.parent_email,
            parent_name: req.body.parent_name,
            parent_password: req.body.parent_password,
            parent_phoneNum: req.body.parent_phoneNum,
            parent_profession: req.body.parent_profession,
            parent_userName: req.body.parent_userName,
            parent_cnic: req.body.parentCNICNum,
            relationship: req.body.relationship
        };

        let query = con.query(
            sql_prepare.sql_updateParentData, [updateParentData, parent_id],
            (err, result) => {
                if (err) {
                    res.json({
                        msg: "Fail to update parent" + err,
                        status: 0
                    });
                } else {
                    res.json({
                        msg: "Updated Successfully",
                        status: 1
                    });
                }
            }
        );
    },

    //********************************************************************* */
    // ******************** Update Parent Password **************************/
    //********************************************************************* */

    update_parentPassFun: function(req, res) {
        let parent_id = req.params.parent_id;
        let update_data = {
            parent_password: req.body.parentPassword
        };
        let sql_prepare_statement = sql_prepare.sql_updateParentData;
        let sql_query_params = [update_data, parent_id];

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
    // ******************** Delete Parent data **************************/
    //********************************************************************* */
    delete_parentFun: function(req, res) {
        let parent_id = req.params.parent_id;
        let deleteParentData = {
            status: 0
        };

        let query = con.query(
            sql_prepare.sql_updateParentData, [deleteParentData, parent_id],
            (err, result) => {
                if (err) {
                    res.json({
                        msg: "Fail to delete parent" + err,
                        status: 0
                    });
                } else {
                    res.json({
                        msg: "Deleted Successfully",
                        status: 1
                    });
                }
            }
        );
    },

    //********************************************************************************************************* */
    // ***************************************** Student Management Functions ***************************************/
    //******************************************************************************************************** */

    //********************************************************************* */
    // ******************** Add Student data *******************************/
    //********************************************************************* */

    add_studentFun: function(req, res) {
        let add_studentData = {
            std_name: req.body.std_name,
            std_parentId: req.body.std_parentId,
            std_phonenum: req.body.phone_number,
            std_address: req.body.std_address,
            std_dob: req.body.std_dob,
            std_email: req.body.std_email,
            std_gender: req.body.std_gender,
            leaving_reason: req.body.std_leavingReason,
            std_prevSchool: req.body.std_prevSchool
        };

        let query = con.query(
            sql_prepare.sql_addStudents,
            add_studentData,
            (err, result) => {
                if (err) {
                    res.json({
                        msg: "Mysql error :" + err,
                        status: 402
                    });
                } else {
                    res.json({
                        msg: "student added successfully",
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
        let parent_number = req.body.parent_number;

        let sql_prepare_statement = sql_prepare.sql_verifyParentNumber;
        let query_data = [parent_number, 1];

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

    enroll_studentFun: function(req, res) {
        let enroll_studentData = {
            student_id: req.body.student_id,
            year: req.body.enroll_session,
            class_id: req.body.std_classId,
            section_id: req.body.std_sectionId,
            roll_num: req.body.std_rollNum,
            enroll_date: req.body.std_enrollDate
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
    // **************** Get Student data by class id Function ***************/
    //********************************************************************* */

    get_studentsFun: function(req, res) {
        let class_id = req.params.class_id;
        let year = req.params.running_session;

        let sql_prepare_statement = sql_prepare.sql_getStdByClassId;
        let query_data = [class_id, year, 1];

        // call fect_query function to get data from database
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_data
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

        if (data_required == "all") {
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
            std_address: req.body.std_address,
            std_dob: req.body.std_dob,
            std_email: req.body.std_email,
            std_gender: req.body.std_gender,
            std_name: req.body.std_name,
            std_parentId: req.body.std_parentId,
            std_phonenum: req.body.std_phonenum,
            std_prevSchool: req.body.std_prevSchool,
            leaving_reason: req.body.std_leavingReason
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

        let sql = "Update tbl_students SET ? WHERE std_id = ?";
        let query = con.query(
            sql_prepare.sql_deleteStudent, [deleteStatus, student_id],
            (err, result) => {
                if (err) {
                    res.json({
                        status: 0,
                        msg: "Error on update" + err
                    });
                } else {
                    let query2 = con.query(
                        sql_prepare.sql_delStudEnroll, [deleteStatus, student_id],
                        (err, result) => {
                            if (err) {
                                res.json({
                                    status: 0,
                                    msg: "Error on update" + err
                                });
                            } else {
                                res.json({
                                    status: 1,
                                    msg: "Deleted Successfully"
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
                        resolve("Database Error : " + err);
                    } else {
                        if (result[0].enroll_exist >= 1) {
                            let resp = {
                                status: 1,
                                msg: "available"
                            };
                            resolve(resp);
                        } else {
                            let resp = {
                                status: 0,
                                msg: "not available"
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

                if ("promotion" in student_data_array[key]) {
                    // check whether user mark any status or not

                    let roll_num = student_data_array[key].roll_num;
                    let student_id = student_data_array[key].student_id;

                    // count attendance whether already marked or not

                    let query = con.query(
                        sql_prepare.sql_check_isStdAlreadyEnrolled, [student_id, year, 1],
                        (err, result) => {
                            if (err) {
                                console.log("fail to check student already promoted" + err);
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
                                                console.log("Insert student attendance error : " + err);
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
                        msg: "Mysql error,  bulk promotion " + err // send db error
                    });
                } else {
                    res.json({
                        status: 1,
                        msg: "Successfully promoted",
                        count: count,
                        enroll_count: enroll_count
                    });
                }
            }
        );
    },

    //********************************************************************************************************* */
    // ***************************************** Attendance Management Functions ***************************************/
    //******************************************************************************************************** */

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

                                if (result[0].attendance_count) {
                                    // if atendace is already marked than , update the attendance

                                    let updateAttendanceObj = {
                                        attend_status: attend_status,
                                        date: dayDate,
                                        month: month
                                    };

                                    let query2 = con.query(
                                        sql_prepare.sql_updateAttendance, [updateAttendanceObj, class_id, student_id, timestamp],
                                        (err, result) => {
                                            if (err) {
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
                                        attend_status: attend_status
                                    };

                                    let query = con.query(
                                        sql_prepare.sql_markAttendance,
                                        dailyAttendanceObj,
                                        (err, result) => {
                                            if (err) {
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
                    res.json({
                        status: 1,
                        msg: "Successfully Marked",
                        count: count
                    });
                }
            }
        );
    },

    //********************************************************************* */
    // ****************** Get student attendance report data ***********/
    //********************************************************************* */

    get_stdAttendReportData: function(req, res) {
        return new Promise(function(resolve, reject) {
            let class_id = req.params.class_id;
            let section_id = req.params.section_id;
            let attendStartDate = req.params.attendStartDate;
            let attendEndDate = req.params.attendEndDate;
            let year = req.params.running_session;

            let query = con.query(
                sql_prepare.sql_getStdForReport, [class_id, section_id, year, 1],
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
                                    sql_prepare.sql_getAttendReport, [
                                        class_id,
                                        section_id,
                                        result[key].student_id,
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

    //********************************************************************************************************* */
    // ***************************************** Exam Management APIs ***************************************/
    //******************************************************************************************************** */

    //********************************************************************* */
    // ************************** Add new exam  *****************************/
    //********************************************************************* */

    add_examFun: function(req, res) {
        let exam_data = {
            exam_name: req.body.exam_name,
            exam_date: req.body.exam_date,
            exam_comment: req.body.exam_comment,
            exam_tmarks: req.body.exam_tmarks,
            year: req.body.running_session,
            exam_type: req.body.type,
            status: 1
        };

        let sql_prepare_statement = sql_prepare.sql_addExam;

        let query = sql_prepare.run_add_query(
            req,
            res,
            con,
            sql_prepare_statement,
            exam_data
        );
    },

    //********************************************************************* */
    // ************************** Get  exam List  ***************************/
    //********************************************************************* */

    get_examListFun: function(req, res) {
        let year = req.params.running_session;
        let exam_type = req.params.exam_type;
        let sql_prepare_statement;

        if (exam_type == "all") {
            sql_prepare_statement = sql_prepare.sql_ListExams;
            let query = sql_prepare.run_fetch_query(
                req,
                res,
                con,
                sql_prepare_statement,
                year
            );
        } else {
            sql_prepare_statement = sql_prepare.sql_getSelectedTypeExams;
            let query = sql_prepare.run_fetch_query(
                req,
                res,
                con,
                sql_prepare_statement, [exam_type, year]
            );
        }

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
                        resolve("Database Error :" + err);
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
        let obtained_marks = {
            obtained_marks: req.body.obtained_marks
        };

        let sql_prepare_statement = sql_prepare.sql_updateExamMarks;
        let sql_query_params = [obtained_marks, marks_id];

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
    },

    //********************************************************************************************************* */
    // ******************************** Announcement Management Functions  ***************************************/
    //******************************************************************************************************** */

    //********************************************************************* */
    // ******************** Add new Announcements   **************************/
    //********************************************************************* */

    add_new_announcementFun: function(req, res) {
        let new_announcement_data = {
            announc_title: req.body.announc_title,
            announc_details: req.body.announc_details,
            announcement_date: req.body.announcement_date,
            announcement_expire: req.body.announcement_expire,
            announc_for: req.body.announc_for
        };

        let sql_prepare_statement = sql_prepare.sql_addNewAnnouncment;

        //call function to insert data into db
        let query = sql_prepare.run_add_query(
            req,
            res,
            con,
            sql_prepare_statement,
            new_announcement_data
        );
    },

    //********************************************************************* */
    // ******************** GEt active Announcements   **************************/
    //********************************************************************* */

    get_activeAnnouncementFun: function(req, res) {
        let sql_prepare_statement = sql_prepare.sql_getActiveAnnouncements;
        let current_time = Math.floor(new Date() / 1000);

        let query_params = [1, current_time];
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_params
        );
    },

    //********************************************************************* */
    // ******************** GEt expired Announcements   **************************/
    //********************************************************************* */

    get_expiredAnnouncementFun: function(req, res) {
        let sql_prepare_statement = sql_prepare.sql_getExpiredAnnouncements;
        let current_time = Math.floor(new Date() / 1000);

        let query_params = [1, current_time];
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_params
        );
    },

    //********************************************************************* */
    // ******************** GEt Single Announcements   **************************/
    //********************************************************************* */

    get_single_announcementFun: function(req, res) {
        let announcement_id = req.params.announcement_id;
        let sql_prepare_statement = sql_prepare.sql_getSingleAnnouncements;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            announcement_id
        );
    },

    //********************************************************************* */
    // ******************** Update Announcements   **************************/
    //********************************************************************* */

    update_announcementFun: function(req, res) {
        let announcement_id = req.params.announcement_id;

        let update_type = req.params.update_type;
        let update_AnnouncmentData;
        if (update_type == "999") {
            update_AnnouncmentData = {
                announc_for: req.body.u_announc_for,
                announc_details: req.body.u_announc_desc,
                announc_title: req.body.u_announc_title
            };
        } else {
            update_AnnouncmentData = {
                announc_details: req.body.u_announc_desc,
                announc_title: req.body.u_announc_title
            };
        }

        let sql_prepare_statement = sql_prepare.sql_updateAnnouncements;
        let update_params = [update_AnnouncmentData, announcement_id];
        //call to update data from db
        let query = sql_prepare.run_update_query(
            req,
            res,
            con,
            sql_prepare_statement,
            update_params
        );
    },

    //********************************************************************* */
    // ******************** Delete Announcements   **************************/
    //********************************************************************* */

    delete_announcementFun: function(req, res) {
        let announcement_id = req.params.announcement_id;
        let sql_prepare_statement = sql_prepare.sql_deleteAnnouncements;

        //call to delete data from db
        let query = sql_prepare.run_delete_query(
            req,
            res,
            con,
            sql_prepare_statement,
            announcement_id
        );
    },

    //********************************************************************************************************* */
    // ***************************************** Fee Management Functions ***************************************/
    //******************************************************************************************************** */

    //********************************************************************************** */
    // ************************** check fee struct is already added  ************************/
    //******************************************************************************* */

    check_isFeeAlreadyStructSet: function(req, res, check) {
        return new Promise(function(resolve, reject) {
            let class_id = req.body.class_id;
            let year = req.body.running_session;
            let fee_title = req.body.fee_title;

            con.query(
                sql_prepare.sql_check_isFeeAlreadyStructSet, [class_id, year],
                (err, result) => {
                    if (err) {
                        resolve("Database Error : " + err);
                    } else {
                        if (result[0].feeStruct_count >= 1) {
                            let resp = {
                                status: 1,
                                msg: "available"
                            };
                            resolve(resp);
                        } else {
                            let resp = {
                                status: 0,
                                msg: "not available"
                            };
                            resolve(resp);
                        }
                    }
                }
            );
        });
    },

    //********************************************************************************** */
    // ************************** check fee struct is set or not  ************************/
    //******************************************************************************* */

    check_isFeeStructSet: function(req, res) {
        return new Promise(function(resolve, reject) {
            let class_id = req.params.class_id;
            let year = req.params.running_session;

            con.query(
                sql_prepare.sql_check_isFeeStructSet, [class_id, year],
                (err, result) => {
                    if (err) {
                        resolve("Database Error : " + err);
                    } else {
                        if (result[0].feeStruct_count >= 1) {
                            let resp = {
                                status: 1,
                                msg: "available"
                            };
                            resolve(resp);
                        } else {
                            let resp = {
                                status: 0,
                                msg: "not available"
                            };
                            resolve(resp);
                        }
                    }
                }
            );
        });
    },

    //********************************************************************* */
    // ************************** Add new fee struct  ************************/
    //********************************************************************* */

    add_feeStructFun: function(req, res) {
        let feeStructData = {
            class_id: req.body.class_id,
            fee_title: req.body.fee_title,
            fee_amount: req.body.fee_amount,
            year: req.body.running_session
        };

        let sql_prepare_statement = sql_prepare.sql_addFeeStructure;

        //call function to insert data into db
        let query = sql_prepare.run_add_query(
            req,
            res,
            con,
            sql_prepare_statement,
            feeStructData
        );
    },

    //********************************************************************* */
    // ************************** Get fee struct details  ********************/
    //********************************************************************* */

    get_fee_structDetailsFun: function(req, res) {
        let year = req.params.running_session;
        let sql_prepare_statement = sql_prepare.sql_getFeeStructureDetails;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            year
        );
    },

    //********************************************************************* */
    // ************************** Get fee struct details by class id  ********************/
    //********************************************************************* */

    getFeeStructByClassId: function(req, res) {
        let year = req.params.running_session;
        let class_id = req.params.class_id;
        let sql_prepare_statement = sql_prepare.sql_getFeeStructureByClassId;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement, [class_id, year]
        );
    },

    //********************************************************************* */
    // ********* Get Single class fee struct details  ************************/
    //********************************************************************* */
    get_single_ClassfeeStructData: function(req, res) {
        let id = req.params.fee_struct_id;
        let sql_prepare_statement = sql_prepare.sql_getSingleClassFeeStruct;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            id
        );
    },

    //********************************************************************* */
    // ************************** Delete fee struct   ************************/
    //********************************************************************* */

    delete_feeStructFun: function(req, res) {
        let id = req.params.fee_struct_id;
        let sql_prepare_statement = sql_prepare.sql_deleteFeeStruct;
        sql_prepare.run_delete_query(req, res, con, sql_prepare_statement, id);
    },

    //********************************************************************* */
    // ************************** Update class fee structure  ************************/
    //********************************************************************* */

    update_feeStructFun: function(req, res) {
        let id = req.body.id;
        let fee_struct_data = {
            fee_amount: req.body.fee_amount,
            fee_title: req.body.fee_title
        };
        let update_params = [fee_struct_data, id];
        let sql_prepare_statement = sql_prepare.sql_updateFeeStruct;
        //call to update data from db
        let query = sql_prepare.run_update_query(
            req,
            res,
            con,
            sql_prepare_statement,
            update_params
        );
    },

    //********************************************************************* */
    // ************************** Get class students data  ************************/
    //********************************************************************* */

    get_classStudentsF: function(req, res) {
        let query_params = [req.params.class_id, req.params.running_session, 1];
        let sql_prepare_statement = sql_prepare.sql_getClassStudents;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_params
        );
    },

    //********************************************************************* */
    // ************************* Get class fee by class id  *****************/
    //********************************************************************* */

    get_classFeeF: function(req, res) {
        let query_params = [req.params.class_id, req.params.running_session];
        let sql_prepare_statement = sql_prepare.sql_getClassFee;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_params
        );
    },

    //********************************************************************* */
    // ************************* check fee discount already set  *****************/
    //********************************************************************* */

    check_studentFeeDiscountFun: function(req, res) {
        return new Promise(function(resolve, reject) {
            let class_id = req.body.class_id;
            let year = req.body.running_session;
            let student_id = req.body.student_id;

            con.query(
                sql_prepare.sql_check_isFeeDiscountSet, [student_id, class_id, year],
                (err, result) => {
                    if (err) {
                        resolve("Database Error : " + err);
                    } else {
                        if (result[0].feeDisc_count >= 1) {
                            let resp = {
                                status: 1,
                                msg: "available"
                            };
                            resolve(resp);
                        } else {
                            let resp = {
                                status: 0,
                                msg: "not available"
                            };
                            resolve(resp);
                        }
                    }
                }
            );
        });
    },

    //********************************************************************* */
    // ************************* set student fee discount  *****************/
    //********************************************************************* */

    set_studentFeeDiscountFun: function(req, res) {
        let fee_discount_data = {
            class_id: req.body.class_id,
            year: req.body.running_session,
            student_id: req.body.student_id,
            discount_amount: req.body.discount_amount,
            comments: req.body.comment,
            status: req.body.status
        };

        let sql_prepare_statement = sql_prepare.sql_set_studentFeeDiscount;

        //call function to insert data into db
        let query = sql_prepare.run_add_query(
            req,
            res,
            con,
            sql_prepare_statement,
            fee_discount_data
        );
    },

    //********************************************************************* */
    // ************************* get student fee discount list  *************/
    //********************************************************************* */

    get_studentsFeeDiscListFun: function(req, res) {
        let query_params = [
            req.params.class_id,
            req.params.running_session,
            req.params.running_session
        ];

        let sql_prepare_statement = sql_prepare.sql_getStdFeeDiscountsList;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_params
        );
    },

    //********************************************************************* */
    // *************** get single student fee discount details  *************/
    //********************************************************************* */

    get_singleStdFeeDiscDetailsFun: function(req, res) {
        let discount_id = req.params.discount_id;
        let sql_prepare_statement = sql_prepare.sql_getSingleStdFeeDiscountDetails;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            discount_id
        );
    },

    //********************************************************************* */
    // *************** Update student fee discount details  *************/
    //********************************************************************* */

    update_stdFeeDiscountDetails: function(req, res) {
        let discount_id = req.params.discount_id;
        let update_data = {
            comments: req.body.comments,
            discount_amount: req.body.discount_amount
        };

        let update_params = [update_data, discount_id];
        let sql_prepare_statement = sql_prepare.sql_updateStdFeeDiscDetails;
        //call to update data from db
        let query = sql_prepare.run_update_query(
            req,
            res,
            con,
            sql_prepare_statement,
            update_params
        );
    },

    //********************************************************************* */
    // *************** disable student fee discounts  *************/
    //********************************************************************* */

    change_stdFeeDiscountStatus: function(req, res) {
        let discount_id = req.params.discount_id;
        let status = req.params.status;
        let update_status = {
            status: status
        };
        let update_params = [update_status, discount_id];
        let sql_prepare_statement = sql_prepare.sql_updateStdFeeDiscDetails; // use sql query to update status
        //call to update data from db
        let query = sql_prepare.run_update_query(
            req,
            res,
            con,
            sql_prepare_statement,
            update_params
        );
    },

    //********************************************************************* */
    // ****** check whether fee invoice is laready generated ****************/
    //********************************************************************* */

    check_classFeeInvoiceFunGenerated: function(req, res) {
        return new Promise(function(resolve, reject) {
            let class_id = req.body.class_id;
            let year = req.body.running_session;

            let fee_month = req.body.fee_month;

            con.query(
                sql_prepare.sql_check_isFeeInvoiceCreated, [class_id, fee_month, year],
                (err, result) => {
                    if (err) {
                        resolve("Database Error : " + err);
                    } else {
                        if (result[0].feeInvoice_count >= 1) {
                            let resp = {
                                status: 1,
                                msg: "available"
                            };
                            resolve(resp);
                        } else {
                            let resp = {
                                status: 0,
                                msg: "not available"
                            };
                            resolve(resp);
                        }
                    }
                }
            );
        });
    },

    //********************************************************************* */
    // ********* get all students for fee invoice generation  **************/
    //********************************************************************* */

    get_allClassStudents: function(req, res) {
        return new Promise(function(resolve, reject) {
            let query_params = [req.body.class_id, req.body.running_session, 1];
            let sql_prepare_statement = sql_prepare.sql_getClassStudents;

            con.query(
                sql_prepare.sql_getClassStudents,
                query_params,
                (err, result) => {
                    if (err) {
                        resolve("Mysql error for geeting all students :  " + err);
                    } else {
                        if (result.length >= 1) {
                            let resp = {
                                status: 1,
                                data: result
                            };
                            resolve(resp);
                        } else {
                            let resp = {
                                status: 0,
                                msg: "no data available"
                            };
                            resolve(resp);
                        }
                    }
                }
            );
        });
    },

    //********************************************************************* */
    // ******************** create class fee invoice  ***********************/
    //********************************************************************* */

    create_classFeeInvoice: function(req, res, studentsData) {
        return new Promise(function(resolve, reject) {
            let class_id = req.body.class_id;
            let fee_month = req.body.fee_month;
            let creation_timestamp = req.body.creation_timestamp;
            let duedate_timestamp = req.body.duedate_timestamp;
            let fee_desc = req.body.fee_desc;
            let month = req.body.month;
            let fee_year = req.body.fee_year;
            let fee_amount = req.body.fee_amount;
            let fee_title = req.body.fee_title;
            let total_fee = req.body.total_fee;
            let running_session = req.body.running_session;
            let amount_due = req.body.total_fee;
            let fee_status = "unpaid";

            async.forEachOf(
                studentsData,
                function(data, key, callback) {
                    // It will be executed one by one
                    let invoice_data = {
                        student_id: studentsData[key].std_id,
                        class_id: class_id,
                        fee_month: fee_month,
                        creation_timestamp: creation_timestamp,
                        duedate_timestamp: duedate_timestamp,
                        fee_desc: fee_desc,
                        month: month,
                        fee_year: fee_year,
                        fee_amount: fee_amount,
                        fee_title: fee_title,
                        total_fee: total_fee,
                        year: running_session,
                        amount_due: amount_due,
                        fee_status: fee_status
                    };
                    let query = con.query(
                        sql_prepare.create_bulkInvoice,
                        invoice_data,
                        (err, result) => {
                            if (err) {
                                return callback(err);
                            }

                            callback();
                        }
                    );
                },
                function(err, result) {
                    if (err) {
                        resolve("Msql error, for creating invoice :" + err);
                    } else {
                        let resp = {
                            status: 1,
                            msg: "Invoice created successfully"
                        };
                        resolve(resp);
                    }
                }
            );
        });
    },

    //******************************************************************************* */
    // *****deduct student fee discount amount after fee invoice generated *********/
    //******************************************************************************* */

    deduct_discountFeeAmount: function(req, res) {
        let query_params = [req.body.class_id, req.body.running_session, 1];
        let sql_prepare_statement =
            sql_prepare.sql_getStdFeeDiscountsForAmountDecduction;

        // get students and discount amount who got discounts in their fee
        con.query(sql_prepare_statement, query_params, (err, result) => {
            if (err) {
                res.json({
                    status: 402,
                    msg: "Mysql error, for fee dicount amount deduction" + err // send db error
                });
            } else {
                if (result.length >= 1) {
                    // if there are any students who go discounts in their fee
                    let feemonth = req.body.fee_month;
                    async.forEachOf(
                        result,
                        function(data, key, callback) {
                            // It will be executed one by one
                            let fee_month = feemonth;
                            let student_id = result[key].student_id;
                            let class_id = result[key].class_id;
                            let year = result[key].year;

                            let discount_data = {
                                fee_discount: result[key].discount_amount,
                                total_fee: result[key].total_fee - result[key].discount_amount,
                                amount_due: result[key].total_fee - result[key].discount_amount
                            };

                            let update_params = [discount_data, student_id, year, fee_month];

                            // update fee amount against each student who got fee discount
                            let query = con.query(
                                sql_prepare.update_studentFeeDiscountsInInvoice,
                                update_params,
                                (err, result) => {
                                    if (err) {
                                        return callback(err);
                                    }

                                    callback();
                                }
                            );
                        },
                        function(err, result) {
                            if (err) {
                                res.json({
                                    status: 402,
                                    msg: "Mysql error, deduct discount amount " + err // send db error
                                });
                            } else {
                                res.json({
                                    status: 1,
                                    msg: "discount fee deducted from invoice successfully"
                                });
                            }
                        }
                    );
                } else {
                    res.json({
                        status: 1,
                        msg: "No student got discount in fee"
                    });
                }
            }
        });
    },

    //********************************************************************* */
    // **** add previous month pending amount to next month  ****************/
    //********************************************************************* */

    add_pendingAmount: function(req, res, studentsData) {
        return new Promise(function(resolve, reject) {
            let prev_month = req.body.month - 1;
            let fee_year = req.body.fee_year;
            let query_params = [
                req.body.class_id,
                req.body.running_session,
                prev_month,
                fee_year
            ];
            let sql_prepare_statement =
                sql_prepare.sql_getStdPendingAmountToAddInNextMonth;

            // get students and discount amount who got discounts in their fee
            con.query(sql_prepare_statement, query_params, (err, result) => {
                if (err) {
                    resolve("Mysql error, for previous month  pending fee adding" + err);
                } else {
                    if (result.length >= 1) {
                        // if there are any students whose fee is pending
                        let feemonth = req.body.fee_month;
                        async.forEachOf(
                            result,
                            function(data, key, callback) {
                                // It will be executed one by one
                                let fee_month = feemonth;
                                let student_id = result[key].student_id;
                                let class_id = result[key].class_id;
                                let year = result[key].year;

                                let pending_fee_data = {
                                    fee_extra_charges: result[key].amount_due,
                                    extra_charges_desc: "Last month pending fee " +
                                        result[key].amount_due +
                                        " added",
                                    total_fee: req.body.total_fee + result[key].amount_due,
                                    amount_due: req.body.total_fee + result[key].amount_due
                                };

                                let update_params = [
                                    pending_fee_data,
                                    student_id,
                                    year,
                                    fee_month
                                ];

                                // update fee amount against each student who has previous month pending fee
                                let query = con.query(
                                    sql_prepare.update_studentFeeDiscountsInInvoice,
                                    update_params,
                                    (err, result) => {
                                        if (err) {
                                            return callback(err);
                                        } else {
                                            let due_date_update = {
                                                duedate_timestamp: req.body.duedate_timestamp
                                            };
                                            let query_params2 = [
                                                due_date_update,
                                                student_id,
                                                fee_year,
                                                prev_month
                                            ];
                                            let sql_prepare_statement2 =
                                                sql_prepare.sql_updatePrevMonthFeeDueDate;
                                            let query2 = con.query(
                                                sql_prepare_statement2,
                                                query_params2
                                            );
                                        }
                                        callback();
                                    }
                                );
                            },
                            function(err, result) {
                                if (err) {
                                    resolve("Mysql error, add previous month pending fee " + err);
                                } else {
                                    let resp = {
                                        status: 1,
                                        msg: "added previous month pending fee in invoice successfully"
                                    };

                                    resolve(resp);
                                }
                            }
                        );
                    } else {
                        let resp = {
                            status: 1,
                            msg: "No student has pending fee"
                        };

                        resolve(resp);
                    }
                }
            });
        });
    },

    //*********************************************************************************** */
    // ******************** Get student fee invoive details   *****************************/
    //*********************************************************************************** */

    get_StdFeeInvoiceDetailsF: function(req, res) {
        let class_id = req.params.class_id;
        let fee_month = req.params.fee_month;
        let year = req.params.running_session;

        let query_paramas = [fee_month, class_id, year, year];

        let sql_prepare_statement = sql_prepare.sql_getStudentFeeInvoiceDetails;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_paramas
        );
    },

    //*********************************************************************************** */
    // ******************** Update student fee invoive details   *****************************/
    //*********************************************************************************** */

    update_feeInvoiceDetailsFun: function(req, res) {
        let invoice_id = req.params.invoice_id;
        let update_data = {
            duedate_timestamp: req.body.duedate_timestamp,
            extra_charges_desc: req.body.extra_charges_desc,
            fee_amount: req.body.fee_amount,
            fee_discount: req.body.fee_discount,
            fee_extra_charges: req.body.fee_extra_charges,
            fee_title: req.body.fee_title,
            total_fee: req.body.total_fee
        };
        let update_params = [update_data, invoice_id];
        let sql_prepare_statement = sql_prepare.sql_updateStdFeeInvoiceDetails;
        //call to update data from db
        let query = sql_prepare.run_update_query(
            req,
            res,
            con,
            sql_prepare_statement,
            update_params
        );
    },

    //*********************************************************************************** */
    // ******************** Update student fee payement status details   *****************************/
    //*********************************************************************************** */

    update_feePaymentDetailsFun: function(req, res) {
        let invoice_id = req.params.invoice_id;
        let update_data = {
            amount_paid: req.body.amount_paid,

            fee_status: req.body.fee_status,
            amount_due: req.body.amount_due,
            feepaid_date: req.body.feepaid_date
        };

        let update_params = [update_data, invoice_id];
        let sql_prepare_statement = sql_prepare.sql_updateStdFeeInvoiceDetails;
        //call to update data from db
        let query = sql_prepare.run_update_query(
            req,
            res,
            con,
            sql_prepare_statement,
            update_params
        );
    },

    //*********************************************************************************** */
    // ******************** Get student fee payment histroy   ********************/
    //*********************************************************************************** */

    get_studentFeeHistroyFun: function(req, res) {
        let student_id = req.params.student_id;
        let year = req.params.running_session;

        let query_paramas = [student_id, year];

        let sql_prepare_statement = sql_prepare.sql_getStudentFeePaymentsHistroy;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_paramas
        );
    },

    //********************************************************************************************************* */
    // ****************************************** User management Functions ***************************************/
    //******************************************************************************************************** */

    //********************************************************************* */
    // ************************* check user already added  *****************/
    //********************************************************************* */

    check_userEmail: function(req, res) {
        return new Promise(function(resolve, reject) {
            let user_email = req.body.user_email;

            con.query(
                sql_prepare.sql_check_isUserAlreadyAdded, [user_email, 1],
                (err, result) => {
                    if (err) {
                        resolve("Database Error : " + err);
                    } else {
                        if (result[0].email_exist >= 1) {
                            let resp = {
                                status: 1,
                                msg: "available"
                            };
                            resolve(resp);
                        } else {
                            let resp = {
                                status: 0,
                                msg: "not available"
                            };
                            resolve(resp);
                        }
                    }
                }
            );
        });
    },

    //********************************************************************* */
    // ************************* Forget password reset *****************/
    //********************************************************************* */

    reset_passwordUpdate: function(req, res, password) {
        return new Promise(function(resolve, reject) {
            let user_email = req.body.user_email;

            con.query(
                sql_prepare.sql_reset_forgetPassword, [password, user_email],
                (err, result) => {
                    if (err) {
                        resolve("Database Error : " + err);
                    } else {
                        let resp = {
                            status: 1,
                            msg: "password updated"
                        };
                        resolve(resp);
                    }
                }
            );
        });
    },

    //********************************************************************* */
    // ************************* add new user  ****************************/
    //********************************************************************* */
    set_addNewUserFun: function(req, res) {
        let user_data = {
            user_name: req.body.user_name,
            user_email: req.body.user_email,
            user_password: req.body.user_password,
            phone_num: req.body.phone_num,
            user_level: req.body.user_level
        };

        let sql_prepare_statement = sql_prepare.sql_addNewUser;

        //call function to insert data into db
        let query = sql_prepare.run_add_query(
            req,
            res,
            con,
            sql_prepare_statement,
            user_data
        );
    },

    //********************************************************************* */
    // ************************* Get Users Data  ****************************/
    //********************************************************************* */
    get_userdataFun: function(req, res) {
        let sql_prepare_statement = sql_prepare.sql_getUsersData;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement
        );
    },

    //********************************************************************* */
    // *********** check on update email already present  *****************/
    //********************************************************************* */

    check_onUpdateUserEmail: function(req, res) {
        return new Promise(function(resolve, reject) {
            let user_email = req.body.user_email;
            let existing_email = req.body.existing_email;

            con.query(
                sql_prepare.sql_checkOnUpdate_userEmail, [1, existing_email, user_email],
                (err, result) => {
                    if (err) {
                        resolve("Database Error : " + err);
                    } else {
                        if (result[0].email_exist >= 1) {
                            let resp = {
                                status: 1,
                                msg: "available"
                            };
                            resolve(resp);
                        } else {
                            let resp = {
                                status: 0,
                                msg: "not available"
                            };
                            resolve(resp);
                        }
                    }
                }
            );
        });
    },

    //********************************************************************* */
    // ************************* Update User Data  ****************************/
    //********************************************************************* */

    update_userInfoFun: function(req, res) {
        let login_id = req.params.login_id;
        let update_data = {
            user_email: req.body.user_email,
            user_name: req.body.user_name,
            phone_num: req.body.phone_num,
            user_level: req.body.user_level,
            status: req.body.status
        };

        let update_params = [update_data, login_id];
        let sql_prepare_statement = sql_prepare.sql_updateUserData;
        //call to update data from db
        let query = sql_prepare.run_update_query(
            req,
            res,
            con,
            sql_prepare_statement,
            update_params
        );
    },

    //********************************************************************* */
    // ************************* Update User Password  ****************************/
    //********************************************************************* */

    update_userPasswordF: function(req, res) {
        let login_id = req.body.login_id;
        let update_data = {
            user_password: req.body.user_password
        };

        let update_params = [update_data, login_id];
        let sql_prepare_statement = sql_prepare.sql_updateUserData;
        //call to update data from db
        let query = sql_prepare.run_update_query(
            req,
            res,
            con,
            sql_prepare_statement,
            update_params
        );
    },

    //********************************************************************************************************* */
    // ******************************** Settings Functions ***************************************/
    //******************************************************************************************************** */

    //********************************************************************* */
    // ************************** Get session Details *****************************/
    //********************************************************************* */

    get_session_detailsF: function(req, res) {
        let data = req.params.data;
        let sql_prepare_statement;
        if (data == "all") {
            sql_prepare_statement = sql_prepare.sql_getAllSessionDetails;
        } else {
            sql_prepare_statement = sql_prepare.sql_getSessionDetails;
        }

        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement
        );
    },

    //********************************************************************* */
    // ************************** Get Active Session Details ***********/
    //********************************************************************* */

    get_ActiveSessionF: function(req, res) {
        let sql_prepare_statement = sql_prepare.sql_getActiveSession;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement
        );
    },

    //********************************************************************* */
    // ************************** Get Schhol Info **************************/
    //********************************************************************* */

    get_school_infoF: function(req, res) {
        let sql_prepare_statement = sql_prepare.sql_getSchoolInfo;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement
        );
    },

    //********************************************************************* */
    // *********** check on session name already in use  *****************/
    //********************************************************************* */

    checkSessionName: function(req, res) {
        return new Promise(function(resolve, reject) {
            let session_name = req.body.session_name;

            con.query(
                sql_prepare.sql_check_sessionName, [session_name],
                (err, result) => {
                    if (err) {
                        resolve("Database Error : " + err);
                    } else {
                        var resp;
                        if (result[0].sessionName_exists >= 1) {
                            resp = {
                                status: 1,
                                msg: "available"
                            };
                        } else {
                            resp = {
                                status: 0,
                                msg: "not available"
                            };
                        }
                        resolve(resp);
                        reject(new Error("session name check error"));
                    }
                }
            );
        });
    },

    //********************************************************************* */
    // *********************************** Add new session  *****************/
    //********************************************************************* */

    add_newSessionFun: function(req, res) {
        let session_data = {
            session_name: req.body.session_name,
            start_date: req.body.start_date,
            end_date: req.body.end_date
        };
        let sql_prepare_statement = sql_prepare.sql_add_newSession;

        //call function to insert data into db
        let query = sql_prepare.run_add_query(
            req,
            res,
            con,
            sql_prepare_statement,
            session_data
        );
    },

    //********************************************************************* */
    // *********************************** set session active  *****************/
    //********************************************************************* */

    set_sessionActiveF: function(req, res) {
        let session_id = req.body.session_id;
        let status = req.body.status;

        let update_params = [session_id, session_id];
        let sql_prepare_statement = sql_prepare.sql_set_session_active;
        //call to update data from db
        let query = sql_prepare.run_update_query(
            req,
            res,
            con,
            sql_prepare_statement,
            update_params
        );
    },

    //********************************************************************* */
    // *********************************** update school info  *****************/
    //********************************************************************* */

    update_school_info: function(req, res) {
        let school_id = req.params.school_id;
        let update_data = {
            school_name: req.body.school_name,
            school_num: req.body.school_num,
            school_address: req.body.school_address
        };

        let update_params = [update_data, school_id];
        let sql_prepare_statement = sql_prepare.sql_updateSchoolInfo;
        //call to update data from db
        let query = sql_prepare.run_update_query(
            req,
            res,
            con,
            sql_prepare_statement,
            update_params
        );
    },

    //********************************************************************************************************* */
    // ************************************************** Dashboard APIs ***************************************/
    //******************************************************************************************************** */

    //********************************************************************* */
    // *********** Count students , teachers etc *****************************/
    //********************************************************************* */

    get_count: function(req, res) {
        let year = req.params.running_session;
        let count_type = req.params.count_type;
        let sql_getCount;

        if (count_type == "students") {
            sql_getCount = sql_prepare.sql_getStudentsCount;
        }
        if (count_type == "teachers") {
            sql_getCount = sql_prepare.sql_getTeachersCount;
        }
        if (count_type == "parents") {
            sql_getCount = sql_prepare.sql_getParentsCount;
        }
        if (count_type == "users") {
            sql_getCount = sql_prepare.sql_getUsersCount;
        }
        if (count_type == "classes") {
            sql_getCount = sql_prepare.sql_getClassesCount;
        }
        if (count_type == "sections") {
            sql_getCount = sql_prepare.sql_getSectionsCount;
        }

        let sql_prepare_statement = sql_getCount;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement
        );
    },

    //********************************************************************************************************* */
    // ******************************** Assignments management  ***************************************/
    //******************************************************************************************************** */

    //********************************************************************* */
    // ********************* Add assignment function  ***********************/
    //********************************************************************* */

    add_assignmentF(req, res) {
        let add_assignment_data = {
            class_id: req.body.class_id,
            section_id: req.body.section_id,
            subject_id: req.body.subject_id,
            title: req.body.title,
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
                        resolve("Database Error :" + err);
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
    },

    //********************************************************************************************************* */
    // ******************************** Expenses Functions  ***************************************/
    //******************************************************************************************************** */

    //********************************************************************* */
    // *************************** Add new expenses   ***********************/
    //********************************************************************* */

    add_expensesF: function(req, res) {
        let expense_data = {
            expense_title: req.body.expense_title,
            expense_desc: req.body.expense_desc,
            expense_date: req.body.expense_date,
            expense_amount: req.body.expense_amount
        };

        let sql_prepare_statement = sql_prepare.sql_add_newExpense;

        //call function to insert data into db
        let query = sql_prepare.run_add_query(
            req,
            res,
            con,
            sql_prepare_statement,
            expense_data
        );
    },

    //********************************************************************* */
    // ********************* Get expense Details  ***********************/
    //********************************************************************* */

    get_expense_details: function(req, res) {
        let sql_prepare_statement = sql_prepare.sql_get_expenses;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement
        );
    },

    //********************************************************************* */
    // ************************* Update Expenses ***************/
    //********************************************************************* */

    update_expense_details(req, res, std_assign_id) {
        let expense_id = req.body.expense_id;

        let update_data = {
            expense_title: req.body.expense_title,
            expense_desc: req.body.expense_desc,
            expense_date: req.body.expense_date,
            expense_amount: req.body.expense_amount
        };
        let sql_prepare_statement = sql_prepare.sql_update_expense;
        let sql_query_params = [update_data, expense_id];

        //call function to assign elective subj  against student
        let query = sql_prepare.run_update_query(
            req,
            res,
            con,
            sql_prepare_statement,
            sql_query_params
        );
    },

    //********************************************************************************************************* */
    // ******************************** Common Functions  ***************************************/
    //******************************************************************************************************** */

    //********************************************************************* */
    // ******************** check unique cnic/phone  ************************/
    //********************************************************************* */

    check_uniqueF: function(req, res) {
        let type = req.body.type;
        let tbl_name = req.body.tbl_name;
        let check_value = req.body.check_value;
        let query_params;
        let sql_query;
        //parent unique
        if (type == "cnic" && tbl_name == "tbl_parents") {
            sql_query = sql_prepare.sql_checkParent_cnic_unique;
        } else if (type == "phone" && tbl_name == "tbl_parents") {
            sql_query = sql_prepare.sql_checkParent_phone_unique;
        } else if (type == "email" && tbl_name == "tbl_parents") {
            sql_query = sql_prepare.sql_checkParent_email_unique;
        } // teacher unique
        else if (type == "cnic" && tbl_name == "tbl_teachers") {
            sql_query = sql_prepare.sql_checkTeacher_cnic_unique;
        } else if (type == "phone" && tbl_name == "tbl_teachers") {
            sql_query = sql_prepare.sql_checkTeacher_phone_unique;
        } else if (type == "email" && tbl_name == "tbl_teachers") {
            sql_query = sql_prepare.sql_checkTeacher_email_unique;
        }

        let query = con.query(sql_query, [check_value, 1], (err, result) => {
            if (err) {
                res.json({
                    status: 402,
                    msg: "Mysql Error : " + err
                });
            } else {
                res.json({
                    status: 1,
                    data: result
                });
            }
        });
    },

    //********************************************************************* */
    // ******************** check username already added ********************/
    //********************************************************************* */

    isUserNamePresentFun: function(req, res) {
        let user_name = req.body.user_name.replace(/\s+/g, "");
        let table_name = req.body.table_name;
        let sql_query;

        //*****  set query according to table name  ********//

        if (table_name == "tbl_parents") {
            sql_query = sql_prepare.sql_checkPUserNameAdded;
        }
        if (table_name == "tbl_teachers") {
            sql_query = sql_prepare.sql_checkTUserNameAdded;
        }
        if (table_name == "tbl_students") {
            sql_query = sql_prepare.sql_checkSUserNameAdded;
        }

        let query = con.query(sql_query, [user_name, 1], (err, result) => {
            if (err) {
                res.json({
                    msg: "Mysql Error : " + err
                });
            } else {
                res.json(result);
            }
        });
    },

    //********************************************************************* */
    // ***************** Upload profile Images ***********************/
    //********************************************************************* */

    upload_profile_images: function(req, res, next) {
        // console.log(req.files);

        // image directory
        let file_path = __dirname + "/uploads/profile_images";
        let thumb_path = __dirname + "/uploads/profile_images/thumbs";

        // images array
        let images = req.files;

        let id = req.body.id; //
        let tbl_name = req.body.tbl_name; //
        let source = req.body.source; // image source / teacher / student / parent

        // getting file name
        let file_name = images[0].filename;

        // get the image extension
        let image_type = images[0].mimetype;
        let image_extension_array = image_type.split("/");
        let image_extension = image_extension_array[1];

        let new_image_name = source + "_" + id; // new image name with 'student / teacher _ teacher_id _'
        // console.log(file_path);

        try {
            // obtain the size of an image

            sizeOf(file_path + "/" + file_name)
                .then(dimensions => {
                    var image_width = dimensions.width;
                    var image_height = dimensions.height;

                    let aspectRatio = image_width / image_height;

                    // if height is greater than width and height > 1200 than

                    if (image_height > image_width && image_height >= 531) {
                        image_height = 531; // set image height

                        // set new width according to new height
                        image_width = image_height * aspectRatio;
                    }

                    // check whether image width is greater than height
                    else if (image_width > image_height && image_width >= 413) {
                        image_width = 413;

                        // set new height according to new width
                        image_height = image_width / aspectRatio;
                    }

                    thumb({
                            source: file_path + "/" + file_name, // could be a filename: dest/path/image.jpg
                            destination: file_path + "/",
                            suffix: "",
                            concurrency: 4,
                            overwrite: true,
                            quiet: false,
                            width: image_width,
                            height: image_height,
                            basename: new_image_name
                        })
                        .then(function() {
                            thumb({
                                    source: file_path + "/" + file_name, // could be a filename: dest/path/image.jpg
                                    destination: thumb_path + "/",
                                    suffix: "_thumb",
                                    concurrency: 4,
                                    overwrite: true,
                                    quiet: false,
                                    width: 100,
                                    height: 100,
                                    basename: new_image_name
                                })
                                .then(function() {
                                    // delete orignal image file
                                    try {
                                        fs.unlinkSync(file_path + "/" + file_name);

                                        let image_full_path =
                                            server_profile_images_path +
                                            new_image_name +
                                            "." +
                                            image_extension;
                                        let thumb_path =
                                            server_profile_images_path +
                                            "thumbs/" +
                                            new_image_name +
                                            "_thumb" +
                                            "." +
                                            image_extension;
                                        let update_query;

                                        // store images details  in db

                                        if (tbl_name == "tbl_students") {
                                            update_query =
                                                "UPDATE ?? SET image_path = ? , thumb_path = ? WHERE std_id = ? ";
                                        } else if (tbl_name == "tbl_teachers") {
                                            update_query =
                                                "UPDATE ?? SET image_path = ? , thumb_path = ? WHERE teacher_id = ? ";
                                        } else {
                                            update_query =
                                                "UPDATE ?? SET image_path = ? , thumb_path = ? WHERE login_id = ? ";
                                        }

                                        // store image and thumb path in database
                                        var query = con.query(
                                            update_query, [tbl_name, image_full_path, thumb_path, id],
                                            function(error, results, fields) {
                                                if (error) throw error;
                                                // Neat!
                                            }
                                        );
                                    } catch (err) {
                                        console.log("image delete error" + err);
                                    }
                                })
                                .catch(function(e) {
                                    console.log("Error creating thumb", e.toString());
                                });
                        })
                        .catch(function(e) {
                            console.log("Error creating new image", e.toString());
                        });
                })
                .catch(err => console.error(err));
        } catch (err) {
            console.log("get image size error" + err);
        }
    },

    //********************************************************************* */
    // ***************** Upload Quiz Assignment Images ***********************/
    //********************************************************************* */

    upload_images: function(req, res, next) {
        // console.log(req.files);

        // image directory
        let file_path = __dirname + "/uploads/images";
        let thumb_path = __dirname + "/uploads/thumb";

        // images array
        let images = req.files;

        let source_id = req.body.source_id; // get the assignmemt id
        let source_type = req.body.source_type; // get assignment / quiz

        // loop through the number of images uploaded
        async.forEachOf(images, function(data, key, callback) {
            // It will be executed one by one

            // getting file name
            let file_name = images[key].filename;

            // get the image extension
            let image_type = images[key].mimetype;
            let image_extension_array = image_type.split("/");
            let image_extension = image_extension_array[1];

            let new_image_name = source_type + "_" + source_id + "_" + key; // new image name with 'assignment / quiz _ assignment_id _ count'
            // console.log(file_path);

            try {
                // obtain the size of an image

                sizeOf(file_path + "/" + file_name)
                    .then(dimensions => {
                        var image_width = dimensions.width;
                        var image_height = dimensions.height;

                        let aspectRatio = image_width / image_height;

                        // if height is greater than width and height > 1200 than

                        if (image_height > image_width && image_height >= 1200) {
                            image_height = 1200; // set image height

                            // set new width according to new height
                            image_width = image_height * aspectRatio;
                        }

                        // check whether image width is greater than height
                        else if (image_width > image_height && image_width >= 1200) {
                            image_width = 1200;

                            // set new height according to new width
                            image_height = image_width / aspectRatio;
                        }

                        thumb({
                                source: file_path + "/" + file_name, // could be a filename: dest/path/image.jpg
                                destination: file_path + "/",
                                suffix: "",
                                concurrency: 4,
                                overwrite: true,
                                quiet: false,
                                width: image_width,
                                height: image_height,
                                basename: new_image_name
                            })
                            .then(function() {
                                // generate thumb nail
                                thumb({
                                        source: file_path + "/" + file_name, // could be a filename: dest/path/image.jpg
                                        destination: thumb_path + "/",
                                        suffix: "_thumb",
                                        concurrency: 4,
                                        overwrite: true,
                                        quiet: false,
                                        width: 200,
                                        height: 200,
                                        basename: new_image_name
                                    })
                                    .then(function() {
                                        // delete orignal image file
                                        try {
                                            fs.unlinkSync(file_path + "/" + file_name);

                                            let image_full_path =
                                                server_image_path +
                                                new_image_name +
                                                "." +
                                                image_extension;
                                            let thumb_full_path =
                                                server_thumb_path +
                                                new_image_name +
                                                "_thumb." +
                                                image_extension;
                                            // console.log(image_full_path);
                                            // console.log(thumb_full_path);

                                            var post = {
                                                source_id: source_id,
                                                source_type: source_type,
                                                image_name: image_full_path,
                                                thumb: thumb_full_path
                                            };

                                            // store image and thumb path in database
                                            var query = con.query(
                                                "INSERT INTO tbl_images SET ?",
                                                post,
                                                function(error, results, fields) {
                                                    if (error) throw error;
                                                    // Neat!
                                                }
                                            );
                                        } catch (err) {
                                            console.log("image delete error" + err);
                                        }
                                    })
                                    .catch(function(e) {
                                        console.log("Error creating thumbnail ", e.toString());
                                    });
                            })
                            .catch(function(e) {
                                console.log("Error creating new image", e.toString());
                            });
                    })
                    .catch(err => console.error(err));
            } catch (err) {
                console.log("get image size error" + err);
            }

            callback();
        });
    },

    //********************************************************************* */
    // ********************Search By NIC / Phone Num **********************/
    //********************************************************************* */

    searchByNicPhoneNum(req, res) {
        let tbl = req.body.type;
        let keyword = req.body.keyword;
        let Searchkeyword = "%" + keyword + "%";

        let query_paramas = [1, Searchkeyword, Searchkeyword];
        let sql_prepare_statement;

        if (tbl == "tbl_teachers") {
            sql_prepare_statement = sql_prepare.sql_searchTeacherByNiCPhoneNum;
        } else if (tbl == "tbl_parents") {
            sql_prepare_statement = sql_prepare.sql_searchParentsByNiCPhoneNum;
        }

        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_paramas
        );
    },

    //********************************************************************* */
    // ********************Check Unique on Update **********************/
    //********************************************************************* */

    check_unique_onUpdateFun(req, res) {
        let tbl_name = req.body.table;
        let existing = req.body.existing;
        let check_value = req.body.check_value;
        let check_info = req.body.check_info;

        let query_paramas = [1, existing, check_value];

        let sql_prepare_statement;

        let notificationVar;

        if (tbl_name == "tbl_parents") {
            if (check_info == "p_email") {
                sql_prepare_statement = sql_prepare.sql_p_emailUniqueCheckOnUpdate;
                notificationVar = "email";
            } else if (check_info == "p_cnic") {
                sql_prepare_statement = sql_prepare.sql_p_cnicUniqueCheckOnUpdate;
                notificationVar = "cnic";
            } else if (check_info == "p_username") {
                sql_prepare_statement = sql_prepare.sql_p_usernameUniqueCheckOnUpdate;
                notificationVar = "username";
            } else {
                sql_prepare_statement = sql_prepare.sql_p_phoneUniqueCheckOnUpdate;
                notificationVar = "phonenum";
            }
        } else if (tbl_name == "tbl_teachers") {
            if (check_info == "t_email") {
                sql_prepare_statement = sql_prepare.sql_t_emailUniqueCheckOnUpdate;
                notificationVar = "email";
            } else if (check_info == "t_cnic") {
                sql_prepare_statement = sql_prepare.sql_t_cnicUniqueCheckOnUpdate;
                notificationVar = "cnic";
            } else {
                sql_prepare_statement = sql_prepare.sql_t_phoneUniqueCheckOnUpdate;
                notificationVar = "phonenum";
            }
        }

        let query = sql_prepare.run_uniqueOnUpdate_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_paramas,
            notificationVar
        );
    },

    //********************************************************************************************************* */
    // ******************************** Mobile App Functions for parent portal **********************************/
    //******************************************************************************************************** */

    //********************************************************************* */
    // ******************** Parents Login check Function **********************/
    //********************************************************************* */

    loginCheck_Fun: function(req, res) {
        return new Promise(function(resolve, reject) {
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
                    "Select parent_id , parent_name , parent_email ,parent_userName , public_key , private_key , COUNT(*) AS loginStatus from tbl_parents WHERE parent_userName = ? AND status = ? AND parent_password = " +
                    con.escape(hashPass);
                let query = con.query(sql, [username, 1], (err, result) => {
                    if (err) {
                        res.json({
                            error: "Mysql Error" + err,
                            status: 402
                        });
                    } else {
                        if (result[0].loginStatus >= 1) {
                            // if username and password correct

                            //update auth tocken against user
                            let private_key = result[0].private_key;
                            let public_key = result[0].public_key;
                            let user_name = result[0].parent_userName;
                            let user_id = result[0].parent_id;
                            let name = result[0].parent_name;
                            let user_email = result[0].parent_email;

                            var user_data = {
                                user_id: user_id,
                                user_name: user_name,
                                user_email: user_email
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
                                                        error: err,
                                                        status: 0
                                                    });
                                                } else {
                                                    user_data.jwt = token;
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
        });
    },

    //********************************************************************* */
    // ************************* Parent set default password on forget *****************/
    //********************************************************************* */

    reset_parent_passwordUpdate: function(req, res, password, parent_id) {
        let user_name = req.body.user_name;

        con.query(
            sql_prepare.sql_reset_Parent_forgetPassword, [password, user_name, parent_id],
            (err, result) => {
                if (err) {
                    let resp = {
                        status: 403,
                        error: "Server error , try again"
                    };
                    res.json(resp);
                } else {
                    let resp = {
                        status: 1,
                        msg: "New Password and reset password link has been send on your email"
                    };
                    res.json(resp);
                }
            }
        );
    },

    //********************************************************************* */
    // ******** parent set new password  form web page ***********************/
    //********************************************************************* */

    resetNewPaswordF: function(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        let newpassword = req.body.newpassword;

        // console.log(username + "-" + password + "-" + newpassword);

        let sql =
            "Select parent_id , COUNT(*) AS loginStatus from tbl_parents WHERE parent_userName = ? AND status = ? AND parent_password = " +
            con.escape(password);
        let query = con.query(sql, [username, 1], (err, result) => {
            if (err) {
                res.json({
                    msg: "Mysql Error" + err,
                    status: 402
                });
            } else {
                if (result[0].loginStatus >= 1) {
                    // if username and password correct
                    con.query(
                        sql_prepare.sql_reset_Parent_newPassword, [newpassword, username, result[0].parent_id],
                        (err, result) => {
                            if (err) {
                                let resp = {
                                    status: 403,
                                    msg: "Server error"
                                };
                                res.json(resp);
                            } else {
                                let resp = {
                                    status: 1,
                                    msg: "Password Updated Successfully"
                                };
                                res.json(resp);
                            }
                        }
                    );
                } else {
                    let resp = {
                        status: 0,
                        msg: "Invalid User Name or Password"
                    };
                    res.json(resp);
                }
            }
        });
    },

    //********************************************************************* */
    // ******************** Get Announcements   *****************************/
    //********************************************************************* */

    get_announcemntsF: function(req, res) {
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
    // ****************** Get Single student attendance report data ***********/
    //********************************************************************* */

    get_studAttendReportP: function(req, res) {
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
    // ******************** Get Fee Invoice   *****************************/
    //********************************************************************* */

    get_feeInvoiceF: function(req, res) {
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

    get_examMarksF: function(req, res) {
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

    get_subjectsF: function(req, res) {
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

    //********************************************************************* */
    // ******************** Get one Subjects against student , class  ***********/
    //********************************************************************* */

    get_OnesubjectsF: function(req, res) {
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

    //********************************************************************* */
    // ******************** Get student total exams  ***********/
    //********************************************************************* */

    get_studentExamsF: function(req, res) {
        return new Promise(function(resolve, reject) {
            let student_id = req.body.student_id;

            let year = "2018-2019";
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

    //******************************************************************** /
    // ****************** get student marks against each exam   **********/
    //******************************************************************** /

    get_student_exam_marks: function(req, res, exam_data) {
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
                            console.log(resut_resp);
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

    //******************************************************************** /
    // ********* Get Subjects quiz , assignment details by sub id  **********/
    //******************************************************************** /

    get_subQuiz_Assign_Details: function(req, res, subjects_data) {
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

                            console.log(resut_resp);
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
    // ******************** Get Quiz assignments against students ***********/
    //********************************************************************* */
    get_quiz_assignmentF: function(req, res) {
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
    get_quiz_assignment_details: function(req, res) {
        let id = req.body.id;
        let type = req.body.type;

        let sql_assign_quizes_details;

        if (type == "quiz") {
            sql_assign_quizes_details = sql_prepare.sql_quizes_details;
        } else {
            sql_assign_quizes_details = sql_prepare.sql_assign_details;
        }
        let query = con.query(
            sql_assign_quizes_details, [id, id],
            (err, result) => {
                if (err) {
                    res.json({
                        status: 402,
                        error: "Mysql error " + err
                    });
                } else {
                    if (result[0].length >= 1 || result[1].length >= 1) {
                        let data1 = result[0][0];
                        let data2 = result[1];
                        data1.img = data2;
                        // let imageArr = [];
                        // // //loop
                        // for (i = 0; i < data2.length; i++) {
                        //     imageArr.push(data2[i].image_name);
                        // }

                        // data1.img = imageArr;

                        res.json({
                            status: 1,
                            data: data1
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
            }
        );
    },

    //********************************************************************* */
    // ************ check parent email is valid for chnage password ***********/
    //********************************************************************* */

    check_parentEmail: function(req, res) {
        return new Promise(function(resolve, reject) {
            let user_name = req.body.user_name;

            con.query(
                sql_prepare.sql_check_parentUsername, [user_name, 1],
                (err, result) => {
                    if (err) {
                        resolve("Database Error : " + err);
                    } else {
                        if (result[0].username_exist >= 1) {
                            let resp = {
                                status: 1,
                                msg: "available",
                                user_email: result[0].parent_email,
                                user_id: result[0].parent_id
                            };
                            resolve(resp);
                        } else {
                            let resp = {
                                status: 0,
                                msg: "not available"
                            };
                            resolve(resp);
                        }
                    }
                }
            );
        });
    }
};