const app = require("express");
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.get('/',(req,res)=>{
    res.render("index");
});

app.listen(3000);