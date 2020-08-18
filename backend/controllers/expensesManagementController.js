var async = require("async");
const sql_prepare = require("../prepare");
const con = require("../db_connection");
module.exports = {
    
	
	//********************************************************************* */
    // *************************** Add,edit,delete new expenses head  ***********************/
    //********************************************************************* */

    delete_ExpenseCategory: function(req, res) {
        
        let id = req.body.id;

        let sql = "DELETE FROM tbl_expense_categories WHERE id="+con.escape(id);
 
         let query = con.query(
             sql,
             (err, result) => {
                 if (err) {
                     res.json({
                         msg: "fail to delete epense category" + err
                     });
                 } else {
                     res.json({
                         'status':1,
                         'msg':"Expense category deleted successfully"
                     });
                 }
             }
         );
 
     },
    
    delete_ExpenseHead: function(req, res) {
        
        let id = req.body.id;

        let sql = "UPDATE tbl_expenses_head set status=2 WHERE expenses_head_id="+con.escape(id);
 
         let query = con.query(
             sql,
             (err, result) => {
                 if (err) {
                     res.json({
                         msg: "fail to delete epense head" + err
                     });
                 } else {
                     res.json({
                         'status':1,
                         'msg':"Expense head deleted successfully"
                     });
                 }
             }
         );
 
     },

    edit_ExpenseHead: function(req, res) {
        
       let id = req.body.id;
       let name = req.body.name;
       let description = req.body.description;

        let sql = "UPDATE tbl_expenses_head set head_name="+con.escape(name)+",description="+con.escape(description)+" WHERE expenses_head_id="+con.escape(id);

        let query = con.query(
            sql,
            (err, result) => {
                if (err) {
                    res.json({
                        msg: "fail to update epense head" + err
                    });
                } else {
                    res.json({
                        'status':1,
                        'msg':"Expense head updated successfully"
                    });
                }
            }
        );

    },

    add_newExpenseHead: function(req, res) {
        
		let expense_data = {
		  head_name: req.body.head_name,
		  description: req.body.description,
		  expense_category_id: req.body.expense_category_id,
		};
	
        let sql_prepare_statement = sql_prepare.sql_add_expense_head;

        //call function to insert data into db
        let query = sql_prepare.run_add_query(
            req,
            res,
            con,
            sql_prepare_statement,
            expense_data
        );
    },
    
    add_newExpenseCategory: function(req, res) {
        
		let expense_data = {
            expense_category_name: req.body.expense_category_name,
            expense_category_type_xref_id: req.body.expense_category_type,
		};
	
        let sql_prepare_statement = sql_prepare.sql_add_expense_category;

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

    get_expense_heads: function(req, res) { 

        let sql_prepare_statement = sql_prepare.sql_get_expenses_head;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            req.body.expense_category_id
        );
    },

    expense_heads_from_expense_category(req,res){

        let expense_category_id = req.body.expense_category_id;

        let sql = "select * from tbl_expenses_head WHERE status=1 AND expense_category_id="+con.escape(expense_category_id);
        
        con.query(sql, (err, result) => {
            if (err) {
                res.json({
                    msg: 'Msql error :' + err,
                    status: 402
                });
            } else {
                res.json({
                    status: 1,
                    data: result
                });
            }
        });

    },

    get_expense_categories: function(req, res) {
        let sql_prepare_statement = sql_prepare.sql_get_expenses_categories;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement
        );
    },
	
	//********************************************************************* */
    // ********************* Get expense head list  ***********************/
    //********************************************************************* */

    expenses_from_time_period: function(req, res) {

        let created_at = req.body.created_at;
        
        let where = [];

        where.push("te.created_at>="+created_at);
        
        let where_clause = " WHERE "+where.join(" AND ");

        let order_on = 'te.created_at';
        let order_type = 'DESC';

        let order_clause = " ORDER BY "+order_on+" "+order_type;

        let sql_statement = "SELECT te.*,tec.id as expense_category_id,tec.expense_category_name,tec.expense_category_type_xref_id,teh.head_name,teh.description FROM tbl_expenses te JOIN tbl_expenses_head teh on te.expenses_head_id=teh.expenses_head_id JOIN tbl_expense_categories tec ON teh.expense_category_id = tec.id "+where_clause+" "+order_clause;
        
        con.query(sql_statement, (err, result) => {
            if (err) {
                res.json({
                    msg: 'Msql error :' + err,
                    status: 402
                });
            } else {
                res.json({
                    status: 1,
                    data: result
                });
            }
        });

    },

get_expenses_on_filters: function(req, res) {

        let start_date = req.body.start_date;
        let end_date = req.body.end_date;
        let sort_by = req.body.sort_by;

        let expense_category_id = req.body.expense_category_id;
        let expense_category_type_xref_id = req.body.expense_category_type_xref_id;

        let where = [];

        where.push("te.expense_date>="+start_date);
        where.push("te.expense_date<="+end_date);

        if(expense_category_id!=""){
            where.push("tec.id="+con.escape(expense_category_id));
        }

        if(expense_category_type_xref_id!=""){
            where.push("tec.expense_category_type_xref_id="+con.escape(expense_category_type_xref_id));
        }

        let where_clause = " WHERE "+where.join(" AND ");

        let order_on = '';
        let order_type = ''; 

        if(sort_by=="category"){
            order_on = 'tec.id';
            order_type = 'DESC';
        }
        else{
            order_on = 'te.expense_date';
            order_type = 'DESC';
        }

        let order_clause = " ORDER BY "+order_on+" "+order_type;

        let sql_statement = "SELECT te.*,tec.expense_category_name,tec.expense_category_type_xref_id,teh.head_name,teh.description FROM tbl_expenses te JOIN tbl_expenses_head teh on te.expenses_head_id=teh.expenses_head_id JOIN tbl_expense_categories tec ON teh.expense_category_id = tec.id "+where_clause+" "+order_clause;

        con.query(sql_statement, (err, result) => {
            if (err) {
                res.json({
                    msg: 'Msql error :' + err,
                    status: 402
                });
            } else {
                res.json({
                    status: 1,
                    data: result
                });
            }
        });

    },

    get_expenses_stats_on_filters: function(req, res) {

        let start_date = req.body.start_date;
        let end_date = req.body.end_date;

        let expense_category_id = req.body.expense_category_id;
        let expense_category_type_xref_id = req.body.expense_category_type_xref_id;

        let where = [];

        where.push("te.expense_date>="+start_date);
        where.push("te.expense_date<="+end_date);

        if(expense_category_id!=""){
            where.push("tec.id="+con.escape(expense_category_id));
        }

        if(expense_category_type_xref_id!=""){
            where.push("tec.expense_category_type_xref_id="+con.escape(expense_category_type_xref_id));
        }

        let where_clause = " WHERE "+where.join(" AND ");

        let query_expenditures = "select sum(te.expense_amount) as expenditures FROM tbl_expenses te JOIN tbl_expenses_head teh on te.expenses_head_id=teh.expenses_head_id JOIN tbl_expense_categories tec ON teh.expense_category_id = tec.id "+where_clause+" AND tec.expense_category_type_xref_id=2";
        let query_income = "select sum(te.expense_amount) as incomes FROM tbl_expenses te JOIN tbl_expenses_head teh on te.expenses_head_id=teh.expenses_head_id JOIN tbl_expense_categories tec ON teh.expense_category_id = tec.id "+where_clause+" AND tec.expense_category_type_xref_id=1";
        
        let response_result = {expenditures:0,incomes:0}

        con.query(query_expenditures, (err, result) => {
            if (err) {
                res.json({
                    msg: 'Msql error :' + err,
                    status: 402
                });
            } else {
                if (result.length) {
                    
                    response_result.expenditures = result[0].expenditures
                } else {
                    res.json({
                        status: 0,
                        msg: 'No Data Available'
                    });
                }

                con.query(query_income, (err, result1) => {
                    if (err) {
                        res.json({
                            msg: 'Msql error :' + err,
                            status: 402
                        });
                    } else {
                        if (result1.length) {
                            response_result.incomes = result1[0].incomes
                        } else {
                            res.json({
                                status: 0,
                                msg: 'No Data Available'
                            });
                        }
                    }

                    res.json({
                        status: 1,
                        data:response_result
                    });

                });

            }
        });

    },

    //********************************************************************* */
    // *************************** Add new expenses   ***********************/
    //********************************************************************* */

    delete_expense: function(req, res) {

        let id = req.body.id;

        let sql_statement = "DELETE from tbl_expenses WHERE expense_id="+con.escape(id);

        let query = con.query(
            sql_statement,
            (err, result) => {
                if (err) {
                    res.json({
                        msg: "Failed to delete expense" + err,
                        status: 0
                    });
                } else {
                    res.json({
                        msg: 'Expense deleted successfully',
                        status: 1
                    });
                }
            }
        );
    },

    edit_expense: function(req, res) {

        let expenses_head_id = req.body.expenses_head_id;
        let expense_date = req.body.expense_date;
        let expense_amount = req.body.expense_amount;
        let expense_id = req.body.expense_id;

        let sql_statement = "UPDATE tbl_expenses SET expenses_head_id="+con.escape(expenses_head_id)+",expense_date="+con.escape(expense_date)+",expense_amount="+con.escape(expense_amount)+" WHERE expense_id="+con.escape(expense_id);

        let query = con.query(
            sql_statement,
            (err, result) => {
                if (err) {
                    res.json({
                        msg: "Failed to update expense" + err,
                        status: 0
                    });
                } else {
                    res.json({
                        msg: 'Expense updated successfully',
                        status: 1
                    });
                }
            }
        );
    },
    
    add_expensesF: function(req, res) {
        let expense_data = {
            expense_date: req.body.expense_date,
            expense_amount: req.body.expense_amount,
            expenses_head_id: req.body.expenses_head_id

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
    }
};