var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player, img;
var TWO_SECONDS = 2000;

function onYouTubeIframeAPIReady() {
  if (!localStorage.getItem('playlist')) {
    setTimeout(onYouTubeIframeAPIReady, TWO_SECONDS)
  } else {
    var playlist = JSON.parse(localStorage.getItem('playlist'));
    var videoIds = playlist.slice(1, playlist.length).join(',');
    var videoId = playlist[0];

    var backGroundImage = document.getElementsByClassName('background-image');
    img = document.createElement('img');
    img.src = 'https://img.youtube.com/vi/' + videoId + '/0.jpg';
    backGroundImage[0].appendChild(img);

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
        onError: onPlayerError,
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
  }
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerError(event) {
  var playlist = JSON.parse(localStorage.getItem('playlist'));

  // On error on content video blocked error play next video
  if (event.data === 150) {
    if (player.getPlaylistIndex() !== (playlist.length - 1)) {
      player.nextVideo();
    } else if (player.getPlaylistIndex() === (playlist.length - 1)) {
      player.playVideoAt(0);
    }
  }
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED && localStorage.getItem('newPlaylist')) {
    var newPlaylist = JSON.parse(localStorage.getItem('newPlaylist')).join(',');
    event.target.loadPlaylist(newPlaylist);
    setTimeout(function () {
      event.target.playVideo();
    }, TWO_SECONDS);

    localStorage.setItem('playlist', localStorage.getItem('newPlaylist'));
    localStorage.removeItem('newPlaylist');
  }

  if(event.data === YT.PlayerState.ENDED || event.data === YT.PlayerState.UNSTARTED) {
    var newVideoId = event.target.getVideoData().video_id;
    img.src = 'https://img.youtube.com/vi/' + newVideoId + '/0.jpg'
  }
}
