const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SalonSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  owner: { type: String, required: true },
  salonImage: String,
  phoneNo: { type: Number, required: true },
  rating: Number,
});

const Salon = mongoose.model('Salon', SalonSchema);
module.exports = Salon;
 