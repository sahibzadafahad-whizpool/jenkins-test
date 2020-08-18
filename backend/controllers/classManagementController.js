const con = require("../db_connection");
const funcs = require("../functions");
var async = require("async");
module.exports = {
	
    //********************************************************************* */
    // ************************ get sub class data ******************************/
    //********************************************************************* */
    get_subclassData: function(req, res) {
        let sql = "SELECT * FROM tbl_sub_class WHERE status = ? ";
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
    // ************************ get class data ******************************/
    //********************************************************************* */

    get_classFun: function(req, res) {
        let user_info = req.body.jwt_data;
        let year = user_info.current_session

        let sql = "Select * from tbl_class WHERE status = ? AND year=? ORDER BY class_name ASC";
        let query = con.query(sql, [1,year], (err, results) => {
            if (err) {
                res.json({
                    status: 403,
                    msg: "fail to load class details" + err
                });
            } else {
                res.json({
                    status:1,
                    data:results
                });
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
    // ******************** Add SubClass data **********************************/
    //********************************************************************* */

    add_SubClass: function(req, res) {
        let classDetails = {
            sub_class_name: req.body.sub_class_name,
        };

        let sql = "INSERT INTO tbl_sub_class SET ?";
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
    // ******************** Add Class data **********************************/
    //********************************************************************* */
    add_classFun: function(req, res) {

        let user_info = req.body.jwt_data;
        var year = user_info.current_session;

        let classDetails = {
            class_name: req.body.class_name,
            numeric_name: req.body.numeric_name,
            year:year
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
    // ******************** Delete sub Class Data *******************************/
    //********************************************************************* */

    delete_sub_class: function(req, res) {
        let sub_class_id = req.params.id;
        let status = req.body.status;
        let sql = "UPDATE tbl_sub_class SET status = ? WHERE sub_class_id= ?";
        let query = con.query(sql, [status, sub_class_id], (err, result) => {
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
            numeric_name: req.body.numeric_name,
			class_name: req.body.class_name
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
	
    //********************************************************************* */
    // ******************** Update Class Data *******************************/
    //********************************************************************* */

    update_subclass: function(req, res) {
        let sub_class_id = req.params.id;
        let classUpdateDetails = {
           sub_class_name: req.body.sub_class_name,
		    class_id: req.body.class_id
        };
        let sql = "UPDATE tbl_sub_class SET ? WHERE sub_class_id= ?";
        let query = con.query(
            sql, [classUpdateDetails, sub_class_id],
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

    get_class_details(req,res){
        
        return new Promise(function(resolve,reject){
        
            let class_id = req.body.class_id
            let user_info = req.body.jwt_data;
            var year = user_info.current_session;

            let sql = "select * from tbl_section WHERE class_id="+con.escape(class_id)+" AND year="+con.escape(year)+" AND status=1"
            let query = con.query(
                sql,
                (err, result) => {
                    if (err) {

                        let error_message = funcs.get_error_message(err)

                        resolve({
                            status: 0,
                            error:error_message,
                            msg: "Internal server error"
                        });

                    } else {
                        //we got sections in result
                        async.forEachOf(result,function(data,iteration,callback){
                            
                            //we need to get subjects of this section
                            let sql2 = "select * from tbl_subjects WHERE status=1 AND class_id="+con.escape(class_id)+" AND section_id="+con.escape(result[iteration].section_id)+" AND year="+con.escape(year);
                            
                            con.query(sql2,(err2,result2) => {
                                if(err2){

                                    let error_message2 = funcs.get_error_message(err2)

                                    callback(error_message2)
                                }
                                else{
                                    result[iteration].subjects = result2
                                    callback(null)
                                }
                            });

                        },function(error){
                            if(error){
                                resolve({
                                    status:0,
                                    error:error,
                                    msg:'Unable to get data'
                                })
                            }
                            else{
                                resolve({
                                    status:1,
                                    data:result,
                                    msg:'Data fetched successfully'
                                })
    }
                            
                        })
                        
                    }
                }
            );
        });
    },

};