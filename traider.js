var express = require('express'), //package.json
    cookieParser = require('cookie-parser'), //package.json
    expressSession = require('express-session') //package.json
    bodyParser = require('body-parser'); //package.json

var routes = require('./routes/routes.js'); //router.js
var MongoStore = require('connect-mongo')(expressSession);

createServer = function createServer() {

    var server = express();
    // specify middleware 
    server.use(bodyParser());
    server.use(express.static(__dirname + '/public'));
    server.use('/product/*', express.static(__dirname + '/public'));
    server.use('/basket/', express.static(__dirname + '/public'));

    server.use(cookieParser());
    server.use(expressSession({
        secret: 'fo8X9074&398234hkf_bfs78bUVSo',
        store: new MongoStore({
            url: 'mongodb://localhost:27017/traiderSession',
            autoRemove: 'native' // Default
        })
    }));


    // attach router handlers
    routes.attachHandlers(server); //, passport);

    return server;

};


var server = createServer();
var port = Number(process.env.PORT || 5000);
server.listen(port, function() {
    console.log("Listening on " + port);
});