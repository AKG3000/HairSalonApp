const mongoose = require('mongoose');

// Define the Address schema
const addressSchema = new mongoose.Schema({
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  addressLine3: { type: String },
  stateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State',
  },
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
  },
  areaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Area',
  },
  pincode: {
    type: Number,
    required: true,
  },
});

// Define the Address model
const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
