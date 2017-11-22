var url = require('url');
var cors = require('cors');
var uuid = require('uuid');
var http = require('request');

var playlistController = require('./controllers/playlist');

module.exports = function (app, addon) {
  var hipchat = require('./lib/hipchat')(addon);

  app.get('/healthcheck', function (req, res) {
    res.send('OK');
  });

  app.get('/', function (req, res) {
    res.format(
      {
        'text/html': function() {
          var homepage = url.parse(addon.descriptor.links.homepage);

          if (homepage.hostname === req.hostname && homepage.path === req.path) {
            res.render('homepage', addon.descriptor);
          } else {
            res.redirect(addon.descriptor.links.homepage);
          }
        },
        'application/json': function() {
         res.redirect('/atlassian-connect.json');
        }
    });
  });

  app.get('/config', addon.authenticate(), function(req, res) {
    res.render('config', req.context);
  });

  app.get('/glance', cors(), addon.authenticate(), function(req, res) {
    res.json({
      label: {
        type: 'html',
        value: 'Leapfrog Music'
      },
      status: {
        type: 'lozenge',
        value: {
          label: 'NEW',
          type: 'error'
        }
      }
    });
  });

  app.post('/update_glance', cors(), addon.authenticate(), function(req, res) {
    res.json({
      label: {
        type: 'html',
        value: 'Leapfrog Music'
      },
      status: {
        type: 'lozenge',
        value: {
          label: 'All good',
          type: 'success'
        }
      }
    });
  });

  app.get('/sidebar', addon.authenticate(), function(req, res) {
    res.render('sidebar', {
      identity: req.identity
    });
  });

  app.post('/webhook', addon.authenticate(), playlistController);

  addon.on('installed', function (clientKey, clientInfo, req) {
    var message = addon.descriptor.name + ' add-on has been installed in this room';

    hipchat.sendMessage(clientInfo, req.body.roomId, message);
  });

  addon.on('uninstalled', function (id) {
    addon.settings.client.keys(id + ':*', function (err, rep) {
      rep.forEach(function (k) {
        addon.logger.info('Removing key:', k);
        addon.settings.client.del(k);
      });
    });
  });

};
