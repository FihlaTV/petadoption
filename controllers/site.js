var User = require('./../models/user')
var Site = require('./../models/site')

var SiteController = {
  index: (req, res) => {
    Site.find({organizationId: req.query.orgId}).execAsync()
      .then((sites) => {
        res.render('site/index', { userActive: req.user, sites: sites })
      })
      .catch((err) => {
        console.log(err)
        res.render('error', { error: err })
      })
  },
  show: (req, res) => {
    Site.findById(req.params.id).execAsync()
      .then((site) => {
        res.render('site/show', { userActive: req.user, site: site})
      })
      .catch((err) => {
        console.log(err)
        res.render('error', { error: err })
      })
  },
  create: (req, res) => {
    var site = new Site()

    for (var key in req.body) {
      site[key] = req.body[key]
    }

    site.save((err, site) => {
      if (err)
        res.render('error', { error: err })

      res.json(site)
    })
  },
  update: (req, res) => {
    Site.findById(req.params.id).execAsync()
      .then((site) => {

        for (var key in req.body) {
          site[key] = req.body[key]
        }

        site.save((err, site) => {
          if (err)
            throw err

          res.render('site/show', { userActive: req.user, site: site })
        })
      })
      .catch((err) => {
        console.log(err)
        res.render('error', { error: err })
      })
  }
}

module.exports = SiteController
