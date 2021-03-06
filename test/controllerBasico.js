process.env.NODE_ENV = 'test'

var chai = require('chai')
var chaiHttp = require('chai-http')

var server = require('../bin/www')
var User = require('../models/user')
var Organization = require('../models/organization')

var should = chai.should()
chai.use(chaiHttp)

var agent = chai.request.agent(server)

describe('User', function () {
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
      newUser.organizationId = orgId

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

  it('should list ALL users on /users GET', (done) => {
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
      })
      .then((res) => {
        agent
          .get('/users')
          .then((res) => {
            res.should.have.status(200)
            // res.should.be.json
            // res.body.should.be.a('array')
            // res.body[0].should.have.property('_id')
            // res.body[0].should.have.property('name')
            // res.body[0].should.have.property('local')
            // res.body[0].should.have.property('identification')
            // res.body[0].should.have.property('gender')
            // res.body[0].should.have.property('type')
            // res.body[0].should.have.property('dateBorn')
            // res.body[0].should.have.property('phones')
            // res.body[0].should.have.property('address')
            // res.body[0].name.should.equal('Usuário Teste')
            done()
          })
      })
      .catch((err) => {
        console.log(err)
        done(err)
      })
  })

  it('should list a SINGLE user on /users/<id> GET', (done) => {
    var address = [{
      country: 'Brazil',
      state: 'Minas Gerais',
      city: 'Belo Horizonte',
      district: 'Funcionários',
      street: 'Praça da Liberdade',
      number: '450',
      complement: ''
    }]

    // console.log(address)

    var newUser = new User()

    newUser.local.email = 'usuarioteste@teste.com.br'
    newUser.local.password = newUser.generateHash('12345')
    newUser.stage = 1
    newUser.name = 'Usuário Teste'
    newUser.identification.type = 'CPF'; // cpf, rg, ...
    newUser.identification.code = '15367244408'; // http://www.geradordecpf.org/
    newUser.gender = 'male'
    newUser.type = 'employee'; // funcionario, cuidador
    newUser.dateBorn = new Date('03/30/2016')
    newUser.phones = ['5531912345678']
    newUser.address = address
    newUser.organizationId = orgId

    newUser.save((err, user) => {
      agent
        .post('/login')
        .send({ email: 'usuarioteste@teste.com.br', password: '12345' })
        .then((res) => {
          res.should.have.status(200)
        })
        .then((res) => {
          return agent.get('/users/' + user._id)
            .then((res) => {
              res.should.have.status(200)
              // res.should.be.json
              // res.body.should.be.a('object')
              // res.body.should.have.property('_id')
              // res.body.should.have.property('name')
              // res.body.should.have.property('local')
              // res.body.should.have.property('identification')
              // res.body.should.have.property('gender')
              // res.body.should.have.property('type')
              // res.body.should.have.property('dateBorn')
              // res.body.should.have.property('phones')
              // res.body.should.have.property('address')
              // res.body._id.should.equal(user.id)
              done()
            })
        })
        .catch((err) => {
          console.log(err)
          done(err)
        })
    })
  })

  it('should add a SINGLE user on /users POST', (done) => {
    var address = [{
      country: 'Brazil',
      state: 'Minas Gerais',
      city: 'Belo Horizonte',
      district: 'Funcionários',
      street: 'Praça da Liberdade',
      number: '450',
      complement: ''
    }]

    // console.log(address)

    var newUser = new User()

    newUser.local.email = 'usuarioteste@teste.com.br'
    newUser.local.password = newUser.generateHash('12345')
    newUser.stage = 1
    newUser.name = 'Usuário Teste CREATE'
    newUser.identification.type = 'CPF'; // cpf, rg, ...
    newUser.identification.code = '15367244408'; // http://www.geradordecpf.org/
    newUser.gender = 'male'
    newUser.type = 'employee'; // funcionario, cuidador
    newUser.dateBorn = new Date('03/30/2016')
    newUser.phones = ['5531912345678']
    newUser.address = address

    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200)
      })
      .then((res) => {
        return agent.post('/users')
          .send(newUser)
          .then((res) => {
            res.should.have.status(200)
            // res.should.be.json
            // res.body.should.be.a('object')
            // res.body.should.have.property('_id')
            // res.body.should.have.property('name')
            // res.body.should.have.property('local')
            // res.body.should.have.property('identification')
            // res.body.should.have.property('gender')
            // res.body.should.have.property('type')
            // res.body.should.have.property('dateBorn')
            // res.body.should.have.property('phones')
            // res.body.should.have.property('address')
            // res.body.name.should.equal('Usuário Teste CREATE')
            done()
          })
      })
      .catch((err) => {
        console.log(err)
        done(err)
      })
  })

  it('should update a SINGLE user on /users/<id> PUT', (done) => {
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

        var newUser = new User()

        newUser.local.email = 'teste2@teste.com.br'
        newUser.local.password = newUser.generateHash('12345')
        newUser.stage = 1
        newUser.name = 'Usuário Teste2'
        newUser.identification.type = 'CPF'; // cpf, rg, ...
        newUser.identification.code = '15367244408'; // http://www.geradordecpf.org/
        newUser.gender = 'male'
        newUser.type = 'employee'; // funcionario, cuidador
        newUser.dateBorn = new Date('03/30/2016')
        newUser.phones = ['5531912345678']
        newUser.address = address
        newUser.organizationId = orgId

        newUser.save((err) => {
          if (err)
            throw err

          newUser.name = 'Usuário Teste'

          agent
            .put('/users/' + newUser._id)
            .send(newUser)
            .then((res) => {
              res.should.have.status(200)
              done()
            })
        })
      })
      .catch((err) => {
        console.log(err)
        done(err)
      })
  })

  it('should replace a name of user on /users/<id> PATCH', (done) => {
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

        var newUser = new User()

        newUser.local.email = 'teste2@teste.com.br'
        newUser.local.password = newUser.generateHash('12345')
        newUser.stage = 1
        newUser.name = 'Usuário Teste2'
        newUser.identification.type = 'CPF'; // cpf, rg, ...
        newUser.identification.code = '15367244408'; // http://www.geradordecpf.org/
        newUser.gender = 'male'
        newUser.type = 'employee'; // funcionario, cuidador
        newUser.dateBorn = new Date('03/30/2016')
        newUser.phones = ['5531912345678']
        newUser.address = address
        newUser.organizationId = orgId

        newUser.save((err) => {
          if (err)
            throw err

          newUser.name = 'Usuário Teste'

          agent
            .patch('/users/' + newUser._id)
            .send({ 'op': 'replace', 'path': '/name', 'value': 'Usuário Teste 3'})
            .then((res) => {
              res.should.have.status(200)
              done()
            })
        })
      })
      .catch((err) => {
        console.log(err)
        done(err)
      })
  })

  it('should delete a SINGLE user on /users/<id> DELETE', (done) => {
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

        var newUser = new User()

        newUser.local.email = 'teste2@teste.com.br'
        newUser.local.password = newUser.generateHash('12345')
        newUser.stage = 1
        newUser.name = 'Usuário Teste2'
        newUser.identification.type = 'CPF'; // cpf, rg, ...
        newUser.identification.code = '15367244408'; // http://www.geradordecpf.org/
        newUser.gender = 'male'
        newUser.type = 'employee'; // funcionario, cuidador
        newUser.dateBorn = new Date('03/30/2016')
        newUser.phones = ['5531912345678']
        newUser.address = address
        newUser.organizationId = orgId

        newUser.save((err) => {
          if (err)
            throw err

          newUser.name = 'Usuário Teste'

          agent
            .delete('/users/' + newUser._id)
            .then((res) => {
              res.should.have.status(200)
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
