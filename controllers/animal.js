var Animal = require('./../models/animal')

var AnimalController = {
  create: (req, res) => {
    var animal = new Animal()

    for (var key in req.body) {
      animal[key] = req.body[key]
    }

    animal.save((err, animal) => {
      if (err)
        res.render('error', { error: err })

      res.json(animal)
    })
  },

  update: function (req, res) {
    Animal.findById(req.params.id).execAsync()
      .then((animal) => {

        for (var key in req.body) {
          animal[key] = req.body[key]
        }

        animal.save((err, animal) => {
          if (err)
            throw err

          res.render('animal/show', { userActive: req.user, animal: animal })
        })
      })
      .catch((err) => {
        console.log(err)
        res.render('error', { error: err })
      })
  },

/*
index: function (req, res) {
  Animal.find({}, function (err, user) {
    if (err)
      res({err: 'Não foi possível retornar os dados do animal!'})
    else
      res.render('animal/index', { animals: animal })
  })
},

show: function (req, res) {
  Animal.findById(req.params.id, function (err, user) {
    if (err)
      res({err: 'Não foi possível retornar os dados do animal!'})
    else
      res(user)
  })
},

patch: function (req, res) {
  Animal.find({}, function (err, user) {
    if (err)
      res({err: 'Não foi possível retornar os dados do animal!'})
    else
      res(user)
  })
},

destroy: function (req, res) {
  Animal.findById(req.params.id, function (err, user) {
    if (err) {
      res({err: 'Não foi possível retornar os dados do animal!'})
    }else {
      Animal.remove(function (err) {
        if (!err)
          res({response: 'Animal excluido com sucesso!'})
      })
    }
  })
}
*/
}
module.exports = AnimalController
