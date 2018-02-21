Vue.component('recipe-rank', {
    template: "#rrank-template",
    props: ["data"],
    methods: {
        rankChanged: function() {
            eventHub.$emit('rankChanged');
        }
    }
});

Vue.component('costs', {
    template: "#costs-template",
    props: ["data"],
    methods: {
        // Gives the cheapest of the 3 options
        cheapest: function(buyFeast, buyFood, buyIngredients) {
            let min = buyIngredients;
            if (buyFood < min) min = buyFood;
            if (buyFeast < min) min = buyFeast;

            return min
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
            items: [],
            costs: {
                buyFeast: 0,
                buyFood: 0,
                buyIngredients: 0,
                buyFeastItem: {},
                buyFoodItems: [],
                buyIngredientsItems: [],
                show: {
                    buyFeast: false,
                    buyFood: false,
                    buyIngredients: false
                }
            }
        },
        hearty : {
            recipeRank: {
                feast: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Hearty Feast"
                },
                shank: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Salt & Pepper Shank"
                },
                mossgill: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Deep-Fried Mossgill"
                },
                stormray: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Pickled Stormray"
                },
                fizz: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Faronaar Fizz"
                },
                ribs: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Spiced Rib Roast"
                }
            },
            items: [],
            costs: {
                buyFeast: 0,
                buyFood: 0,
                buyIngredients: 0,
                buyFeastItem: {},
                buyFoodItems: [],
                buyIngredientsItems: [],
                show: {
                    buyFeast: false,
                    buyFood: false,
                    buyIngredients: false
                }
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
                    item.buyoutData = buyoutData(item.auctions);
                });
                vthis.suramar.costs.buyFeast = vthis.suramar.items[0].buyoutData.average;
                vthis.suramarBuyFood();
                vthis.suramarBuyIngredients();

                vthis.suramar.costs.buyFeastItem = data.items[0];
                vthis.suramar.costs.buyFoodItems = [data.items[1], data.items[4], data.items[7], data.items[9], data.items[11], data.items[13]];
                vthis.suramar.costs.buyIngredientsItems = [data.items[2], data.items[3], data.items[5], data.items[6], data.items[8], data.items[10], data.items[12], data.items[13]];
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
                    item.buyoutData = buyoutData(item.auctions);
                });
                vthis.hearty.costs.buyFeast = vthis.hearty.items[0].buyoutData.average;
                vthis.heartyBuyFood();
                vthis.heartyBuyIngredients();
                vthis.hearty.costs.buyFeastItem = data.items[0];
                vthis.hearty.costs.buyFoodItems = [data.items[1], data.items[3], data.items[5], data.items[7], data.items[9], data.items[11]];
                vthis.hearty.costs.buyIngredientsItems = [data.items[2], data.items[4], data.items[6], data.items[8], data.items[10], data.items[11]];
            })
        },
        // Works out the cost of buying the premade food to combine in to a suramar feast
        suramarBuyFood: function() {
            if (this.suramar.items === undefined || this.suramar.recipeRank === undefined || this.suramar.items[0].buyoutData.average === undefined) return 0.0;
            const amount = 6 - this.suramar.recipeRank.feast.selected; // Rank 1 = 5 of each required, rank 2 = 4 required, rank 3 = 3 required
            let cost = 0.0;

            // Ribs
            if (this.suramar.items[1].buyoutData.average !== undefined) {
                cost += this.suramar.items[1].buyoutData.average * amount;
            }
            // Surf and Turf
            if (this.suramar.items[4].buyoutData.average !== undefined) {
                cost += this.suramar.items[4].buyoutData.average * amount;
            }
            // Barracuda
            if (this.suramar.items[7].buyoutData.average !== undefined) {
                cost += this.suramar.items[7].buyoutData.average * amount;
            }
            // Stormray
            if (this.suramar.items[9].buyoutData.average !== undefined) {
                cost += this.suramar.items[9].buyoutData.average * amount;
            }
            // Salmon
            if (this.suramar.items[11].buyoutData.average !== undefined) {
                cost += this.suramar.items[11].buyoutData.average * amount;
            }
            // Bacon
            if (this.suramar.items[13].buyoutData.average !== undefined) {
                cost += this.suramar.items[13].buyoutData.average * amount;
            }

            console.log("suramarBuyFood costs: " + cost);

            this.suramar.costs.buyFood = cost;
        },
        // Works out the cost of buying the premade food to combine in to a hearty feast
        heartyBuyFood: function() {
            if (this.hearty.items === undefined || this.hearty.recipeRank === undefined || this.hearty.items[0] === undefined) return 0.0;
            const amount = 6 - this.hearty.recipeRank.feast.selected; // Rank 1 = 5 of each required, rank 2 = 4 required, rank 3 = 3 required
            let cost = 0.0;

            // Shank
            if (this.hearty.items[1].buyoutData.average !== undefined) {
                cost += this.hearty.items[1].buyoutData.average * amount;
            }
            // Mossgill
            if (this.hearty.items[3].buyoutData.average !== undefined) {
                cost += this.hearty.items[3].buyoutData.average * amount;
            }
            // Stormray
            if (this.hearty.items[5].buyoutData.average !== undefined) {
                cost += this.hearty.items[5].buyoutData.average * amount;
            }
            // Fizz
            if (this.hearty.items[7].buyoutData.average !== undefined) {
                cost += this.hearty.items[7].buyoutData.average * amount;
            }
            // Ribs
            if (this.hearty.items[9].buyoutData.average !== undefined) {
                cost += this.hearty.items[9].buyoutData.average * amount;
            }
            // Bacon
            if (this.hearty.items[11].buyoutData.average !== undefined) {
                cost += this.hearty.items[11].buyoutData.average * amount;
            }

            console.log("heartyBuyFood costs: " + cost);

            this.hearty.costs.buyFood = cost;
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
            if (this.suramar.items === undefined || this.suramar.recipeRank === undefined) return 0.0;
            const amount = 6 - this.suramar.recipeRank.feast.selected; // Rank 1 = 5 of each required, rank 2 = 4 required, rank 3 = 3 required
            let cost = 0.0;

            // Ribs
            // items[2] = big gamy ribs, items[3] = leyblood
            let subCost = 0.0;
            if (this.suramar.items[2].buyoutData.average !== undefined && this.suramar.items[3].buyoutData.average !== undefined) {
                if (this.suramar.recipeRank.ribs.selected === 1) {
                    subCost += this.suramar.items[2].buyoutData.average;
                    subCost += this.suramar.items[3].buyoutData.average;
                } else if (this.suramar.recipeRank.ribs.selected === 2) {
                    subCost += (this.suramar.items[2].buyoutData.average * 5) / 7;
                    subCost += (this.suramar.items[3].buyoutData.average * 5) / 7;
                } else { // rank 3
                    subCost += this.suramar.items[2].buyoutData.average * 0.5;
                    subCost += this.suramar.items[3].buyoutData.average * 0.5;
                }
                cost += subCost * amount;
            }

            // Surf and Turf
            // items[6] = runescale koi, items[5] = lean shank
            subCost = 0.0;
            if (this.suramar.items[6].buyoutData.average !== undefined && this.suramar.items[5].buyoutData.average !== undefined) {
                if (this.suramar.recipeRank.surfTurf.selected === 1) {
                    subCost += this.suramar.items[6].buyoutData.average;
                    subCost += this.suramar.items[5].buyoutData.average;
                } else if (this.suramar.recipeRank.surfTurf.selected === 2) {
                    subCost += (this.suramar.items[6].buyoutData.average * 5) / 7;
                    subCost += (this.suramar.items[5].buyoutData.average * 5) / 7;
                } else { // rank 3
                    subCost += this.suramar.items[6].buyoutData.average * 0.5;
                    subCost += this.suramar.items[5].buyoutData.average * 0.5;
                }
                cost += subCost * amount;
            }

            // Barracuda
            // items[3] = leyblood, items[8] = black barracuda
            subCost = 0.0;
            if (this.suramar.items[8].buyoutData.average !== undefined && this.suramar.items[3].buyoutData.average !== undefined) {
                if (this.suramar.recipeRank.barracuda.selected === 1) {
                    subCost += this.suramar.items[3].buyoutData.average;
                    subCost += this.suramar.items[8].buyoutData.average;
                } else if (this.suramar.recipeRank.barracuda.selected === 2) {
                    subCost += (this.suramar.items[3].buyoutData.average * 5) / 7;
                    subCost += (this.suramar.items[8].buyoutData.average * 5) / 7;
                } else { // rank 3
                    subCost += this.suramar.items[3].buyoutData.average * 0.5;
                    subCost += this.suramar.items[8].buyoutData.average * 0.5;
                }
                cost += subCost * amount;
            }

            // Stormray
            // items[6] = runescale koi, items[10] = stormray
            subCost = 0.0;
            if (this.suramar.items[6].buyoutData.average !== undefined && this.suramar.items[10].buyoutData.average !== undefined) {
                if (this.suramar.recipeRank.stormray.selected === 1) {
                    subCost += this.suramar.items[6].buyoutData.average;
                    subCost += this.suramar.items[10].buyoutData.average;
                } else if (this.suramar.recipeRank.stormray.selected === 2) {
                    subCost += (this.suramar.items[6].buyoutData.average * 5) / 7;
                    subCost += (this.suramar.items[10].buyoutData.average * 5) / 7;
                } else { // rank 3
                    subCost += this.suramar.items[6].buyoutData.average * 0.5;
                    subCost += this.suramar.items[10].buyoutData.average * 0.5;
                }
                cost += subCost * amount;
            }

            // Salmon
            // items[12] = highmountain salmon
            subCost = 0.0;
            if (this.suramar.items[12].buyoutData.average !== undefined) {
                if (this.suramar.recipeRank.salmon.selected === 1) {
                    subCost = this.suramar.items[12].buyoutData.average;
                } else if (this.suramar.recipeRank.salmon.selected === 2) {
                    subCost = (this.suramar.items[12].buyoutData.average * 5) / 7;
                } else { // rank 3
                    subCost = this.suramar.items[12].buyoutData.average * 0.5;
                }
                cost += subCost * amount;
            }

            // Bacon
            if (this.suramar.items[13].buyoutData.average !== undefined) {
                cost += this.suramar.items[13].buyoutData.average * amount;
            }

            console.log("suramarBuyIngredients Cost: " + cost);

            this.suramar.costs.buyIngredients = cost;
        },
        /**
         * Works out the cost of buying the ingredients to make the food that makes up a feast
         *
         * Food ranks
         *  1 = 5 of main ingredients make 5 of the food item
         *  2 = 5 of main ingredients make 7 of the food item
         *  3 = 5 of main ingredients make 10 of the food item
         */
        heartyBuyIngredients: function() {
            if (this.hearty.items === undefined || this.hearty.recipeRank === undefined) return 0.0;
            const amount = 6 - this.hearty.recipeRank.feast.selected; // Rank 1 = 5 of each required, rank 2 = 4 required, rank 3 = 3 required
            let cost = 0.0;
            // Shank
            // items[2] = lean shank
            let subCost = 0.0;
            if (this.hearty.items[2].buyoutData.average !== undefined) {
                if (this.hearty.recipeRank.shank.selected === 1) {
                    subCost += this.hearty.items[2].buyoutData.average;
                } else if (this.hearty.recipeRank.shank.selected === 2) {
                    subCost += (this.hearty.items[2].buyoutData.average * 5) / 7;
                } else { // rank 3
                    subCost += this.hearty.items[2].buyoutData.average * 0.5;
                }
                cost += subCost * amount;
            }

            // Mossgill
            // items[4] = mossgill perch
            subCost = 0.0;
            if (this.hearty.items[4].buyoutData.average !== undefined) {
                if (this.hearty.recipeRank.mossgill.selected === 1) {
                    subCost += this.hearty.items[4].buyoutData.average;
                } else if (this.hearty.recipeRank.mossgill.selected === 2) {
                    subCost += (this.hearty.items[4].buyoutData.average * 5) / 7;
                } else { // rank 3
                    subCost += this.hearty.items[4].buyoutData.average * 0.5;
                }
                cost += subCost * amount;
            }

            // Stormray
            // items[6] = stormray
            subCost = 0.0;
            if (this.hearty.items[6].buyoutData.average !== undefined) {
                if (this.hearty.recipeRank.stormray.selected === 1) {
                    subCost += this.hearty.items[6].buyoutData.average;
                } else if (this.hearty.recipeRank.stormray.selected === 2) {
                    subCost += (this.hearty.items[6].buyoutData.average * 5) / 7;
                } else { // rank 3
                    subCost += this.hearty.items[6].buyoutData.average * 0.5;
                }
                cost += subCost * amount;
            }

            // Fizz
            // items[8] = wildfowl egg
            subCost = 0.0;
            if (this.hearty.items[8].buyoutData.average !== undefined) {
                if (this.hearty.recipeRank.fizz.selected === 1) {
                    subCost += this.hearty.items[8].buyoutData.average;
                } else if (this.hearty.recipeRank.fizz.selected === 2) {
                    subCost += (this.hearty.items[8].buyoutData.average * 5) / 7;
                } else { // rank 3
                    subCost += this.hearty.items[8].buyoutData.average * 0.5;
                }
                cost += subCost * amount;
            }

            // Ribs
            // items[10] = big gamy ribs
            subCost = 0.0;
            if (this.hearty.items[10].buyoutData.average !== undefined) {
                if (this.hearty.recipeRank.ribs.selected === 1) {
                    subCost = this.hearty.items[10].buyoutData.average;
                } else if (this.hearty.recipeRank.ribs.selected === 2) {
                    subCost = (this.hearty.items[10].buyoutData.average * 5) / 7;
                } else { // rank 3
                    subCost = this.hearty.items[10].buyoutData.average * 0.5;
                }
                cost += subCost * amount;
            }

            // Bacon
            if (this.hearty.items[11].buyoutData.average !== undefined) {
                cost += this.hearty.items[11].buyoutData.average * amount;
            }

            console.log("heartyBuyIngredients Cost: " + cost);
            this.hearty.costs.buyIngredients = cost;
        },
        rankChange: function() {
            this.suramarBuyIngredients();
            this.suramarBuyFood();
            this.suramar.costs.buyFeast = this.suramar.items[0].buyoutData.average;

            this.heartyBuyIngredients();
            this.heartyBuyFood();
            this.hearty.costs.buyFeast = this.hearty.items[0].buyoutData.average;
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
    }
});

/**
 * Function that analyses all the auctions of an item and returns an object containing the min,average, max buyouts and the number of auctions
 * I only include auctions that include 20 or more items as smaller quantities will skew the price lower than what is correct for crafting large numbers
 */
function buyoutData(auctions) {
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
            average : undefined,
            min : undefined,
            max : undefined,
            count: undefined
        }
    }

    // Max, Min and average are divided by 10,000 to get the gold price, because blizzard store it as the copper price
    // (100 copper = 1 silver, 100 silver = 1 gold)
    return {
        average : (average / count) / 10000,
        min : min / 10000,
        max : max / 10000,
        count: trueCount
    }
}


