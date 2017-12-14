var os = require('os');
var path = require('path');
var http = require('http');
var dotenv = require('dotenv');
var morgan = require('morgan');
var hbs = require('express-hbs');
var express = require('express');
var expiry = require('static-expiry');
var bodyParser = require('body-parser');
var compression = require('compression');
var errorHandler = require('errorhandler');
var addon = require('atlassian-connect-express')(app);

var routes = require('./routes');
var socket = require('./controllers/socket');

dotenv.config(__dirname + '/../.env');
var VIEWS_DIR = __dirname + '/views';
var STATIC_DIR = path.join(__dirname, 'public');
process.env.PWD = process.env.PWD || process.cwd();

var app = express();
var port = process.env.PORT;
var devEnv = app.get('env') == 'development';
var hipchat = require('atlassian-connect-express-hipchat')(addon, app);

app.engine('hbs', hbs.express3({partialsDir: VIEWS_DIR}));
app.set('view engine', 'hbs');
app.set('views', VIEWS_DIR);

app.set('port', process.env.PORT);
app.use(morgan(devEnv ? 'dev' : 'combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());
app.use(addon.middleware());
app.use(expiry(app, {dir: STATIC_DIR, debug: devEnv}));
hbs.registerHelper('furl', function(url) {
  return app.locals.furl(url);
});
app.use(express.static(STATIC_DIR));

if (devEnv) app.use(errorHandler());

routes(app, addon);

var server = http.Server(app);
socket.init(server);

server.listen(port, function() {
  console.log('Add-on server running at '+ (process.env.HOST || ('http://' + (os.hostname()) + ':' + port)));

  if (devEnv) addon.register();
});

