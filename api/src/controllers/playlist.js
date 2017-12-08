var playlistService = require('../services/playlist');

module.exports = async function(req, res) {
  if (req.body.item.message.message && req.body.item.message.from &&
      req.body.item.message.date) {
    await playlistService.save(req.body);
  }
};
