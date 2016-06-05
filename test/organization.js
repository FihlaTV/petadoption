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

describe('Organization', () => {

  // User.collection.drop()

  var org_id

  beforeEach((done) => {
    var newUser = new User()

    newUser.local.email = 'teste@teste.com.br'
    newUser.local.password = newUser.generateHash('12345')
    newUser.stage = 1

    newUser.save((err) => {

      var newOrg = new Organization()
      newOrg.name = 'Org01'

      newOrg.save((err) => {
        org_id = newOrg._id
        done()
      })
    })
  })

  afterEach((done) => {
    Organization.collection.drop()
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
        var addresses = [{
          country: 'Brazil',
          state: 'Minas Gerais',
          city: 'Belo Horizonte',
          district: 'Funcionários',
          street: 'Praça da Liberdade',
          number: '450',
          complement: ''
        }]

        var newOrg = new Organization()

        newOrg._id = org_id
        newOrg.name = 'Organization 01'
        newOrg.addresses = addresses
        // done()

        agent
          .put('/orgs/' + org_id)
          .send(newOrg)
          .then((res) => {
            res.should.have.status(200)
            done()
          })
          .catch((err) => {
            console.log(err)
            throw err
          })
      })
      .catch((err) => {
        console.log(err)
        throw err
      })
  })
})
