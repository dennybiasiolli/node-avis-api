var __DEBUG__ = true;

var express = require('express');
var app = express();

var flash = require('connect-flash');
var passport = require('passport');

var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


require('./config/passport')(passport); // pass passport for configuration


app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
if(__DEBUG__){
    app.use(bodyParser.json({ limit: '5mb' }));
    app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));
}
else{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
}

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');


// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


var routes = require('./app/routes/routes')(passport);


app.use('/', routes);
app.use('/', express.static(path.join(__dirname, 'public')));

//var jwt = require('./controllers/jsonwebtoken');
//app.use('/avis', jwt.isAuthorizedHTTP);
//app.use('/avis', jwt.isTokenValid);
//app.use('/avis', express.static(path.join(__dirname, 'public')));

var api = require('./app/routes/api');
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



module.exports = app;
