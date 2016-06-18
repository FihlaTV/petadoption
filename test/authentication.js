process.env.NODE_ENV = 'test'

var chai = require('chai')
var chaiHttp = require('chai-http')

var server = require('../bin/www')
var User = require('../models/user')
var Organization = require('../models/organization')

var should = chai.should()
chai.use(chaiHttp)

var agent = chai.request.agent(server)

describe('Authentication', () => {

  beforeEach((done) => {

    var newOrg = new Organization()
    newOrg.name = 'Org01'

    newOrg.save((err) => {

      var address = {
        country: 'Brazil',
        state: 'Minas Gerais',
        city: 'Belo Horizonte',
        district: 'Funcionários',
        street: 'Praça da Liberdade',
        number: '450',
        complement: ''
      }

      var newUser = new User()

      newUser.local.email = 'teste@teste.com.br'
      newUser.local.password = newUser.generateHash('12345')
      newUser.stage = 1
      newUser.name = 'Usuário Teste'
      newUser.identification.type = 'CPF'; // cpf, rg, ...
      newUser.identification.code = '15367244408'; // http://www.geradordecpf.org/
      newUser.gender = 'male'
      newUser.type = 'employee'; // funcionario, cuidador
      newUser.dateBorn = new Date('03/30/2016')
      newUser.phones = ['5531912345678']
      newUser.address = [address]
      var org = {
        _id: newOrg._id
      }
      newUser.organizations.push(org)

      newUser.save((err) => {
        done()
      })
    })
  })

  afterEach((done) => {
    User.collection.drop()
    Organization.collection.drop()
    done()
  })

  it('should create a new user', (done) => {
    agent
      .post('/signup')
      .send({ email: 'user@user.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
        res.redirects.should.deep.include('http://127.0.0.1:3000/profile')
        done()
      })
      .catch((err) => {
        console.log(err)
        throw err
      })
  })

  it('should fail when try to create a new user without email or password', (done) => {
    agent
      .post('/signup')
      .send({'email': '', 'password': '123456'})
      .then((res) => {
        res.should.have.status(200)
        res.redirects.should.deep.include('http://127.0.0.1:3000/signup')
        agent
          .post('/signup')
          .send({'email': 'teste@teste.com.br', 'password': ''})
          .then((res) => {
            res.should.have.status(200)
            res.redirects.should.deep.include('http://127.0.0.1:3000/signup')
            done()
          })
      })
      .catch((err) => {
        console.log(err)
        throw err
      })
  })

  it('should have success when try to get logged', (done) => {
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
        res.redirects.should.deep.include('http://127.0.0.1:3000/dashboard')
        done()
      })
      .catch((err) => {
        console.log(err)
        done(err)
      })
  })

  it('should have fail when try to get logged with blank email or password', (done) => {
    agent
      .post('/login')
      .send({ email: '', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
        res.redirects.should.deep.include('http://127.0.0.1:3000/login')
        agent
          .post('/login')
          .send({ email: 'teste@teste.com.br', password: '' })
          .then((res) => {
            res.should.have.status(200)
            res.redirects.should.deep.include('http://127.0.0.1:3000/login')
            done()
          })
      })
      .catch((err) => {
        console.log(err)
        throw err
      })
  })
})
