var mysql = require('mysql');

//local /dev
const server = 'dev';

const devserver = {
    connectionLimit: 10,
    host: 'localhost',
    user: 'schooluser',
    password: 'School@007',
    database: 'school_webapp',
    multipleStatements: true
};

const localServer = {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'school_webapp',
    multipleStatements: true
};

const server_credentials = server == 'local' ? localServer : devserver;

var con;

function handleDisconnect() {
    con = mysql.createPool(server_credentials); // Recreate the connection, since
    // the old one cannot be reused.

    con.getConnection(function(err) {
        // The server is either down
        if (err) {
            // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            if (err.code == 'ER_ACCESS_DENIED_ERROR') {
                console.log('db connection error');
            } else {
                setTimeout(handleDisconnect, 2000);
            }
            // We introduce a delay before attempting to reconnect,
        } // to avoid a hot loop, and to allow our node script to
    }); // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    con.on('error', function(err) {
        console.log('db error', err);
        if (err.code == 'ER_ACCESS_DENIED_ERROR') {
            console.log('db connection error');
        } else {
        handleDisconnect();
        }
    });
}

handleDisconnect();
module.exports = con;

// try {
//     var con = mysql.createConnection(server_credentials);
// } catch (error) {
//     res.json("connection error");
// }

// // databse connection test
// con.connect(function(err) {
//     if (err) {
//         console.log("connection error" + err);
//     } else {
//         console.log(`DB Connected on ${server} server`);
//     }
// });