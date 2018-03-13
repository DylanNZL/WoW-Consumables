/**
 * This file contains the static base JSON used to render API responses
 */

// An object that consists of the reagents that can be bought from an NPC
exports.shopReagents = {
    133588 : {
        id : 133588,
        name : "Flaked Sea Salt",
        cost : 0.5 },
    133589 : {
        id : 133589,
        name : "Dalapeño Pepper",
        cost : 0.5 },
    133590 : {
        id : 133590,
        name : "Muskenbutter",
        cost : 0.5 },
    133591 : {
        id : 133591,
        name : "River Onion",
        cost : 0.5 },
    133592 : {
        id : 133592,
        name : "Stonedark Snail",
        cost : 0.5 },
    133593 : {
        id : 133593,
        name : "Royal Olive",
        cost : 0.5 }
};

// An object that consists of the reagents that can only be found in the wild or bought off the auction house
exports.ahReagents = {
    124101: {
        id: 124101,
        name: "Aethril",
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    124102: {
        id: 124102,
        name: "Dreamleaf",
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    124103: {
        id: 124103,
        name: "FoxFlower",
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    124104: {
        id: 124104,
        name: "Fjarnskaggl",
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    124105: {
        id: 124105,
        name: "Starlight Rose",
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    124107: {
        id: 124107,
        name: "Cursed Queenfish",
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    124108: {
        id: 124108,
        name: "Mossgill Perch",
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    124109: {
        id: 124109,
        name: "Highmountain Salmon",
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    124110: {
        id: 124110,
        name: "Stormray",
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    124111: {
        id: 124111,
        name: "Runescale Koi",
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    124112: {
        id: 124112,
        name: "Black Barracuda",
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    124117: {
        id: 124117,
        name: "Lean Shank",
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    124118: {
        id: 124118,
        name: "Fatty Bearsteak",
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    124119: {
        id: 124119,
        name: "Big Gamy Ribs",
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    124120: {
        id: 124120,
        name: "Leyblood",
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    124121: {
        id: 124121,
        name: "Wildfowl Egg",
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    128304: {
        id: 128304,
        name: "Yseralline Seed",
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    129100: {
        id: 129100,
        name: "Gem Chips",
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    133607: {
        id: 133607,
        name: "Silver Mackaeral",
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    133680: {
        id: 133680,
        name: "Slice of Bacon",
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    }
};

// An object that consists of the craftable consumables
/**
 * NOTE: item ids containing their actual 6 letter ids are found in the /api/allReagents
 *       item ids starting with 8xxxxxx are found in this api call (375 stat food uses 1 of the 300 stat food in crafting it)
 *       item ids starting with 9xxxxxx are found in the /api/shopReagents
 */
exports.craftables = {
    // Flasks
    127851: {
        id: 127851,
        name: "Spirit Cauldron",
        image: "/icons/flask/inv_alchemy_70_cauldron.jpg",
        category: "flask",
        rank: {
            selected: 3,
            options: [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3}
            ]
        },
        recipe: [{id: 8127847, quantity: 5}, {id: 8127848, quantity: 5}, {id: 8127849, quantity: 5}, {id: 8127850, quantity: 5}],
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    127847: {
        id: 127847,
        name: "Flask of the Whispered Pact",
        image: "/icons/flask/inv_alchemy_70_flask03purple.jpg",
        category: "flask",
        rank: {
            selected: 3,
            options: [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3}
            ]
        },
        recipe: [{id: 124104, quantity: 10}, {id: 124102, quantity: 10}, {id: 124105, quantity: 7}],
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    }, // Fjarnskaggl, Dreamleaf
    127848: {
        id: 127848,
        name: "Flask of the Seventh Demon",
        image: "/icons/flask/inv_alchemy_70_flask03orange.jpg",
        category: "flask",
        rank: {
            selected: 3,
            options: [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3}
            ]
        },
        recipe: [{id: 124104, quantity: 10}, {id: 124103, quantity: 10}, {id: 124105, quantity: 7}],
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    }, // Fjarnskaggl, Foxflower
    127849: {
        id: 127849,
        name: "Flask of the Countless Armies",
        image: "/icons/flask/inv_alchemy_70_flask03red.jpg",
        category: "flask",
        rank: {
            selected: 3,
            options: [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3}
            ]
        },
        recipe: [{id: 124101, quantity: 10}, {id: 124103, quantity: 10}, {id: 124105, quantity: 7}],
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    }, // Aethril, Foxflower
    127850: {
        id: 127850,
        name: "Flask of Ten Thousand Scars",
        image: "/icons/flask/inv_alchemy_70_flask03green.jpg",
        category: "flask",
        rank: {
            selected: 3,
            options: [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3}
            ]
        },
        recipe: [{id: 124101, quantity: 10}, {id: 124102, quantity: 10}, {id: 124105, quantity: 7}],
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]

    }, // Aethril, Dreamleaf
    // Potions // TODO: add more pots
    127846: {
        id: 127846,
        name: "Leytorrent Potion",
        image: "/icons/potion/inv_alchemy_70_flask01.jpg",
        category: "potion",
        rank: {
            selected: 3,
            options: [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3}
            ]
        },
        recipe: [{id: 124105, quantity: 1}, {id: 124101, quantity: 2}, {id: 124102, quantity: 2}],
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    }, // Aethril, Dreamleaf
    127835: {
        id: 127835,
        name: "Ancient Mana Potion",
        image: "/icons/potion/inv_alchemy_70_blue.jpg",
        category: "potion",
        rank: {
            selected: 3,
            options: [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3}
            ]
        },
        recipe: [{id: 128304, quantity: 5}],
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]},
    // Crit
    133557: {
        id: 133557,
        name: "Salt and Pepper Shank",
        category: "Critical Strike",
        image: "/icons/food/inv_misc_food_legion_saltpeppershank.jpg",
        rank: {
            selected: 3,
            options: [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3}
            ]
        },
        stat: 225,
        recipe: [{id: 124117, quantity: 5}, {id: 9133588, quantity: 2}, {id: 9133589, quantity: 2}],
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    133565: {
        id: 133565,
        name: "Leybeque Ribs",
        category: "Critical Strike",
        image: "/icons/food/inv_misc_food_legion_leybequeribs.jpg",
        rank: {
            selected: 3,
            options: [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3}
            ]
        },
        stat: 300,
        recipe: [{id: 124120, quantity: 5}, {id: 124119, quantity: 5}, {id: 9133589, quantity: 5}],
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    133570: {
        id: 133570,
        name: "The Hungry Magister",
        category: "Critical Strike",
        image: "/icons/food/inv_misc_food_legion_thehungrymagistar.jpg",
        rank: {
            selected: 3,
            options: [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3}
            ]
        },
        stat: 375,
        recipe: [{id: 8133565, quantity: 1}, {id: 124109, quantity: 5}, {id: 124118, quantity: 5},
            {id: 9133588, quantity: 3}, { id: 9133589, quantity: 2 }],
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },

    // Haste
    133561: {
        id: 133561,
        name: "Deep-Fried Mossgill",
        image: "/icons/food/inv_misc_food_legion_deepfriedmossgill.jpg",
        category: "Haste",
        rank: {
            selected: 3,
            options: [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3}
            ]
        },
        stat: 225,
        recipe: [{id: 124108, quantity: 5}, {id: 9133590, quantity: 5}],
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    133566: {
        id: 133566,
        name: "Suramar Surf and Turf",
        image: "/icons/food/inv_misc_food_legion_suramarsurfandturf.jpg",
        category: "Haste",
        rank: {
            selected: 3,
            options: [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3}
            ]
        },
        stat: 300,
        recipe: [{id: 124111, quantity: 5}, {id: 124117, quantity: 2}, {id: 9133588, quantity: 2}, {id: 9133593, quantity: 4}],
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    133571: {
        id: 133571,
        name: "Azshari Salad",
        image: "/icons/food/inv_misc_food_legion_azsharisalad.jpg",
        category: "Haste",
        rank: {
            selected: 3,
            options: [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3}
            ]
        },
        stat: 375,
        recipe: [{id: 8133571, quantity: 1}, {id: 124101, quantity: 5}, {id: 124102, quantity: 5},
            {id: 124103, quantity: 5}, {id: 124104, quantity: 5}],
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },

    // Vers
    133563: {
        id: 133563,
        name: "Faronaar Fizz",
        category: "Versatility",
        image: "/icons/food/inv_misc_food_legion_faronaarfizz.jpg",
        rank: {
            selected: 3,
            options: [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3}
            ]
        },
        stat: 225,
        recipe: [{id: 124121, quantity: 5}, {id: 9133591, quantity: 2}, {id: 9133593, quantity: 3}],
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    133568: {
        id: 133568,
        name: "Koi-Scented Stormray",
        image: "/icons/food/inv_misc_food_legion_koiscentedstormray.jpg",
        category: "Versatility",
        rank: {
            selected: 3,
            options: [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3}
            ]
        },
        stat: 300,
        recipe: [{id: 124111, quantity: 5}, {id: 124110, quantity: 5}, {id: 9133588, quantity: 2}, {id: 9133590, quantity: 2}],
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    133573: {
        id: 133573,
        name: "Seed-Battered Fish Plate",
        image: "/icons/food/inv_misc_food_legion_seedbatteredfishplate.jpg",
        category: "Versatility",
        rank: {
            selected: 3,
            options: [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3}
            ]
        },
        stat: 375,
        recipe: [{id: 8133568, quantity: 1}, {id: 133607, quantity: 5}, {id: 128304, quantity: 20},
            {id: 9133590, quantity: 3}, {id: 9133589, quantity: 2}],
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },

    // Mastery
    133562: {
        id: 133562,
        name: "Pickled Stormray",
        image: "/icons/food/inv_misc_food_legion_pickledstormray.jpg",
        category: "Mastery",
        rank: {
            selected: 3,
            options: [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3}
            ]
        },
        stat: 275,
        recipe: [{id: 124110, quantity: 5}, {id: 9133588, quantity: 3}],
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    133567: {
        id: 133567,
        name: "Barracuda Mrglgagh",
        image: "/icons/food/inv_misc_food_legion_barracudamrglgagh.jpg",
        category: "Mastery",
        rank: {
            selected: 3,
            options: [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3}
            ]
        },
        stat: 300,
        recipe: [{id: 124120, quantity: 5}, {id: 124112, quantity: 5}, {id: 9133590, quantity: 4}, {id: 9133591, quantity: 1}],
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    133572: {
        id: 133572,
        name: "Nightborne Delicacy Platter",
        image: "/icons/food/inv_misc_food_legion_nightbornedelicacyplatter.jpg",
        category: "Mastery",
        rank: {
            selected: 3,
            options: [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3}
            ]
        },
        stat: 375,
        recipe: [{id: 8133567, quantity: 1}, {id: 129100, quantity: 20}, {id: 124105, quantity: 1},
            {id: 124121, quantity: 5}, {id: 9133592, quantity: 10}],
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    // Misc food // TODO: More misc food?
    133564: {
        id: 133564,
        name: "Spiced Rib Roast",
        category: "MISC",
        image: "/icons/food/inv_misc_food_legion_spicedribroast.jpg",
        rank: {
            selected: 3,
            options: [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3}
            ]
        },
        stat: 0,
        recipe: [{id: 124119, quantity: 5}, {id: 9133589, quantity: 5}],
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    133569: {
        id: 133569,
        name: "Drogbar Style Salmon",
        image: "/icons/food/inv_misc_food_legion_drogbarstylesalmon.jpg",
        category: "MISC",
        rank: {
            selected: 3,
            options: [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3}
            ]
        },
        stat: 0,
        recipe: [{id: 124109, quantity: 5}, {id: 9133592, quantity: 10}, {id: 9133589, quantity: 4}, {id: 9133593, quantity: 10}],
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    },
    // Feasts
    133578: {
        id: 133578,
        name: "Hearty Feast",
        category: "Feast",
        image: "/icons/feast/inv_misc_food_legion_heartyfeast.jpg",
        rank: {
            selected: 3,
            options: [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3}
            ]
        },
        stat: 400,
        recipe: [{id: 8133557, quantity: 6}, {id: 8133561, quantity: 6}, {id: 8133563, quantity: 6},
            {id: 8133562, quantity: 6}, {id: 8133564, quantity: 6}, {id: 133680, quantity: 6}],
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    }, // NOTE: Using 6 so you can minus the current rank to get the actual quantity
    133579: {
        id: 133579,
        name: "Lavish Suramar Feast",
        image: "/icons/feast/inv_misc_food_legion_lavishsuramarfeast.jpg",
        category: "Feast",
        stat: 500,
        rank: {
            selected: 3,
            options: [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3}
            ]
        },
        recipe: [{id: 8133565, quantity: 6}, {id: 8133566, quantity: 6}, {id: 8133568, quantity: 6},
            {id: 8133567, quantity: 6}, {id: 8133569, quantity: 6}, {id: 133680, quantity: 6}],
        auctions: [{quantity: 20, buyout: 2950200},{quantity: 20, buyout: 2950200}]
    }, // NOTE: Using 6 so you can minus the current rank to get the actual quantity
};

/** OLD API STATIC OBJECTS, TO BE DELETED SOON(TM) */

// SIMPLE REAGENTS
exports.reagents = {
    124101 : { "id" : 124101, "name" : "Aethril" },
    124102: { "id" : 124102, "name" : "Dreamleaf" },
    124103: { "id" : 124103, "name" : "FoxFlower" },
    124104: { "id" : 124104, "name" : "Fjarnskaggl" },
    124105: { "id" : 124105, "name" : "Starlight Rose" },
    124107: { "id" : 124107, "name" : "Cursed Queenfish" },
    124108: { "id" : 124108, "name" : "Mossgill Perch" },
    124109: { "id" : 124109, "name" : "Highmountain Salmon" },
    124110: { "id" : 124110, "name" : "Stormray" },
    124111: { "id" : 124111, "name" : "Runescale Koi" },
    124112: { "id" : 124112, "name" : "Black Barracuda" },
    124117: { "id" : 124117, "name" : "Lean Shank" },
    124118: { "id" : 124118, "name" : "Fatty Bearsteak" },
    124119: { "id" : 124119, "name" : "Big Gamy Ribs" },
    124120: { "id" : 124120, "name" : "Leyblood" },
    124121: { "id" : 124121, "name" : "Wildfowl Egg" },
    128304: { "id" : 128304, "name" : "Yseralline Seed" },
    129100: { "id" : 129100, "name" : "Gem Chips" },
    133607: { "id" : 133607, "name" : "Silver Mackaeral" },
    133680: { "id" : 133680, "name" : "Slice of Bacon" }
};

// FOOD ITEMS
exports.foodItems = [
    // Crit
    { "id" : 133557, "name" : "Salt and Pepper Shank" }, // 225
    { "id" : 133565, "name" : "Leybeque Ribs" }, // 300
    { "id" : 133565, "name" : "The Hungry Magister" }, // 375
    // Haste
    { "id" : 133561, "name" : "Deep-Fried Mossgill" }, // 225
    { "id" : 133566, "name" : "Suramar Surf and Turf" }, // 300
    { "id" : 133571, "name" : "Azshari Salad" }, // 375
    // Vers
    { "id" : 133563, "name" : "Faronaar Fizz" }, // 225
    { "id" : 133568, "name" : "Koi-Scented Stormray" }, // 300
    { "id" : 133568, "name" : "Seed-Battered Fish Plate" }, // 375
    // Mastery
    { "id" : 133562, "name" : "Pickled Stormray" }, // 225
    { "id" : 133567, "name" : "Barracude Mrglgagh" }, // 300
    { "id" : 133567, "name" : "Nightborne Delicacy Platter" }, // 375

    // Reagents
    { "id" : 124101, "name" : "Aethril" },
    { "id" : 124102, "name" : "Dreamleaf" },
    { "id" : 124103, "name" : "FoxFlower" },
    { "id" : 124104, "name" : "Fjarnskaggl" },
    { "id" : 124105, "name" : "Starlight Rose" },
    { "id" : 124107, "name" : "Cursed Queenfish" },
    { "id" : 124108, "name" : "Mossgill Perch" },
    { "id" : 124109, "name" : "Highmountain Salmon" },
    { "id" : 124110, "name" : "Stormray" },
    { "id" : 124111, "name" : "Runescale Koi" },
    { "id" : 124112, "name" : "Black Barracuda" },
    { "id" : 124117, "name" : "Lean Shank" },
    { "id" : 124118, "name" : "Fatty Bearsteak" },
    { "id" : 124119, "name" : "Big Gamy Ribs" },
    { "id" : 124120, "name" : "Leyblood" },
    { "id" : 124121, "name" : "Wildfowl Egg" },
    { "id" : 128304, "name" : "Yseralline Seed" },
    { "id" : 129100, "name" : "Gem Chips" },
    { "id" : 133607, "name" : "Silver Mackaeral" }
];

// ALCHEMY ITEMS
exports.alchemyItems = [
    // Flasks/Potions
    { "id" : 127851, "name" : "Spirit Cauldron" }, // 5 of each flask
    { "id" : 127847, "name" : "Flask of the Whispered Pact" }, // Fjarnskaggl, Dreamleaf
    { "id" : 127848, "name" : "Flask of the Seventh Demon" }, // Fjarnskaggl, Foxflower
    { "id" : 127849, "name" : "Flask of the Countless Armies" }, // Aethril, Foxflower
    { "id" : 127850, "name" : "Flask of Ten Thousand Scars" }, // Aethril, Dreamleaf
    { "id" : 127846, "name" : "Leytorrent Potion" }, // Aethril, Dreamleaf
    { "id" : 127835, "name" : "Ancient Mana Potion" },
    // Reagents
    { "id" : 124105, "name" : "Starlight Rose" },
    { "id" : 124101, "name" : "Aethril" },
    { "id" : 124102, "name" : "Dreamleaf" },
    { "id" : 124103, "name" : "FoxFlower" },
    { "id" : 124104, "name" : "Fjarnskaggl" },
    { "id" : 128304, "name" : "Yseralline Seed" }
];

// HEARTY FEAST
exports.heartyFeastItems = [
    { "id" : 133578, "name" : "Hearty Feast" },
    { "id" : 133557, "name" : "Salt and Pepper Shank" },
    { "id" : 124117, "name" : "Lean Shank" },
    { "id" : 133561, "name" : "Deep-Fried Mossgill" },
    { "id" : 124108, "name" : "Mossgill Perch" },
    { "id" : 133562, "name" : "Pickled Stormray" },
    { "id" : 124110, "name" : "Stormray" },
    { "id" : 133563, "name" : "Faronaar Fizz" },
    { "id" : 124121, "name" : "Wildfowl Egg" },
    { "id" : 133564, "name" : "Spiced Rib Roast" },
    { "id" : 124119, "name" : "Big Gamy Ribs" },
    { "id" : 133680, "name" : "Slice of Bacon" }
];

// SURAMAR FEAST
exports.lavishSuramarFeastItems = [
    { "id" : 133579, "name" : "Lavish Suramar Feast" },
    { "id" : 133565, "name" : "Leybeque Ribs" },
    { "id" : 124119, "name" : "Big Gamy Ribs" },
    { "id" : 124120, "name" : "Leyblood" },
    { "id" : 133566, "name" : "Suramar Surf and Turf" },
    { "id" : 124117, "name" : "Lean Shank" },
    { "id" : 124111, "name" : "Runescale Koi" },
    { "id" : 133567, "name" : "Barracuda Mrglgagh" },
    { "id" : 124112, "name" : "Black Barracuda" },
    { "id" : 133568, "name" : "Koi-Scented Stormray" },
    { "id" : 124110, "name" : "Stormray" },
    { "id" : 133569, "name" : "Drogbar Style Salmon" },
    { "id" : 124109, "name" : "Highmountain Salmon" },
    { "id" : 133680, "name" : "Slice of Bacon" }
];

