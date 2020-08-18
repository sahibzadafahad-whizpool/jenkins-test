var jwt = require("jsonwebtoken");
const constants = require("./constants");
module.exports = {
    // jwt verification for mob APIs
    jwt_auth: (req, res, next) => {

        /*
            Comments by Dilpazir Ahmad
            APIs developed by Nauman required jwt in body (to me jwt should have been implemented in headers )
            there is no time to correct previous APIs at a time
            so we will check whether jwt is coming in headers or body
            first priority will be headers
        */

        let token = '';
        if(req.headers.hasOwnProperty('jwt')){
            token = req.headers.jwt;
        }
        else{
            token = req.body.jwt;
        }

        // verify jet token
        jwt.verify(token, "45745c60-7b1a-11e8-9c9c-2d42b21b1a3e", function(err,result) {
            let resp;
            if (err) {
                resp = {
                    status: 403,
                    msg: "Invalid Jwt Token"
                };
                res.json(resp);
            } else {
                // we need data in this jwt, so put it in the body
                req.body.jwt_data = result.user_data
                next();
            }
        });
    },

    // web apis auth

    web_api_auth: (req, res, next) => {
        if (req.headers["authorization"]) {
            // Remove Bearer from string
            var token = req.headers.authorization.split(" ")[1];

            jwt.verify(token, "45745c60-7b1a-11e8-9c9c-2d42b21b1a3e", function(
                err,
                decoded
            ) {
                if (err) {
                    res.json({
                        status: 401,
                        message: "Unauthorize"
                    });
                } else {
                    next();
                }
            });
        } else {
            res.json({
                status: 401,
                message: "Unauthorize"
            });
        }
    }
};