const con = require("../db_connection");

module.exports = {
    get_suggestions(req,res){
        let sql = "SELECT s.*,p.parent_phoneNum,p.mother_phoneNum,p.guardian_phoneNum,p.parent_name,p.primary_parent_type,mother_name,guardian_name from tbl_suggestions s JOIN tbl_parents p on p.parent_id=s.user_id ORDER BY s.suggestion_id DESC";
        let query = con.query(
            sql,(err, result) => {
                if (err) {
                    res.json({
                        status: 0,
                        msg:'Error getting suggestions'+err
                    });
                } else {
                    res.json({
                        status: 1,
                        data:result
                    });
                }
            }
        );
    }
}