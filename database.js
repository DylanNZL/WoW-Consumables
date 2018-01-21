const bookshelf = require("./bookshelf.js");
const mAuction = require('./models/auction.js');

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

async function retrieveItem(itemID) {
    const query = "SELECT * FROM auctions WHERE item =" + itemID;
    return new Promise ((resolve, reject) => {
        bookshelf.knex.raw(query).then(function (data) {
            //console.log(data.rows);
            resolve(data.rows);
        }).catch(function (err) {
            console.error("getOutfitLeaderboardDefenses " + err);
            resolve(0);
        })
    })
}

exports.insertOrUpdateAuction = insertOrUpdateAuction;
exports.retrieveItem = retrieveItem;
