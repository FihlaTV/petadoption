var mongoose = require('mongoose')
var Schema = mongoose.Schema

var accountabilitySchema = new Schema({
  organizationId: Schema.Types.ObjectId,
  account: {type: Number, required: false},
  description: {type: String, trim: true, required: false},
  entryDate: {type: Date, default: Date.now},
  entryValue: {type: Number, required: false, get: getCurrency, set: setCurrency},
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  files: [String],
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
  return String(v).replace(/[^0-9.]/g, '')
}

module.exports = mongoose.model('Accountability', accountabilitySchema)
