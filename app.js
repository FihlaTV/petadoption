var Promise = require('bluebird')
var express = require('express')
var path = require('path')
var favicon = require('static-favicon')
var port = process.env.PORT || 3000
var mongoose = require('mongoose')
var passport = require('passport')
var flash = require('connect-flash')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')
var methodOverride = require('method-override')

Promise.promisifyAll(mongoose.Model)
Promise.promisifyAll(mongoose.Model.prototype)
Promise.promisifyAll(mongoose.Query.prototype)

var app = express()

// - DB Connection ---------------------------------

var configDB = require('./config/database.js')

mongoose.connect(configDB.mongoURI[app.settings.env]) // connect to our database

// console.log(mongoose.connection.readyState)

mongoose.connection.on('open', function (ref) {
  console.log('Connected to mongo server: ' + configDB.mongoURI[app.settings.env])
})

mongoose.connection.on('error', function (err) {
  console.log('Could not connect to mongo server: ' + configDB.mongoURI[app.settings.env])
  console.log(err)
})

// - End DB Connection -----------------------------

require('./config/passport')(passport) // pass passport for configuration

app.use(favicon())
app.use(logger('dev'))

// set up our express application
// app.use(morgan('dev')) // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()) // get information from html forms
app.use(methodOverride('_method'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade') // set up jade for templating

// required for passport
app.use(session({ secret: 'PETbr2016#' })) // session secret
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(express.static(path.join(__dirname, 'public')))

// - Routes ----------------------------------------

require('./routes.js')(app, passport)

// var routes = require('./routes/index')
// var users = require('./routes/users')

// app.use('/', routes)
// app.use('/users', users)
// app.use('/users/:id', users)

// - End Routes ------------------------------------

// / catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.locals.pretty = true
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
