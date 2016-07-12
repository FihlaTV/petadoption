process.env.NODE_ENV = 'test'

var Promise = require('bluebird')

var chai = require('chai')
var chaiHttp = require('chai-http')

var server = require('../bin/www')

var Organization = require('../models/organization')
var User = require('../models/user')
var Attract = require('../models/attract')

var should = chai.should()
chai.use(chaiHttp)

var agent = chai.request.agent(server)

describe('Attract', () => {

  var user_id
  var org_id

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

  // beforeEach((done) => {

  //   Promise.try(() => {
  //     var newOrg = new Organization()
  //     newOrg.name = 'Org01'

  //     return newOrg.saveAsync()
  //   }).then((org) => {
  //     var newUser = new User()

  //     newUser.local.email = 'teste@teste.com.br'
  //     newUser.local.password = newUser.generateHash('12345')
  //     newUser.stage = 1
  //     newUser.organizationId = org_id

  //     newUser.saveAsync()

  //     return ([newUser, org])
  //   }).then((objs) => {
  //     user_id = objs[0]._id
  //     user_email = objs[0].local.email

  //     org_id = objs[1]._id

  //     var address = {
  //       country: 'Brazil',
  //       state: 'Minas Gerais',
  //       city: 'Belo Horizonte',
  //       district: 'Funcionários',
  //       street: 'Praça da Liberdade',
  //       number: '450',
  //       complement: ''
  //     }

  //     var user = {
  //       _id: objs[0]._id
  //     }

  //     var temporaryPlace = new TemporaryPlace()

  //     temporaryPlace.organizationId = org_id
  //     temporaryPlace.user = user
  //     temporaryPlace.description = 'Description'
  //     temporaryPlace.capacity = 3
  //     temporaryPlace.address = address

  //     return temporaryPlace.saveAsync()
  //   }).then((temporaryPlace) => {
  //     tempplace_id = temporaryPlace._id
  //     done()
  //   })
  // })

  // afterEach((done) => {
  //   User.collection.drop()
  //   Organization.collection.drop()
  //   TemporaryPlace.collection.drop()
  //   done()
  // })

  it('should add a SINGLE Attract on /attract?orgId=<id> POST', (done) => {
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

        var attract = new Attract()
        attract.organizationId = org_id
        attract.name = 'Olavo Shibata'
        attract.email = 'olavoshibata@gmail.com'
        attract.phones.push('31991101220')
        attract.category = 'Doação'
        attract.subcategory = 'Remédios'
        attract.address = address
        attract.description = 'Teste description'

        agent
          .post('/attract')
          // .send({ orgId: org_id })
          .send(attract)
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

  it('should list ALL Attract on /attract?orgId=<id> GET', (done) => {
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
      })
      .then((res) => {
        agent
          .get('/attract?orgId='+org_id)
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
