var mongoose = require('mongoose')
var Schema = mongoose.Schema

var donationSchema = new Schema({
  name: {type: String, trim: true, required: false},
  email: {type: String, trim: true, required: false},
  address: {
    country: {type: String, trim: true, required: false},
    state: {type: String, trim: true, required: false},
    city: {type: String, trim: true, required: false},
    district: {type: String, trim: true, required: false},
    street: {type: String, trim: true, required: false},
    number: {type: String, trim: true, required: false},
    complement: {type: String, trim: true, required: false}
  },
  paypal: {type: String, trim: true, required: false},
  animalId: {type: Schema.Types.ObjectId, required: false},
  donationValue: {type: Number, required: false, get: getCurrency, set: setCurrency},
  createdDate: {type: Date, default: Date.now},
  flActive: {type: Boolean, default: true}
})

function getCurrency (v) {
  if (v != null) {
    return v.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }else {
    v = 0.00
    return v.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }
}

function setCurrency (v) {
  return v.replace(/[^0-9.]/g, '')
}

module.exports = mongoose.model('Donation', donationSchema)
