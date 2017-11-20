;(function() {
  var socket = io('http://localhost:3000', { reconnect: true });

  socket.on('connection', function(payload) {
    localStorage.setItem('playlist', JSON.stringify(payload));
  });

  socket.on('newPlaylist', function(payload) {
    localStorage.setItem('newPlaylist', JSON.stringify(payload));
  });
})();
