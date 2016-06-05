var mongoose = require('mongoose')
var Schema = mongoose.Schema

var attractSchema = new Schema({
  organizationId: Schema.Types.ObjectId,
  name: {type: String, trim: true, required: false},
  email: {type: String, trim: true, required: false},
  phones: [String],
  category: {type: String, trim: true, required: false},
  subcategory: {type: String, trim: true, required: false},
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

module.exports = mongoose.model('Attract', attractSchema)
