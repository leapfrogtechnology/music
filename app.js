var os = require('os');
// var http = require('http');
var path = require('path');
var https = require('https');
var morgan = require('morgan');
var express = require('express');
var hbs = require('express-hbs');
var expiry = require('static-expiry');
var bodyParser = require('body-parser');
var compression = require('compression');
var errorHandler = require('errorhandler');
var atlassianConnectExpress = require('atlassian-connect-express');

var routes = require('./routes');
var socket = require('./controllers/socket');

require('dotenv').config();
process.env.PWD = process.env.PWD || process.cwd();

var viewsDir = __dirname + '/views';
var staticDir = path.join(__dirname, 'public');

var app = express();
var port = process.env.PORT;
var addon = atlassianConnectExpress(app);
var devEnv = app.get('env') == 'development';
var hipchat = require('atlassian-connect-express')(addon, app);

var devEnv = app.get('env') == 'development';
app.set('port', port);
app.engine('hbs', hbs.express3({partialsDir: viewsDir}));
app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(morgan(devEnv ? 'dev' : 'combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());
app.use(addon.middleware());
app.use(expiry(app, {dir: staticDir, debug: devEnv}));
hbs.registerHelper('furl', function(url){ return app.locals.furl(url); });
app.use(express.static(staticDir));

if (devEnv) app.use(errorHandler());

routes(app, addon);

var server = https.Server(app);
socket.init(server);

server.listen(port, function(){
  console.log()
  console.log('Add-on server running at '+ (addon.config.localBaseUrl()||('http://' + (os.hostname()) + ':' + port)));

  if (devEnv) addon.register();
});

