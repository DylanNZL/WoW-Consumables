Vue.component('recipe-rank', {
    template: "#rrank-template",
    props: ["data"],
    methods: {
        rankChanged: function() {
            eventHub.$emit('rankChanged');
        }
    }
});

let eventHub = new Vue();

new Vue({
    el: '#app',
    data: {
        suramar : {
            recipeRank: {
                feast: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Lavish Suramar Feast"
                },
                ribs: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Leybeque Ribs"
                },
                surfTurf: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Suramar Surf and Turf"
                },
                barracuda:{
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Barracuda Mrglgagh"
                },
                stormray:{
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Koi-Scented Stormray"
                },
                salmon: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Drogbar Style Salmon"
                },
            },
            items: 0,
            costs: {
                buyFeast: 0,
                buyFood: 0,
                buyIngredients: 0
            }
        },
        hearty : {
            recipeRank: {
                feast: 3,
                shank: 3,
                mossgill: 3,
                fizz: 3,
                ribs: 3
            },
            items: 0,
            costs: {
                buyFeast: 0,
                buyFood: 0,
                buyIngredients: 0
            }
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
                vthis.suramar.costs.buyFeast = vthis.suramar.items[0].averageBuyout;
                vthis.suramarBuyFood();
                vthis.suramarBuyIngredients();
                console.log(data);
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
            if (this.suramar.items === undefined || this.suramar.recipeRank === undefined || this.suramar.items[0].averageBuyout === undefined) return 0.0;
            const amount = 6 - this.suramar.recipeRank.feast.selected; // Rank 1 = 5 of each required, rank 2 = 4 required, rank 3 = 3 required
            let cost = 0.0;

            // Ribs
            if (this.suramar.items[1].averageBuyout !== undefined) {
                cost += this.suramar.items[1].averageBuyout * amount;
            }
            // Surf and Turf
            if (this.suramar.items[4].averageBuyout !== undefined) {
                cost += this.suramar.items[4].averageBuyout * amount;
            }
            // Barracuda
            if (this.suramar.items[7].averageBuyout !== undefined) {
                cost += this.suramar.items[7].averageBuyout * amount;
            }
            // Stormray
            if (this.suramar.items[9].averageBuyout !== undefined) {
                cost += this.suramar.items[9].averageBuyout * amount;
            }
            // Salmon
            if (this.suramar.items[11].averageBuyout !== undefined) {
                cost += this.suramar.items[11].averageBuyout * amount;
            }

            console.log("BuyFood costs: " + cost);

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
            if (this.suramar.items === undefined || this.suramar.recipeRank === undefined || this.suramar.items[0].averageBuyout === undefined) return 0.0;
            const amount = 6 - this.suramar.recipeRank.feast.selected; // Rank 1 = 5 of each required, rank 2 = 4 required, rank 3 = 3 required
            let cost = 0.0;

            // Ribs
            // items[2] = big gamy ribs, items[3] = leyblood
            let subCost = 0.0;
            if (this.suramar.items[2].averageBuyout !== undefined && this.suramar.items[3].averageBuyout !== undefined) {
                if (this.suramar.recipeRank.ribs.selected === 1) {
                    subCost += this.suramar.items[2].averageBuyout;
                    subCost += this.suramar.items[3].averageBuyout;
                } else if (this.suramar.recipeRank.ribs.selected === 2) {
                    subCost += (this.suramar.items[2].averageBuyout * 5) / 7;
                    subCost += (this.suramar.items[3].averageBuyout * 5) / 7;
                } else { // rank 3
                    subCost += this.suramar.items[2].averageBuyout * 0.5;
                    subCost += this.suramar.items[3].averageBuyout * 0.5;
                }
                cost += subCost * amount;
            }
            console.log("Cost after ribs " + cost);
            // Surf and Turf
            // items[6] = runescale koi, items[5] = lean shank
            subCost = 0.0;
            if (this.suramar.items[6].averageBuyout !== undefined && this.suramar.items[5].averageBuyout !== undefined) {
                if (this.suramar.recipeRank.surfTurf.selected === 1) {
                    subCost += this.suramar.items[6].averageBuyout;
                    subCost += this.suramar.items[5].averageBuyout;
                } else if (this.suramar.recipeRank.surfTurf.selected === 2) {
                    subCost += (this.suramar.items[6].averageBuyout * 5) / 7;
                    subCost += (this.suramar.items[5].averageBuyout * 5) / 7;
                } else { // rank 3
                    subCost += this.suramar.items[6].averageBuyout * 0.5;
                    subCost += this.suramar.items[5].averageBuyout * 0.5;
                }
                cost += subCost * amount;
            }
            console.log("Cost after surf " + cost);
            // Barracuda
            // items[3] = leyblood, items[8] = black barracuda
            subCost = 0.0;
            if (this.suramar.items[8].averageBuyout !== undefined && this.suramar.items[3].averageBuyout !== undefined) {
                console.log(this.suramar.items[3].averageBuyout + " , " + this.suramar.items[8].averageBuyout);
                if (this.suramar.recipeRank.barracuda.selected === 1) {
                    subCost += this.suramar.items[3].averageBuyout;
                    subCost += this.suramar.items[8].averageBuyout;
                } else if (this.suramar.recipeRank.barracuda.selected === 2) {
                    subCost += (this.suramar.items[3].averageBuyout * 5) / 7;
                    subCost += (this.suramar.items[8].averageBuyout * 5) / 7;
                } else { // rank 3
                    subCost += this.suramar.items[3].averageBuyout * 0.5;
                    subCost += this.suramar.items[8].averageBuyout * 0.5;
                }
                cost += subCost * amount;
            }
            console.log("Cost after barracuda " + cost);
            // Stormray
            // items[6] = runescale koi, items[10] = stormray
            subCost = 0.0;
            if (this.suramar.items[6].averageBuyout !== undefined && this.suramar.items[10].averageBuyout !== undefined) {
                if (this.suramar.recipeRank.stormray.selected === 1) {
                    subCost += this.suramar.items[6].averageBuyout;
                    subCost += this.suramar.items[10].averageBuyout;
                } else if (this.suramar.recipeRank.stormray.selected === 2) {
                    subCost += (this.suramar.items[6].averageBuyout * 5) / 7;
                    subCost += (this.suramar.items[10].averageBuyout * 5) / 7;
                } else { // rank 3
                    subCost += this.suramar.items[6].averageBuyout * 0.5;
                    subCost += this.suramar.items[10].averageBuyout * 0.5;
                }
                cost += subCost * amount;
            }
            console.log("Cost after stormray " + cost);
            // Salmon
            // items[6] = highmountain salmon
            subCost = 0.0;
            if (this.suramar.items[12].averageBuyout !== undefined) {
                if (this.suramar.recipeRank.salmon.selected === 1) {
                    subCost = this.suramar.items[12].averageBuyout;
                } else if (this.suramar.recipeRank.salmon.selected === 2) {
                    subCost = (this.suramar.items[12].averageBuyout * 5) / 7;
                } else { // rank 3
                    subCost = this.suramar.items[12].averageBuyout * 0.5;
                }
                cost += subCost * amount;
            }

            console.log("BuyIngredients Cost: " + cost);

            this.suramar.costs.buyIngredients = cost;
        },
        rankChange: function() {
            this.suramarBuyIngredients();
            this.suramarBuyFood();
            this.suramar.costs.buyFeast = this.suramar.items[0].averageBuyout;

        }

    },
    created: function() {
        eventHub.$on('rankChanged', this.rankChange);
    },
    beforeDestroy: function() {
        eventHub.$off('rankChanged');
    },
    mounted: function() {
        this.loadSuramarPrices();
        this.loadHeartyPrices();
        console.log(this.suramar);
    }
});

function averageBuyout(auctions) {
    if (auctions.length === 0) return undefined;
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

