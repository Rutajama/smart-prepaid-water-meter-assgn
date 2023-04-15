const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  units_balance: { 
    type: Number,
    default: 0,
  },
  tokens_bought: { 
    type: Number,
    default: Number
  },
});

CustomerSchema.virtual("name").get(function() {
  let fullname = "";
  if(this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }
  if( !this.first_name || !this.family_name) {
    fullname = "";
  }
  return fullname;
});

CustomerSchema.virtual('url').get(function() {
  return `/index/customer/${this._id}`;
});

module.exports = mongoose.model('Customer', CustomerSchema);

