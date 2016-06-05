var mongoose = require('mongoose')
var Schema = mongoose.Schema

var temporaryPlaceSchema = new Schema({
  organizationId: Schema.Types.ObjectId,
  user: { // responsável
    _id: {type: Schema.Types.ObjectId, required: false},
    name: {type: String, trim: true, required: false},
    type: {type: String, trim: true, required: false},
    code: {type: String, trim: true, required: false},
    email: {type: String, trim: true, required: false},
    phones: [String]
  },
  description: {type: String, trim: true, required: false},
  capacity: {type: Number, required: false},
  address: {
    country: {type: String, trim: true, required: false},
    state: {type: String, trim: true, required: false},
    city: {type: String, trim: true, required: false},
    district: {type: String, trim: true, required: false},
    street: {type: String, trim: true, required: false},
    number: {type: String, trim: true, required: false},
    complement: {type: String, trim: true, required: false}
  },
  createdDate: {type: Date, default: Date.now},
  flActive: {type: Boolean, default: true}
})

module.exports = mongoose.model('TemporaryPlace', temporaryPlaceSchema)
