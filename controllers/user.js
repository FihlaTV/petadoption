var User = require('./../models/user')

var UserController = {
  index: function (req, res) {
    User.find({ flActive: true }, function (err, users) {
      if (err)
        res.render('error', { error: err })

      // res.json(users)
      res.render('user/index', { userActive: req.user, users: users })
    })
  },
  show: function (req, res) {
    User.findById(req.params.id, function (err, user) {
      if (err)
        res.render('error', { error: err })

      res.json(user)
    // res.render('users/show', { user: user })
    })
  },
  create: function (req, res) {
    var user = new User()

    for (var key in req.body) {
      user[key] = req.body[key]
    }

    user.save(function (err, user) {
      if (err)
        res.render('error', { error: err })

      res.json(user)
    // res.json({ message: 'user created!' })
    })
  },
  update: function (req, res) {
    User.findById(req.params.id, function (err, user) {
      if (err)
        res.render('error', { error: err })

      for (var key in req.body) {
        user[key] = req.body[key]
      }

      user.save(function (err) {
        if (err)
          res.render('error', { error: err })

        res.json(user)
      // res.json({ message: 'User updated!' })
      })
    })
  },
  patch: function (req, res) {
    User.findById(req.params.id, function (err, user) {
      if (err)
        res.render('error', { error: err })

      var op = req.body.op
      var path = req.body.path.substring(1)
      var value = req.body.value

      switch (op) {
        case 'replace':
          user[path] = value
          break
      /*
      case 'add':
        break
      case 'remove':
        break
      case 'move':
        break
      case 'copy':
        break
      case 'test':
        break
      */
      }

      user.save(function (err) {
        if (err)
          res.render('error', { error: err })

        res.json(user)
      // res.json({ message: 'User updated!' })
      })
    })
  },
  destroy: function (req, res) {
    User.remove({_id: req.params.id}, function (err, removed) {
      if (err)
        res.render('error', { error: err })

      res.json(removed) // qtt of removed users
    // res.json({ message: 'Successfully deleted' })
    })
  }
// ,
// profile: function(req, res) {
//   if (req.user.stage !== 3){
//     res.render('user/profile', { userActive: req.user })
//   }else{
//     res.redirect('/dashboard')
//   }
// }
}

module.exports = UserController
