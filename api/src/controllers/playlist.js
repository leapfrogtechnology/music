var youtubeService = require('../services/youtube');
var playlistService = require('../services/playlist');

module.exports = async function (req, res) {
  if (req.body.item.message.message && req.body.item.message.from &&
    req.body.item.message.date) {
    var hipchat = require('../lib/hipchat')(req.body.addon);

    var videoId = await playlistService.save(req.body);
    var videoDetails = await youtubeService.fetchVideoDetails(videoId);

    var message = {
      videoId: videoId || '',
      url: `https://www.youtube.com/watch?v=${videoId}`,
      title: videoDetails && videoDetails.items[0] && videoDetails.items[0].snippet && videoDetails.items[0].snippet.title || '',
      description: videoDetails && videoDetails.items[0] && videoDetails.items[0].snippet && videoDetails.items[0].snippet.description || '',
      thumbnail: videoDetails && videoDetails.items[0] && videoDetails.items[0].snippet &&
        videoDetails.items[0].snippet.thumbnails && videoDetails.items[0].snippet.thumbnails.default && videoDetails.items[0].snippet.thumbnails.default.url || ''
    };
    
    hipchat.sendYoutubeCard(req.clientInfo, req.body.item.room.id, message);

    res.sendStatus(200);
  }
};
