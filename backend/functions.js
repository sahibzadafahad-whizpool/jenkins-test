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

const constants = require('./constants');
const schoolinfo = require('../backend/schoolinfo');

const ovh_functions = require("../backend/ovh_functions");

// server path for images

// var server_image_path =
//     "http://dev.whizpool.com/schoolapp_new/backend/uploads/images/";
// var server_thumb_path =
//     "http://dev.whizpool.com/schoolapp_new/backend/uploads/thumb/";
// var server_profile_images_path =
//     "http://dev.whizpool.com/schoolapp_new/backend/uploads/profile_images/";
// var local_profile_images_path = "./uploads/profile_images/";

//email settings

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: constants.CONFIG_EMAIL,
        pass: constants.CONFIG_EMAIL_PASSWORD
    }
});



module.exports = {

    get_images: function(data){
        
        return new Promise(function(resolve,reject){
            let sql_query = "select * from tbl_images WHERE source_id="+data['source_id']+" AND source_type='"+data['source_type']+"'"

            let query = con.query(sql_query, (err, result) => {
                if (err) {
                    resolve([])
                } else {
                    if(result.length){
                        let images = []
                        for(let i=0;i<result.length;i++){
                            images.push(result[i].image_name)
                        }
                        console.log("returning images")
                        console.log(images)
                        resolve(images)
                    }
                    else{
                        resolve([])
                    }
                }
            });
        })
    },


    //************************************* get role details from role_xref_code ***************************************** */

    get_role_xref: function (req,res){
        let sql_query = "select * from tbl_role_xref";
        let response = {};
        let query = con.query(sql_query, (err, result) => {
            if (err) {
                response = {
                    status: 0,
                    msg: "Mysql Error : " + err
                };
                res.json(response);
            } else {
                if(result.length){
                    response = {
                        status: 1,
                        data: result
                    };
                    res.json(response);
                }
                else{
                    response = {
                        status: 1,
                        data: {}
                    };
                    res.json(response);
                }
            }
        });
    },

    get_active_session: function (){
        return new Promise(function(resolve, reject) {
            let sql = "SELECT * from tbl_sessions WHERE status = 1";
            let query = con.query(sql, (err, result) => {
                if (err) {
                    resolve('');
                } else {
                    if(result.length){
                        resolve(result[0].session_name);
                    }
                    else{
                        resolve('');
                    }
                }
            });
        });
    },

    get_role_xref_details_from_code: function (xref_code){
        return new Promise(function(resolve, reject) {
            let sql_query = "select * from tbl_role_xref where role_xref_code= ? ";
            let response = {};
            let query = con.query(sql_query, [xref_code], (err, result) => {
                if (err) {
                    response = {
                        status: 0,
                        msg: "Mysql Error : " + err
                    };
                    resolve(response);
                } else {
                    if(result.length){
                        response = {
                            status: 1,
                            data: result[0]
                        };
                    }
                    else{
                        response = {
                            status: 1,
                            data: {}
                        };
                    }
                    resolve(response);
                }
            });
        });
    },

    //*************************************send email ***************************************** */
    sendEmail: function(req, res, password, user_email) {
        return new Promise(function(resolve, reject) {
            
            let hostname = req.headers.host
            
            let to = user_email;
            var mailOptions = {
                from: constants.BASENAME,
                to: to,
                subject: "New Password",
                text: "Your new password is " +
                    password +
                    ". You can update your password by clicking the link. "+hostname+"/dist/#/reset-password"
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    let resp = {
                        status: 403,
                        msg: "Some error sending email try again"
                    };
               
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
            "SELECT user_name, user_level , user_email , login_id from tbl_users WHERE user_email = ? AND status=? AND user_password =" +
            con.escape(password);

        let query = con.query(sql, [username, 1], (err, result) => {
            if (err) {
                res.json({
                    msg: "Mysql Error" + err,
                    status: 402
                });
            } else {
                if (result.length > 0) {
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
    // ************************************************** Dashboard APIs ***************************************/
    //******************************************************************************************************** */

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
        if (count_type == "staff") {
            sql_getCount = sql_prepare.sql_getStaffCount;
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

    //********************************************************************* */
    // *********** Count students , teachers etc *****************************/
    //********************************************************************* */

    get_totalcount:  function(req, res) {
        let year = req.params.running_session;
        con.query(
            sql_prepare.sql_getStudentsCount + ';' +
            sql_prepare.sql_getTeachersCount + ';' +
            sql_prepare.sql_getParentsCount + ';' +
            sql_prepare.sql_getClassesCount + ';' +
            sql_prepare.sql_getSectionsCount + ';' +
            sql_prepare.sql_getUsersCount, [year],
            function(err, results) {
   
            if(err){
                res.json({
                        msg: 'Mysql error :' + err,
                    status: 402
                });

            }else{
                res.json({
                    status: 1,
                    data: results
                });
        }
          });
    },

 

    //********************************************************************************************************* */
    // ******************************** Common Functions  ***************************************/
    //******************************************************************************************************** */

    //********************************************************************* */
    // ******************** check unique cnic/phone  ************************/
    //********************************************************************* */

    check_uniqueF: async function(req, res) {
        let type = req.body.type;
        let tbl_name = req.body.tbl_name;
        let check_value = req.body.check_value;
        let query_params;
        let sql_query;
        //parent unique

        let role = '';

        //in db there is same table for staff and teacher
        //in this case we will have a role key
        //which will tell us whether it is a teacher or a staff
        //but weill will first check if there is role key sent or not
        //if no role key is sent then the request needs to be updated but it is a request from teachers panel

        let role_xref_id = '';

        if(tbl_name=="tbl_teachers"){
            if(req.body.hasOwnProperty('role')){
                role = req.body.role;
            }
            else{
                role = 'teacher';
            }

            let role_xref_details = await this.get_role_xref_details_from_code(role);
            
            if(role_xref_details['status']!=1){
                res.json({
                    status: 505,
                    msg:'Error in server',
                });
            }
            else{
                role_xref_id = role_xref_details['data'].role_xref_id;
            }

        }

        if (type == "cnic" && tbl_name == "tbl_parents") {
            sql_query = sql_prepare.sql_checkParent_cnic_unique;
        } else if (type == "phone" && tbl_name == "tbl_parents") {

            if(req.body.hasOwnProperty('parent_id')){
                let parent_id = req.body.parent_id;
                sql_query = "Select COUNT(*) as parent_phone_count from tbl_parents WHERE parent_id!="+parent_id+" AND parent_phoneNum = ? and status = ? ";
            }
            else{
            sql_query = sql_prepare.sql_checkParent_phone_unique;
            }

            


        } else if (type == "email" && tbl_name == "tbl_parents") {

            if(req.body.hasOwnProperty('parent_id')){
                let parent_id = req.body.parent_id;
                sql_query = "Select COUNT(*) as parent_email_count from tbl_parents WHERE parent_id!="+parent_id+" AND parent_email = ? and status = ? ";
            }
            else{
            sql_query = sql_prepare.sql_checkParent_email_unique;
            }

        } // teacher unique
        else if (type == "cnic" && tbl_name == "tbl_teachers") {

            sql_query = "Select COUNT(*) as teacher_cnic_count from tbl_employees WHERE employee_cnic = ? and status = ? AND role_xref_id="+role_xref_id;

        } else if (type == "phone" && tbl_name == "tbl_teachers") {

            sql_query = " Select COUNT(*) as teacher_phone_count from tbl_employees WHERE phone_num = ? and status = ?  AND role_xref_id="+role_xref_id;

        } else if (type == "email" && tbl_name == "tbl_teachers") {

            sql_query = " Select COUNT(*) as teacher_email_count from tbl_employees WHERE email = ? and status = ? AND role_xref_id="+role_xref_id;

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

        let user_name = ''
        if(req.body.hasOwnProperty('user_name')){
            user_name = req.body.user_name.replace(/\s+/g, "");
        }

        let table_name = req.body.table_name;
        let sql_query;
        let sql_query_params;
        //*****  set query according to table name  ********//

        if (table_name == "tbl_parents") {

            if(req.body.hasOwnProperty('parent_id')){
                let parent_id = req.body.parent_id;
                sql_query = "Select COUNT(*) as userName_present FROM tbl_parents WHERE parent_id!="+parent_id+" AND parent_userName = ? and status = ?";
            }
            else{
            sql_query = sql_prepare.sql_checkPUserNameAdded;
            }

            sql_query_params = [user_name, 1];
        }
        else if (table_name == "tbl_employees") {
            let role_xref_id = req.body.role_xref_id;
            sql_query = sql_prepare.sql_checkEUserNameAdded;
            sql_query_params = [role_xref_id, user_name, 1];
        }
        else if (table_name == "tbl_teachers") {
            sql_query = sql_prepare.sql_checkTUserNameAdded;
            sql_query_params = [user_name, 1];

        }
        else if (table_name == "tbl_students") {
            sql_query = sql_prepare.sql_checkSUserNameAdded;
            sql_query_params = [user_name, 1];
        }

        let query = con.query(sql_query, sql_query_params, (err, result) => {
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
        
        try {
        // image directory

            let file_path = constants.PROFILE_IMAGE_DIR;
            let thumb_path = constants.PROFILE_THUMB_DIR;

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
            var image_extension = image_extension_array[1]  == 'png' ? 'png' : 'jpg';
               
            let new_image_name = source + "_" + id; // new image name with 'student / teacher _ teacher_id _'

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
                                            // server_profile_images_path +
                                            new_image_name +
                                            "." +
                                            image_extension;
                                        let thumb_full_path =
                                            // server_profile_images_path +
                                            // "thumbs/" +
                                            new_image_name +
                                            "_thumb" +
                                            "." +
                                            image_extension;

                                         //we need to upload this large image to OVH
                                         let file_large = {};
                                         file_large['mimetype'] = image_type
                                         file_large['path'] = file_path+"\/"+image_full_path
                                         let ovh_data = {file:file_large}
                                         ovh_functions.upload_file_to_ovh(ovh_data).then(function(response_large){
                                            if(response_large.status==1){
                                                // we need thumb of exact same name but with .thumb rather than .jpg,.png e.t.c

                                                let large_image = response_large.url

                                                let thumb_file_name = ovh_functions.get_thumb_name_from_ovh_large_image_url(large_image)
                                                //through error here
                                                //now upload thumb
                                                let file_thumb = {};
                                                file_thumb['mimetype'] = image_type
                                                file_thumb['path'] = thumb_path+"\/"+thumb_full_path
                                                
                                                let ovh_data = {file_name:thumb_file_name,file:file_thumb}

                                                ovh_functions.upload_file_to_ovh(ovh_data).then(function(response_thumb){
                                                    if(response_thumb.status==1){

                                                        let thumb_image = response_thumb.url

                                                        //we need to save just image names in database
                                                        let large_image_name = ovh_functions.get_file_name_from_url(large_image)
                                                        let thumb_image_name = ovh_functions.get_file_name_from_url(thumb_image)


                                        let update_query;

                                        // store images details  in db

                                        if (tbl_name == "tbl_students") {
                                            update_query =
                                                "UPDATE ?? SET image_path = ? , thumb_path = ? WHERE std_id = ? ";
                                        }
                                        else if (tbl_name == "tbl_employees") {
                                            update_query =
                                                "UPDATE ?? SET image_path = ? , thumb_path = ? WHERE employee_id = ? ";
                                        }
                                        else if (tbl_name == "tbl_teachers") {
                                            update_query =
                                                "UPDATE ?? SET image_path = ? , thumb_path = ? WHERE teacher_id = ? ";
                                        } else {
                                            update_query =
                                                "UPDATE ?? SET image_path = ? , thumb_path = ? WHERE login_id = ? ";
                                        }

                                        // store image and thumb path in database
                                        var query = con.query(
                                                            update_query, [tbl_name, large_image_name, thumb_image_name, id],
                                            function(error, results, fields) {
                                                if (error){
                                                                    res.json({
                                                                        status:0,
                                                                        msg:'Error saving photos',
                                                                        err:error
                                                                    });
                                                }else{
                                                    res.json({
                                                                        status:1,
                                                                        msg:'Photos saved successfully'
                                                    });
                                                }
                                                
                                            }
                                        );

                                                    }
                                                    else{
                                                        res.json(response_thumb);
                                                    }
                                                });

                                            }
                                            else{
                                                res.json(response_large);
                                            }
                                         });
                                    } catch (err) {
                                        console.log("image delete error" + err);
                                        res.json({
                                            status:0
                                        });
                                    }
                                })
                                .catch(function(e) {
                                    console.log("Error creating thumb", e.toString());
                                    res.json({
                                        status:0
                                    });
                                });
                        })
                        .catch(function(e) {
                            console.log("Error creating new image", e.toString());
                            res.json({
                                status:0
                            });
                        });
                })
                .catch(err => console.error(err));
        } catch (err) {
            console.log("get image size error" + err);
            res.json({
                status:0
            });
        }
    },

    //********************************************************************* */
    // ***************** Upload profile transcript ***********************/
    //********************************************************************* */

    upload_profile_transcript: function(req, res, next) {
        // console.log(req.files);
        
        try {
        // image directory
            let file_path = constants.TRANSCRIPT_IMAGE_DIR;
            let thumb_path = constants.TRANSCRIPT_THUMB_DIR;

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
            var image_extension = image_extension_array[1]  == 'png' ? 'png' : 'jpg';
               
             

            let new_image_name = source + "_" + id; // new image name with 'student / teacher _ teacher_id _'
            // console.log(file_path);

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
                                            // server_profile_images_path +
                                            new_image_name +
                                            "." +
                                            image_extension;
                                        let thumb_full_path =
                                            // server_profile_images_path +
                                            // "thumbs/" +
                                            new_image_name +
                                            "_thumb" +
                                            "." +
                                            image_extension;


                                        //we need to upload this large image to OVH
                                        let file_large = {};
                                        file_large['mimetype'] = image_type
                                        file_large['path'] = file_path+"\/"+image_full_path
                                        let ovh_data = {file:file_large}
                                        ovh_functions.upload_file_to_ovh(ovh_data).then(function(response_large){
                                        if(response_large.status==1){
                                            // we need thumb of exact same name but with /thumb/ rather than /large/

                                            let large_image = response_large.url

                                            let thumb_file_name = ovh_functions.get_thumb_name_from_ovh_large_image_url(large_image)

                                            //now upload thumb
                                            let file_thumb = {};
                                            file_thumb['mimetype'] = image_type
                                            file_thumb['path'] = thumb_path+"\/"+thumb_full_path
                                            
                                            let ovh_data = {file_name:thumb_file_name,file:file_thumb}

                                            ovh_functions.upload_file_to_ovh(ovh_data).then(function(response_thumb){
                                                if(response_thumb.status==1){

                                                    let thumb_image = response_thumb.url

                                                    //we need to save just image names in database
                                                    let large_image_name = ovh_functions.get_file_name_from_url(large_image)
                                                    let thumb_image_name = ovh_functions.get_file_name_from_url(thumb_image)

                                        let update_query;

                                        // store images details  in db

                                        if (tbl_name == "tbl_students") {
                                            update_query =
                                                "UPDATE ?? SET transcript_image_path = ? , transcript_thumb_path = ? WHERE std_id = ? ";
                                        } else if (tbl_name == "tbl_teachers") {
                                            update_query =
                                                "UPDATE ?? SET transcript_image_path = ? , transcript_thumb_path = ? WHERE teacher_id = ? ";
                                                    }
                                                    else if (tbl_name == "tbl_employees") {
                                                        update_query =
                                                            "UPDATE ?? SET transcript_image_path = ? , transcript_thumb_path = ? WHERE employee_id = ? ";
                                                    }
                                                    else {
                                            update_query =
                                                "UPDATE ?? SET transcript_image_path = ? , transcript_thumb_path = ? WHERE login_id = ? ";
                                        }

                                        // store image and thumb path in database
                                        var query = con.query(
                                                        update_query, [tbl_name, large_image_name, thumb_image_name, id],
                                            function(error, results, fields) {
                                                if (error){
                                                                res.json({
                                                                    status:0,
                                                                    msg:'Error saving transcript',
                                                                    err:error
                                                                });
                                                }else{
                                                    res.json({
                                                                    status:1,
                                                                    msg:'Transcript saved successfully'
                                                    });
                                                }
                                                
                                            }
                                        );

                                                }
                                                else{
                                                    res.json(response_thumb);
                                                }

                                            });
                                        }
                                        else{
                                            res.json(response_large);
                                        }

                                        });  

                                    } catch (err) {
                                        console.log("image delete error" + err);
                                        res.json({
                                            status:0
                                        });
                                    }
                                })
                                .catch(function(e) {
                                    console.log("Error creating thumb", e.toString());
                                    res.json({
                                        status:0
                                    });
                                });
                        })
                        .catch(function(e) {
                            console.log("Error creating new image", e.toString());
                            res.json({
                                status:0
                            });
                        });
                })
                .catch(err => console.error(err));
        } catch (err) {
            console.log("get image size error" + err);
            res.json({
                status:0
            });
        }
    },

    //********************************************************************* */
    // ***************** Add Quiz Assignment already uploaded Images on s3 ***********************/
    //********************************************************************* */

    add_images:async function(data){
        return new Promise(function(resolve, reject) {

            let images = data['images']
            let source_id = data['source_id']
            let source_type = data['source_type']
            
            async.forEachOf(images, function(image, iteration, callback) {

                //we need to calculate thumb name from image name
                //https://jammut3p6wz.s3.gra.cloud.ovh.net/schoolapp/images/1587705653257.jpeg
                //thumb will have .thumb at the end despite of .jpeg

                let image_splitted = image.split(".");
                image_splitted[image_splitted.length-1] = "thumb"
                let thumb = image_splitted.join(".")

                let post = {
                    source_id: source_id,
                    source_type: source_type,
                    image_name: image,
                    thumb: thumb
                };

                // store image and thumb path in database
                var query = con.query(
                    "INSERT INTO tbl_images SET ?",
                    post,
                    function(error, results, fields) {
                        if (error){
                            callback({status:0,msg:'Unable to add image',err:error})
                        }else{
                            callback({status:1,msg:'Image uploaded'})
                        }
                    }
                );

            },function() {
                resolve(); //return
            });

        });
    },

    //********************************************************************* */
    // ***************** Upload Quiz Assignment Images ***********************/
    //********************************************************************* */

    upload_images: function(req, res, next) {
        return new Promise(function(resolve, reject) {
        // console.log(req.files);

        // image directory
            let file_path = constants.IMAGES_DIR;
            let thumb_path = constants.IMAGES_THUMB;

        // images array
        let images = req.files;

            let source_id = req.body.source_id; // get the assignmemt / quiz id
        let source_type = req.body.source_type; // get assignment / quiz

        // loop through the number of images uploaded
        async.forEachOf(images, function(data, key, callback) {
            // It will be executed one by one

            // getting file name
            let file_name = images[key].filename;

            // get the image extension
            let image_type = images[key].mimetype;
            let image_extension_array = image_type.split("/");
            var image_extension = image_extension_array[1]  == 'png' ? 'png' : 'jpg';
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
                                                // server_image_path +
                                                new_image_name +
                                                "." +
                                                image_extension;
                                            let thumb_full_path =
                                                // server_thumb_path +
                                                new_image_name +
                                                "_thumb." +
                                                image_extension;

                                                //here we have to upload this image to OVH
                                                let file_large = {};
                                                file_large['mimetype'] = image_type
                                                
                                                file_large['path'] = file_path+"\/"+image_full_path
                                                let ovh_data = {file:file_large}
                                                ovh_functions.upload_file_to_ovh(ovh_data).then(function(response_large){
                                                    if(response_large.status==1){
                                                        // we need thumb of exact same name but with /thumb/ rather than /large/

                                                        let large_image = response_large.url
                                                        let thumb_file_name = ovh_functions.get_thumb_name_from_ovh_large_image_url(large_image)

                                                        //now upload thumb
                                                        let file_thumb = {};
                                                        file_thumb['mimetype'] = image_type
                                                        file_thumb['path'] = thumb_path+"\/"+thumb_full_path
                                                        let ovh_data = {file_name:thumb_file_name,file:file_thumb}
                                                        ovh_functions.upload_file_to_ovh(ovh_data).then(function(response_thumb){
                                                            if(response_thumb.status==1){

                                                                var thumb_image = response_thumb.url

                                                                //we need to save just image names in database
                                                                let large_image_name = ovh_functions.get_file_name_from_url(large_image)
                                                                let thumb_image_name = ovh_functions.get_file_name_from_url(thumb_image)

                                            var post = {
                                                source_id: source_id,
                                                source_type: source_type,
                                                                    image_name: large_image_name,
                                                                    thumb: thumb_image_name
                                            };

                                            // store image and thumb path in database
                                            var query = con.query(
                                                "INSERT INTO tbl_images SET ?",
                                                post,
                                                function(error, results, fields) {
                                                    if (error){
                                                                            callback({status:0,msg:'Unable to add image',err:error})
                                                    }else{
                                                                            callback({status:1,msg:'Image uploaded'})
                                                                        }
                                                                    }
                                                                );
                                                            }
                                                            else{
                                                                callback(response_thumb)
                                                            }
                                                        });
                                                    }
                                                    else{
                                                        callback(response_large)
                                                }
                                                });
                                                
                                        } catch (err) {
                                            console.log("image delete error" + err);
                                                callback({status:0,msg:'Error deleting unnecessary images'})
                                        }
                                    })
                                    .catch(function(e) {
                                            callback({status:0,msg:'Error creating thumbnail'})
                                    });
                            })
                            .catch(function(e) {
                                    callback({status:0,msg:'Error creating new image'})
                            });
                    })
                    .catch(err => console.error(err));
            } catch (err) {
                    callback({status:0,msg:'Get image size error'})
            }

            },function(results) {
                resolve(results); // return the result array.
            });
        });
    },

    //********************************************************************* */
    // ********************Search By NIC / Phone Num **********************/
    //********************************************************************* */

    searchByNicPhoneNum(req, res) {
        let tbl = req.body.type;
        let keyword = req.body.keyword;
        
        let Searchkeyword = "%" + keyword + "%";

        let query_paramas = []; 
        let sql_prepare_statement;

        if(tbl == "tbl_employees"){
            
            let role_xref_id = req.body.role_xref_id;

            query_paramas = [role_xref_id, 1, Searchkeyword, Searchkeyword];
            sql_prepare_statement = sql_prepare.sql_searchTeacherByNiCPhoneNum;

        }
        else if (tbl == "tbl_teachers") {
            query_paramas = [1, Searchkeyword, Searchkeyword];
            sql_prepare_statement = sql_prepare.sql_searchTeacherByNiCPhoneNum;
        } else if (tbl == "tbl_parents") {
            query_paramas = [1, Searchkeyword, Searchkeyword];
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

    //********************************************************************* */
    // ***************** Upload school logo ***********************/
    //********************************************************************* */

    upload_school_logo: function(req, res, next) {
        
        
        try {
        // image directory
            let file_path = constants.IMAGES_DIR;
            let thumb_path = constants.IMAGES_THUMB;

            // images array
            let images = req.files;

            let id = req.body.id; 

            // getting file name
            let file_name = images[0].filename;

            // get the image extension
            let image_type = images[0].mimetype;
            let image_extension_array = image_type.split("/");
            var image_extension = image_extension_array[1]  == 'png' ? 'png' : 'jpg';
               
    

            let new_image_name = "school_logo_" + id; 
            

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
                                            // server_profile_images_path +
                                            new_image_name +
                                            "." +
                                            image_extension;

                                        //we need to upload this logo to OVH
                                        let file = {};
                                        file['mimetype'] = image_type
                                        file['path'] = file_path+"\/"+image_full_path
                                        
                                        //the image_full_path in the form of original extension like 1.jpg,a1231ad.png e.t.c, we need it as .thumb

                                        let ovh_file_name = new Date().getTime()+".thumb"
                                        
                                        let ovh_data = {file_name:ovh_file_name,file:file}
                                        ovh_functions.upload_file_to_ovh(ovh_data).then(function(response){

                                            if(response.status==1){
                                            let url = response.url

                                        let update_query;

                                        // store images details  in db

										update_query = "UPDATE tbl_school_info SET logo = ? WHERE school_id = ? ";
                                                                              
                                        // store image and thumb path in database
                                                var query = con.query(update_query, [url,id],
                                            function(error, results, fields) {
                                                if (error){
                                                    console.log("store image and thumb error" + error);
                                                }else{

                                                    res.json({
                                                        status:1
                                                    });
                                                }
                                                
                                            }
                                        );
                                            }
                                            else{
                                                res.json(response);
                                            }

                                        });
                                    } catch (err) {
                                        console.log("image delete error" + err);
                                        res.json({
                                            status:0
                                        });
                                    }
                                })
                                .catch(function(e) {
                                    console.log("Error creating thumb", e.toString());
                                    res.json({
                                        status:0
                                    });
                                });
                        })
                        .catch(function(e) {
                            console.log("Error creating new image", e.toString());
                            res.json({
                                status:0
                            });
                        });
                })
                .catch(err => console.error(err));
        } catch (err) {
            console.log("get image size error" + err);
            res.json({
                status:0
            });
        }
    },

    //this method will check if debug is false then return the actual error, otherwise return a pretty message
    get_error_message(error){
        if(constants.DEBUG){
            return error
        }
        else{
            return 'Sorry! Something went wrong'
        }
    }
    
};