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
  },
  update: (req, res) => {
    Attract.findById(req.params.id).execAsync()
      .then((attract) => {

        for (var key in req.body) {
          attract[key] = req.body[key]
        }

        attract.save((err, attract) => {
          if (err)
            throw err

          res.render('attract/show', { userActive: req.user, attract: attract })
        })
      })
      .catch((err) => {
        console.log(err)
        res.render('error', { error: err })
      })
  },
  patch: (req, res) => {
    Attract.findById(req.params.id, (err, attract) => {
      if (err)
        res.render('error', { error: err })

      var op = req.body.op
      var path = req.body.path.substring(1)
      var value = req.body.value

      switch (op) {
        case 'replace':
          attract[path] = value
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

      attract.save(function (err) {
        if (err)
          res.render('error', { error: err })

        res.json(attract)
      // res.json({ message: 'User updated!' })
      })
    })
  }
}

module.exports = AttractController
