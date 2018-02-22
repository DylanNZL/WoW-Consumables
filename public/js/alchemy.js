Vue.component('alch-template', {
    template: "#alchemy-template",
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
            cauldron: {
                costs: {},
                show: false,
                id: 0,
                rank: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Spirit Cauldron"
                },
                recipe: [
                    { id: 1, amount: 5 }, // int
                    { id: 2, amount: 5 }, // agility
                    { id: 3, amount: 5 }, // strength
                    { id: 4, amount: 5 }, // stam
                ]
            },
            intFlask: {
                costs: {},
                show: false,
                id: 1,
                rank: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Flask of the Whispered Pact"
                },
                recipe: [
                    { id: 7, amount: 7 }, // Starlight
                    { id: 11, amount: 10 }, // Fjarnskaggl
                    { id: 9, amount: 10 }  // Dreamleaf
                ]
            },
            agilityFlask: {
                costs: {},
                show: false,
                id: 2,
                rank: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Flask of the Seventh Demon"
                },
                recipe: [
                    { id: 7, amount: 7 }, // Starlight
                    { id: 11, amount: 10 }, // Fjarnskaggl
                    { id: 10, amount: 10 }  // FoxFlower
                ]
            },
            strengthFlask: {
                costs: {},
                show: false,
                id: 3,
                rank: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Flask of the Countless Armies"
                },
                recipe: [
                    { id: 7, amount: 7 }, // Starlight
                    { id: 8, amount: 10 }, // Aethril
                    { id: 10, amount: 10 }  // Foxflower
                ]
            },
            stamFlask: {
                costs: {},
                show: false,
                id: 4,
                rank: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Flask of Ten Thousand Scars"
                },
                recipe: [
                    { id: 7, amount: 7 }, // Starlight
                    { id: 8, amount: 10 }, // Aethril
                    { id: 9, amount: 10 }  // Dreamleaf
                ]
            },
            leytorrent: {
                costs: {},
                show: false,
                id: 5,
                rank: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Leytorrent Potion"
                },
                recipe: [
                    { id: 7, amount: 1 }, // Starlight
                    { id: 8, amount: 2 }, // Aethril
                    { id: 9, amount: 2 }  // Dreamleaf
                ]
            },
            manaPot: {
                costs: {},
                show: false,
                id: 6,
                rank: {
                    selected: 3,
                    options: [
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3}
                    ],
                    label: "Ancient Mana Potion"
                },
                recipe: [
                    { id: 12, amount: 5 } // Yseralline seed
                ]
            }
        }
    },
    methods: {
        loadAlchemyItems: function() {
            console.log("loading");
            let url = "/api/alchemy";
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
        }
    },
    created: function() {
        eventHub.$on('rankChanged', this.rankChange);
        this.loadAlchemyItems();
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