/**
 * This page does all the work with the blizzard API
 * It sends a request to get the url of the current Auction House (AH) data and the gets the file from the provided url
 * This can take a long time because there is a lot of auctions (Frostmourne has roughly 90k)
 *
 * TODO:
 *      Refresh the auction house data every so often (~12 hours):
 *      Need to remove auctions that weren't updated in the update (timeLeft: short for longer than short is equal to)
 */


const API_KEY = require("./api_key.js");
const wowServer = "frostmourne"; // Change to any NA server
// const wowServer = "amanthul"; // lowest pop oce realm for testing
const queue = require("./queue.js");
const database = require("./database.js");

const prequest = require('prequest');

async function getAHData() {
    let data = await callBlizzardAH();
}
// sends a request to blizzard api for intial request for AH data for the specified server
async function callBlizzardAH() {
    return new Promise ((resolve, reject) => {
        const url = "https://us.api.battle.net/wow/auction/data/" + wowServer + "?locale=en_US&apikey="+ API_KEY.key;
        console.log(Date.now() + " Initial URL: " + url);
        prequest(url).then(function (data) {
            if (data === undefined) {
                console.error(Date.now() + " ERROR " + data);
                resolve(0);
            } else if (data.files.length === 0) {
                console.error(Date.now() + " ERROR " + data);
                resolve(0);
            } else {
                const url2 = data.files[0].url;
                console.log(Date.now() + " AH DATA URL: " + url2);

                // Gets the current auctions for the servers Auction House
                prequest(url2).then(function (dat) {
                    console.log(Date.now() + " url2 returned: ");
                    if (dat === undefined) {
                        console.error(Date.now() + " ERROR returned undefined " + data);
                        resolve(0);
                    } else if (dat.auctions.length === 0) {
                        console.error(Date.now() + " ERROR no auctions data" + data);
                        resolve(0);
                    } else {
                        const length = dat.auctions.length;
                        console.log(Date.now() + " Amount of auctions: " + length);
                        saveAHData(dat.auctions, length);
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

async function saveAHData(data, length) {
    let history = await database.newApiCall(length);
    console.log("downloaded AH data, saving as history " + history);
    data.forEach(function (d) {
        // console.log(d.auc);
        let obj = {
            history: history,
            auc: d.auc,
            item: d.item,
            owner: d.owner,
            ownerRealm: d.ownerRealm,
            bid: d.bid,
            buyout: d.buyout,
            quantity: d.quantity,
            timeLeft: d.timeLeft,
        };
        queue.q.push(obj);
    });
}

exports.getAHData = getAHData;
