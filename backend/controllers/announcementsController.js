var async = require("async");
const sql_prepare = require("../prepare");
const con = require("../db_connection");
module.exports = {
    //********************************************************************* */
    // ******************** Add new Announcements   **************************/
    //********************************************************************* */

    add_new_announcementFun: function(req, res) {
        let new_announcement_data = {
            announc_title: req.body.announc_title,
            announc_details: req.body.announc_details,
            announcement_date: req.body.announcement_date,
            announcement_expire: req.body.announcement_expire,
            announc_for: req.body.announc_for
        };

        let sql_prepare_statement = sql_prepare.sql_addNewAnnouncment;

        //call function to insert data into db
        let query = sql_prepare.run_add_query(
            req,
            res,
            con,
            sql_prepare_statement,
            new_announcement_data
        );
    },

    //********************************************************************* */
    // ******************** GEt active Announcements   **************************/
    //********************************************************************* */

    get_activeAnnouncementFun: function(req, res) {
        let sql_prepare_statement = sql_prepare.sql_getActiveAnnouncements;
        let current_time = Math.floor(new Date() / 1000);

        let query_params = [1, current_time];
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_params
        );
    },

    //********************************************************************* */
    // ******************** GEt expired Announcements   **************************/
    //********************************************************************* */

    get_expiredAnnouncementFun: function(req, res) {
        let sql_prepare_statement = sql_prepare.sql_getExpiredAnnouncements;
        let current_time = Math.floor(new Date() / 1000);

        let query_params = [1, current_time];
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            query_params
        );
    },

    //********************************************************************* */
    // ******************** GEt Single Announcements   **************************/
    //********************************************************************* */

    get_single_announcementFun: function(req, res) {
        let announcement_id = req.params.announcement_id;
        let sql_prepare_statement = sql_prepare.sql_getSingleAnnouncements;
        //call to get data from db
        let query = sql_prepare.run_fetch_query(
            req,
            res,
            con,
            sql_prepare_statement,
            announcement_id
        );
    },

    //********************************************************************* */
    // ******************** Update Announcements   **************************/
    //********************************************************************* */

    update_announcementFun: function(req, res) {
        let announcement_id = req.params.announcement_id;

        let update_type = req.params.update_type;
        let update_AnnouncmentData;
        if (update_type == "999") {
            update_AnnouncmentData = {
                announc_for: req.body.u_announc_for,
                announc_details: req.body.u_announc_desc,
                announc_title: req.body.u_announc_title
            };
        } else {
            update_AnnouncmentData = {
                announc_details: req.body.u_announc_desc,
                announc_title: req.body.u_announc_title
            };
        }

        let sql_prepare_statement = sql_prepare.sql_updateAnnouncements;
        let update_params = [update_AnnouncmentData, announcement_id];
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
    // ******************** Delete Announcements   **************************/
    //********************************************************************* */

    delete_announcementFun: function(req, res) {
        let announcement_id = req.params.announcement_id;
        let sql_prepare_statement = sql_prepare.sql_deleteAnnouncements;

        //call to delete data from db
        let query = sql_prepare.run_delete_query(
            req,
            res,
            con,
            sql_prepare_statement,
            announcement_id
        );
    }
};