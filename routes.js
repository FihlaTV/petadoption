var dashboard = require('./controllers/dashboard')
var user = require('./controllers/user')
var organization = require('./controllers/organization')
var shelter = require('./controllers/shelter')
var profile = require('./controllers/profile')
var tempplace = require('./controllers/temporaryPlace')
//
module.exports = function (app, passport) {
  // =====================================
  // Dashboard ===========================
  // =====================================
  //
  app.get('/dashboard', isLoggedIn, dashboard.index)
  // app.get('/users/:id', user.show)
  // app.post('/users', user.create)
  // app.put('/users/:id', user.update)
  // app.patch('/users/:id', user.patch)
  // app.delete('/users/:id', user.destroy)
  //
  // =====================================
  // Shelter =============================
  // =====================================
  //
  app.get('/shelters', isLoggedIn, shelter.index)
  app.get('/shelters/new', isLoggedIn, shelter.new)
  //
  // =====================================
  // Temporary Place =====================
  // =====================================
  //
  app.get('/tempplaces', isLoggedIn, tempplace.index)
  app.get('/tempplaces/new', isLoggedIn, tempplace.new)
  app.get('/tempplaces/:id', isLoggedIn, tempplace.show)
  app.post('/tempplaces', isLoggedIn, tempplace.create)
  app.put('/tempplaces/:id', isLoggedIn, tempplace.update)
  //
  // =====================================
  // Org =================================
  // =====================================
  //
  app.get('/orgs/:id', isLoggedIn, organization.show)
  app.post('/orgs', isLoggedIn, organization.create)
  app.put('/orgs/:id', isLoggedIn, organization.update)
  //
  // =====================================
  // User ================================
  // =====================================
  //
  app.get('/users', isLoggedIn, user.index)
  app.get('/users/:id', isLoggedIn, user.show)
  app.post('/users', isLoggedIn, user.create)
  app.put('/users/:id', isLoggedIn, user.update)
  app.patch('/users/:id', isLoggedIn, user.patch)
  app.delete('/users/:id', isLoggedIn, user.destroy)

  // =====================================
  // Animal ==============================
  // =====================================
  //
  // app.get('/animal', animal.index)
  // app.get('/animal/:id', animal.show)
  // app.post('/animal', animal.create)
  // app.put('/animal/:id', animal.update)
  // app.patch('/animal/:id', animal.patch)
  // app.delete('/animal/:id', animal.destroy)

  //
  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', function (req, res) {
    if (req.isAuthenticated()) {
      if (req.user.stage != 1) {
        res.redirect('/profile')
      } else {
        res.redirect('/dashboard')
      }
    } else {
      res.redirect('/login')
    }
  })
  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function (req, res) {
    res.render('index', { message: req.flash('signupMessage') })
  })
  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }))
  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function (req, res) {
    res.render('index', { message: req.flash('loginMessage') })
  })
  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }))
  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedInProfile, profile.index)
  app.get('/profile/:id', isLoggedInProfile, profile.show)
  app.post('/profile', isLoggedInProfile, profile.create)
  // =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  // app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }))
  // // handle the callback after facebook has authenticated the user
  // app.get('/auth/facebook/callback',
  //   passport.authenticate('facebook', {
  //       successRedirect : '/profile',
  //       failureRedirect : '/'
  //   }
  // ))
  // =====================================
  // TWITTER ROUTES ======================
  // =====================================
  // route for twitter authentication and login
  // app.get('/auth/twitter', passport.authenticate('twitter'))
  // // handle the callback after twitter has authenticated the user
  // app.get('/auth/twitter/callback',
  //   passport.authenticate('twitter', {
  //       successRedirect : '/profile',
  //       failureRedirect : '/'
  //   })
  // )
  // =====================================
  // GOOGLE ROUTES =======================
  // =====================================
  // send to google to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
  // app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }))
  // // the callback after google has authenticated the user
  // app.get('/auth/google/callback',
  //   passport.authenticate('google', {
  //           successRedirect : '/profile',
  //           failureRedirect : '/'
  //   })
  // )
  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })
}
// route middleware to make sure a user is logged in
function isLoggedIn (req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    if (req.user.stage != 1) {
      res.redirect('/profile')
    } else {
      return next()
    }
  } else {
    res.redirect('/')
  }
}

function isLoggedInProfile (req, res, next) {
  if (req.isAuthenticated())
    return next()
  else
    res.redirect('/')
}
