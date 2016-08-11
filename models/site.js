var mongoose = require('mongoose')
var Schema = mongoose.Schema

var siteSchema = new Schema({
  organizationId: Schema.Types.ObjectId,
  name: {type: String, trim: true, required: false},
  description: {type: String, trim: true, required: false},
  logo: {type: String, trim: true, required: false},
  colors: [String],
  createdDate: {type: Date, default: Date.now},
  flActive: {type: Boolean, default: true}
})

module.exports = mongoose.model('Site', siteSchema)
