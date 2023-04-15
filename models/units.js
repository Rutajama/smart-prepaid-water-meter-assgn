const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const UnitsSchema = new Schema({
  name: {type: String},
  units: {
    type: String, 
    required: true,
  },
});

module.exports = mongoose.model('Units', UnitsSchema);
