let express = require('express');
let router = express.Router();
const path = require('path');

const database = require("../database.js");

router.get('/', async (req, res, next) => {
    const url = req.baseUrl;
    switch (url) {
        case "/api/item":
            await retrieveItem(req,res,next);
            break;
        case "/api/dbUpdated":
            await dbUpdated(req,res,next);
            break;
        case "/api/lavishSuramarFeast": // Does a bunch of queries to reduce client <-> server communication overhead
            await lavishSuramarFeast(req,res,next);
            break;
        case "/api/heartyFeast": // Does a bunch of queries to reduce client <-> server communication overhead
            await heartyFeast(req,res,next);
            break;
        case "/api/alchemy": // Does a bunch of queries to reduce client <-> server communication overhead
            await alchemy(req,res,next);
            break;
        case "/api/food": // Does a bunch of queries to reduce client <-> server communication overhead
            await food(req,res,next);
            break;
        case "/api/allReagents": // Does a bunch of queries to reduce client <-> server communication overhead
            await allReagents(req,res,next);
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

const lavishSuramarFeastItems = [
    { "id" : 133579, "name" : "Lavish Suramar Feast" },
    { "id" : 133565, "name" : "Leybeque Ribs" },
    { "id" : 124119, "name" : "Big Gamy Ribs" },
    { "id" : 124120, "name" : "Leyblood" },
    { "id" : 133566, "name" : "Suramar Surf and Turf" },
    { "id" : 124117, "name" : "Lean Shank" },
    { "id" : 124111, "name" : "Runescale Koi" },
    { "id" : 133567, "name" : "Barracuda Mrglgagh" },
    { "id" : 124112, "name" : "Black Barracuda" },
    { "id" : 133568, "name" : "Koi-Scented Stormray" },
    { "id" : 124110, "name" : "Stormray" },
    { "id" : 133569, "name" : "Drogbar Style Salmon" },
    { "id" : 124109, "name" : "Highmountain Salmon" },
    { "id" : 133680, "name" : "Slice of Bacon" }
];

async function lavishSuramarFeast(req, res, next) {
    let result = {
        timestamp: Date.now(),
        success: true,
        items: lavishSuramarFeastItems
    };
    let historyID = await database.latestHistory();
    let promises = [];

    result.items.forEach(function(item) {
        promises.push(result.items.auctions = database.retrieveItem(item.id, 5, historyID));
    });

    let data = await Promise.all(promises);

    let i = 0;
    data.forEach(function (dat) {
        result.items[i].auctions = dat;
        i++;
    });

    res.status(200).jsonp(result);
}

const heartyFeastItems = [
    { "id" : 133578, "name" : "Hearty Feast" },
    { "id" : 133557, "name" : "Salt and Pepper Shank" },
    { "id" : 124117, "name" : "Lean Shank" },
    { "id" : 133561, "name" : "Deep-Fried Mossgill" },
    { "id" : 124108, "name" : "Mossgill Perch" },
    { "id" : 133562, "name" : "Pickled Stormray" },
    { "id" : 124110, "name" : "Stormray" },
    { "id" : 133563, "name" : "Faronaar Fizz" },
    { "id" : 124121, "name" : "Wildfowl Egg" },
    { "id" : 133564, "name" : "Spiced Rib Roast" },
    { "id" : 124119, "name" : "Big Gamy Ribs" },
    { "id" : 133680, "name" : "Slice of Bacon" }
];

async function heartyFeast(req, res, next) {
    let result = {
        timestamp: Date.now(),
        success: true,
        items: heartyFeastItems
    };
    let historyID = await database.latestHistory();
    let promises = [];

    result.items.forEach(function(item) {
        promises.push(result.items.auctions = database.retrieveItem(item.id, 5, historyID));
    });

    let data = await Promise.all(promises);

    let i = 0;
    data.forEach(function (dat) {
        result.items[i].auctions = dat;
        i++;
    });

    res.status(200).jsonp(result);
}

const alchemyItems = [
    // Flasks/Potions
    { "id" : 127851, "name" : "Spirit Cauldron" }, // 5 of each flask
    { "id" : 127847, "name" : "Flask of the Whispered Pact" }, // Fjarnskaggl, Dreamleaf
    { "id" : 127848, "name" : "Flask of the Seventh Demon" }, // Fjarnskaggl, Foxflower
    { "id" : 127849, "name" : "Flask of the Countless Armies" }, // Aethril, Foxflower
    { "id" : 127850, "name" : "Flask of Ten Thousand Scars" }, // Aethril, Dreamleaf
    { "id" : 127846, "name" : "Leytorrent Potion" }, // Aethril, Dreamleaf
    { "id" : 127835, "name" : "Ancient Mana Potion" },
    // Reagents
    { "id" : 124105, "name" : "Starlight Rose" },
    { "id" : 124101, "name" : "Aethril" },
    { "id" : 124102, "name" : "Dreamleaf" },
    { "id" : 124103, "name" : "FoxFlower" },
    { "id" : 124104, "name" : "Fjarnskaggl" },
    { "id" : 128304, "name" : "Yseralline Seed" }
];

async function alchemy(req,res,next) {
    let result = {
        timestamp: Date.now(),
        success: true,
        items: alchemyItems
    };
    let historyID = await database.latestHistory();
    let promises = [];

    result.items.forEach(function(item) {
        promises.push(result.items.auctions = database.retrieveItem(item.id, 5, historyID));
    });

    let data = await Promise.all(promises);

    let i = 0;
    data.forEach(function (dat) {
        result.items[i].auctions = dat;
        i++;
    });

    res.status(200).jsonp(result);
}

const foodItems = [
    // Crit
    { "id" : 133557, "name" : "Salt and Pepper Shank" }, // 225
    { "id" : 133565, "name" : "Leybeque Ribs" }, // 300
    { "id" : 133565, "name" : "The Hungry Magister" }, // 375
    // Haste
    { "id" : 133561, "name" : "Deep-Fried Mossgill" }, // 225
    { "id" : 133566, "name" : "Suramar Surf and Turf" }, // 300
    { "id" : 133571, "name" : "Azshari Salad" }, // 375
    // Vers
    { "id" : 133563, "name" : "Faronaar Fizz" }, // 225
    { "id" : 133568, "name" : "Koi-Scented Stormray" }, // 300
    { "id" : 133568, "name" : "Seed-Battered Fish Plate" }, // 375
    // Mastery
    { "id" : 133562, "name" : "Pickled Stormray" }, // 225
    { "id" : 133567, "name" : "Barracude Mrglgagh" }, // 300
    { "id" : 133567, "name" : "Nightborne Delicacy Platter" }, // 375

    // Reagents
    { "id" : 124101, "name" : "Aethril" },
    { "id" : 124102, "name" : "Dreamleaf" },
    { "id" : 124103, "name" : "FoxFlower" },
    { "id" : 124104, "name" : "Fjarnskaggl" },
    { "id" : 124105, "name" : "Starlight Rose" },
    { "id" : 124107, "name" : "Cursed Queenfish" },
    { "id" : 124108, "name" : "Mossgill Perch" },
    { "id" : 124109, "name" : "Highmountain Salmon" },
    { "id" : 124110, "name" : "Stormray" },
    { "id" : 124111, "name" : "Runescale Koi" },
    { "id" : 124112, "name" : "Black Barracuda" },
    { "id" : 124117, "name" : "Lean Shank" },
    { "id" : 124118, "name" : "Fatty Bearsteak" },
    { "id" : 124119, "name" : "Big Gamy Ribs" },
    { "id" : 124120, "name" : "Leyblood" },
    { "id" : 124121, "name" : "Wildfowl Egg" },
    { "id" : 128304, "name" : "Yseralline Seed" },
    { "id" : 129100, "name" : "Gem Chips" },
    { "id" : 133607, "name" : "Silver Mackaeral" }
];

async function food(req,res,next) {
    let result = {
        timestamp: Date.now(),
        success: true,
        items: foodItems
    };
    let historyID = await database.latestHistory();
    let promises = [];

    result.items.forEach(function(item) {
        promises.push(result.items.auctions = database.retrieveItem(item.id, 5, historyID));
    });

    let data = await Promise.all(promises);

    let i = 0;
    data.forEach(function (dat) {
        result.items[i].auctions = dat;
        i++;
    });

    res.status(200).jsonp(result);
}

const reagents = {
    124101 : { "id" : 124101, "name" : "Aethril" },
    124102: { "id" : 124102, "name" : "Dreamleaf" },
    124103: { "id" : 124103, "name" : "FoxFlower" },
    124104: { "id" : 124104, "name" : "Fjarnskaggl" },
    124105: { "id" : 124105, "name" : "Starlight Rose" },
    124107: { "id" : 124107, "name" : "Cursed Queenfish" },
    124108: { "id" : 124108, "name" : "Mossgill Perch" },
    124109: { "id" : 124109, "name" : "Highmountain Salmon" },
    124110: { "id" : 124110, "name" : "Stormray" },
    124111: { "id" : 124111, "name" : "Runescale Koi" },
    124112: { "id" : 124112, "name" : "Black Barracuda" },
    124117: { "id" : 124117, "name" : "Lean Shank" },
    124118: { "id" : 124118, "name" : "Fatty Bearsteak" },
    124119: { "id" : 124119, "name" : "Big Gamy Ribs" },
    124120: { "id" : 124120, "name" : "Leyblood" },
    124121: { "id" : 124121, "name" : "Wildfowl Egg" },
    128304: { "id" : 128304, "name" : "Yseralline Seed" },
    129100: { "id" : 129100, "name" : "Gem Chips" },
    133607: { "id" : 133607, "name" : "Silver Mackaeral" },
    133680: { "id" : 133680, "name" : "Slice of Bacon" }
};
async function allReagents(req,res,next) {
    let result = {
        timestamp: Date.now(),
        success: true,
        items: reagents
    };
    let historyID = await database.latestHistory();
    let promises = [];

    for (let property in result.items) {

        promises.push(result.items[property].auctions = database.retrieveItem(result.items[property].id, 5, historyID))
    }

    let data = await Promise.all(promises);

    data.forEach(function (dat) {
        // console.log(dat);
        if (dat !== undefined && dat.length !== 0) {
            result.items[dat[0].item].auctions = dat
            //     result.items[i].auctions = dat;
        }
    });
    console.log(result);
    res.status(200).jsonp(result);
}

module.exports = router;
