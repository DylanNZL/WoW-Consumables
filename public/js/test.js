new Vue({
    el: '#app',
    data: {
        dbUpdated: "Error",
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
                // vthis.items.allReagents.forEach(function(item) {
                //     item.buyoutData = buyoutData(item.auctions);
                // });
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
                vthis.items.allCraftables = data.items;
                // vthis.items.allReagents.forEach(function(item) {
                //     item.buyoutData = buyoutData(item.auctions);
                // });
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
                // vthis.items.allReagents.forEach(function(item) {
                //     item.buyoutData = buyoutData(item.auctions);
                // });
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