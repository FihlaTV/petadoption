var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var Schema = mongoose.Schema

// define the schema for our user model
var userSchema = new Schema({
  local: {
    email: {type: String, trim: true, required: false},
    password: {type: String, trim: true, required: false}
  },
  facebook: {
    id: {type: String, trim: true, required: false},
    token: {type: String, trim: true, required: false},
    email: {type: String, trim: true, required: false},
    name: {type: String, trim: true, required: false}
  },
  twitter: {
    id: {type: String, trim: true, required: false},
    token: {type: String, trim: true, required: false},
    displayName: {type: String, trim: true, required: false},
    username: {type: String, trim: true, required: false},
    email: {type: String, trim: true, required: false}
  },
  google: {
    id: {type: String, trim: true, required: false},
    token: {type: String, trim: true, required: false},
    email: {type: String, trim: true, required: false},
    name: {type: String, trim: true, required: false}
  },
  name: {type: String, trim: true, required: false},
  identification: {
    type: {type: String, trim: true, required: false}, // cpf, rg, ...
    code: {type: String, trim: true, required: false}
  },
  gender: {type: String, trim: true, required: false},
  type: {type: String, trim: true, required: false}, // funcionario, cuidador
  dateBorn: {type: Date, required: false},
  phones: [String],
  address: [{
    country: {type: String, trim: true, required: false},
    state: {type: String, trim: true, required: false},
    city: {type: String, trim: true, required: false},
    district: {type: String, trim: true, required: false},
    street: {type: String, trim: true, required: false},
    number: {type: String, trim: true, required: false},
    complement: {type: String, trim: true, required: false}
  }],
  stage: {type: Number, default: 0},
  organizations: [{
    _id: {type: Schema.Types.ObjectId, required: false}
  }],
  description: {type: String, trim: true, default: '', required: false},
  createdDate: {type: Date, default: Date.now},
  flActive: {type: Boolean, default: true}
})

// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', userSchema)
