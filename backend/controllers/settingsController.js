var async = require('async');
const sql_prepare = require('../prepare');
const con = require('../db_connection');
const ovh_functions = require("../ovh_functions");
const constants = require("../constants");
var fs = require("fs");

module.exports = {
    	
    get_fee_templates_list(req,res){
        return new Promise(function(resolve,reject){
            const templatesFolder = constants.FEE_TEMPLATES_FOLDER
            let fee_templates = []
            fs.readdir(templatesFolder, (err, files) => {
                files.forEach(file => {
                    let file_contents = fs.readFileSync(templatesFolder+'/'+file,"utf8")
                    
                    let template_id_splitted = file.split("\.");
                    let template_id = template_id_splitted[0];
                    let file_type = template_id_splitted[1];

                    //we will only pick html file types
                    if(file_type=='html' || file_type=='HTML'){
                    
                    let inner_array = {};
                    inner_array['template_id'] = template_id
                    inner_array['file_name'] = file
                    inner_array['file_contents'] = file_contents

                    fee_templates.push(inner_array);
                    }

                });
                resolve(fee_templates);
            });
        })
        
    },

    //********************************************************************* */
    // ************************** Get All promotional Messages  *****************************/
    //********************************************************************* */

    get_promotionalMessages: function(req, res) {
        let data = req.params.data;
        let sql_prepare_statement;
        sql_prepare_statement = sql_prepare.sql_getAllPromotionalMessages;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement
        );
    },
	
    //********************************************************************* */
    // **************************Update Single promotional Messages  *****************************/
    //********************************************************************* */

	update_promotionalMessages: function(req, res) {
		
        let promotional_message_id = req.body.promotional_message_id;
        const update_data = {
            message: req.body.message           
        };
        const update_params = [update_data, promotional_message_id];
        let sql_prepare_statement = sql_prepare.sql_updatePromotionalMessages;
		console.log(sql_prepare_statement);
		console.log(update_params);
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
    // ************************** Get session Details *****************************/
    //********************************************************************* */

    get_session_detailsF: function(req, res) {
        let data = req.params.data;
        let sql_prepare_statement;
        if (data == 'all') {
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
        con.query(sql_prepare_statement, async (err, result) => {
            if (err) {
                res.json({
                    msg: 'Msql error :' + err,
                    status: 402
                });
            } else {
                if (result.length >= 1) {

                    //if not empty then this logo is on OVH, lets make a temp URL of it
                    let logo = result[0].logo
                    if(logo && logo!=''){
                        let temp_url_response = await ovh_functions.create_ovh_temp_url(logo);
                        result[0].logo = temp_url_response.url
                    }

                    //get template contents now
                    const templatesFolder = constants.FEE_TEMPLATES_FOLDER
                    let file_contents = fs.readFileSync(templatesFolder+'/'+result[0].template_id+'.html',"utf8")
                    result[0].fee_template_contents = file_contents

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
                        resolve('Database Error : ' + err);
                    } else {
                        var resp;
                        if (result[0].sessionName_exists >= 1) {
                            resp = {
                                status: 1,
                                msg: 'available'
                            };
                        } else {
                            resp = {
                                status: 0,
                                msg: 'not available'
                            };
                        }
                        resolve(resp);
                        reject(new Error('session name check error'));
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
    // ************************** Update session Info ***********/
    //********************************************************************* */

    update_sessionInfo: function(req, res) {
		
        let session_id = req.body.session_id;
        const update_data = {
            session_name: req.body.session_name,
            start_date: req.body.start_date,
            end_date: req.body.end_date
        };

        const update_params = [update_data, session_id];
        let sql_prepare_statement = sql_prepare.sql_updateSessionInfo;

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
            school_address: req.body.school_address,
            fee_print_columns: req.body.fee_print_columns,
            fee_due_date: req.body.fee_due_date,
            late_fee: req.body.late_fee
        };

        if(req.body.hasOwnProperty('template_id')){
            update_data.template_id = req.body.template_id
        }

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
    }
};