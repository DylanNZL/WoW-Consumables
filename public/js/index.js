new Vue({
    el: '#app',
    data: {
        dbUpdated: "Error"
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
        }
    },
    created: function() {
        this.checkDbUpdated();
    }
});