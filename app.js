
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , api = require('./routes/api')
  , http = require('http')
  , path = require('path');

var app = module.exports = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.engine('.html', require('ejs').__express);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', routes.index);
app.get('/admin', routes.admin);
app.get('/partials/:name', routes.partials);
app.get('/adminPartials/:name', routes.adminPartials);


// JSON api
app.get('/api/paintings', api.paintings);
app.get('/api/painting/:id', api.painting);
app.post('/api/painting', api.addPainting);
// app.put('api/painting', api.editPainting);
// app.delete('api/painting/:id', api.removePaiting);
app.get('/api/mailinglist', api.mailinglist);
app.post('/api/subscriber', api.addSubscriber);

app.get('/admin/*', routes.admin);

// help out our angular routing
app.get('/about', routes.index);
app.get('/contact', routes.index);
app.get('/portfolio', routes.index);
app.get('/artwork/:id', routes.index);
// app.get('^(?!.*admin).*', routes.index);

//app.get('*', routes.index);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
