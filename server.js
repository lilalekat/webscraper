//Dependencies//
//Express//
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

//Express Handlebars//
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//Database Requirements//
var mongoose = require("mongoose");
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
var ObjectId = mongoose.Types.ObjectId;
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(MONGODB_URI, function(error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Mongoose Connection Successful");
    }
});

//Router to handle Middleware//
var router = express.Router();
require("./config/routes")(router);
app.use(router);

//Connection Listener//
var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log("Listening on port:" + PORT);
});