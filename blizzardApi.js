const API_KEY = require("./api_key.js");
// const wowServer = "frostmourne"; // Change to any NA server
const wowServer = "amanthul"; // lowest pop oce realm for testing
const mAuction = require("./models/auction.js");
const bookshelf = require("./knexfile.js");

const prequest = require('prequest');


async function foodAHData() {
    let data = await callBlizzardAH();
    // TODO: save
    // console.log(data);
}
// sends a request to blizzard api for intial request for AH data for the specified server
async function callBlizzardAH() {
    return new Promise ((resolve, reject) => {
        const url = "https://us.api.battle.net/wow/auction/data/" + wowServer + "?locale=en_US&apikey="+ API_KEY.key;
        console.log("Initial URL: " + url);
        prequest(url).then(function (data) {
            if (data === undefined) {
                console.error(Date.now() + " ERROR " + data);
                resolve(0);
            } else if (data.files.length === 0) {
                console.error(Date.now() + " ERROR " + data);
                resolve(0);
            } else {
                const url2 = data.files[0].url;
                console.log("AH DATA URL: " + url2);

                // Gets the current auctions for the servers Auction House
                prequest(url2).then(function (dat) {
                    console.log("url2 returned: ");
                    if (dat === undefined) {
                        console.error(Date.now() + " ERROR returned undefined " + data);
                        resolve(0);
                    } else if (dat.auctions.length === 0) {
                        console.error(Date.now() + " ERROR no auctions data" + data);
                        resolve(0);
                    } else {
                        const length = dat.auctions.length;
                        console.log("Amount of auctions: " + length);
                        saveAHData(dat.auctions);
                        resolve (1);
                    }
                }).catch(function (err) {
                    console.error(Date.now() + " ERROR with second url: ");
                    console.error(err);
                    resolve(0);
                });
            }
        }).catch(function (err) {
            console.error(Date.now() + " ERROR with first url: ");
            console.error(err);
            resolve(0);
        });
    })
}
// {"auc":1591238360,"item":124437,"owner":"NAME","ownerRealm":"Frostmourne","bid":6650000,"buyout":7000000,"quantity":200,"timeLeft":"LONG","rand":0,"seed":0,"context":0},

function saveAHData(data) {
    console.log(Date.now() + " Parsing AH data");
    let auctions = [];
    data.forEach(function (d) {
        // console.log(d.auc);
        let obj = {
            auc: d.auc,
            item: d.item,
            owner: d.owner,
            ownerRealm: d.ownerRealm,
            bid: d.bid,
            buyout: d.buyout,
            quantity: d.quantity,
            timeLeft: d.timeLeft,
        };
        auctions.push(obj);
    });

        // bookshelf.knex.batchInsert("auctions", auctions)
        //     .then(function () {
        //         console.log(message + ' ' + (new Date() - timestamp) + 'ms');
        //     })
        //     .catch(function (err) {
        //         console.error(Date.now() + " ERROR SAVING TO DB");
        //         console.error(err);
        //     });
}

const itemIds = [
    133579,
    133565,
    124119,
    124120,
    133566,
    124117,
    124111,
    133567,
    124112,
    133568,
    124110,
    133569,
    124109,
    133592,
    133680,
    133578,
    133557,
    133561,
    124108,
    133562,
    133563,
    124121,
    133564,
];

const itemsArray = [
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
    { "id" : 133592, "name" : "Stonedark Snail" },
    { "id" : 133680, "name" : "Slice of Bacon" },
    { "id" : 133578, "name" : "Hearty Feast" },
    { "id" : 133557, "name" : "Salt and Pepper Shank" },
    { "id" : 133561, "name" : "Deep-Fried Mossgill" },
    { "id" : 124108, "name" : "Mossgill Perch" },
    { "id" : 133562, "name" : "Pickled Stormray" },
    { "id" : 133563, "name" : "Faronaar Fizz" },
    { "id" : 124121, "name" : "Wildfowl Egg" },
    { "id" : 133564, "name" : "Spiced Rib Roast" }
];

function loadItemsDB() {

}

exports.foodAHData = foodAHData;
