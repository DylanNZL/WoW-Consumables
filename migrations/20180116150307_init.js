
exports.up = function(knex, Promise) {
    return Promise.all([
        //{"auc":1591238360,"item":124437,"owner":"NAME","ownerRealm":"Frostmourne","bid":6650000,"buyout":7000000,"quantity":200,"timeLeft":"LONG","rand":0,"seed":0,"context":0},
        knex.schema.createTable('auctions', function(table) {
            table.biginteger('auc'); // auc = auction id in the context of the AH
            table.integer('item');
            table.string('owner');
            table.string('ownerRealm');
            table.float('bid');
            table.float('buyout');
            table.integer('quantity');
            table.string('timeLeft');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        }),
        knex.schema.createTable('items', function(table) {
            table.increments('id');
            table.string('name');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
    ]);
};

exports.down = function(knex, Promise) {
  
};
