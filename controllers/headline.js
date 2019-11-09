const db = require("../models");

//Methods for the Headline Controller//
module.exports = {
    findAllHeadlines: function(req, res) {
        db.mongoHeadlines
        .find(req.query)
        .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findByHeadlineId: function(req, res) {
        db.mongoHeadlines
        .findByCustId(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.mongoHeadlines
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        db.mongoHeadlines
        .findApptAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel => dbModel.remove())
        .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.mongoHeadlines
        .findById({ _id:req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
};