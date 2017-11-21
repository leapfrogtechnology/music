var bookshelf = require('../bookshelf');

var PLAYLIST_QUERY = 'SELECT * FROM playlist ORDER BY date DESC LIMIT 25;';
var VIDEO_ID_REGEXP = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;

var Playlist = bookshelf.Model.extend({
  tableName: 'playlist',

  latest: async function() {
    var playlist = await bookshelf.knex.raw(PLAYLIST_QUERY);
    var videoIds = playlist
      .filter(song => {
        var match = song.url.match(VIDEO_ID_REGEXP);

        return (match && match[7].length === 11);
      })
      .map(song => {
        var match = song.url.match(VIDEO_ID_REGEXP);

        return match[7];
      });

    return videoIds;
  },

  shuffle: function(playlist) {
    var array = playlist;
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
});

module.exports = Playlist;
