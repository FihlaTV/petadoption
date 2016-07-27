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
  var account_id

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
          .post('/animal')
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
/*
  it('should list ALL accountability on /account?orgId=<id> GET', (done) => {
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
      })
      .then((res) => {
        agent
          .get('/account')
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

  it('should list a SINGLE accountability on /account/<id> GET', (done) => {
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
      })
      .then((res) => {
        agent
          .get('/account/' + account_id)
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

  it('should update a SINGLE accountability on /account/<id> PUT', function (done) {
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
      })
      .then((res) => {
        var accountability = new Accountability()
        accountability.organizationId = org_id
        accountability.account = 12345
        accountability.description = 'Description1'
        // accountability.entryDate = 
        accountability.entryValue = 1
        accountability.userId = user_id
        // accountability.files = 

        accountability.save((err) => {
          if (err)
            throw err

          accountability.description = 'Description2'

          agent
            .put('/account/' + accountability._id)
            .send(accountability)
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
*/
})
