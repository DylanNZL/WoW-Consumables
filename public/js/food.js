Vue.component("f-template", {
    template: "#food-template",
    props: ["info", "items"],
    methods: {

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
            hungryMagister: {
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
        loadAlchemyItems: function() {
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
        this.loadAlchemyItems();
    },
    beforeDestroy: function() {
        eventHub.$off('rankChanged');
    },
    mounted: function() {

    }
});