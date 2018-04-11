require('dotenv').config();
var axios = require('axios');
var queryString = require('query-string');

exports.fetchVideoDetails = async function fetchVideoDetails(videoId) {
  var params = {
    q: videoId,
    part: process.env.SNIPPET,
    key: process.env.YOUTUBE_API_KEY
  }
  var query = queryString.stringify(params);
  var url = 'https://www.googleapis.com/youtube/v3/search/?' + query;
  var response = await axios.get(url);

  return response.data;
}
