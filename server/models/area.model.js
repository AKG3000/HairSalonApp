const mongoose = require('mongoose');
const Sequence = require('./helperModels/sequence.model');
const { initializeSequence } = require('../utils/SequenceInitializer');

// Define the Area schema
const areaSchema = new mongoose.Schema({
  name: String,
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  },
  pincode: { type: Number, required: true },
  areaOrder: { type: Number, required: true },
  // Other area-related fields
});

// Before Saving the City ,We will perform this operation
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

// Define the Area model
const Area = mongoose.model('Area', areaSchema);

module.exports = { Area };
