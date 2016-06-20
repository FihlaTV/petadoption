process.env.NODE_ENV = 'test'

var chai = require('chai')
var chaiHttp = require('chai-http')

var server = require('../bin/www')
var User = require('../models/user')
var Organization = require('../models/organization')
var Shelter = require('../models/shelter')

var should = chai.should()
chai.use(chaiHttp)

var agent = chai.request.agent(server)

describe('Profile', () => {

  // User.collection.drop()

  var user_id
  var orgId

  before((done) => {
    var newOrg = new Organization()
    newOrg.name = 'Org01'

    newOrg.save((err) => {
      orgId = newOrg._id
      done()
    })
  })

  beforeEach((done) => {
    var newUser = new User()

    newUser.local.email = 'teste@teste.com.br'
    newUser.local.password = newUser.generateHash('12345')
    newUser.stage = 1
    newUser.organizationId = orgId

    newUser.save((err) => {
      user_id = newUser._id
      done()
    })
  })

  afterEach((done) => {
    Shelter.collection.drop()
    Organization.collection.drop()
    User.collection.drop()
    done()
  })

  it('should complete the information for the user /users/:id PUT', (done) => {
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
      })
      .then((res) => {
        agent
          .get('/users/' + user_id)
          .then((res) => {
            res.should.have.status(200)
            var id = res.body._id
            var newUser = User()
            newUser._id = id
            newUser.local.email = res.body.local.email
            newUser.local.password = res.body.local.password
            newUser.stage = 1
            newUser.name = 'Usuário Teste'
            newUser.identification.type = 'CPF'
            newUser.identification.code = '123456'
            newUser.gender = 'F'
            newUser.dateBorn = new Date('November 01, 1984 11:13:00')
            agent
              .put('/users/' + user_id)
              .send(newUser)
              .then((res) => {
                res.should.have.status(200)
                res.body.name.should.equal('Usuário Teste')
                res.body.identification.should.deep.equal({ code: '123456', type: 'CPF' })
                res.body.gender.should.equal('F')
                done()
              })
          })
      })
      .catch((err) => {
        console.log(err)
        done(err)
      })
  })

  it('should create a new organization /orgs POST', (done) => {
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
      })
      .then((res) => {
        var address = [{
          country: 'Brazil',
          state: 'Minas Gerais',
          city: 'Belo Horizonte',
          district: 'Funcionários',
          street: 'Praça da Liberdade',
          number: '450',
          complement: ''
        }]

        var newOrg = Organization()

        newOrg.name = 'Organization 01'
        newOrg.address = address

        agent
          .post('/orgs')
          .send(newOrg)
          .then((res) => {
            res.should.have.status(200)
            res.body.name.should.equal('Organization 01')
            done()
          })
      })
      .catch((err) => {
        console.log(err)
        done(err)
      })
  })

  it('should create a new shelter /shelters POST', (done) => {
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

        var newOrg = Organization()

        newOrg.name = 'Organization 01'
        newOrg.address = address

        newOrg.save((err, org) => {

          var newShelter = Shelter()

          newShelter.organizationId = org._id
          newShelter.name = 'Shelter 01'
          newShelter.capacity = 10
          newShelter.address = address

          agent
            .post('/shelters')
            .send(newShelter)
            .then((res) => {
              res.should.have.status(200)
              res.body.name.should.equal('Shelter 01')
              done()
            })
        })
      })
      .catch((err) => {
        console.log(err)
        done(err)
      })
  })

  it('should complete a full profile', (done) => {
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
      })
      .then((res) => {
        agent.get('/users/' + user_id)
          .then((res) => {
            res.should.have.status(200)
            res.body.should.be.a('Object')
            res.body.should.have.property('local')
            var id = res.body._id
            var newUser = User()
            newUser._id = id
            newUser.local.email = res.body.local.email
            newUser.local.password = res.body.local.password
            newUser.stage = res.body.stage
            newUser.name = 'Usuário Teste'
            newUser.identification.type = 'CPF'
            newUser.identification.code = '123456'
            newUser.gender = 'F'
            newUser.dateBorn = new Date('November 01, 1984 11:13:00')
            newUser.organizationId = orgId

            var addresses = [{
              country: 'Brazil',
              state: 'Minas Gerais',
              city: 'Belo Horizonte',
              district: 'Funcionários',
              street: 'Praça da Liberdade',
              number: '450',
              complement: ''
            }]

            var newOrg = Organization()

            newOrg.name = 'Organization 01'
            newOrg.addresses = addresses

            var newShelter1 = Shelter()

            newShelter1.name = 'Shelter 01'
            newShelter1.capacity = 10
            newShelter1.address = addresses[0]

            var newShelter2 = Shelter()

            newShelter2.name = 'Shelter 02'
            newShelter2.capacity = 20
            newShelter2.address = addresses[0]

            var shelters = []

            shelters.push(newShelter1)
            shelters.push(newShelter2)

            res.should.have.status(200)
            agent.post('/profile')
              .send({ user: newUser, organization: newOrg, shelter: shelters })
              .then((res) => {
                res.should.have.status(200)
                res.redirects.should.deep.include('http://127.0.0.1:3000/dashboard')
                done()
              })
          })
      })
      .catch((err) => {
        console.log(err)
        done(err)
      })
  })
})
