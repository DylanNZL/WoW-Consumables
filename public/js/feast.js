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
            items: 0,
            costs: {
                buyFeast: 0,
                buyFood: 0,
                buyIngredients: 0
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
                });
                vthis.hearty.costs.buyFeast = vthis.hearty.items[0].averageBuyout;
                vthis.heartyBuyFood();
                vthis.heartyBuyIngredients();
            })
        },
        // Works out the cost of buying the premade food to combine in to a suramar feast
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
            // Bacon
            if (this.suramar.items[13].averageBuyout !== undefined) {
                cost += this.suramar.items[13].averageBuyout * amount;
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
            if (this.hearty.items[1].averageBuyout !== undefined) {
                cost += this.hearty.items[1].averageBuyout * amount;
            }
            // Mossgill
            if (this.hearty.items[3].averageBuyout !== undefined) {
                cost += this.hearty.items[3].averageBuyout * amount;
            }
            // Stormray
            if (this.hearty.items[5].averageBuyout !== undefined) {
                cost += this.hearty.items[5].averageBuyout * amount;
            }
            // Fizz
            if (this.hearty.items[7].averageBuyout !== undefined) {
                cost += this.hearty.items[7].averageBuyout * amount;
            }
            // Ribs
            if (this.hearty.items[9].averageBuyout !== undefined) {
                cost += this.hearty.items[9].averageBuyout * amount;
            }
            // Bacon
            if (this.hearty.items[11].averageBuyout !== undefined) {
                cost += this.hearty.items[11].averageBuyout * amount;
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

            // Barracuda
            // items[3] = leyblood, items[8] = black barracuda
            subCost = 0.0;
            if (this.suramar.items[8].averageBuyout !== undefined && this.suramar.items[3].averageBuyout !== undefined) {
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

            // Bacon
            if (this.suramar.items[13].averageBuyout !== undefined) {
                cost += this.suramar.items[13].averageBuyout * amount;
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
            if (this.hearty.items[2].averageBuyout !== undefined) {
                if (this.hearty.recipeRank.shank.selected === 1) {
                    subCost += this.hearty.items[2].averageBuyout;
                } else if (this.hearty.recipeRank.shank.selected === 2) {
                    subCost += (this.hearty.items[2].averageBuyout * 5) / 7;
                } else { // rank 3
                    subCost += this.hearty.items[2].averageBuyout * 0.5;
                }
                cost += subCost * amount;
            }

            // Mossgill
            // items[4] = mossgill perch
            subCost = 0.0;
            if (this.hearty.items[4].averageBuyout !== undefined) {
                if (this.hearty.recipeRank.mossgill.selected === 1) {
                    subCost += this.hearty.items[4].averageBuyout;
                } else if (this.hearty.recipeRank.mossgill.selected === 2) {
                    subCost += (this.hearty.items[4].averageBuyout * 5) / 7;
                } else { // rank 3
                    subCost += this.hearty.items[4].averageBuyout * 0.5;
                }
                cost += subCost * amount;
            }

            // Stormray
            // items[6] = stormray
            subCost = 0.0;
            if (this.hearty.items[6].averageBuyout !== undefined) {
                if (this.hearty.recipeRank.stormray.selected === 1) {
                    subCost += this.hearty.items[6].averageBuyout;
                } else if (this.hearty.recipeRank.stormray.selected === 2) {
                    subCost += (this.hearty.items[6].averageBuyout * 5) / 7;
                } else { // rank 3
                    subCost += this.hearty.items[6].averageBuyout * 0.5;
                }
                cost += subCost * amount;
            }

            // Fizz
            // items[8] = wildfowl egg
            subCost = 0.0;
            if (this.hearty.items[8].averageBuyout !== undefined) {
                if (this.hearty.recipeRank.fizz.selected === 1) {
                    subCost += this.hearty.items[8].averageBuyout;
                } else if (this.hearty.recipeRank.fizz.selected === 2) {
                    subCost += (this.hearty.items[8].averageBuyout * 5) / 7;
                } else { // rank 3
                    subCost += this.hearty.items[8].averageBuyout * 0.5;
                }
                cost += subCost * amount;
            }

            // Ribs
            // items[10] = big gamy ribs
            subCost = 0.0;
            if (this.hearty.items[10].averageBuyout !== undefined) {
                if (this.hearty.recipeRank.ribs.selected === 1) {
                    subCost = this.hearty.items[10].averageBuyout;
                } else if (this.hearty.recipeRank.ribs.selected === 2) {
                    subCost = (this.hearty.items[10].averageBuyout * 5) / 7;
                } else { // rank 3
                    subCost = this.hearty.items[10].averageBuyout * 0.5;
                }
                cost += subCost * amount;
            }

            // Bacon
            if (this.hearty.items[11].averageBuyout !== undefined) {
                cost += this.hearty.items[11].averageBuyout * amount;
            }

            console.log("heartyBuyIngredients Cost: " + cost);
            this.hearty.costs.buyIngredients = cost;
        },
        rankChange: function() {
            this.suramarBuyIngredients();
            this.suramarBuyFood();
            this.suramar.costs.buyFeast = this.suramar.items[0].averageBuyout;

            this.heartyBuyIngredients();
            this.heartyBuyFood();
            this.hearty.costs.buyFeast = this.hearty.items[0].averageBuyout;
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


