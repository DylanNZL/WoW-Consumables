const bookshelf = require("./bookshelf.js");
const mAuction = require('./models/auction.js');
const mHistory = require('./models/history.js');

function insertOrUpdateAuction(auction) {
    if (auction !== undefined) {
        mAuction.forge(auction).save().then(function(results) {
            console.log(Date.now() + " Inserted auction " + results.auc);
        }).catch(function (err) {
            console.error(Date.now() + " Error saving auction: " + auction.auc);
            console.error(err);
        });
    }
}

// Adds a new database entry that will be used to pick out the latest auction house data
async function newApiCall(length) {
    return new Promise((resolve, reject) => {
        mHistory.forge({ 'auctions' : length }).save().then(function (results) {
            console.log(results);
            resolve(results.attributes.id);
        }).catch(function(err) {
            console.error(Date.now() + " Error adding new history row ");
            console.error(err);
            resolve(-1);
        })
    })

}

// Gets the highest history id to get the ah data out
async function latestHistory() {
    const query = "SELECT id FROM ah_history ORDER BY id DESC LIMIT 1";
    // console.log(query);
    return new Promise((resolve, reject) => {
        bookshelf.knex.raw(query).then(function (data) {
            resolve(data.rows[0].id);
        }).catch(function (err) {
            console.error(Date.now() + " latestHistory " + err);
            resolve(0);
        })
    })
}

// Gets the highest history id to get the last time the ah data was updated
async function dbUpdated() {
    const query = "SELECT created_at FROM ah_history ORDER BY id DESC LIMIT 1";
    // console.log(query);
    return new Promise((resolve, reject) => {
        bookshelf.knex.raw(query).then(function (data) {
            // console.log(data);
            resolve(data.rows[0].created_at);
        }).catch(function (err) {
            console.error(Date.now() + " dbUpdated " + err);
            resolve(0);
        })
    })
}

async function retrieveItem(itemID, excludeQuantity, historyID) {
    const query = "SELECT buyout, quantity, item FROM auctions WHERE item = " + itemID + " AND quantity > " + excludeQuantity + " AND history = " + historyID;
    // console.log(query);
    return new Promise ((resolve, reject) => {
        bookshelf.knex.raw(query).then(function (data) {
            // console.log(data.rows);
            resolve(data.rows);
        }).catch(function (err) {
            console.error(Date.now() + " retrieveItem " + err);
            resolve(0);
        })
    })
}

// returns the min, max, average and total number of auctions for a specific item
async function retrieveItemAHStats(itemID, excludeQuantity, historyID) {
    const query = "Select MIN(buyout / quantity) AS min, MAX(buyout / quantity) as max, (SUM(buyout) / SUM(quantity)) as average, SUM(quantity), item " +
        "from auctions where item = " + itemID + " AND quantity > " + excludeQuantity + " AND history = " + historyID + " GROUP BY item";
    // console.log(query);
    return new Promise ((resolve, reject) => {
        bookshelf.knex.raw(query).then(function (data) {
            // console.log(data.rows);
            resolve(data.rows);
        }).catch(function (err) {
            console.error(Date.now() + " retrieveItemAHStats " + err);
            resolve(0);
        })
    })
}

exports.insertOrUpdateAuction = insertOrUpdateAuction;
exports.newApiCall = newApiCall;
exports.latestHistory = latestHistory;
exports.dbUpdated = dbUpdated;
exports.retrieveItem = retrieveItem;
exports.retrieveItemAHStats = retrieveItemAHStats;
