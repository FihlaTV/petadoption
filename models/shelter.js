var mongoose = require('mongoose')
var Schema = mongoose.Schema

var shelterSchema = new Schema({
  organizationId: Schema.Types.ObjectId,
  name: {type: String, trim: true, required: false},
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

module.exports = mongoose.model('Shelter', shelterSchema)
