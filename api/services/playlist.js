var snakeize = require('snakeize');
var camelize = require('camelize');
var Playlist = require('../models/Playlist');
var socket = require('../controllers/socket.js');

var YOUTUBE_URL_REGEX =
/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/g

exports.save = async function(payload) {
  var message = payload.item.message.message;
  var user = payload.item.message.from;

  var youtubeUrls = message.match(YOUTUBE_URL_REGEX)

  var promises = youtubeUrls.map(url => {
    var song = {
      url: url,
      hipchatUserId: user.id,
      hipchatUserName: user.name,
      date: payload.item.message.date
    };

    return new Playlist(snakeize(song)).save();
  })

  var songs = await Promise.all(promises);
  songs = songs.map((song) => camelize(song.toJSON()));
  socket.emit(songs);

  return songs;
}
