require('dotenv').config();
var axios = require('axios');
var config = require('../config/config');
var queryString = require('query-string');

exports.fetchVideoDetails = async function fetchVideoDetails(videoId) {
  var params = {
    q: videoId,
    part: config.snippet,
    key: config.YOUTUBE_API_KEY
  }
  var query = queryString.stringify(params);
  var url = 'https://www.googleapis.com/youtube/v3/search/?' + query;

  try{
    var response = await axios.get(url);

    return response.data;
  }
  catch(error) {
    console.log(error);
  }
}
