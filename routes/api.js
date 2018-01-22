let express = require('express');
let router = express.Router();

const database = require("../database.js");

router.get('/', async (req, res, next) => {
    const url = req.baseUrl;
    switch (url) {
        case "/api/item":
            await retrieveItem(req,res,next);
            break;
        default:
            res.render()
    }
    res.render('index', { title: 'Express' });
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

module.exports = router;
