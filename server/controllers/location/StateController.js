const State = require('../../models/state.model');

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
      newState.save().then(() => res.status(200).json('New State Added'));
    }
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

const deleteState = async (req, res) => {
  const delState = await State.findById(req.params.id);
  if (!delState) return res.status(400).json('State not present');
  State.findByIdAndRemove(req.params.id, (err, deletedDoc) => {
    if (err) {
      return res.status(400).json('Error Deleting State ' + err);
    } else {
      console.log('State Deleted Successfully');
      State.updateMany(
        { stateOrder: { $gt: deletedDoc.stateOrder } },
        { $inc: { stateOrder: -1 } },
        (err, result) => {
          if (err) {
            return res.status(400).json('Error reordering States');
          } else {
            return res
              .status(200)
              .json('State Deleted and Reordered Successfully');
          }
        }
      );
    }
  });
};

const updateState = async (req, res) => {
  const stateName = req.body.name;
  const isDuplicate = await State.findOne({ name: stateName });
  if (isDuplicate) return res.status(400).json('Duplicate Entry for the State');
  State.findById(req.params.id).then((state) => {
    state.name = req.body.name;
    state.lat = req.body.lat;
    state.long = req.body.long;

    state
      .save()
      .then(() => res.status(200).json('State updated!!'))
      .catch((err) => res.status(400).json('Error: ' + err));
  });
};

const getStates = async (req, res) => {
  try {
    const states = await State.find();
    console.log(states.length);
    console.log('Inside error catch');
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
