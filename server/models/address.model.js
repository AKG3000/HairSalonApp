const mongoose = require('mongoose');
const Sequence = require('./helperModels/sequence.model');
const { initializeSequence } = require('../utils/SequenceInitializer');

const stateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
  stateOrder: { type: Number, required: true },
});

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

//Define the State Model
const State = mongoose.model('State', stateSchema);

// Define the City model
const City = mongoose.model('City', citySchema);

// Define the Area model
const Area = mongoose.model('Area', areaSchema);

// Define the Address model
const Address = mongoose.model('Address', addressSchema);

module.exports = { City, Area, Address, State };
