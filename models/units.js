const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const UnitsSchema = new Schema({
  name: {
    type: String, 
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  units: {
    type: String, 
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  state: {
    type: String,
    required: true,
  },
});

UnitsSchema.virtual("date_of_transaction").get(function () {
  return DateTime.fromJSDate(this.date).toISODate(); // format 'YYYY-MM-DD'
});

module.exports = mongoose.model('Units', UnitsSchema);
