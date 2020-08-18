var async = require("async");
const sql_prepare = require("../prepare");
const con = require("../db_connection");
const funcs = require("../functions");
const constants = require("../constants");
var jwt = require("jsonwebtoken");
module.exports = {
    
    //********************************************************************* */
    // ******************** Employee Login check Function **********************/
    //********************************************************************* */

    employee_login: function(req, res) {
        let username = req.body.email.replace(/\s+/g, "");
        let password = req.body.password.replace(/\s+/g, "");
        let role_xref_id = req.body.role_xref_id;
        let sql =
            "SELECT user_name, null as user_level , email , employee_id from tbl_employees WHERE role_xref_id = ? AND (email = ? || user_name = ? ) AND status=? AND password =" +
            con.escape(password);

        con.query(sql, [role_xref_id, username, username, 1], async (err, result) => {
            if (err) {
                res.json({
                    msg: "Mysql Error" + err,
                    status: 402
                });
            } else {
                if (result.length > 0) {
                    // user info for jwt
                    let user_data = {
                        user_name: result[0].user_name,
                        user_id: result[0].employee_id,
                        employee_id: result[0].employee_id,
                        user_email: result[0].email,
                        role_xref_id: role_xref_id,
                        user_level: result[0].user_level
                    };

                    let current_session = await funcs.get_active_session();
                    user_data['current_session'] = current_session
                    // generate jwt for user info
                    jwt.sign({
                        user_data
                        },
                        "45745c60-7b1a-11e8-9c9c-2d42b21b1a3e", {
                            expiresIn: constants.JWT_EXPIRE_TIME
                        },
                        function(err, token) {
                            if (err) {
                                res.json({
                                    msg: err,
                                    status: 0
                                });
                            } else {

                                result[0].role_xref_id = role_xref_id

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
    // ******************** Admin Login check Function **********************/
    //********************************************************************* */

    admin_login: function(req, res) {
        let username = req.body.email.replace(/\s+/g, "");
        let password = req.body.password.replace(/\s+/g, "");
        let sql =
            "SELECT user_name, user_level , user_email , login_id from tbl_users WHERE user_email = ? AND status=? AND user_password =" +
            con.escape(password);

        con.query(sql, [username, 1], async (err, result) => {
            if (err) {
                res.json({
                    msg: "Mysql Error" + err,
                    status: 402
                });
            } else {
                if (result.length > 0) {
                    // user info for jwt
                    let user_data = {
                        user_name: result[0].user_name,
                        user_id: result[0].login_id,
                        employee_id: result[0].login_id,
                        user_email: result[0].user_email,
                        role_xref_id: -1,
                        user_level: result[0].user_level
                    };

                    let current_session = await funcs.get_active_session();
                    user_data['current_session'] = current_session

                    // generate jwt for user info
                    jwt.sign({
                        user_data
                        },
                        "45745c60-7b1a-11e8-9c9c-2d42b21b1a3e", {
                            expiresIn: constants.JWT_EXPIRE_TIME
                        },
                        function(err, token) {
                            if (err) {
                                res.json({
                                    msg: err,
                                    status: 0
                                });
                            } else {

                                result[0].role_xref_id = -1

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
        let query = sql_prepare.run_delete_query(
            req,
            res,
            con,
            sql_prepare_statement,
            update_params
        );
    },

    //********************************************************************* */
    // ************************* Delete Admin  ****************************/
    //********************************************************************* */

    delete_user: function(req, res) {
        let login_id = req.body.user_id;
        console.log(login_id);

        let sql_prepare_statement = sql_prepare.sql_deleteUser;
        //call to update data from db
        let query = sql_prepare.run_delete_query(
            req,
            res,
            con,
            sql_prepare_statement,
            login_id
        );
    }
};