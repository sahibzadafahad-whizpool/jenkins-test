var express = require("express");
var cors = require("cors");
var bodyparser = require("body-parser");
const methodOverride = require("method-override");
var app = express();
const compression = require("compression");
const route = require("./routes/route");

//compress the size
app.use(
    compression({
        threshold: 0
    })
);

//cors
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

//define port
const port = 8080;



//adding middleware -cors
app.use(cors());

// body-parser
app.use(bodyparser.json());

app.use(methodOverride());

// app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + "/public"));

//redirect all urls with /api/somthing  to routes/route.js
app.use("/api/", route);

//bind port with server
app.listen(port, () => {
    console.log("server started at port:" + port);
});
