process.env.NODE_ENV = 'test'

var chai = require('chai')
var chaiHttp = require('chai-http')

var Promise = require('bluebird')

var server = require('../bin/www')
var User = require('../models/user')
var Organization = require('../models/organization')
var Animal = require('../models/animal')

var should = chai.should()
chai.use(chaiHttp)

var agent = chai.request.agent(server)

describe('Animal', () => {

  var user_id
  var org_id
  var animal_id

  before((done) => {
    var newOrg = new Organization()
    newOrg.name = 'Org01'

    newOrg.save((err) => {

      org_id = newOrg._id

      var newUser = new User()

      newUser.local.email = 'teste@teste.com.br'
      newUser.local.password = newUser.generateHash('12345')
      newUser.stage = 1
      newUser.organizationId = org_id

      newUser.save((err) => {
        user_id = newUser._id
        done()
      })
    })
  })

  after((done) => {
    User.collection.drop()
    Organization.collection.drop()
    Animal.collection.drop()
    done()
  })

  it('should add a SINGLE animal on /animal POST', function (done) {
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
      })
      .then((res) => {
        var animal = new Animal()
        animal.organizationId = org_id
        animal.name = 'Neko'
        animal.numberChip = '12345'
        animal.category = 'cat'
        animal.breed = 'srd'
        animal.type = 'tricolor'
        animal.dateBorn = Date()
        animal.colors = ['amarelo', 'preto', 'branco']
        animal.fur = 'médio'
        animal.size = 'médio'
        animal.weight = 5
        animal.height = 3.5
        animal.length = 25.5
        animal.neutered = true
        animal.vaccinated = true
        animal.vermifugated = true
        animal.history = 'She was finded in a street'
        // animal.photos
        // animal.specitalAdoption
        animal.gender = 'f'
        animal.sociable = 3
        animal.playful = 4
        animal.affectionate = 5
        // animal.temporaryPlace    
        // animal.shelter._id = 

        agent
          .post('/animals')
          .send(animal)
          .then((res) => {
            res.should.have.status(200)
            done()
          })
          .catch((err) => {
            // console.log(err)
            done(err)
          // throw err
          })
      })
      .catch((err) => {
        // console.log(err)
        done(err)
      // throw err
      })
  })

  it('should update a SINGLE animal on /animal/<id> PUT', function (done) {
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
      })
      .then((res) => {
        var animal = new Animal()
        animal.organizationId = org_id
        animal.name = 'Neko'
        animal.numberChip = '12345'
        animal.category = 'cat'
        animal.breed = 'srd'
        animal.type = 'tricolor'
        animal.dateBorn = Date()
        animal.colors = ['amarelo', 'preto', 'branco']
        animal.fur = 'médio'
        animal.size = 'médio'
        animal.weight = 5
        animal.height = 3.5
        animal.length = 25.5
        animal.neutered = true
        animal.vaccinated = true
        animal.vermifugated = true
        animal.history = 'She was finded in a street'
        // animal.photos
        // animal.specitalAdoption
        animal.gender = 'f'
        animal.sociable = 3
        animal.playful = 4
        animal.affectionate = 5
        // animal.temporaryPlace    
        // animal.shelter._id = 

        animal.save((err) => {
          if (err)
            throw err

          animal_id = animal._id

          animal.name = 'Neko II'

          agent
            .put('/animals/' + animal._id)
            .send(animal)
            .then((res) => {
              res.should.have.status(200)
              done()
            })
            .catch((err) => {
              // console.log(err)
              done(err)
            // throw err
            })
        })
      })
      .catch((err) => {
        // console.log(err)
        done(err)
      // throw err
      })
  })

  it('should list a SINGLE animal on /animal/<id> GET', (done) => {
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
      })
      .then((res) => {
        agent
          .get('/animals/' + animal_id)
          .then((res) => {
            res.should.have.status(200)
            done()
          })
          .catch((err) => {
            // console.log(err)
            done(err)
          // throw err
          })
      })
      .catch((err) => {
        // console.log(err)
        done(err)
      // throw err
      })
  })

  it('should list ALL animal on /animal?orgId=<id> GET', (done) => {
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
      })
      .then((res) => {
        agent
          .get('/animals')
          .send({ orgId: org_id })
          .then((res) => {
            res.should.have.status(200)
            done()
          })
          .catch((err) => {
            // console.log(err)
            done(err)
          // throw err
          })
      })
      .catch((err) => {
        // console.log(err)
        done(err)
      // throw err
      })
  })
})
