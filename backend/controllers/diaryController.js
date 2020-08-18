var async = require("async");
const sql_prepare = require("../prepare");
var jwt = require("jsonwebtoken");
const con = require("../db_connection");
var md5 = require("md5");
const constants = require("../constants");
const funcs = require("../functions");
const ovh_functions = require("../ovh_functions");
var moment = require('moment');

//jwt_data Readme
//Note If you ever got into suspense that how jwt_data is in body where client is not sending it
//then see middlewares.jwt_auth method

module.exports = {
    
    delete_diary(req,res){
        let diary_id = req.body.diary_id

        let sql = "DELETE from tbl_diary WHERE diary_id="+con.escape(diary_id)

        con.query(sql,function(err,result){
            if(err){
                let error = funcs.get_error_message(err)
                res.json({status:0,error:error,msg:'Could not delete diary'})
            }
            else{
                res.json({status:1,msg:'Diary deleted successfully'})
            }
        });
    },
}