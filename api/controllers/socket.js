var camelize = require('camelize');
var socketIo = require('socket.io');
var bookshelf = require('../bookshelf');
var Playlist = require('../models/Playlist');

var PLAYLIST_QUERY = 'SELECT * FROM playlist ORDER BY date DESC LIMIT 25;';
var VIDEO_ID_REGEXP = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;

exports.init = function(server) {
  socket = socketIo(server);

  socket.on('connection', async function (socket) {
    var playlist = await bookshelf.knex.raw(PLAYLIST_QUERY)
    var youtubeVideoIds = playlist
      .filter(song => {
        var match = song.url.match(VIDEO_ID_REGEXP);

        return (match && match[7].length === 11);
      })
      .map(song => {
        var match = song.url.match(VIDEO_ID_REGEXP);

        return match[7];
      });

    socket.emit('connection', youtubeVideoIds);
  });
}

exports.emit = function(payload) {
  socket.emit('add-song', payload);
}

function extractVideoId(url) {
  return null;
}
