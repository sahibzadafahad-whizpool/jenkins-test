var async = require('async');
const sql_prepare = require('../prepare');
const con = require('../db_connection');
module.exports = {
    //********************************************************************* */
    // ******************** Add Parents data *******************************/
    //********************************************************************* */

    add_parentFun: function(req, res) {
        let parentDetails = {
            primary_parent_type:req.body.primary_parent_type,
            primary_parent_cnic:req.body.primary_parent_cnic,

            parent_userName: req.body.parent_userName,
            parent_password: req.body.parent_password,

            parent_name: req.body.parent_name,
            parent_email: req.body.parent_email,
            parent_sec_phoneNum: req.body.parent_sec_phoneNum,
            parent_cnic: req.body.parent_cnic,
            parent_address: req.body.parent_address,
            parent_phoneNum: req.body.parent_phoneNum,
            parent_education: req.body.parent_education,
            parent_profession: req.body.parent_profession,
            parent_income: req.body.parent_income,

            mother_name:req.body.mother_name,
            mother_email:req.body.mother_email,
            mother_cnic:req.body.mother_cnic,
            mother_address:req.body.mother_address,
            mother_phoneNum:req.body.mother_phoneNum,
            mother_sec_phoneNum:req.body.mother_sec_phoneNum,
            mother_profession:req.body.mother_profession,
            mother_education: req.body.mother_education,
            mother_income: req.body.mother_income,

            guardian_name:req.body.guardian_name,
            guardian_email:req.body.guardian_email,
            guardian_cnic:req.body.guardian_cnic,
            guardian_address:req.body.guardian_address,
            guardian_phoneNum:req.body.guardian_phoneNum,
            guardian_sec_phoneNum:req.body.guardian_sec_phoneNum,
            guardian_profession:req.body.guardian_profession,
            guardian_education: req.body.guardian_education,
            guardian_income: req.body.guardian_income,
            guardian_relation: req.body.guardian_relation,
        };

        let query = con.query(
            sql_prepare.sql_addParent,
            parentDetails,
            (err, result) => {
                if (err) {
                    res.json({
                        msg: 'fail to add parent' + err,
                        status: 0
                    });
                } else {
                    res.json({
                        msg: 'parent added successfully',
                        status: 1,
                        parent_id:result.insertId
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
                        msg: 'fail to load parents ' + err
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
                        msg: 'fail to load parents ' + err
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

            parent_userName: req.body.parent_userName,
            primary_parent_cnic:req.body.primary_parent_cnic,
            primary_parent_type:req.body.primary_parent_type,

            parent_name: req.body.parent_name,
            parent_email: req.body.parent_email,
            parent_sec_phoneNum: req.body.parent_sec_phoneNum,
            parent_cnic: req.body.parent_cnic,
            parent_address: req.body.parent_address,
            parent_phoneNum: req.body.parent_phoneNum,
            parent_profession: req.body.parent_profession,
            parent_education: req.body.parent_education,
            parent_income: req.body.parent_income,

            mother_name:req.body.mother_name,
            mother_email:req.body.mother_email,
            mother_cnic:req.body.mother_cnic,
            mother_address:req.body.mother_address,
            mother_phoneNum:req.body.mother_phoneNum,
            mother_sec_phoneNum:req.body.mother_sec_phoneNum,
            mother_profession:req.body.mother_profession,
            mother_education: req.body.mother_education,
            mother_income: req.body.mother_income,

            guardian_name:req.body.guardian_name,
            guardian_email:req.body.guardian_email,
            guardian_cnic:req.body.guardian_cnic,
            guardian_address:req.body.guardian_address,
            guardian_phoneNum:req.body.guardian_phoneNum,
            guardian_sec_phoneNum:req.body.guardian_sec_phoneNum,
            guardian_profession:req.body.guardian_profession,
            guardian_education: req.body.guardian_education,
            guardian_income: req.body.guardian_income,
            guardian_relation: req.body.guardian_relation,

        };

        if(req.body.hasOwnProperty('parent_password')){
            updateParentData['parent_password'] = req.body.parent_password;
        }

        let query = con.query(
            sql_prepare.sql_updateParentData, [updateParentData, parent_id],
            (err, result) => {
                if (err) {
                    res.json({
                        msg: 'Fail to update parent' + err,
                        status: 0
                    });
                } else {
                    res.json({
                        msg: 'Updated Successfully',
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
                        msg: 'Fail to delete parent' + err,
                        status: 0
                    });
                } else {
                    res.json({
                        msg: 'Deleted Successfully',
                        status: 1
                    });
                }
            }
        );
    }
};