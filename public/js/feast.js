new Vue({
    el: '#app',
    data: {
        suramar : {},
        hearty : {}
    },
    methods: {
        loadSuramarPrices: function () {
            let url = "/api/lavishSuramarFeast";
            let vthis = this;
            $.ajax({
                dataType: "jsonp",
                url: url
            }).done(function (data) {
                vthis.suramar = data;
            })
        },
        loadHeartyPrices: function () {
            let url = '/api/heartFeast';
            let vthis = this;
            $.ajax({
                dataType: "jsonp",
                url: url
            }).done(function (data) {
                vthis.hearty = data;
                vthis.hearty.items.forEach(function(item) {
                    item.averageBuyout = averageBuyout(item.auctions);
                })
            })
        }
    }
});

function averageBuyout(auctions) {
    let count = 0;
    let average = 0.0;

    auctions.forEach(function (auction) {
        count += auction.quantity;
        average += auction.buyout;
    });

    return average / count;
}