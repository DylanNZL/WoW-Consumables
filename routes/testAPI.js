/**
 * This router mimics some of the actual API functionality but doesn't interact with the database (for testing on windows mainly)
 * The items only contain one auction to make things easy to work with
 */

let express = require('express');
let router = express.Router();


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
    // res.render('index', { title: 'Express' });
});

function allReagents(req, res, next) {
    res.status(200).jsonp({
        timestamp: Date.now(),
        success: true,
        items: {
            124101: {"id": 124101, "name": "Aethril", auctions: [{quantity: 15, buyout: 2950200}]},
            124102: {"id": 124102, "name": "Dreamleaf", auctions: [{quantity: 15, buyout: 2950200}]},
            124103: {"id": 124103, "name": "FoxFlower", auctions: [{quantity: 15, buyout: 2950200}]},
            124104: {"id": 124104, "name": "Fjarnskaggl", auctions: [{quantity: 15, buyout: 2950200}]},
            124105: {"id": 124105, "name": "Starlight Rose", auctions: [{quantity: 15, buyout: 2950200}]},
            124107: {"id": 124107, "name": "Cursed Queenfish", auctions: [{quantity: 15, buyout: 2950200}]},
            124108: {"id": 124108, "name": "Mossgill Perch", auctions: [{quantity: 15, buyout: 2950200}]},
            124109: {"id": 124109, "name": "Highmountain Salmon", auctions: [{quantity: 15, buyout: 2950200}]},
            124110: {"id": 124110, "name": "Stormray", auctions: [{quantity: 15, buyout: 2950200}]},
            124111: {"id": 124111, "name": "Runescale Koi", auctions: [{quantity: 15, buyout: 2950200}]},
            124112: {"id": 124112, "name": "Black Barracuda", auctions: [{quantity: 15, buyout: 2950200}]},
            124117: {"id": 124117, "name": "Lean Shank", auctions: [{quantity: 15, buyout: 2950200}]},
            124118: {"id": 124118, "name": "Fatty Bearsteak", auctions: [{quantity: 15, buyout: 2950200}]},
            124119: {"id": 124119, "name": "Big Gamy Ribs", auctions: [{quantity: 15, buyout: 2950200}]},
            124120: {"id": 124120, "name": "Leyblood", auctions: [{quantity: 15, buyout: 2950200}]},
            124121: {"id": 124121, "name": "Wildfowl Egg", auctions: [{quantity: 15, buyout: 2950200}]},
            128304: {"id": 128304, "name": "Yseralline Seed", auctions: [{quantity: 15, buyout: 2950200}]},
            129100: {"id": 129100, "name": "Gem Chips", auctions: [{quantity: 15, buyout: 2950200}]},
            133607: {"id": 133607, "name": "Silver Mackaeral", auctions: [{quantity: 15, buyout: 2950200}]},
            133680: {"id": 133680, "name": "Slice of Bacon", auctions: [{quantity: 15, buyout: 2950200}]}
        }
    });
}

function shopReagents(req, res, next) {
    res.status(200).jsonp({
        timestamp: Date.now(),
        success: true,
        items: {
            9133588 : { id : 133588, name : "Flaked Sea Salt", cost : 0.5 },
            9133589 : { id : 133589, name : "Dalapeño Pepper", cost : 0.5 },
            9133590 : { id : 133590, name : "Muskenbutter", cost : 0.5 },
            9133591 : { id : 133591, name : "River Onion", cost : 0.5 },
            9133592 : { id : 133592, name : "Stonedark Snail", cost : 0.5 },
            9133593 : { id : 133593, name : "Royal Olive", cost : 0.5 }
        }
    });
}
function allCraftables(req, res, next) {
    res.status(200).jsonp({
        timestamp: Date.now(),
        success: true,
        items: {
            // Flasks
            127851: {
                id: 127851, name: "Spirit Cauldron", category: "flask", recipe: [{id: 8127847, quantity: 5},
                    {id: 8127848, quantity: 5}, {id: 8127849, quantity: 5}, {id: 8127850, quantity: 5}],
                auctions: [{quantity: 15, buyout: 2950200}]
            },
            127847: {
                id: 127847, name: "Flask of the Whispered Pact", category: "flask", recipe: [
                    {id: 124104, quantity: 10}, {id: 124102, quantity: 10}, {id: 124105, quantity: 7}],
                auctions: [{quantity: 15, buyout: 2950200}]
            }, // Fjarnskaggl, Dreamleaf
            127848: {
                id: 127848, name: "Flask of the Seventh Demon", category: "flask", recipe: [
                    {id: 124104, quantity: 10}, {id: 124103, quantity: 10}, {id: 124105, quantity: 7}],
                auctions: [{quantity: 15, buyout: 2950200}]
            }, // Fjarnskaggl, Foxflower
            127849: {
                id: 127849, name: "Flask of the Countless Armies", category: "flask", recipe: [
                    {id: 124101, quantity: 10}, {id: 124103, quantity: 10}, {id: 124105, quantity: 7}],
                auctions: [{quantity: 15, buyout: 2950200}]
            }, // Aethril, Foxflower
            127850: {
                id: 127850, name: "Flask of Ten Thousand Scars", category: "flask", recipe: [
                    {id: 124101, quantity: 10}, {id: 124102, quantity: 10}, {id: 124105, quantity: 7}],
                auctions: [{quantity: 15, buyout: 2950200}]
            }, // Aethril, Dreamleaf
            // Potions // TODO: add more pots
            127846: {
                id: 127846, name: "Leytorrent Potion", category: "potion", recipe: [
                    {id: 124105, quantity: 1}, {id: 124101, quantity: 2}, {id: 124102, quantity: 2}],
                auctions: [{quantity: 15, buyout: 2950200}]
            }, // Aethril, Dreamleaf
            127835: {id: 127835, name: "Ancient Mana Potion", category: "potion", recipe: [{id: 128304, quantity: 5}],
                auctions: [{quantity: 15, buyout: 2950200}]},
            // Crit
            133557: {
                id: 133557,
                name: "Salt and Pepper Shank",
                category: "Critical Strike",
                stat: 225,
                recipe: [{id: 124117, quantity: 5},
                    {id: 9133588, quantity: 2}, {id: 9133589, quantity: 2}],
                auctions: [{quantity: 15, buyout: 2950200}]
            },
            133565: {
                id: 133565,
                name: "Leybeque Ribs",
                category: "Critical Strike",
                stat: 300,
                recipe: [{id: 124120, quantity: 5},
                    {id: 124119, quantity: 5}, {id: 9133589, quantity: 5}],
                auctions: [{quantity: 15, buyout: 2950200}]
            },
            133570: {
                id: 133570,
                name: "The Hungry Magister",
                category: "Critical Strike",
                stat: 375,
                recipe: [{id: 8133565, quantity: 1},
                    {id: 124109, quantity: 5}, {id: 124118, quantity: 5}, {id: 9133588, quantity: 3}, { id: 9133589, quantity: 2 }],
                auctions: [{quantity: 15, buyout: 2950200}]
            },
            // Haste
            133561: {
                id: 133561,
                name: "Deep-Fried Mossgill",
                category: "Haste",
                stat: 225,
                recipe: [{id: 124108, quantity: 5},
                    {id: 9133590, quantity: 5}],
                auctions: [{quantity: 15, buyout: 2950200}]
            },
            133566: {
                id: 133566,
                name: "Suramar Surf and Turf",
                category: "Haste",
                stat: 300,
                recipe: [{id: 124111, quantity: 5},
                    {id: 124117, quantity: 2}, {id: 9133588, quantity: 2}, {id: 9133593, quantity: 4}],
                auctions: [{quantity: 15, buyout: 2950200}]
            },
            133571: {
                id: 133571, name: "Azshari Salad", category: "Haste", stat: 375, recipe: [{id: 8133571, quantity: 1},
                    {id: 124101, quantity: 5}, {id: 124102, quantity: 5}, {id: 124103, quantity: 5}, {
                        id: 124104,
                        quantity: 5
                    }],
                auctions: [{quantity: 15, buyout: 2950200}]
            },
            // Vers
            133563: {
                id: 133563,
                name: "Faronaar Fizz",
                category: "Versatility",
                stat: 225,
                recipe: [{id: 124121, quantity: 5},
                    {id: 9133591, quantity: 2}, {id: 9133593, quantity: 3}],
                auctions: [{quantity: 15, buyout: 2950200}]
            },
            133568: {
                id: 133568,
                name: "Koi-Scented Stormray",
                category: "Versatility",
                stat: 300,
                recipe: [{id: 124111, quantity: 5},
                    {id: 124110, quantity: 5}, {id: 9133588, quantity: 2}, {id: 9133590, quantity: 2}],
                auctions: [{quantity: 15, buyout: 2950200}]
            },
            133573: {
                id: 133573,
                name: "Seed-Battered Fish Plate",
                category: "Versatility",
                stat: 375,
                recipe: [{id: 8133568, quantity: 1},
                    {id: 133607, quantity: 5}, {id: 128304, quantity: 20}, {id: 9133590, quantity: 3}, {
                        id: 9133589,
                        quantity: 2
                    }],
                auctions: [{quantity: 15, buyout: 2950200}]
            },
            // Mastery
            133562: {
                id: 133562,
                name: "Pickled Stormray",
                category: "Mastery",
                stat: 275,
                recipe: [{id: 124110, quantity: 5},
                    {id: 9133588, quantity: 3}],
                auctions: [{quantity: 15, buyout: 2950200}]
            },
            133567: {
                id: 133567,
                name: "Barracuda Mrglgagh",
                category: "Mastery",
                stat: 300,
                recipe: [{id: 124120, quantity: 5},
                    {id: 124112, quantity: 5}, {id: 9133590, quantity: 4}, {id: 9133591, quantity: 1}],
                auctions: [{quantity: 15, buyout: 2950200}]
            },
            133572: {
                id: 133572,
                name: "Nightborne Delicacy Platter",
                category: "Mastery",
                stat: 375,
                recipe: [{id: 8133567, quantity: 1},
                    {id: 129100, quantity: 20}, {id: 124105, quantity: 1}, {id: 124121, quantity: 5}, {
                        id: 9133592,
                        quantity: 10
                    }],
                auctions: [{quantity: 15, buyout: 2950200}]
            },
            // Misc food // TODO: More misc food?
            133564: {
                id: 133564, name: "Spiced Rib Roast", category: "MISC", stat: 0, recipe: [{id: 124119, quantity: 5},
                    {id: 9133589, quantity: 5}],
                auctions: [{quantity: 15, buyout: 2950200}]
            },
            133569: {
                id: 133569, name: "Drogbar Style Salmon", category: "MISC", stat: 0, recipe: [{id: 124109, quantity: 5},
                    {id: 9133592, quantity: 10}, {id: 9133589, quantity: 4}, {id: 9133593, quantity: 10}],
                auctions: [{quantity: 15, buyout: 2950200}]
            },
            // Feasts
            133578: {
                id: 133578, name: "Hearty Feast", category: "Feast", stat: 400, recipe: [{id: 8133557, quantity: 6},
                    {id: 8133561, quantity: 6}, {id: 8133563, quantity: 6}, {id: 8133562, quantity: 6}, {
                        id: 133564,
                        quantity: 6
                    },
                    {id: 133680, quantity: 6}],
                auctions: [{quantity: 15, buyout: 2950200}]
            }, // NOTE: Using 6 so you can minus the current rank to get the actual quantity
            133579: {
                id: 133579,
                name: "Lavish Suramar Feast",
                category: "Feast",
                stat: 500,
                recipe: [{id: 8133565, quantity: 6},
                    {id: 8133566, quantity: 6}, {id: 8133568, quantity: 6}, {id: 8133567, quantity: 6}, {
                        id: 8133569,
                        quantity: 6
                    },
                    {id: 133680, quantity: 6}],
                auctions: [{quantity: 15, buyout: 2950200}]
            }, // NOTE: Using 6 so you can minus the current rank to get the actual quantity
        }

    });
}

module.exports = router;