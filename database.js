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

exports.insertOrUpdateAuction = insertOrUpdateAuction;
