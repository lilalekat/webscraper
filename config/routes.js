//Routes that will render the Home and Saved Articles Handlebar Templates//
module.exports = function(router) {
    router.get("/", function(req,res) {
        res.render("home");
    });
    router.get("/savedarticles", function(req,res) {
        res.render("savedarticles");
    });
}

