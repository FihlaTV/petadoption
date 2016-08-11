process.env.NODE_ENV = 'test'

var chai = require('chai')
var chaiHttp = require('chai-http')

var Promise = require('bluebird')

var server = require('../bin/www')
var User = require('../models/user')
var Organization = require('../models/organization')
var Site = require('../models/site')

var should = chai.should()
chai.use(chaiHttp)

var agent = chai.request.agent(server)

describe('Sites', () => {

  var user_id
  var org_id
  var site_id

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
    Site.collection.drop()
    done()
  })

  it('should add a SINGLE site on /sites POST', function (done) {
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
      })
      .then((res) => {

        var site = new Site()
        site.organizationId = org_id
        site.name = 'Gato Uai'
        site.description = 'Description'
        site.logo = 'logo.png'
        site.colors = ['#074c3f', '#ff0000', '#ffffff']

        agent
          .post('/sites')
          .send(site)
          .then((res) => {
            res.should.have.status(200)
            site_id = res.body._id
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

  it('should list ALL site on /sites?orgId=<id> GET', (done) => {
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
      })
      .then((res) => {
        agent
          .get('/sites')
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

  it('should list a SINGLE site on /sites/<id> GET', (done) => {
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
      })
      .then((res) => {
        agent
          .get('/sites/' + site_id)
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

  it('should update a SINGLE site on /sites/<id> PUT', function (done) {
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
      })
      .then((res) => {

        var site = new Site()
        site.organizationId = org_id
        site.name = 'Gato Uai'
        site.description = 'Description'
        site.logo = 'logo.png'
        site.colors = ['#074c3f', '#ff0000', '#ffffff']

        site.save((err) => {
          if (err)
            throw err

          site.description = 'Description2'

          agent
            .put('/sites/' + site._id)
            .send(site)
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
})
