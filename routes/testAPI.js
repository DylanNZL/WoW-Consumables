/**
 * This router mimics some of the actual API functionality but doesn't interact with the database (for testing on windows mainly)
 * The items only contain one auction to make things easy to work with
 */

let express = require('express');
let router = express.Router();

const staticJSON = require("./staticJSON.js");

router.get('/', async (req, res, next) => {
    const url = req.baseUrl;
    switch (url) {
        case "/testAPI/allReagents": // Does a bunch of queries to reduce client <-> server communication overhead
            await allReagents(req,res,next);
            break;
        case "/testAPI/allCraftables": // Does a bunch of queries to reduce client <-> server communication overhead
            await allCraftables(req,res,next);
            break;
        case "/testAPI/shopReagents": // Does a bunch of queries to reduce client <-> server communication overhead
            await shopReagents(req,res,next);
            break;
        default:
            res.render('api', {});
    }
});

function allReagents(req, res, next) {
    res.status(200).jsonp({
        timestamp: Date.now(),
        success: true,
        items: staticJSON.ahReagents
    });
}

function shopReagents(req, res, next) {
    res.status(200).jsonp({
        timestamp: Date.now(),
        success: true,
        items: staticJSON.shopReagents
    });
}

function allCraftables(req, res, next) {
    res.status(200).jsonp({
        timestamp: Date.now(),
        success: true,
        items: staticJSON.craftables
    });
}

module.exports = router;