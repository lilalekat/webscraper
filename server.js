//Dependencies Declared Here//
//Express//
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Express Handlebars//
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//Scraper Dependencies//
var cheerio = require("cheerio");
var axios = require("axios");

//Model Requirements//
var db = require("./models");

//Database Requirements//
var mongoose = require("mongoose");

var ObjectId = mongoose.Types.ObjectId;
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, function (error) {
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

//Routes//
app.get("/", function (req, res) {
    res.render("index");
});

//Get route to Scrape BBC Website, would like to ultimately see the html of the scrape data//
app.get("/scrape", function (req, res) {

    axios.get("https://www.bbc.com/news/technology").then(function (response) {

        var $ = cheerio.load(html);

        $("article").each(function (i, element) {

            //Save the title and link of every article to an empty object//
            var result = {};

            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");

            //A new Headline will be created after scraping is successful and will be saved using the empty object noted above//
            db.Headline.create(result)
                .then(function (dbHeadline) {

                    console.log(dbHeadline);
                })
                //Log any error that is caught to the console//
                .catch(function (err) {
                    console.log(err);
                });
        });
       
        result.push({
            title: title,
            link: link
          });
        });
    
        console.log(result);
    });

//Route to get All Headlines from the DB//
app.get("/headlines", function (req, res) {

    db.Headline.find({})
        .then(function (dbHeadline) {
            res.json(dbHeadline);
            console.log("getting there");
        })
        .catch(function (err) {
            res.json(err);
        });
});

//Route to get a particular Headline from the DB//
app.post("/headlines/:id", function(req, res) {

    db.Headline.findOne({ _id: req.params.id })
    .populate("comment")
    .then(function(dbHeadline) {
        res.json(dbHeadline);
        console.log("finding headlines");
    })
    .catch(function (err) {
        res.json(err);
    });
});

//Route to Save as well as Update the Headlines comments area//
app.post("/headlines/:id", function(req, res) {
    db.Comment.create(req.body)
    .then(function(dbComment) {
        return db.Headline.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
    })
    .then(function(dbHeadline) {
        res.json(dbHeadline);
        console.log("saving and updating");
    })
    .catch(function (err) {
        res.json(err);
});
});

//Connection Listener//
var PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("Listening on port:" + PORT);
});

