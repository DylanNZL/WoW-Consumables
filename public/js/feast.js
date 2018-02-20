let eventHub = new Vue();

new Vue({
    el: '#app',
    data: {
        suramar : {
            ranks: {
                feast: 3,
                ribs: 3,
                surfTurf: 3,
                barracuda: 3,
                stormray: 3,
                salmon: 3
            },
            items: 0,
            costs: {
                buyFeast: 0,
                buyFood: 0,
                buyIngredients: 0
            }
        },
        hearty : {
            ranks: {
                feast: 3,
                shank: 3,
                mossgill: 3,
                fizz: 3,
                ribs: 3
            },
            items: 0
        }
    },
    methods: {
        loadSuramarPrices: function () {
            let url = "/api/lavishSuramarFeast";
            let vthis = this;
            $.ajax({
                dataType: "jsonp",
                url: url
            }).done(function (data) {
                // console.log(data);
                vthis.suramar.items = data.items;
                vthis.suramar.items.forEach(function(item) {
                    item.averageBuyout = averageBuyout(item.auctions);
                });
                vthis.suramar.costs.buyFeast = vthis.suramar.items[0].buyout;
                vthis.suramarBuyFood();
                vthis.suramarBuyIngredients();
            })
        },
        loadHeartyPrices: function () {
            let url = '/api/heartyFeast';
            let vthis = this;
            $.ajax({
                dataType: "jsonp",
                url: url
            }).done(function (data) {
                // console.log(data);
                vthis.hearty.items = data.items;
                vthis.hearty.items.forEach(function(item) {
                    item.averageBuyout = averageBuyout(item.auctions);
                })
            })
        },
        getSuramarFeastData: function() {
          this.loadSuramarPrices();
        },
        getHeartyFeastData: function() {
            this.loadHeartyPrices();
        },
        // Works out the cost of buying the premade food to combine in to a feast
        suramarBuyFood: function() {
            if (this.suramar.items === undefined || this.suramar.ranks === undefined) return 0.0;
            const amount = 6 - this.suramar.ranks.feast; // Rank 1 = 5 of each required, rank 2 = 4 required, rank 3 = 3 required
            let cost = 0.0;

            // Ribs
            cost += this.suramar.items[1].averageBuyout * amount;
            // Surf and Turf
            cost += this.suramar.items[4].averageBuyout * amount;
            // Barracuda
            cost += this.suramar.items[7].averageBuyout * amount;
            // Stormray
            cost += this.suramar.items[9].averageBuyout * amount;
            // Salmon
            cost += this.suramar.items[11].averageBuyout * amount;
            console.log(cost);

            this.suramar.costs.buyFood = cost;
        },
        /**
         * Works out the cost of buying the ingredients to make the food that makes up a feast
         *
         * Food ranks
         *  1 = 5 of main ingredients make 5 of the food item
         *  2 = 5 of main ingredients make 7 of the food item
         *  3 = 5 of main ingredients make 10 of the food item
         */
        suramarBuyIngredients: function() {
            if (this.suramar.items === undefined || this.suramar.ranks === undefined) return 0.0;
            const amount = 6 - this.suramar.ranks.feast; // Rank 1 = 5 of each required, rank 2 = 4 required, rank 3 = 3 required
            let cost = 0.0;
            let subCost = 0.0;

            // Ribs
            // items[2] = big gamy ribs, items[3] = leyblood
            subCost = 0.0;
            if (this.suramar.ranks.ribs === 1) {
                subCost += this.suramar.items[2].averageBuyout;
                subCost += this.suramar.items[3].averageBuyout;
            } else if (this.suramar.ranks.ribs === 1) {
                subCost += (this.suramar.items[2].averageBuyout * 5) / 7;
                subCost += (this.suramar.items[3].averageBuyout * 5) / 7;
            } else { // rank 3
                subCost += this.suramar.items[2].averageBuyout * 0.5;
                subCost += this.suramar.items[3].averageBuyout * 0.5;
            }
            cost += subCost * amount;

            // Surf and Turf
            // items[6] = runescale koi, items[5] = lean shank
            subCost = 0.0;
            if (this.suramar.ranks.surfTurf === 1) {
                subCost += this.suramar.items[6].averageBuyout;
                subCost += this.suramar.items[5].averageBuyout;
            } else if (this.suramar.ranks.surfTurf === 1) {
                subCost += (this.suramar.items[6].averageBuyout * 5) / 7;
                subCost += (this.suramar.items[5].averageBuyout * 5) / 7;
            } else { // rank 3
                subCost += this.suramar.items[6].averageBuyout * 0.5;
                subCost += this.suramar.items[5].averageBuyout * 0.5;
            }
            cost += subCost * amount;

            // Barracuda
            // items[3] = leyblood, items[8] = black barracuda
            subCost = 0.0;
            if (this.suramar.ranks.surfTurf === 1) {
                subCost += this.suramar.items[3].averageBuyout;
                subCost += this.suramar.items[8].averageBuyout;
            } else if (this.suramar.ranks.surfTurf === 1) {
                subCost += (this.suramar.items[3].averageBuyout * 5) / 7;
                subCost += (this.suramar.items[8].averageBuyout * 5) / 7;
            } else { // rank 3
                subCost += this.suramar.items[3].averageBuyout * 0.5;
                subCost += this.suramar.items[8].averageBuyout * 0.5;
            }
            cost += subCost * amount;

            // Stormray
            // items[6] = runescale koi, items[10] = stormray
            subCost = 0.0;
            if (this.suramar.ranks.surfTurf === 1) {
                subCost += this.suramar.items[6].averageBuyout;
                subCost += this.suramar.items[10].averageBuyout;
            } else if (this.suramar.ranks.surfTurf === 1) {
                subCost += (this.suramar.items[6].averageBuyout * 5) / 7;
                subCost += (this.suramar.items[10].averageBuyout * 5) / 7;
            } else { // rank 3
                subCost += this.suramar.items[6].averageBuyout * 0.5;
                subCost += this.suramar.items[10].averageBuyout * 0.5;
            }
            cost += subCost * amount;

            // Salmon
            // items[6] = highmountain salmon
            subCost = 0.0;
            if (this.suramar.ranks.surfTurf === 1) {
                subCost += this.suramar.items[12].averageBuyout;
            } else if (this.suramar.ranks.surfTurf === 1) {
                subCost += (this.suramar.items[12].averageBuyout * 5) / 7;
            } else { // rank 3
                subCost += this.suramar.items[12].averageBuyout * 0.5;
            }
            cost += subCost * amount;

            this.suramar.costs.buyIngredients = cost;
        },
        sFeastRank: function(rank) {
            console.log(rank);
            this.suramar.ranks.feast = rank;
            this.suramarBuyFood();
        },
        sRibsRank: function(rank) {
            console.log(rank);
            this.suramar.ranks.ribs = rank;
            this.suramarBuyIngredients();
        },
        sSurfTurfRank: function(rank) {
            console.log(rank);
            this.suramar.ranks.surfTurf = rank;
            this.suramarBuyIngredients();
        },
        sBarracudaRank: function(rank) {
            console.log(rank);
            this.suramar.ranks.barracuda = rank;
            this.suramarBuyIngredients();
        },
        sStormrayRank: function(rank) {
            console.log(rank);
            this.suramar.ranks.stormray = rank;
            this.suramarBuyIngredients();
        },
        sSalmonRank: function(rank) {
            console.log(rank);
            this.suramar.ranks.salmon = rank;
            this.suramarBuyIngredients();
        }

    },
    created: function() {
    },
    beforeDestroy: function() {
    },
    mounted: function() {
        this.loadSuramarPrices();
        this.loadHeartyPrices();
        console.log(this.suramar);
    }
});

function averageBuyout(auctions) {
    let count = 0;
    let average = 0.0;

    auctions.forEach(function (auction) {
        count += auction.quantity;
        average += auction.buyout;
    });

    average = average / count;
    // divide by 10,000 to get the gold price, because blizzard store it as the copper price (100 copper = 1 silver, 100 silver = 1 gold)
    return average / 10000;
}

