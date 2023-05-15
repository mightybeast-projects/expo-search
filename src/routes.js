var express = require('express');
var dbController = require("./dbController");
var xmlParser = require("./xmlParser");
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
    res.render("index");
});

router.get('/landing', function(req, res) {
    res.render("index");
});

router.get('/form', function(req, res) {
    res.render("form");
});

router.post('/form', function(req, res) {
    var newExposition = {
        expName: req.body.expName,
        expDesc: req.body.expDesc,
        expStart: req.body.expStart,
        expEnd: req.body.expEnd
    }
    dbController.insert(newExposition);
    res.send(`${req.body.expName} ${req.body.expDesc} ${req.body.expStart} ${req.body.expEnd}`);
});

router.get('/expos', async function(req, res) {
    await RenderAllExpositions(res);
});

router.get('/parse', async function(req, res) {
    var data = await xmlParser.parseXML('expositions.xml');
    data.expositions.forEach((exposition) => {
        dbController.insert(exposition);
    });
    console.log("Parsed XML!");

    await RenderAllExpositions(res);
});

async function RenderAllExpositions(res) {
    var data = await dbController.findAll();
    res.render("expos", { data: data });
}

module.exports = router;