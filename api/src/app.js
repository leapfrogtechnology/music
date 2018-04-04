var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var errorHandler = require('errorhandler');
var morgan = require('morgan');
var ac = require('atlassian-connect-express');
process.env.PWD = process.env.PWD || process.cwd();
var expiry = require('static-expiry');
var hbs = require('express-hbs');
var http = require('http');
var path = require('path');
var os = require('os');

var staticDir = path.join(__dirname, 'public');
var viewsDir = __dirname + '/views';
var routes = require('./routes');
var socket = require('./controllers/socket');
var app = express();
var addon = ac(app);
var port = addon.config.port();
var devEnv = app.get('env') == 'development';

var hipchat = require('atlassian-connect-express-hipchat')(addon, app);

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

var whiteList = process.env.APP_URL;

app.use(cors({origin: whiteList, credentials: true}));
if (devEnv) app.use(errorHandler());

routes(app, addon);

var server = http.createServer(app).listen(port, function(){
  console.log('Add-on server running at '+ (addon.config.localBaseUrl()||('http://' + (os.hostname()) + ':' + port)));
  if (devEnv) addon.register();
});

socket.init(server);
