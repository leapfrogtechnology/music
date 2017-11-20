var camelize = require('camelize');
var socketIo = require('socket.io');
var bookshelf = require('../bookshelf');
var Playlist = require('../models/Playlist');


exports.init = function(server) {
  socket = socketIo(server);

  socket.on('connection', async function (socket) {
    var playlist = new Playlist;
    var latestPlaylist = await playlist.latest();

    socket.emit('connection', latestPlaylist);
  });
}

exports.emit = function(payload) {
  socket.emit('newPlaylist', payload);
}

function extractVideoId(url) {
  return null;
}
