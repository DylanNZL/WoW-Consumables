// Works for Food, Flasks and Potions, however feast require a bit more detail so have their own template
Vue.component('c-template', {
    template: "#card-template",
    props: ["info", "items"],
    methods: {
        rankChanged: function() {
        },
        rankModifier: function (cost, mInfo) {
            if (mInfo.category === "Mastery" || mInfo.category === "Haste" || mInfo.category === "Versatility" || mInfo.category === "Critical Strike") {
                if (mInfo.rank.selected === 3) { return cost / 10; }
                if (mInfo.rank.selected === 2) { return cost / 7; }
                else { return cost / 5; }
            } else if (mInfo.category === "flask") {
                if (mInfo.rank.selected === 3) { return cost / 1.4; } // I think it works out between 1.3 and 1.5 flasks created per flask made at rank 3
                else { return cost; }
            } else if (mInfo.category === "potion") {
                if (mInfo.rank.selected === 3) { return cost / 1.2; } // Each pot seems to have different proc rates so conservative estimate
                else { return cost; }
            }
            return cost;
        },
        cost: function(mInfo, mItems) {
            let cost = 0.0;
            if (mItems.allReagents[124101] === undefined) return 0.0;

            mInfo.recipe.forEach(function(data) {
                if (data.id < 8000000) {
                    if (mItems.allReagents[data.id].buyoutData === undefined) return 0.0;
                    cost += mItems.allReagents[data.id].buyoutData.average * data.quantity;
                } else if (data.id < 9000000) {
                    let id = data.id % 8000000;
                    if (mItems.craftables[id].buyoutData === undefined) return 0.0;
                    cost += mItems.craftables[id].buyoutData.average * data.quantity;
                } else {
                    let id = data.id % 9000000;
                    if (mItems.shopReagents[id].buyoutData === undefined) return 0.0;
                    cost += mItems.shopReagents[id].buyoutData.average * data.quantity;
                }

            });

            cost = this.rankModifier(cost, mInfo);
            return cost.toFixed(2);
        },
        minCost: function(mInfo, mItems) {
            let cost = 0.0;
            if (mItems.allReagents[124101] === undefined) return 0.0;

            mInfo.recipe.forEach(function(data) {
                if (data.id < 8000000) {
                    if (mItems.allReagents[data.id].buyoutData === undefined) return 0.0;
                    cost += mItems.allReagents[data.id].buyoutData.min * data.quantity;
                } else if (data.id < 9000000) {
                    let id = data.id % 8000000;
                    if (mItems.craftables[id].buyoutData === undefined) return 0.0;
                    cost += mItems.craftables[id].buyoutData.average * data.quantity;
                } else {
                    let id = data.id % 9000000;
                    if (mItems.shopReagents[id].buyoutData === undefined) return 0.0;
                    cost += mItems.shopReagents[id].buyoutData.average * data.quantity;
                }

            });

            cost = this.rankModifier(cost, mInfo);
            return cost.toFixed(2);
        },
    }
});

Vue.component('f-template', {
    template: "#feast-template",
    props: ["info", "items", "viewHearty", "viewLavish"],
    methods: {
        rankChanged: function() {
        },
        rankModify: function (cost, rank, quantity) {
            if (rank === 3) { //  recipe makes 10 items
                cost = cost / 10;
                return cost * quantity;
            } else if (rank === 2) { // recipe makes 7 items
                cost = cost / 7;
                return cost * quantity;
            } else { // recipe makes 5 items
                cost = cost / 5;
                return cost * quantity;
            }
        },
        costScratch: function(mInfo, mItems) {
            let cost = 0.0;
            if (mItems.allReagents[124101] === undefined) return 0.0;
            let vthis = this;
            mInfo.recipe.forEach(function (data) {
               let id = data.id % 8000000;
               if (mItems.craftables[id] === undefined) return 0.0;
               mItems.craftables[id].recipe.forEach(function (dat) {
                   if (dat.id < 9000000) {
                       let subCost = mItems.allReagents[dat.id].buyoutData.average * 5;
                       cost += vthis.rankModify(subCost, mItems.craftables[id].rank.selected, dat.quantity);
                   } else {
                       let mId = dat.id % 9000000;
                       let subCost = mItems.shopReagents[mId].cost;
                       cost += vthis.rankModify(subCost, mItems.craftables[id].rank.selected, dat.quantity)
                   }
               })
            });
            // add Bacon
            if (mItems.allReagents[133680].buyoutData !== undefined) {
                cost += parseInt(mItems.allReagents[133680].buyoutData.average);
            }

            cost = cost * (6 - mInfo.rank.selected); // each rank requires one less to be made
            return cost.toFixed(2);
        },
        costFood: function(mInfo, mItems) {
            let cost = 0.0;
            if (mItems.allReagents[124101] === undefined) return 0.0;

            mInfo.recipe.forEach(function (data) {
                if (data.id > 8000000) {
                    let id = data.id % 8000000;
                    if (mItems.craftables[id].buyoutData === undefined) return 0.0;
                    cost += mItems.craftables[id].buyoutData.average * (data.quantity - mInfo.rank.selected);
                } else {
                    if (mItems.allReagents[data.id].buyoutData === undefined) return 0.0;
                    cost += mItems.allReagents[data.id].buyoutData.average * (data.quantity - mInfo.rank.selected);
                }
            });
            // add Bacon
            if (mItems.allReagents[133680] !== undefined && mItems.allReagents[133680].buyoutData !== undefined) {
                cost += parseInt(mItems.allReagents[133680].buyoutData.average);
            }
            return cost.toFixed(2);
        },
        minCostScratch: function(mInfo, mItems) {
            let cost = 0.0;
            if (mItems.allReagents[124101] === undefined) return 0.0;
            let vthis = this;
            mInfo.recipe.forEach(function (data) {
                let id = data.id % 8000000;
                if (mItems.craftables[id] === undefined) return 0.0;
                mItems.craftables[id].recipe.forEach(function (dat) {
                    if (dat.id < 9000000) {
                        let subCost = mItems.allReagents[dat.id].buyoutData.min * 5;
                        cost += vthis.rankModify(subCost, mItems.craftables[id].rank.selected, dat.quantity);
                    } else {
                        let mId = dat.id % 9000000;
                        let subCost = mItems.shopReagents[mId].cost;
                        cost += vthis.rankModify(subCost, mItems.craftables[id].rank.selected, dat.quantity)
                    }
                })
            });
            // add Bacon
            if (mItems.allReagents[133680].buyoutData !== undefined) {
                cost += parseInt(mItems.allReagents[133680].buyoutData.min);
            }

            cost = cost * (6 - mInfo.rank.selected); // each rank requires one less to be made
            return cost.toFixed(2);
        },
        showRank: function(info) {
            // info.showRanks = !info.showRanks;
            eventHub.$emit('showRank', info.name);
        }
    }
});

Vue.component('tr-template', {
    template: "#tableRow-template",
    props: ["item", "items"],
    methods: {
        name: function (mItem, mItems) {
            if (mItem.id < 8000000) {
                return mItems.allReagents[mItem.id].name;
            } else if (mItem.id < 9000000) {
                return mItems.craftables[mItem.id % 8000000].name;
            } else {
                return mItems.shopReagents[mItem.id % 9000000].name;
            }
        },
        average: function (mItem, mItems) {
            if (mItem.id < 8000000) {
                return mItems.allReagents[mItem.id].buyoutData.average;
            } else if (mItem.id < 9000000) {
                return mItems.craftables[mItem.id % 8000000].buyoutData.average;
            } else {
                return mItems.shopReagents[mItem.id % 9000000].cost;
            }
        },
        priceRange: function (mItem, mItems) {
            if (mItem.id < 8000000) {
                return "$" + mItems.allReagents[mItem.id].buyoutData.min + " - $" + mItems.allReagents[mItem.id].buyoutData.min;
            } else if (mItem.id < 9000000) {
                return "$" + mItems.craftables[mItem.id % 8000000].buyoutData.min + " - $" + mItems.craftables[mItem.id % 8000000].buyoutData.max;
            } else {
                return "$" + mItems.shopReagents[mItem.id % 9000000].cost;
            }
        },
        count: function (mItem, mItems) {
            if (mItem.id < 8000000) {
                return mItems.allReagents[mItem.id].buyoutData.count;
            } else if (mItem.id < 9000000) {
                return mItems.craftables[mItem.id % 8000000].buyoutData.count;
            } else {
                return "Infinite";
            }
        },
    }
});

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

let vm = new Vue({
    el: '#app',
    data: {
        dbUpdated: "Error",
        category: "Home",
        items: {
            allReagents: {},
            craftables: {},
            shopReagents: {}
        },
        viewHearty: true,
        viewLavish: false
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
                    // console.log(item);
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
                    // console.log(item);
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
        },
        viewFeast: function() {
            this.category = "Feast";
        },
        viewFlask: function() {
            this.category = "Flask";
        },
        viewPotion: function() {
            this.category = "Potion";
        },
        viewFood: function() {
            this.category = "Food";
        },
        viewHome: function() {
            this.category = "Home";
        },
        showRank: function(value) {
            console.log(value);
            console.log(this.viewHearty + " " + this.viewLavish);
            if (value === "Hearty Feast") {
                this.viewHearty = !this.viewHearty;
            } else if (value === "Lavish Suramar Feast") {
                this.viewLavish = !this.viewLavish;
            }
            console.log(this.viewHearty + " " + this.viewLavish);
        }
    },
    created: function() {
        this.checkDbUpdated();
        this.getAllReagents();
        this.getCraftables();
        this.getShopReagents();

        eventHub.$on('showRank', this.showRank);
    }
});

/**
 * Function that analyses all the auctions of an item and returns an object containing the min,average, max buyouts and the number of auctions
 * I only include auctions that include 20 or more items as smaller quantities will skew the price lower than what is correct for crafting large numbers
 */
function buyoutData(auctions) {
    // console.log(auctions);
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
