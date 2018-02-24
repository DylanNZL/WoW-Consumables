const bookshelf = require('../bookshelf');

const model = bookshelf.Model.extend({
    tableName: 'ah_history',
    idAttribute: 'id',
    hasTimestamps: false
});

module.exports = model;