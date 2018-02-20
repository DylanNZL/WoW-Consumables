Vue.component('s-template', {
    template: "#suramar-template",
    props: ['current'],
    methods: {
        suramarRank: function(rank) {
            eventHub.$emit('suramarRank', rank);
        }
    }
});

let eventHub = new Vue();

new Vue({
    el: '#app',
    data: {
        suramar : {
            ranks: {
                feast: 3,
                ribs: 3,
                surfTurf: 3,
                barracuda: 3,
                stormray: 3,
                salmon: 3
            },
            data: 0
        },
        hearty : {
            ranks: {
                feast: 3,
                shank: 3,
                mossgill: 3,
                fizz: 3,
                ribs: 3
            },
            data: 0
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
                console.log(data);
                console.log("asdlnadsflkjn");
                vthis.suramar.data = data;
                vthis.suramar.data.items.forEach(function(item) {
                    item.averageBuyout = averageBuyout(item.auctions);
                })
            })
        },
        loadHeartyPrices: function () {
            let url = '/api/heartyFeast';
            let vthis = this;
            $.ajax({
                dataType: "jsonp",
                url: url
            }).done(function (data) {
                console.log(data);
                vthis.hearty.data = data;
                vthis.hearty.data.items.forEach(function(item) {
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
        suramarRank : function(rank) {
            if (rank === 1 || rank === 2 || rank === 3) {
                this.suramar.ranks.feast = rank;
                console.log(this.suramar.ranks.feast);
            } else {
                console.error("Recieved an invalid rank for suramar feast: " + rank);
            }
        },

    },
    created: function() {
        eventHub.$on('suramarRank', this.suramarRank);
    },
    beforeDestroy: function() {
        eventHub.$off('suramarRank', this.suramarRank);
    },
    mounted: function() {
        this.loadSuramarPrices();
        this.loadHeartyPrices();
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