let express = require('express');
let router = express.Router();

const database = require("../database.js");

router.get('/', async (req, res, next) => {
    const url = req.baseUrl;
    switch (url) {
        case "/api/item":
            await retrieveItem(req,res,next);
            break;
        case "/api/lavishSuramarFeast": // Does a bunch of queries to reduce client <-> server communication overhead
            await lavishSuramarFeast(req,res,next);
            break;
        case "/api/heartyFeast": // Does a bunch of queries to reduce client <-> server communication overhead
            await heartyFeast(req,res,next);
            break;
        default:
            res.render()
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
    let data = await database.retrieveItem(itemID, excludeQuantity);

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

async function lavishSuramarFeast(req, res, next) {
    let result = {
        timestamp: Date.now(),
        success: true,
        items: lavishSuramarFeastItems
    };

    let promises = [];

    result.items.forEach(function(item) {
        promises.push(result.items.auctions = database.retrieveItem(item.id, 5));
    });

    let data = await Promise.all(promises);

    let i = 0;
    data.forEach(function (dat) {
        result.items[i].auctions = dat;
        i++;
    });

    res.status(200).jsonp(result);
}

async function heartyFeast(req, res, next) {
    let result = {
        timestamp: Date.now(),
        success: true,
        items: heartyFeastItems
    };

    let promises = [];

    result.items.forEach(function(item) {
        promises.push(result.items.auctions = database.retrieveItem(item.id, 5));
    });

    let data = await Promise.all(promises);

    let i = 0;
    data.forEach(function (dat) {
        result.items[i].auctions = dat;
        i++;
    });

    res.status(200).jsonp(result);
}

const lavishSuramarFeastItems = [
    { "id" : 133579, "name" : "Lavish Suramar Feast" },
    { "id" : 133565, "name" : "Leybeque Ribs" },
    { "id" : 124119, "name" : "Big Gamy Ribs" },
    { "id" : 124120, "name" : "Leyblood" },
    { "id" : 133566, "name" : "Suramar Surf and Turf" },
    { "id" : 124117, "name" : "Lean Shank" },
    { "id" : 124111, "name" : "Runescale Koi" },
    { "id" : 133567, "name" : "Barracude Mrglgagh" },
    { "id" : 124112, "name" : "Black Barracuda" },
    { "id" : 133568, "name" : "Koi-Scented Stormray" },
    { "id" : 124110, "name" : "Stormray" },
    { "id" : 133569, "name" : "Drogbar Style Salmon" },
    { "id" : 124109, "name" : "Highmountain Salmon" },
    { "id" : 133680, "name" : "Slice of Bacon" }
];

const heartyFeastItems = [
    { "id" : 133578, "name" : "Hearty Feast" },
    { "id" : 133557, "name" : "Salt and Pepper Shank" },
    { "id" : 124117, "name" : "Lean Shank" },
    { "id" : 133561, "name" : "Deep-Fried Mossgill" },
    { "id" : 124108, "name" : "Mossgill Perch" },
    { "id" : 133562, "name" : "Pickled Stormray" },
    { "id" : 133563, "name" : "Faronaar Fizz" },
    { "id" : 124121, "name" : "Wildfowl Egg" },
    { "id" : 133564, "name" : "Spiced Rib Roast" },
    { "id" : 124119, "name" : "Big Gamy Ribs" },
    { "id" : 133680, "name" : "Slice of Bacon" }
];

module.exports = router;
