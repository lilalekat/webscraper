var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;



var router = express.Router();

app.use(express.static(__dirname + "/public"));
app.use(router);
app.use(bodyParser.urlencoded({
    extended: true
}));

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, function(error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Mongoose Connection Successful");
    }
});

app.listen(PORT, function() {
    console.log("Listening on port:" + PORT);
});