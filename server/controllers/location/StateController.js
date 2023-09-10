const State = require('../../models/state.model');
const Sequence = require('../../models/helperModels/sequence.model');

const createState = async (req, res) => {
  const stateName = req.body.name;
  try {
    const isDuplicate = await State.findOne({ name: stateName });
    if (isDuplicate) res.status(400).json('Duplicate Entry for the State');
    else {
      const newState = new State({
        name: stateName,
        lat: req.body.lat,
        long: req.body.long,
      });
      newState
        .save()
        .then(() => res.status(200).json('New State Added: ' + newState));
    }
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

const deleteState = async (req, res) => {
  try {
    const delState = await State.findById(req.params.id);
    if (!delState) return res.status(400).json('State not present');
    const deletedState = await State.findByIdAndDelete(req.params.id);
    if (!deletedState) return res.status(400).json('Error deleting State');
    console.log('State Deleted Successfully');
    State.updateMany(
      { stateOrder: { $gt: deletedState.stateOrder } },
      { $inc: { stateOrder: -1 } }
    )
      .then((result) => {
        return Sequence.findByIdAndUpdate('states', {
          $inc: { sequence_value: -1 },
        }).exec();
      })
      .then(() => {
        return res.status(200).json('State Deleted and Reordered Successfully');
      })
      .catch((err) => {
        return res.status(400).json('Error reordering States' + err);
      });
  } catch (err) {
    res.status(400).json('Error ' + err);
  }
};

const updateState = async (req, res) => {
  const stateId = req.params.id;
  const stateName = req.body.name;
  try {
    const isDuplicate = await State.findOne({ name: stateName });
    if (isDuplicate)
      return res.status(400).json('Duplicate Entry for the State');
    const updatedState = await State.findByIdAndUpdate(stateId, req.body, {
      new: true,
      runValidators: true,
    }).exec();

    if (!updatedState) {
      return res.status(404).json({ error: 'State not found' });
    }

    return res.status(200).json(updatedState);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error ' + err});
  }
};

const getStates = async (req, res) => {
  try {
    const states = await State.find().exec();
    return res.status(200).json(states);
  } catch (err) {
    return res.status(400).json('Error: ' + err);
  }
};

module.exports = {
  createState,
  getStates,
  deleteState,
  updateState,
};
