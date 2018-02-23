Vue.component("f-template", {
    template: "#food-template",
    props: ["info", "items"],
    methods: {
        rankChanged: function() {
            eventHub.$emit('rankChanged');
        },
        cost: function(mInfo, mItems) {
            let cost = 0.0;
            console.log(mInfo);
            console.log(mItems);
            if (mItems.length === 0) return 0.0;

            mInfo.recipe.forEach(function(data) {
                console.log(mItems[data.id]);

                if (mItems[data.id].buyoutData === undefined) return 0.0;
                cost += mItems[data.id].buyoutData.average * data.amount;
            });

            if (mInfo.rank.selected === 3) {
                cost = cost * mInfo.rankThreeModifier;
            }
            return cost;
        },
        minCost: function(mInfo, mItems) {
            let cost = 0.0;
            console.log(mInfo);
            console.log(mItems);
            if (mItems.length === 0) return 0.0;

            mInfo.recipe.forEach(function(data) {
                console.log(mItems[data.id]);

                if (mItems[data.id].buyoutData === undefined) return 0.0;
                cost += mItems[data.id].buyoutData.min * data.amount;
            });

            if (mInfo.rank.selected === 3) {
                cost = cost * mInfo.rankThreeModifier;
            }

            return cost;
        }
    }
});

let eventHub = new Vue();

new Vue({
    el: '#app',
    data: {
        items: [],
        details: {
            shank: {
                costs: {},
                show: false,
                id: 0,
                value: 225,
                stat: "Critical Strike",
                rank: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Salt and Pepper Shank"
                },
                recipe: [
                    { id: 23, amount: 5 }, // Lean Shank
                ]
            },
            leybeque: {
                costs: {},
                show: false,
                id: 1,
                value: 300,
                stat: "Critical Strike",
                rank: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Leybeque Ribs"
                },
                recipe: [
                    { id: 23, amount: 5 }, // Lean Shank
                    { id: 26, amount: 5 }, // Leyblood

                ]
            },
            magister: {
                costs: {},
                show: false,
                id: 2,
                value: 375,
                stat: "Critical Strike",
                rank: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "The Hungry Magister"
                },
                recipe: [
                    { id: 1, amount: 1 }, // Leybeque Ribs
                    { id: 19, amount: 5 }, // Highmountain salmon
                    { id: 24, amount: 5 }, // Fatty Bearsteak

                ]
            },
            mossgill: {
                costs: {},
                show: false,
                id: 3,
                value: 225,
                stat: "Haste",
                rank: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Deep-Fried Mossgill"
                },
                recipe: [
                    { id: 18, amount: 5 }, // Mossgill Perch
                ]
            },
            surfTurf: {
                costs: {},
                show: false,
                id: 4,
                value: 300,
                stat: "Haste",
                rank: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Suramar Surf and Turf"
                },
                recipe: [
                    { id: 23, amount: 5 }, // Lean Shank
                    { id: 21, amount: 5 }, // Runescale Koi

                ]
            },
            azshari: {
                costs: {},
                show: false,
                id: 5,
                value: 375,
                stat: "Haste",
                rank: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Azshari Salad"
                },
                recipe: [
                    { id: 4, amount: 1 }, // Suramar Surf and Turf
                    { id: 12, amount: 5 }, // Aethril
                    { id: 13, amount: 5 }, // Dreamleaf
                    { id: 14, amount: 5 }, // FoxFlower
                    { id: 15, amount: 5 }, // Fjarnskaggl
                ]
            },
            fizz: {
                costs: {},
                show: false,
                id: 6,
                value: 225,
                stat: "Versatility",
                rank: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Faronaar Fizz"
                },
                recipe: [
                    { id: 27, amount: 5 }, // Wildfowl Egg
                ]
            },
            koiStormray: {
                costs: {},
                show: false,
                id: 7,
                value: 300,
                stat: "Versatility",
                rank: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Pickled Stormray"
                },
                recipe: [
                    { id: 20, amount: 5 }, // Stormray
                    { id: 21, amount: 5 }, // Runescale Koi

                ]
            },
            fishPlate: {
                costs: {},
                show: false,
                id: 8,
                value: 375,
                stat: "Versatility",
                rank: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Seed-Battered Fish Playe"
                },
                recipe: [
                    { id: 7, amount: 1 }, // Koiscented stormray
                    { id: 30, amount: 5 }, // Silver Mackeral
                    { id: 28, amount: 20 }, // Yseralline Seed
                ]
            },
            pickledStormray: {
                costs: {},
                show: false,
                id: 9,
                value: 225,
                stat: "Mastery",
                rank: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Pickled Stormray"
                },
                recipe: [
                    { id: 20, amount: 5 }, // Stormray
                ]
            },
            barracuda: {
                costs: {},
                show: false,
                id: 10,
                value: 300,
                stat: "Versatility",
                rank: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Pickled Stormray"
                },
                recipe: [
                    { id: 22, amount: 5 }, // Barracuda
                    { id: 26, amount: 5 }, // Leyblood

                ]
            },
            nightborne: {
                costs: {},
                show: false,
                id: 11,
                value: 375,
                stat: "Versatility",
                rank: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Seed-Battered Fish Playe"
                },
                recipe: [
                    { id: 10, amount: 1 }, // Barracuda
                    { id: 29, amount: 20 }, // Gem Chip
                    { id: 27, amount: 5 }, // Wildfowl egg
                    { id: 16, amount: 1 }, // Starlight Rose
                ]
            },
        }
    },
    methods: {
        loadFoodItems: function() {
            console.log("loading");
            let url = "/api/food";
            let vthis = this;
            $.ajax({
                dataType: "jsonp",
                url: url
            }).done(function (data) {
                console.log(data);
                vthis.items = data.items;
                vthis.items.forEach(function(item) {
                    item.buyoutData = buyoutData(item.auctions);
                });
            });
        },
        rankChange: function() {

        }
    },
    created: function() {
        eventHub.$on('rankChanged', this.rankChange);
        this.loadFoodItems();
    },
    beforeDestroy: function() {
        eventHub.$off('rankChanged');
    },
    mounted: function() {

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