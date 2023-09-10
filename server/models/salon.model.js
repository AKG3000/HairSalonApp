const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SalonSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  },
  baseImage: {
    type: String,
    default:
      'http://www.energyfit.com.mk/wp-content/plugins/ap_background/images/default/default_1.png',
  },
  salonCategory: { type: String },
  phoneNo: { type: String, required: true },
});

const Salon = mongoose.model('Salon', SalonSchema);
module.exports = Salon;
