;(function() {
  var socket = io(_CONFIG.socket.host + ':' + _CONFIG.socket.port, { reconnect: true });

  socket.on('connection', function(payload) {
    localStorage.setItem('playlist', JSON.stringify(payload));
  });

  socket.on('newPlaylist', function(payload) {
    localStorage.setItem('newPlaylist', JSON.stringify(payload));
  });
})();
