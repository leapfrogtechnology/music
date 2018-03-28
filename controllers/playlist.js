var playlistService = require('../services/playlist');

module.exports = async function(req, res) {
  // if (req.body.item.message.message && req.body.item.message.from &&
  //     req.body.item.message.date) {
    var thumbnail =  await playlistService.save(req.body);

    res.status(200).send(thumbnail);
  // }
};
