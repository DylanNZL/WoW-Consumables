const bookshelf = require('../bookshelf');

const model = bookshelf.Model.extend({
    tableName: 'auctions',
    idAttribute: null,
    hasTimestamps: false
});

module.exports = model;