const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
  _id: String, // The name of the target collection
  sequence_value: Number,
});

const Sequence = mongoose.model('Sequence', sequenceSchema);

module.exports = Sequence;
