const sql_prepare = require('../prepare');
const con = require('../db_connection');

const funcs = require("../functions");

module.exports = {
    
    get_role_xref: function(req, res) {
        let sql =
            'select * from tbl_role_xref'
        let query = con.query(sql, (err, result) => {
            if (err) {
                res.json({
                    msg: 'fail to get role xref' + err,
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

    get_expense_category_type_xref: function(req, res) {
        let sql =
            'select * from tbl_expense_category_type_xref'
        let query = con.query(sql, (err, result) => {
            if (err) {
                res.json({
                    msg: 'fail to get role xref' + err,
                    status:0,
                });
            } else {
                res.json({
                    status:1,
                    data:result
                });
            }
        });
    }

};