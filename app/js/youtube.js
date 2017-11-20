var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var ONE_SECOND = 1000;
var TWO_SECONDS = 2000;

function onYouTubeIframeAPIReady() {
  if (!localStorage.getItem('playlist')) {
    setTimeout(onYouTubeIframeAPIReady, TWO_SECONDS)
  }

  var playlist = JSON.parse(localStorage.getItem('playlist'));
  var videoIds = playlist.slice(1, playlist.length).join(',');
  var videoId = playlist[0];

  player = new YT.Player('player', {
    videoId: videoId,
    suggestedQuality: 'default',
    playerVars: {
      loop: 1,
      autoplay: 1,
      controls: 1,
      showInfo: 1,
      disablekb: 0,
      playlist: videoIds
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED && localStorage.getItem('newPlaylist')) {
    var newPlaylist = JSON.parse(localStorage.getItem('newPlaylist')).join(',');
    event.target.loadPlaylist(newPlaylist);

    setTimeout(function() {
      event.target.playVideo();
    }, ONE_SECOND);

    localStorage.setItem('playlist', localStorage.getItem('newPlaylist'));
    localStorage.removeItem('newPlaylist');
  }
}
