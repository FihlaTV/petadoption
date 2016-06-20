var Promise = require('bluebird')
var User = require('./../models/user')
var TemporaryPlace = require('./../models/temporaryPlace')

var TemporaryPlaceController = {
  index: (req, res) => {
    TemporaryPlace.find({organizationId: req.body.orgId}).execAsync()
      .then((tempPlaces) => {
        res.render('temporaryPlace/index', { userActive: req.user, tempPlaces: tempPlaces })
      })
      .catch((err) => {
        console.log(err)
        res.render('error', { error: err })
      })
  },
  new: (req, res) => {
    User.find({organizationId: req.user.organizationId}).execAsync()
      .then((users) => {
        res.render('temporaryPlace/new', { userActive: req.user, users: users })
      })
      .catch((err) => {
        console.log(err)
        res.render('error', { error: err })
      })
  },
  show: (req, res) => {
    TemporaryPlace.findById(req.params.id).execAsync()
      .then((tempPlace) => {
        User.find({organizationId: tempPlace.organizationId}).execAsync()
          .then((users) => {
            res.render('temporaryPlace/show', { userActive: req.user, users: users, tempPlace: tempPlace})
          })
      })
      .catch((err) => {
        console.log(err)
        res.render('error', { error: err })
      })
  },
  create: (req, res) => {
    User.find({organizationId: req.user.organizationId}).execAsync()
      .then((users) => {
        var temporaryPlace = new TemporaryPlace()

        for (var key in req.body) {
          temporaryPlace[key] = req.body[key]
        }

        temporaryPlace.organizationId = req.user.organizationId

        temporaryPlace.save((err, tempPlace) => {
          if (err)
            res.render('error', { error: err })

          res.render('temporaryPlace/show', { userActive: req.user, users: users, tempPlace: tempPlace })
        })
      })
      .catch((err) => {
        console.log(err)
        res.render('error', { error: err })
      })
  },
  update: (req, res) => {
    TemporaryPlace.findById(req.params.id).execAsync()
      .then((tempPlace) => {

        for (var key in req.body) {
          tempPlace[key] = req.body[key]
        }

        tempPlace.save((err, tempPlace) => {
          if (err)
            res.render('error', { error: err })

          res.json(tempPlace)
        })
      })
      .catch((err) => {
        console.log(err)
        res.render('error', { error: err })
      })
  }
}

module.exports = TemporaryPlaceController
