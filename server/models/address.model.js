const mongoose = require('mongoose');

// Define the Address schema
const addressSchema = new mongoose.Schema({
  street: { type: string, required: true },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
  },
  area: {
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

module.exports = { Address };
