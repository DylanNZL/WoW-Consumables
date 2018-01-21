const database = require("./database.js");

const Queue = require("better-queue");

const queueOptions = {
    batchSize : 1,
    concurrent : 5
};

let q = new Queue((auction, cb) => {
        database.insertOrUpdateAuction(auction);
        cb();
    },
    queueOptions);

exports.q = q;