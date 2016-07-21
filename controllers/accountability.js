var User = require('./../models/user')
var Accountability = require('./../models/accountability')

var AccountController = {
  index: (req, res) => {
    Accountability.find({organizationId: req.query.orgId}).execAsync()
      .then((accounts) => {
        res.render('account/index', { userActive: req.user, accounts: accounts })
      })
      .catch((err) => {
        console.log(err)
        res.render('error', { error: err })
      })
  },
  show: (req, res) => {
    Accountability.findById(req.params.id).execAsync()
      .then((account) => {
        res.render('account/show', { userActive: req.user, account: account})
      })
      .catch((err) => {
        console.log(err)
        res.render('error', { error: err })
      })
  },
  create: (req, res) => {
    var accountability = new Accountability()

    for (var key in req.body) {
      accountability[key] = req.body[key]
    }

    accountability.save((err, accountability) => {
      if (err)
        res.render('error', { error: err })

      res.json(accountability)
    })
  },
  update: (req, res) => {
    Accountability.findById(req.params.id).execAsync()
      .then((accountability) => {

        for (var key in req.body) {
          accountability[key] = req.body[key]
        }

        accountability.save((err, account) => {
          if (err)
            throw err

          res.render('account/show', { userActive: req.user, account: account })
        })
      })
      .catch((err) => {
        console.log(err)
        res.render('error', { error: err })
      })
  }
/*
,
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
    // case 'add':
    //   break
    // case 'remove':
    //   break
    // case 'move':
    //   break
    // case 'copy':
    //   break
    // case 'test':
    //   break
    }

    attract.save(function (err) {
      if (err)
        res.render('error', { error: err })

      res.json(attract)
    // res.json({ message: 'User updated!' })
    })
  })
}
*/
}

module.exports = AccountController
