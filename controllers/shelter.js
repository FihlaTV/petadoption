var Shelter = require('./../models/shelter')

var ShelterController = {
  // index: function(req, res) {
  //   User.find({ flActive: true }, function(err, users) {
  //     if (err)
  //       res.send(err)

  //     res.json(users)
  //     //res.render('users/index', { users: users })
  //   })
  // },
  // show: function(req, res) {
  //   User.findById(req.params.id, function(err, user) {
  //     if (err)
  //       res.send(err)

  //     res.json(user)
  //     //res.render('users/show', { user: user })
  //   })
  // },
  create: function (req, res) {
    var shelter = new Shelter()

    for (var key in req.body) {
      shelter[key] = req.body[key]
    }

    shelter.save(function (err, shelter) {
      if (err)
        res.send(err)

      res.json(shelter)
    // res.json({ message: 'user created!' })
    })
  },
  // update: function(req, res) {
  //   User.findById(req.params.id, function(err, user) {
  //     if (err)
  //       res.send(err)

  //     for (var key in req.body) {
  //       user[key] = req.body[key]
  //     }

  //     user.save(function(err) {
  //       if (err)
  //         res.send(err)

  //       res.json(user)
  //       //res.json({ message: 'User updated!' })
  //     })
  //   })
  // },
  // patch: function(req, res) {
  //   User.findById(req.params.id, function(err, user) {
  //     if (err)
  //       res.send(err)

  //     var op = req.body.op
  //     var path = req.body.path.substring(1)
  //     var value = req.body.value

  //     switch(op) {
  //       case 'replace':
  //         user[path] = value
  //         break

  //       case 'add':
  //         break
  //       case 'remove':
  //         break
  //       case 'move':
  //         break
  //       case 'copy':
  //         break
  //       case 'test':
  //         break

  //     }

  //     user.save(function(err) {
  //       if (err)
  //         res.send(err)

  //       res.json(user)
  //       //res.json({ message: 'User updated!' })
  //     })
  //   })
  // },
  // destroy: function(req, res) {
  //   User.remove({_id: req.params.id}, function(err, removed) {
  //     if (err)
  //       res.send(err)

//     res.json(removed) //qtt of removed users
//     //res.json({ message: 'Successfully deleted' })
//   })
// },
// profile: function(req, res) {
//   if (req.user.stage !== 3){
//     res.render('user/profile', { user: req.user })
//   }else{
//     res.redirect('/dashboard')
//   }
// }
}

module.exports = ShelterController
