var User = require('./../models/user')
var TemporaryPlace = require('./../models/temporaryPlace')

var TemporaryPlaceController = {
  index: (req, res) => {
    TemporaryPlace.find({organizationId: req.params.id}).execAsync()
      .then((tempPlaces) => {
        res.render('temporaryPlace/index', { userActive: req.user, tempPlaces: tempPlaces })
      })
      .catch((err) => {
        console.log(err)
        res.render('error', { error: err })
      })
  },
  show: function (req, res) {
    TemporaryPlace.findById(req.params.id).execAsync()
      .then(function (tempPlace) {
        res.render('temporaryPlace/show', { userActive: req.user, tempPlace: tempPlace })
      })
      .catch(function (err) {
        console.log(err)
        res.render('error', { error: err })
      })
  },
// create: function(req, res) {
//   User.findById(req.user._id).execAsync()
//   .then(function(user) {
//     for (var key in req.body.user) {
//       user[key] = req.body.user[key]
//     }
//     user['stage'] = 1
//     return user.saveAsync()
//   })
//   .then(function(user) {
//     var org = new Organization()
//     for (var key in req.body.organization) {
//       org[key] = req.body.organization[key]
//     }
//     return org.saveAsync()
//   })
//   .then(function(org){
//     req.body.shelter.forEach(function(shelter, index){
//       var newShelter = new Shelter()
//       newShelter.organizationId = org._id
//       for (var key in shelter) {
//         newShelter[key] = shelter[key]
//       }
//       newShelter.saveAsync()
//     })
//     return res.redirect('/dashboard'); 
//   })
//   .catch(function(err){
//     console.log('error:', err)
//     return err
//   })
// }
}

module.exports = TemporaryPlaceController
