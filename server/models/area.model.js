const mongoose = require('mongoose');
const Sequence = require('./helperModels/sequence.model');
const { initializeSequence } = require('../utils/SequenceInitializer');

// Define the Area schema
const areaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
  pincode: { type: Number, required: true },
  areaOrder: { type: Number },
  // Other area-related fields
});

// Before Saving the Area ,We will perform this operation
areaSchema.pre('save', async function (next) {
  try {
    const connection = mongoose.connection;
    const collectionName = 'areas';
    const collections = await connection.db
      .listCollections({ name: collectionName })
      .toArray();
    if (collections.length === 0) {
      console.log(`Collection '${collectionName}' does not exist`);
      initializeSequence();
    }
    const doc = this;
    const sequence = await Sequence.findByIdAndUpdate(
      collectionName, // The name of the target collection
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    ).exec();
    doc.areaOrder = sequence.sequence_value;
    next();
  } catch (err) {
    console.error('Error during Collection Creation:', err);
    return next(err);
  }
});

// Define the Area model
const Area = mongoose.model('Area', areaSchema);

module.exports = Area;
