new Vue({
    el: '#app',
    data: {
        dbUpdated: "Error",
        category: "None",
        home: true,
        items: {
            allReagents: {},
            craftables: {},
            shopReagents: {}
        }
    },
    methods: {
        checkDbUpdated: function () {
            let url = "/api/dbUpdated";
            let vthis = this;
            $.ajax({
                dataType: "jsonp",
                url: url
            }).done(function (data) {
                let updated = new Date(data.dbUpdated);
                vthis.dbUpdated = updated.toLocaleString();
            });
        },
        getAllReagents: function () {
            let url = "/testAPI/allReagents";
            let vthis = this;
            $.ajax({
                dataType: "jsonp",
                url: url
            }).done(function (data) {
                // console.log(data);
                vthis.items.allReagents = data.items;
                for (let item in vthis.items.allReagents) {
                    console.log(item);
                    vthis.items.allReagents[item].buyoutData = buyoutData(vthis.items.allReagents[item].auctions);
                }
            });
        },
        getCraftables: function() {
            let url = "/testAPI/allCraftables";
            let vthis = this;
            $.ajax({
                dataType: "jsonp",
                url: url
            }).done(function (data) {
                // console.log(data);
                vthis.items.craftables = data.items;

                for (let item in vthis.items.craftables) {
                    console.log(item);
                    vthis.items.craftables[item].buyoutData = buyoutData(vthis.items.craftables[item].auctions);
                }
            });
        },
        getShopReagents: function () {
            let url = "/testAPI/shopReagents";
            let vthis = this;
            $.ajax({
                dataType: "jsonp",
                url: url
            }).done(function (data) {
                // console.log(data);
                vthis.items.shopReagents = data.items;
            });
        }
    },
    created: function() {
        this.checkDbUpdated();
        this.getAllReagents();
        this.getCraftables();
        this.getShopReagents();
    }
});

/**
 * Function that analyses all the auctions of an item and returns an object containing the min,average, max buyouts and the number of auctions
 * I only include auctions that include 20 or more items as smaller quantities will skew the price lower than what is correct for crafting large numbers
 */
function buyoutData(auctions) {
    console.log(auctions);
    if (auctions.length === 0) {
        return {
            average : undefined,
            min : undefined,
            max : undefined,
            count: undefined
        }
    }
    let count = 0;
    let trueCount = 0;
    let average = 0.0;
    let min = Number.MAX_SAFE_INTEGER; // Set high so any price will be lower
    let max = 0.0;

    auctions.forEach(function (auction) {
        if (auction.quantity > 19) {
            count += auction.quantity;
            average += auction.buyout;
            let buyout = auction.buyout / auction.quantity;
            if (min > buyout) { min = buyout; }
            if (max < buyout) { max = buyout; }
        }
        trueCount += auction.quantity;
    });

    if (count === 0) {
        return {
            average: undefined,
            min: undefined,
            max: undefined,
            count: undefined
        }
    }

    // Max, Min and average are divided by 10,000 to get the gold price, because blizzard store it as the copper price
    // (100 copper = 1 silver, 100 silver = 1 gold)
    average = (average / count) / 10000;
    min = min / 10000;
    max = max / 10000;
    return {
        average : average.toFixed(2),
        min : min.toFixed(2),
        max : max.toFixed(2),
        count: trueCount
    }
}