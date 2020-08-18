const con = require("../db_connection");
module.exports = {
    //********************************************************************* */
    // *************** get only section Data by Class ID ********************/
    //********************************************************************* */

    get_sectionDataFun: function(req, res) {
        let sql =
            "SELECT section_id , section_name from tbl_section WHERE class_id = ? AND status = ?";

        let query = con.query(sql, [req.params.class_id, 1], (err, result) => {
            if (err) {
                res.json({
                    status: 403,
                    msg: "Mysql error :" + err
                });
            } else {
                res.json(result);
            }
        });
    },

    //********************************************************************* */
    // *********** get section related all Data by Class ID *****************/
    //********************************************************************* */

    get_sectionRealtedDataFun: function(req, res) {
        let sql =
            "select s.*,e.employee_name as teacher_name,e.employee_id as teacher_id from tbl_section s INNER join tbl_class c on s.class_id = c.class_id " +
            "LEFT JOIN tbl_employees e on s.teacher_id = e.employee_id " +
            "Where s.class_id = ? AND s.status= ?";

        let query = con.query(sql, [req.params.class_id, 1], (err, result) => {
            if (err) {
                res.json({
                    msg: "fail to get class data" + err
                });
            } else {
                res.json({
                    status:1,
                    data:result
                });
            }
        });
    },

    //********************************************************************* */
    // ****** get Single section Data by Class ID , Section ID *************/
    //********************************************************************* */

    get_singleSectionFun: function(req, res) {
        let sql =
            "select * from tbl_section s INNER join tbl_class c on s.class_id = c.class_id " +
            "LEFT JOIN tbl_teachers t on s.teacher_id = t.teacher_id " +
            "Where s.class_id = ? AND s.section_id = ? AND s.status= ?";

        let query = con.query(
            sql, [req.params.class_id, req.params.section_id, 1],
            (err, result) => {
                if (err) {
                    res.json({
                        msg: "fail to get class data" + err
                    });
                } else {
                    res.json(result);
                }
            }
        );
    },

    //********************************************************************* */
    // ******************** Add Section data ********************************/
    //********************************************************************* */

    add_sectionFun: function(req, res) {
        
        let user_info = req.body.jwt_data;
        var year = user_info.current_session;

        let sectionDetails = {
            section_name: req.body.section_name,
            class_id: req.body.class_id,
            teacher_id: req.body.teacher_id,
            year:year
        };
//console.log(sectionDetails);
        let sql = "INSERT INTO tbl_section SET ?";
        let query = con.query(sql, sectionDetails, (err, result) => {
            if (err) {
                res.json({
                    msg: "fail to add section" + err,
                    status: 0
                });
            } else {
                res.json({
                    msg: "section added successfully",
                    status: 1
                });
            }
        });
    },

    //********************************************************************* */
    // ******************** Check Section Already Added ***********************/
    //********************************************************************* */

    check_sectionExists: function(req, res) {
        return new Promise(function(resolve, reject) {
            let section_name = req.body.section_name;
            let class_id = req.body.class_id;
            let sql =
                "Select COUNT(*) AS section_present from tbl_section Where class_id = ? AND section_name =? AND status = ? ";
            let query = con.query(sql, [class_id, section_name, 1], (err, result) => {
                if (err) {
                    resolve("fail to check section" + err);
                } else {
                    if (result[0].section_present) {
                        let isSection = 1;
                        resolve(isSection);
                    } else {
                        let isSection = 0;
                        resolve(isSection);
                    }
                }
            });
        });
    },

    //************************************************************************ */
    // ******************** Select Section by class ID ************************/
    //********************************************************************* ***/

    get_sectionByClassIdFun: function(req, res) {
        let class_id = req.params.class_id;
        let sql = "Select * from tbl_section WHERE class_id = ? AND status = ? ";
        let query = con.query(sql, [class_id, 1], (err, result) => {
            if (err) {
                res.json({
                    msg: "failed to load section data" + err,
                    status: "0"
                });
            } else {
                res.json(result);
            }
        });
    },

    //************************************************************************/
    // ******************* Delete Section Data by class ID ******************/
    //************************************************************************/

    delete_sectionByClassIdFun: function(req, res) {
        let class_id = req.params.class_id;
        let status = 0;
        let sql = "Update tbl_section SET status = ? Where class_id= ?";
        let query = con.query(sql, [status, class_id], (err, result) => {
            if (err) {
                res.json({
                    msg: "fail to Delete Section" + err
                });
            } else {
                res.json({
                    msg: "Deleted successfully"
                });
            }
        });
    },

    //************************************************************************/
    // ******************* Delete Section Data by Section ID ******************/
    //************************************************************************/

    delete_sectionFun: function(req, res) {
        let section_id = req.params.section_id;
        let class_id = req.params.class_id;
        let deleteStatus = {
            status: req.body.status
        };

        let sql = "Update tbl_section SET  ? Where class_id = ? AND section_id= ?";
        let query = con.query(
            sql, [deleteStatus, class_id, section_id],
            (err, result) => {
                if (err) {
                    res.json({
                        status: 402,
                        msg: "fail to Delete Section" + err
                    });
                } else {
                    res.json({
                        status: 1,
                        msg: "Deleted successfully"
                    });
                }
            }
        );
    },

    //************************************************************************/
    // ******************* Update Section Data *******************************/
    //************************************************************************/

    update_sectionFun: function(req, res) {
        let section_id = req.params.section_id;
        let class_id = req.params.class_id;
        let sectionUpdateData = {
            teacher_id: req.body.teacher_id
        };
        let sql = "Update tbl_section SET ? WHERE class_id = ? AND section_id = ?";
        let query = con.query(
            sql, [sectionUpdateData, class_id, section_id],
            (err, result) => {
                if (err) {
                    res.json({
                        status: 402,
                        msg: "Mysql error :" + err
                    });
                } else {
                    res.json({
                        status: 1,
                        msg: "Updated successfully"
                    });
                }
            }
        );
    }
};