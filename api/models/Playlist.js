var bookshelf = require('../bookshelf');

var Playlist = bookshelf.Model.extend({
  tableName: 'playlist'
});

module.exports = Playlist;
