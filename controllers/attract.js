var User = require('./../models/user')
var Attract = require('./../models/attract')

var AttractController = {
  index: (req, res) => {
    Attract.find({organizationId: req.query.orgId}).execAsync()
      .then((attracts) => {
        res.render('attract/index', { userActive: req.user, attracts: attracts })
      })
      .catch((err) => {
        console.log(err)
        res.render('error', { error: err })
      })
  },
  create: (req, res) => {
    var attract = new Attract()

    for (var key in req.body) {
      attract[key] = req.body[key]
    }

    // attract.organizationId = req.params.orgId

    attract.save((err, attract) => {
      if (err)
        res.render('error', { error: err })

      res.json(attract)
    })
  },
  show: (req, res) => {
    Attract.findById(req.params.id).execAsync()
      .then((attract) => {
        res.render('attract/show', { userActive: req.user, attract: attract})
      })
      .catch((err) => {
        console.log(err)
        res.render('error', { error: err })
      })
  }
/*,
update: (req, res) => {
  TemporaryPlace.findById(req.params.id).execAsync()
    .then((tempPlace) => {

      for (var key in req.body) {
        tempPlace[key] = req.body[key]
      }

      tempPlace.save((err, tempPlace) => {
        if (err)
          throw err

        User.find({organizationId: tempPlace.organizationId}).execAsync()
          .then((users) => {
            res.render('temporaryPlace/show', { userActive: req.user, users: users, tempPlace: tempPlace })
          })
      })
    })
    .catch((err) => {
      console.log(err)
      res.render('error', { error: err })
    })
}
*/
}

module.exports = AttractController
