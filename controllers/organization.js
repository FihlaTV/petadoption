var Promise = require('bluebird')
var Organization = require('./../models/organization')
var User = require('./../models/user')

var OrganizationController = {
  // index: function(req, res) {
  // },
  show: (req, res) => {
    Organization.findById(req.params.id).execAsync()
      .then((org) => {
        res.render('org/show', { userActive: req.user, org: org })
      })
      .catch(err => {
        console.log(err)
        res.render('error', { error: err })
      })
  },
  create: (req, res) => {
    var organization = new Organization()

    for (var key in req.body) {
      organization[key] = req.body[key]
    }

    organization.save((err, organization) => {
      if (err)
        res.send(err)

      res.json(organization)
    // res.json({ message: 'user created!' })
    })
  },
  update: function (req, res) {
    Organization.findById(req.body._id).execAsync()
      .then((org) => {
        for (var key in req.body) {
          org[key] = req.body[key]
        }

        org.save((err, newOrg) => {
          if (err)
            res.render('error', { error: err })

          res.render('org/show', { userActive: req.user, org: newOrg })
        })
      })
      .catch(err => {
        console.log(err)
        res.render('error', { error: err })
      })
  },
// patch: function(req, res) {
// },
// destroy: function(req, res) {
// }
}

module.exports = OrganizationController
