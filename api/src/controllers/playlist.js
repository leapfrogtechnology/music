var youtubeService = require('../services/youtube');
var playlistService = require('../services/playlist');

module.exports = async function (req, res) {
  if (req.body.item.message.message && req.body.item.message.from &&
    req.body.item.message.date) {
    var hipchat = require('../lib/hipchat')(req.body.addon);
    var msg = await playlistService.save(req.body);
    var videoDetails = await youtubeService.fetchVideoDetails(msg.videoId);

    var message = {
      url: msg.url,
      videoId: msg.videoId,
      title: videoDetails.items[0].snippet.title,
      description: videoDetails.items[0].snippet.description,
      thumbnail: videoDetails.items[0].snippet.thumbnails.default.url
    };
    hipchat.sendYoutubeCard(req.clientInfo, req.body.item.room.id, message);

    res.sendStatus(200);
  }
};
