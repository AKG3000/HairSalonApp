const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SalonSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  owner: { type: String, required: true },
  salonImage: {
    type: String,
    default:
      'http://www.energyfit.com.mk/wp-content/plugins/ap_background/images/default/default_1.png',
  },
  phoneNo: { type: String, required: true },
  rating: Number,
});

const Salon = mongoose.model('Salon', SalonSchema);
module.exports = Salon;
