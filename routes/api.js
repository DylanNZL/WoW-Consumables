let express = require('express');
let router = express.Router();

const database = require("../database.js");
const staticJSON = require("./staticJSON.js");

router.get('/', async (req, res, next) => {
    const url = req.baseUrl;
    switch (url) {
        case "/api/item":
            await retrieveItem(req,res,next);
            break;
        case "/api/dbUpdated":
            await dbUpdated(req,res,next);
            break;
        case "/api/allReagents": // Does a bunch of queries to reduce client <-> server communication overhead
            await allReagents(req,res,next);
            break;
        case "/api/allCraftables": // Does a bunch of queries to reduce client <-> server communication overhead
            await allCraftables(req,res,next);
            break;
        case "/api/shopReagents": // Does a bunch of queries to reduce client <-> server communication overhead
            await shopReagents(req,res,next);
            break;
        default:
            res.render('api', {});
    }
    // res.render('index', { title: 'Express' });
});

// Format: /api/item?itemID=133579
// Retrieves the requested items auctions from the database
async function retrieveItem(req, res, next) {
    let itemID = 0;
    if (req.query.itemID !== undefined && req.query.itemID > 0) {
        itemID = req.query.itemID;
    }
    let excludeQuantity = 0;
    if (req.query.excludeQuantity > 0) {
        excludeQuantity = req.query.excludeQuantity;
    }
    let historyID = await database.latestHistory();

    let data = await database.retrieveItem(itemID, excludeQuantity, historyID);

    let json = {};
    if (data === 0) {
        json = {
            timestamp : Date.now(),
            success : false,
            item : itemID,
            length : 0,
            auctions : 0
        }
    } else {
        json = {
            timestamp: Date.now(),
            success: true,
            item : itemID,
            length: data.length,
            auctions: data
        }
    }
    res.status(200).jsonp(json);
}

// Sends back the latest timestamp
async function dbUpdated(req, res, next) {
    let result = {
        timestamp: Date.now(),
        success: true,
        dbUpdated: await database.dbUpdated()
    };

    res.status(200).jsonp(result);
}

async function allReagents(req,res,next) {
    let result = {
        timestamp: Date.now(),
        success: true,
        items: staticJSON.ahReagents
    };
    let historyID = await database.latestHistory();
    let promises = [];

    for (let property in result.items) {
        promises.push(result.items[property].auctions = database.retrieveItemAHStats(result.items[property].id, 0, historyID))
    }

    let data = await Promise.all(promises);

    data.forEach(function (dat) {
        // console.log(dat);
        if (dat !== undefined && dat.length !== 0) {
            result.items[dat[0].item].auctions = dat[0]
            //     result.items[i].auctions = dat;
        }
    });
    // console.log(result);
    res.status(200).jsonp(result);
}

async function allCraftables(req, res, next) {
    let result = {
        timestamp: Date.now(),
        success: true,
        items: staticJSON.craftables
    };
    let historyID = await database.latestHistory();
    let promises = [];

    for (let property in result.items) {

        promises.push(result.items[property].auctions = database.retrieveItemAHStats(result.items[property].id, 0, historyID))
    }

    let data = await Promise.all(promises);

    data.forEach(function (dat) {
        // console.log(dat);
        if (dat !== undefined && dat.length !== 0) {
            result.items[dat[0].item].auctions = dat[0]
            //     result.items[i].auctions = dat;
        }
    });
    // console.log(result);
    res.status(200).jsonp(result);
}

async function shopReagents(req, res, next) {
    res.status(200).jsonp({
        timestamp: Date.now(),
        success: true,
        items: staticJSON.shopReagents
    });
}

module.exports = router;
