const mongoose = require('mongoose');
const Sequence = require('./helperModels/sequence.model');
const { initializeSequence } = require('../utils/SequenceInitializer');

// Define the City schema
const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  stateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State',
    required: true,
  },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  isPopular: { type: Boolean, default: false },
  hasArea: { type: Boolean, default: false },
  cityOrder: { type: Number },
  pincode: Number,
});

// Before Saving the City ,We will perform this operation
citySchema.pre('save', async function (next) {
  try {
    const connection = mongoose.connection;
    const collectionName = 'cities';
    const collections = await connection.db
      .listCollections({ name: collectionName })
      .toArray();
    if (collections.length === 0) {
      console.log(`Collection '${collectionName}' does not exist`);
      initializeSequence();
    }
    const doc = this;
    Sequence.findByIdAndUpdate(
      collectionName, // The name of the target collection
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true },
      (err, sequence) => {
        if (err) {
          return next(err);
        }
        doc.stateId = sequence.sequence_value;
        next();
      }
    );
  } catch (err) {
    console.error('Error during Collection Creation:', err);
    next(err);
  }
});

// Define the City model
const City = mongoose.model('City', citySchema);

module.exports = { City };
