var Animal = require('./../modules/animal')

var AnimalController = {
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

  create: function (req, res) {
    var animal = new Animal()

    animal({
      name: name,
      numberChip: numberChip,
      category: category,
      type: type,
      dateBorn: dateBorn,
      colors: colors,
      fur: fur,
      size: size,
      neutered: neutered,
      vaccinated: vaccinated,
      vermifugated: vermifugated,
      history: history,
      photos: photos,
      specitalAdoption: specitalAdoption,
      gender: gender,
      sociable: sociable,
      playful: playful,
      affectionate: affectionate,
      temporaryPlace: temporaryPlace,
      createdDate: new Date()
    }).save(function (err, user) {
      if (err)
        res({err: 'Não foi possível retornar os dados do animal!'})
      else
        res(user)
    })
  },

  update: function (req, res) {
    Animal.findById(req.params.id, function (err, user) {
      if (err)
        res({err: 'Não foi possível retornar os dados do animal!'})

      animal.save(function (err, user) {
        if (error)
          callback({error: 'Não foi possível atualizar o usuário!'})
        else
          callback(user)
      })
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
}
module.exports = AnimalController
