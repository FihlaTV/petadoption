process.env.NODE_ENV = 'test'

var chai = require('chai')
var chaiHttp = require('chai-http')

var Promise = require('bluebird')

var server = require('../bin/www')
var User = require('../models/user')
var Organization = require('../models/organization')
var Accountability = require('../models/accountability')

var should = chai.should()
chai.use(chaiHttp)

var agent = chai.request.agent(server)

describe('Accountability', () => {

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
        done()
      })
    })
  })

  after((done) => {
    User.collection.drop()
    Organization.collection.drop()
    Accountability.collection.drop()
    done()
  })

  it('should add a SINGLE accountability on /account POST', function (done) {
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
        accountability.description = 'Description'
        // accountability.entryDate = 
        accountability.entryValue = 1.00
        accountability.userId = user_id
        // accountability.files = 

        agent
          .post('/account')
          .send(accountability)
          .then((res) => {
            res.should.have.status(200)
            account_id = res.body._id
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
        var address = {
          country: 'Brazil',
          state: 'Minas Gerais',
          city: 'Belo Horizonte',
          district: 'Funcionários',
          street: 'Praça da Liberdade',
          number: '450',
          complement: ''
        }

        var accountability = new Accountability()
        accountability.organizationId = org_id
        accountability.account = 12345
        accountability.description = 'Description'
        // accountability.entryDate = 
        accountability.entryValue = 1.00
        accountability.userId = user_id
        // accountability.files = 

        accountability.save((err) => {

          accountability.description = 'Description1'

          agent
            .put('/account/' + accountability._id)
            .send(accountability)
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
      })
      .catch((err) => {
        // console.log(err)
        done(err)
      // throw err
      })
  })
})
