process.env.NODE_ENV = 'test'

var chai = require('chai')
var chaiHttp = require('chai-http')

var Promise = require('bluebird')

var server = require('../bin/www')
var User = require('../models/user')
var Organization = require('../models/organization')
var TemporaryPlace = require('../models/temporaryPlace')

var should = chai.should()
chai.use(chaiHttp)

var agent = chai.request.agent(server)

describe('TemporaryPlace', () => {

  var user_id
  var user_email
  var org_id
  var tempplace_id

  before((done) => {
    var newOrg = new Organization()
    newOrg.name = 'Org01'

    newOrg.save((err) => {
      org_id = newOrg._id
      done()
    })
  })

  beforeEach((done) => {

    Promise.try(() => {
      var newOrg = new Organization()
      newOrg.name = 'Org01'

      return newOrg.saveAsync()
    }).then((org) => {
      var newUser = new User()

      newUser.local.email = 'teste@teste.com.br'
      newUser.local.password = newUser.generateHash('12345')
      newUser.stage = 1
      newUser.organizationId = org_id

      newUser.saveAsync()

      return ([newUser, org])
    }).then((objs) => {
      user_id = objs[0]._id
      user_email = objs[0].local.email

      org_id = objs[1]._id

      var address = {
        country: 'Brazil',
        state: 'Minas Gerais',
        city: 'Belo Horizonte',
        district: 'Funcionários',
        street: 'Praça da Liberdade',
        number: '450',
        complement: ''
      }

      var user = {
        _id: objs[0]._id
      }

      var temporaryPlace = new TemporaryPlace()

      temporaryPlace.organizationId = org_id
      temporaryPlace.user = user
      temporaryPlace.description = 'Description'
      temporaryPlace.capacity = 3
      temporaryPlace.address = address

      return temporaryPlace.saveAsync()
    }).then((temporaryPlace) => {
      tempplace_id = temporaryPlace._id
      done()
    })
  })

  afterEach((done) => {
    User.collection.drop()
    Organization.collection.drop()
    TemporaryPlace.collection.drop()
    done()
  })

  it('should list ALL TemporaryPlaces on /tempplaces GET', (done) => {
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
      })
      .then((res) => {
        agent
          .get('/tempplaces')
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

  it('should list a SINGLE TemporaryPlace on /tempplaces/<id> GET', (done) => {
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
      })
      .then((res) => {
        agent
          .get('/tempplaces/' + tempplace_id)
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

  it('should add a SINGLE TemporaryPlace on /tempplaces/<id> POST', function (done) {
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
      })
      .then((res) => {
        var address = {
          country: 'Brazil',
          state: 'Minas Gerais',
          city: 'Belo Horizonte',
          district: 'Funcionários',
          street: 'Praça da Liberdade',
          number: '450',
          complement: ''
        }

        var user = {
          _id: user_id
        }

        var temporaryPlace = new TemporaryPlace()
        temporaryPlace.organizationId = org_id
        temporaryPlace.user = user
        temporaryPlace.description = 'Description'
        temporaryPlace.capacity = 3
        temporaryPlace.address = address

        agent
          .post('/tempplaces')
          .send(temporaryPlace)
          .then((res) => {
            res.should.have.status(200)
            // console.log(res.body)
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

  it('should update a SINGLE TemporaryPlace on /tempplaces/<id> PUT', function (done) {
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
      })
      .then((res) => {
        var address = {
          country: 'Brazil',
          state: 'Minas Gerais',
          city: 'Belo Horizonte',
          district: 'Funcionários',
          street: 'Praça da Liberdade',
          number: '450',
          complement: ''
        }

        var user = {
          _id: user_id
        }

        var temporaryPlace = new TemporaryPlace()
        temporaryPlace.organizationId = org_id
        temporaryPlace.user = user
        temporaryPlace.description = 'Description2'
        temporaryPlace.capacity = 10
        temporaryPlace.address = address

        agent
          .put('/tempplaces/' + tempplace_id)
          .send(temporaryPlace)
          .then((res) => {
            res.should.have.status(200)
            // console.log(res.body)
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
