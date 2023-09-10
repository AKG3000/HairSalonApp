const mongoose = require('mongoose');
const Sequence = require('./helperModels/sequence.model');
const { initializeSequence } = require('../utils/SequenceInitializer');

// Define the State Schema
const stateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
  stateOrder: { type: Number },
});

// Before Saving the State ,We will perform this operation
stateSchema.pre('save', async function (next) {
  try {
    const connection = mongoose.connection;
    const collectionName = 'states';
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
    doc.stateOrder = sequence.sequence_value;
    next();
  } catch (err) {
    console.error('Error during Collection Creation:', err);
    return next(err);
  }
});

//Define the State Model
const State = mongoose.model('State', stateSchema);

module.exports = State;
