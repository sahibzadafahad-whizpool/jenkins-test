const sql_prepare = require('../prepare');
const con = require('../db_connection');
const constants = require("../constants");
const funcs = require("../functions");
const ovh_functions = require("../ovh_functions");
var fs = require("fs");

module.exports = {
    
    get_salary_template(req,res){
        const templatesFolder = constants.SALARY_TEMPLATES_FOLDER
        let file_contents = fs.readFileSync(templatesFolder+'/1.html',"utf8")
        if(!file_contents){
            res.json({
                status:0,
                msg:'Could not get salary template'
            })
        }
        else{
            res.json({
                status:1,
                data:file_contents,
                msg:'Salary template fetched successfully'
            })
        }
    },
    
    //********************************************************************* */
    // ******************** get teachers data Function **********************/
    //********************************************************************* */
    get_teachersFun: function(req, res) {

        let role_xref_id = req.params.role_xref_id;

        let sql = 'Select * from tbl_employees where role_xref_id='+con.escape(role_xref_id)+' AND status=1';
        let query = con.query(sql, (err, results) => {
            if (err) {
                return res.json({
                    msg: 'fail to load teacher' + err.message
                });
            } else {
                return res.json(results);
            }
        });
    },

    //********************************************************************* */
    // ************** get teachers data with pagination Function ****************/
    //********************************************************************* */

    get_teachersWithPaginFun: function(req, res) {
        
        let role_xref_id = req.body.role_xref_id;

        let offset = req.body.offset;
        let itemsPerPage = req.body.itemsPerPage;
        let sql_prepare_statement = sql_prepare.sql_getTeachersDataWithPagin;
        let query_paramas = [1,role_xref_id, offset, itemsPerPage];

        con.query(sql_prepare_statement, query_paramas, async (err, result) => {
            if (err) {
                res.json({
                    msg: 'Msql error :' + err,
                    status: 402
                });
            } else {
                if (result.length >= 1) {
                    
                    for(let i=0;i<result.length;i++){

                        if(result[i].image_path!='' && result[i].image_path!=null){
                            let temp_url_response = await ovh_functions.create_ovh_temp_url(result[i].image_path);
                            result[i].image_path = temp_url_response.url
                        }
                        
                        if(result[i].thumb_path!='' && result[i].thumb_path!=null){
                            let temp_url_response = await ovh_functions.create_ovh_temp_url(result[i].thumb_path);
                            result[i].thumb_path = temp_url_response.url
                        }

                        if(result[i].transcript_image_path!='' && result[i].transcript_image_path!=null){
                            let temp_url_response = await ovh_functions.create_ovh_temp_url(result[i].transcript_image_path);
                            result[i].transcript_image_path = temp_url_response.url
                        }

                        if(result[i].transcript_thumb_path!='' && result[i].transcript_thumb_path!=null){
                            let temp_url_response = await ovh_functions.create_ovh_temp_url(result[i].transcript_thumb_path);
                            result[i].transcript_thumb_path = temp_url_response.url
                        }

                    }

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
    // ******************** get teachers Name and ID Function ***************/
    //***********************************************************************/
    get_teacherNameIdFun: function(req, res) {
        let sql =
            'Select teacher_id AS id , teacher_name AS text  from tbl_teachers ';
        let query = con.query(sql, (err, results) => {
            if (err) {
                res.json({
                    msg: 'fail to get teachers data ' + err
                });
            } else {
                res.json(results);
            }
        });
    },

    //********************************************************************* */
    // ******************** get Singal teacher data *************************/
    //********************************************************************* */

    get_teacherFun: function(req, res) {
        let id = req.params.id;
        let sql = 'Select * from tbl_teachers Where teacher_id = ' + con.escape(id);
        let query = con.query(sql, (err, result) => {
            if (err) {
                res.json({
                    msg: 'fail to get teacher data' + err
                });
            } else {
                res.json(result);
            }
        });
    },

    get_teacher_schedule: function(req, res) {
        let id = req.body.id;
        let current_session = req.body.current_session;

        let sql_statement = 'Select s.*,c.class_name,ss.section_name from tbl_subjects s JOIN tbl_class c on s.class_id=c.class_id JOIN tbl_section ss on ss.section_id=s.section_id Where s.teacher_id = ' + con.escape(id)+' AND s.year='+con.escape(current_session);
        
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_statement
        );

    },

    //********************************************************************* */
    // ******************** Add teachers data *******************************/
    //********************************************************************* */

    add_teacherFun: async function(req, res) {

        //tbl_employees is primary table, tbl_teachers is secondary table
        //we need to insert data in employees table first
        let role_xref_code = req.body.role;
        //we have role_code, lets get role id from xref table

        let role_xref_details = await funcs.get_role_xref_details_from_code(role_xref_code);
        
        let role_xref_id = role_xref_details['data']['role_xref_id'];
        
        let employee_details = {
            employee_name: req.body.teacher_name,
            father_name: req.body.father_name,
            employee_qual: req.body.teacher_qual,
            employee_desig: req.body.teacher_desig,
            religion: req.body.religion,
            marital_status: req.body.marital_status,
            dob: req.body.dob,
            phone_num: req.body.phone_num,
            email: req.body.email,
            employee_cnic: req.body.teacher_nic,
            user_name: req.body.user_name,
            password: req.body.password,
            gender: req.body.gender,
            address: req.body.address,
            experience: req.body.experience,
            employee_description: req.body.t_desc,
            basic_salary:req.body.basic_salary,
            total_salary:req.body.total_salary,
            role_xref_id:role_xref_id,
            status: 1
        };

        if(req.body.landline_num && req.body.landline_num!=''){
            employee_details['landline_num'] = req.body.landline_num
        }

        if(req.body.last_employment_organization_name && req.body.last_employment_organization_name!=''){
            employee_details['last_employment_organization_name'] = req.body.last_employment_organization_name
        }

        if(req.body.last_employment_position && req.body.last_employment_position!=''){
            employee_details['last_employment_position'] = req.body.last_employment_position
        }

        if(req.body.last_employment_main_duty && req.body.last_employment_main_duty!=''){
            employee_details['last_employment_main_duty'] = req.body.last_employment_main_duty
        }

        if(req.body.last_employment_from_year && req.body.last_employment_from_year>0){
            employee_details['last_employment_from_year'] = req.body.last_employment_from_year
        }

        if(req.body.last_employment_to_year && req.body.last_employment_to_year>0){
            employee_details['last_employment_to_year'] = req.body.last_employment_to_year
        }

        if(req.body.house_allowance && req.body.house_allowance>0){
            employee_details['house_allowance'] = req.body.house_allowance
        }

        if(req.body.medical_allowance && req.body.medical_allowance>0){
            employee_details['medical_allowance'] = req.body.medical_allowance
        }

        if(req.body.bonus && req.body.bonus>0){
            employee_details['bonus'] = req.body.bonus
        }

        let sql = 'INSERT INTO tbl_employees SET ?';
        let query = con.query(sql, employee_details, (err, result) => {
            if (err) {
                res.json({
                    status: 402,
                    msg: 'Mysql error' + err
                });
            } else {

                let employee_id = result.insertId;
                //as this employee is added, we need to put details in secondary table
                if(role_xref_code=="teacher"){
                    let sql2 = "INSERT INTO tbl_teachers SET ? ";

                    let teacher_details = {
                        employee_id:employee_id,
                        user_name: req.body.user_name,
                        password: req.body.password,
                    };

                    con.query(sql2, teacher_details, (err, result) => {
                    });

                }

                res.json({
                    status: 1,
                    msg: 'Teacher added successfully',
                    inserted_id: employee_id
                });

            }
        });
    },

    //********************************************************************* */
    // ******************** Update teachers data ****************************/
    //********************************************************************* */

    update_teacherFun: function(req, res) {

        let employee_id = parseInt(req.params.id);

        var teacherDetails = {
            employee_name: req.body.teacher_name,
            father_name: req.body.father_name,
            employee_qual: req.body.teacher_qual,
            employee_desig: req.body.teacher_desig,
            gender: req.body.gender,
            dob: req.body.dob,
            employee_description: req.body.t_desc,
            phone_num: req.body.phone_num,
            email: req.body.email,
            employee_description: req.body.t_desc,
            address: req.body.address,
            experience: req.body.experience,
            religion: req.body.religion,
            marital_status: req.body.marital_status,
            employee_cnic: req.body.teacher_cnic,
            basic_salary:req.body.basic_salary,
            total_salary:req.body.total_salary,
            status: 1
        };

        if (req.body.teacher_password != '') {
            teacherDetails['password'] = req.body.teacher_password;
        }

        if(req.body.landline_num && req.body.landline_num!=''){
            teacherDetails['landline_num'] = req.body.landline_num
        }
        else{
            teacherDetails['landline_num'] = null;
        }

        if(req.body.last_employment_organization_name && req.body.last_employment_organization_name!=''){
            teacherDetails['last_employment_organization_name'] = req.body.last_employment_organization_name
        }
        else{
            teacherDetails['last_employment_organization_name'] = null;
        }

        if(req.body.last_employment_position && req.body.last_employment_position!=''){
            teacherDetails['last_employment_position'] = req.body.last_employment_position
        }
        else{
            teacherDetails['last_employment_position'] = null;
        }

        if(req.body.last_employment_main_duty && req.body.last_employment_main_duty!=''){
            teacherDetails['last_employment_main_duty'] = req.body.last_employment_main_duty
        }
        else{
            teacherDetails['last_employment_main_duty'] = null;
        }

        if(req.body.last_employment_from_year && req.body.last_employment_from_year>0){
            teacherDetails['last_employment_from_year'] = req.body.last_employment_from_year
        }
        else{
            teacherDetails['last_employment_from_year'] = null;
        }

        if(req.body.last_employment_to_year && req.body.last_employment_to_year>0){
            teacherDetails['last_employment_to_year'] = req.body.last_employment_to_year
        }
        else{
            teacherDetails['last_employment_to_year'] = null;
        }

        if(req.body.house_allowance && req.body.house_allowance>0){
            teacherDetails['house_allowance'] = req.body.house_allowance
        }
        else{
            teacherDetails['house_allowance'] = 0
        }

        if(req.body.medical_allowance && req.body.medical_allowance>0){
            teacherDetails['medical_allowance'] = req.body.medical_allowance
        }
        else{
            teacherDetails['medical_allowance'] = 0
        }

        if(req.body.bonus && req.body.bonus>0){
            teacherDetails['bonus'] = req.body.bonus
        }
        else{
            teacherDetails['bonus'] = 0
        }

        let sql =
            'Update tbl_employees SET ? WHERE employee_id=' + con.escape(employee_id);
        let query = con.query(sql, [teacherDetails], (err, result) => {
            if (err) {
                res.json({
                    status: 402,
                    msg: 'Mysql error' + err
                });
            } else {

                //lets get who is this, teacher or staff or some thing else

                let role_xref_code = req.body.role;

                if(role_xref_code=="teacher"){
                    let teacherDetails2 = {
                    };
    
                    if (req.body.teacher_password != '') {
                        teacherDetails2['password'] = req.body.teacher_password;
                    }
    
                    let sql2 = 'Update tbl_teachers SET ? WHERE employee_id=' + con.escape(employee_id);
                    
                    let query2 = con.query(sql2, [teacherDetails2], (err, result) => {
                    });
                }
                
                res.json({
                    status: 1,
                    msg: 'updated successfully'
                });
            }
        });
    },

    //********************************************************************* */
    // ******************** Delete Teachers Data ***************************//
    //********************************************************************* */

    delete_teacherFun: function(req, res) {
        let sql =
            'Delete from tbl_teachers where teacher_id = ' +
            con.escape(req.params.id);
        let query = con.query(sql, (err, result) => {
            if (err) {
                res.json({
                    msg: 'fail to delete' + err
                });
            } else {
                res.json({
                    msg: 'Deleted Successfully'
                });
            }
        });
    },

    //********************************************************************* */
    // ******************** Delete Teachers Data Logically ***************************//
    //********************************************************************* */

    delete_teacher_logicalFun: function(req, res) {
        let sql =
            'UPDATE tbl_employees SET status=2 where employee_id = ' +
            con.escape(req.params.id);
        let query = con.query(sql, (err, result) => {
            if (err) {
                res.json({
                    msg: 'fail to delete' + err
                });
            } else {
                res.json({
                    msg: 'Deleted Successfully'
                });
            }
        });
    }

};