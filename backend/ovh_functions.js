const schoolinfo = require('../backend/schoolinfo');

var fs = require("fs");
var S3 = require('aws-sdk/clients/s3');
var crypto = require("crypto")
const {resolve} = require("path");

module.exports = {

    get_thumb_name_from_ovh_large_image_url(large_image){

        let ovh_file_base_url = schoolinfo.OVH_FILE_BASE_URL
        let large_image_splitted = large_image.split(ovh_file_base_url);

        let large_file_name = large_image_splitted[large_image_splitted.length-1]
        
        let large_file_name_splitted = large_file_name.split(".");
        let large_file_name_without_extension = large_file_name_splitted[0];
        
        return large_file_name_without_extension+".thumb"

    },
    get_file_name_from_url(url){
        let url_splitted = url.split("/")
        return url_splitted[url_splitted.length-1]
    },
    async create_ovh_temp_url(file_name){
        //1591706893469.jpeg
        // we need images/1591706893469.jpeg

        return this.get_file_from_ovh({file_name:"images/"+file_name})
    },
    async get_file_from_ovh(data){

        let file_name = data['file_name']

        method = 'GET'
        duration_in_seconds = 60 * 60 * 5
        current_time = Math.floor(new Date().getTime()/1000)
        expires = current_time + duration_in_seconds
        path = '/v1/AUTH_' + schoolinfo.OVH_PROJECTID + '/' + schoolinfo.OVH_BUCKET_NAME + '/' + file_name
        
        hmac_body = method + '\n' + expires + '\n' + path;

        var sig = crypto.createHmac('sha1', schoolinfo.OVH_TEMP_KEY)
        .update(hmac_body)
        .digest('hex');

        let host = schoolinfo.OVH_BUCKET_URL

        let url = host+path+'?temp_url_sig='+sig+'&temp_url_expires='+expires

        return {url:url}
        
    },
    async upload_file_to_ovh(data){
        return new Promise((resolve1, reject1) => {
            var file = data['file'];
            
            let file_path = file.path

            let file_type = file.mimetype;
            let fts = file_type.split("/")
            let file_extension = fts[fts.length-1]
            
            let ovh_file_name = '';
            
            // if file name is not sent then calculate it
            if(data.hasOwnProperty('file_name')){
                ovh_file_name = data['file_name']
            }
            else{
                ovh_file_name = new Date().getTime()+"."+file_extension
            }

            const fileContent = fs.readFileSync(file_path);
    
            let url = schoolinfo.OVH_FILES_ENDPOINT
            const bucket = new S3(
                {
                    accessKeyId: schoolinfo.OVH_ACCESS_KEY_ID,
                    secretAccessKey: schoolinfo.OVH_ACCESS_SECRET_KEY,
                    region: schoolinfo.OVH_REGION,
                    endpoint:url
                }
            );
            const params = {
                Bucket: schoolinfo.OVH_BUCKET_NAME,
                Key: schoolinfo.OVH_FILE_BASE_URL+ovh_file_name,
                Body: fileContent,
                ACL: schoolinfo.OVH_ACL,
            };
    
            bucket.upload(params, function (err, data) {
                fs.unlinkSync(file.path);
                if(err){
                    resolve1({status:0,msg:'Unable to upload file',error:err})
                }
                else{
                    let url = data.Location
                    resolve1({status:1,url:url})
                }
                
            });
        })
        
    }
}