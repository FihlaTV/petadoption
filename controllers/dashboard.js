var User = require('./../models/user')

var DashboardController = {
  index: function (req, res) {
    res.render('dashboard/index', { userActive: req.user })
  }
}

module.exports = DashboardController
