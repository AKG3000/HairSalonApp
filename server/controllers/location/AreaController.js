const Area = require('../../models/area.model');
const Sequence = require('../../models/helperModels/sequence.model');

const createArea = async (req, res) => {
  const areaName = req.body.name;
  try {
    const isDuplicate = await Area.findOne({ name: areaName });
    if (isDuplicate) res.status(400).json('Duplicate Entry for the Area');
    else {
      const newArea = new Area(req.body);
      const savedArea = await newArea.save();
      res.status(200).json(savedArea);
    }
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

const deleteArea = async (req, res) => {
  try {
    const delArea = await Area.findById(req.params.id);
    if (!delArea) return res.status(400).json('Area not present');
    const deletedArea = await Area.findByIdAndDelete(req.params.id);
    if (!deletedArea) return res.status(400).json('Error deleting Area');
    console.log('Area Deleted Successfully');
    Area.updateMany(
      { areaOrder: { $gt: deletedArea.areaOrder } },
      { $inc: { areaOrder: -1 } }
    )
      .then((result) => {
        return Sequence.findByIdAndUpdate('areas', {
          $inc: { sequence_value: -1 },
        }).exec();
      })
      .then(() => {
        return res
          .status(200)
          .json('Areas Deleted and Reordered Successfully');
      })
      .catch((err) => {
        return res.status(400).json('Error reordering Areas' + err);
      });
  } catch (err) {
    res.status(400).json('Error ' + err);
  }
};

const updateArea = async (req, res) => {
  const areaId = req.params.id;
  const areaName = req.body.name;
  try {
    const isDuplicate = await Area.findOne({ name: areaName });
    if (isDuplicate)
      return res.status(400).json('Duplicate Entry for the Area');
    const updatedArea = await Area.findByIdAndUpdate(areaId, req.body, {
      new: true,
      runValidators: true,
    }).exec();

    if (!updatedArea) {
      return res.status(404).json({ error: 'Area not found' });
    }

    return res.status(200).json(updatedArea);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error ' + err });
  }
};

const getAreas = async (req, res) => {
  try {
    const areas = await Area.find().exec();
    return res.status(200).json(areas);
  } catch (err) {
    return res.status(400).json('Error: ' + err);
  }
};

module.exports = {
  createArea,
  getAreas,
  deleteArea,
  updateArea,
};
