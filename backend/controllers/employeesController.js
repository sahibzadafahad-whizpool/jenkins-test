var async = require("async");
const sql_prepare = require('../prepare');
const con = require('../db_connection');

const funcs = require("../functions");

module.exports = {
    
    get_employees_attendance_report(req,res){
        //we need different results in case of attendance of 1 month and in case of more than one months
        //so lets find out what are we doing

        let start_date = req.body.attendStartDate;
        let end_date = req.body.attendEndDate;
        
        let st = new Date(start_date*1000);
        let en = new Date(end_date*1000);

        let start_date_month = st.getMonth();
        let end_date_month = en.getMonth();

        if(start_date_month==end_date_month){
            return this.get_employees_attendance_report_for_one_month(req,res);
        }
        else{
            return this.get_employees_attendance_report_for_multiple_months(req,res);
        }
    },

    get_employees_attendance_report_for_one_month(req,res){
        return new Promise(function(resolve, reject) {
            let start_date = req.body.attendStartDate;
            let end_date = req.body.attendEndDate;
            let running_session = req.body.running_session;
            let employee_id = req.body.employee_id;
            let role_xref_id = req.body.role_xref_id;

            
            let where = [];
            where.push("status=1");

            if(role_xref_id!="" && role_xref_id!="all"){
                where.push("role_xref_id="+con.escape(role_xref_id));
            }

            if(employee_id!="" && employee_id!="all"){
                where.push("employee_id="+con.escape(employee_id));
            }

            let where_clause = '';
            if(where.length){
                where_clause = " WHERE "+where.join(" AND ");
            }

            let sql = "select tbl_employees.employee_id,tbl_employees.employee_name,tbl_employees.father_name,tbl_employees.role_xref_id from tbl_employees"+where_clause;
            
            let query = con.query(
                sql,
                (err, result) => {
                    if (err) {
                        let resut_resp = err + "Error fatching query";
                        resolve(resut_resp);
                    }
                    else{
                        async.forEachOf(
                            result,function(data, key, callback) {
                                let sql2 = "select * from tbl_employees_attendance WHERE employee_id='"+result[key].employee_id+"' AND running_session="+con.escape(running_session)+" AND timestamp>="+con.escape(start_date)+" and timestamp<="+con.escape(end_date);

                                let query2 = con.query(
                                    sql2,
                                    (err, result1) => {
                                        if (err) {
                                            let resut_resp = err + "Error fatching query";
                                            resolve(resut_resp);
                                        } else {
                                            result[key].attendance = result1; // store attendance against each student
                                        }
                                        //callback();
                                    }
                                );

                                let sql3 = "select count(*) as totalattendance from tbl_employees_attendance WHERE employee_id='"+result[key].employee_id+"' AND running_session="+con.escape(running_session)+" AND timestamp>="+con.escape(start_date)+" and timestamp<="+con.escape(end_date);

                                let query3 = con.query(
                                    sql3,
                                    (err, result3) => {
                                        if (err) {
                                            let resut_resp = err + "Error fatching query";
                                            resolve(resut_resp);
                                        } else {
                                            result[key].totalattendance = result3[0].totalattendance; // store attendance against each student
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

    get_employees_attendance_report_for_multiple_months(req,res){
        return new Promise(function(resolve, reject) {
            let start_date = req.body.attendStartDate;
            let end_date = req.body.attendEndDate;
            let running_session = req.body.running_session;
            let employee_id = req.body.employee_id;
            let role_xref_id = req.body.role_xref_id;

            let where = [];
            where.push("status=1");

            if(role_xref_id!="" && role_xref_id!="all"){
                where.push("role_xref_id="+con.escape(role_xref_id));
            }

            if(employee_id!="" && employee_id!="all"){
                where.push("employee_id="+con.escape(employee_id));
            }

            let where_clause = '';
            if(where.length){
                where_clause = " WHERE "+where.join(" AND ");
            }

            let sql = "select tbl_employees.employee_id,tbl_employees.employee_name,tbl_employees.father_name,tbl_employees.role_xref_id from tbl_employees"+where_clause;
            
            let query = con.query(
                sql,
                (err, result) => {
                    if (err) {
                        let resut_resp = err + "Error fatching query";
                        resolve(resut_resp);
                    }
                    else{
                        async.forEachOf(
                            result,function(data, key, callback) {
                                
                                let sql2 = "select month, count(employee_attendance_id) as total_attendance from tbl_employees_attendance WHERE employee_id='"+result[key].employee_id+"' AND running_session="+con.escape(running_session)+" AND timestamp>="+con.escape(start_date)+" and timestamp<="+con.escape(end_date)+" GROUP BY month";

                                let query2 = con.query(
                                    sql2,
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

    get_employees(req,res){
        let role_xref_id = req.body.role_xref_id;

        let where = [];
        let where_clause = '';
        if(role_xref_id!="" && role_xref_id!="all"){
            where.push("role_xref_id="+con.escape(role_xref_id));
        }

        if(where.length){
            where_clause = " WHERE "+where.join(" AND ");
        }

        let sql =
            'select * from tbl_employees'+where_clause;

        sql+=" ORDER BY employee_name ASC";

        let query = con.query(sql, (err, result) => {
            if (err) {
                res.json({
                    msg: 'fail to get employees' + err,
                    status:0,
                });
            } else {
                res.json({
                    status:1,
                    data:result
                });
            }
        });

    },

    get_employees_for_attendance: function(req, res) {
        return new Promise(function(resolve, reject) {
            let role_xref_id = req.body.role_xref_id;
            let attendance_date = req.body.attendance_date;

            let sql =
                'select * FROM tbl_employees WHERE status=1 AND role_xref_id='+con.escape(role_xref_id)
            let query = con.query(sql, (err, result) => {
                if (err) {
                    resolve({
                        msg: 'fail to get role employees' + err,
                        status:0,
                    });
                    
                } else {
                    async.forEachOf(
                        result,function(data, key, callback) {
                            
                            let sql2 = "select attend_status from tbl_employees_attendance WHERE employee_id="+result[key].employee_id+" AND timestamp="+attendance_date;
                            
                            let query = con.query(
                                sql2, 
                                (err, result1) => {
                                    if (err) {
                                        let resut_resp = err + "Error fatching query";
                                        resolve(resut_resp);
                                    } else {

                                        let attend_status = 'P';//set present as default in design
                                        if(result1.length && result1[0].hasOwnProperty('attend_status')){
                                            attend_status = result1[0].attend_status
                                        }

                                        result[key].attend_status = attend_status;

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
            });

        });
    },

    mark_employee_attendance(req,res){
        return new Promise(function(resolve, reject) {
            let timestamp = req.body.timestamp;
            let running_session = req.body.running_session;
            let attendance = req.body.attendance;
            let month = req.body.month;
            let day = req.body.day;

            async.forEachOf(
                attendance,function(data, key, callback) {
                                
                    //check whether attendance is marked already or not
                    let sql= "select * from tbl_employees_attendance WHERE timestamp="+con.escape(timestamp)+" AND employee_id="+con.escape(attendance[key].employee_id)+" AND running_session="+con.escape(running_session);
                    
                    let query = con.query(
                        sql, 
                        (err, result) => {
                            if (err) {
                                let resut_resp = err + "Error fetching query";
                                resolve(resut_resp);
                            } else {
                                let sql2 = "";

                                if(result.length){
                                    //record already exists, update it
                                    sql2 = "UPDATE tbl_employees_attendance SET attend_status="+con.escape(attendance[key].attend_status)+" WHERE timestamp="+con.escape(timestamp)+" AND employee_id="+con.escape(attendance[key].employee_id)+" AND running_session="+con.escape(running_session);
                                }
                                else{
                                    //record does not exist, insert it
                                    sql2 = "INSERT INTO tbl_employees_attendance (employee_id,timestamp,day,month,running_session,attend_status) VALUES("+con.escape(attendance[key].employee_id)+","+con.escape(timestamp)+","+con.escape(day)+","+con.escape(month)+","+con.escape(running_session)+","+con.escape(attendance[key].attend_status)+")";
                                }

                                let query2 = con.query(
                                    sql2,
                                    (err, result) => {
                                        
                                    }
                                );

                                callback();

                            }
                            
                        }
                    );
                },
                function(err, results) {
                    resolve(results); // return the result array.
                }
            );

        });
    },

};