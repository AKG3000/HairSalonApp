const Sequence = require('./sequenceModel'); // Import the Sequence model

function initializeSequence(collectionName) {
  Sequence.create({ _id: collectionName, sequence_value: 1 }, (err, result) => {
    if (err) {
      console.error('Error initializing sequence:', err);
    } else {
      console.log('Sequence initialized:', result);
    }
  });
}

module.exports = {initializeSequence};
