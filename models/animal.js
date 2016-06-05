var mongoose = require('mongoose')
var Schema = mongoose.Schema

var animalSchema = new Schema({
  organizationId: Schema.Types.ObjectId,
  name: {type: String, trim: true, required: false},
  numberChip: {type: String, trim: true, required: false},
  category: {type: String, trim: true, required: false}, // (cachorro, gato, outros)
  type: {type: String, trim: true, required: false}, // (raça)
  dateBorn: {type: Date, required: false},
  colors: [String], // (amarelo, branco, preto, um ou mais cores)
  fur: {type: String, trim: true, required: false}, // (curto, médio, longo)
  size: {type: String, trim: true, required: false}, // (pequeno, medio, grande)
  neutered: {type: Boolean, required: false}, // (sim, nao)
  vaccinated: {type: Boolean, required: false}, // (sim, nao)
  vermifugated: {type: Boolean, required: false}, // (sim, nao)
  history: {type: String, trim: true, required: false},
  photos: [String],
  specitalAdoption: [String], // (sim, qual? (cego, manco, ...))
  gender: {type: String, trim: true, required: false}, // femea, macho
  sociable: {type: Number, required: false},
  playful: {type: Number, required: false},
  affectionate: {type: Number, required: false},
  temporaryPlace: {
    _id: {type: Schema.Types.ObjectId, required: false},
    user: { // responsável
      _id: {type: Schema.Types.ObjectId, required: false},
      name: {type: String, trim: true, required: false},
      type: {type: String, trim: true, required: false},
      code: {type: String, trim: true, required: false},
      email: {type: String, trim: true, required: false},
      phones: [String]
    }
  },
  shelter: {
    _id: {type: Schema.Types.ObjectId, required: false},
    name: {type: String, trim: true, required: false}
  },
  createdDate: {type: Date, default: Date.now},
  flActive: {type: Boolean, default: true}
})

module.exports = mongoose.model('Animal', animalSchema)
