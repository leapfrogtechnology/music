var playlistService = require('../services/playlist');

module.exports = function(req, res) {
  if (req.body.item.message.message && req.body.item.message.from &&
      req.body.item.message.date) {
    res.json(playlistService.save(req.body));
  }
  // console.log(req.body);
  // console.log('0-----')
  // console.log(req.body.item.message.from);
  // console.log('0-----')
  // console.log(req.body.item.room.links);
};
