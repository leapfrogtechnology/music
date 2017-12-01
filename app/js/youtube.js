var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var TWO_SECONDS = 2000;

function onYouTubeIframeAPIReady() {
  if (!localStorage.getItem('playlist')) {
    setTimeout(onYouTubeIframeAPIReady, TWO_SECONDS)
  } else {


  var playlist = JSON.parse(localStorage.getItem('playlist'));
  var videoIds = playlist.slice(1, playlist.length).join(',');
  var videoId = playlist[0];

  player = new YT.Player('player', {
    videoId: videoId,
    suggestedQuality: 'default',
    playerVars: {
      playlist: videoIds,
      iv_load_policy: 0,
      listType: 'playlist',
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      showinfo: 1,
      
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });

}
}

function onPlayerReady(event) {
  event.target.playVideo();
 // $("iframe#player").addClass("embed-responsive-item");
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED && localStorage.getItem('newPlaylist')) {
    var newPlaylist = JSON.parse(localStorage.getItem('newPlaylist')).join(',');
    event.target.loadPlaylist(newPlaylist);

    setTimeout(function() {
      event.target.playVideo();
    }, TWO_SECONDS);

    localStorage.setItem('playlist', localStorage.getItem('newPlaylist'));
    localStorage.removeItem('newPlaylist');
  }
}
