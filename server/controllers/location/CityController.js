const City = require('../../models/city.model');
const Sequence = require('../../models/helperModels/sequence.model');

const createCity = async (req, res) => {
  const cityName = req.body.name;
  try {
    const isDuplicate = await City.findOne({ name: cityName });
    if (isDuplicate) res.status(400).json('Duplicate Entry for the City');
    else {
      const newCity = new City(req.body);
      const savedCity = await newCity.save();
      res.status(200).json(savedCity);
    }
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

const deleteCity = async (req, res) => {
  try {
    const delCity = await City.findById(req.params.id);
    if (!delCity) return res.status(400).json('City not present');
    const deletedCity = await City.findByIdAndDelete(req.params.id);
    if (!deletedCity) return res.status(400).json('Error deleting City');
    console.log('City Deleted Successfully');
    City.updateMany(
      { cityOrder: { $gt: deletedCity.cityOrder } },
      { $inc: { cityOrder: -1 } }
    )
      .then((result) => {
        return Sequence.findByIdAndUpdate('cities', {
          $inc: { sequence_value: -1 },
        }).exec();
      })
      .then(() => {
        return res
          .status(200)
          .json('Cities Deleted and Reordered Successfully');
      })
      .catch((err) => {
        return res.status(400).json('Error reordering Cities' + err);
      });
  } catch (err) {
    res.status(400).json('Error ' + err);
  }
};

const updateCity = async (req, res) => {
  const cityId = req.params.id;
  const cityName = req.body.name;
  try {
    const isDuplicate = await City.findOne({ name: cityName });
    if (isDuplicate)
      return res.status(400).json('Duplicate Entry for the City');
    const updatedCity = await City.findByIdAndUpdate(cityId, req.body, {
      new: true,
      runValidators: true,
    }).exec();

    if (!updatedCity) {
      return res.status(404).json({ error: 'City not found' });
    }

    return res.status(200).json(updatedCity);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error ' + err });
  }
};

const getCities = async (req, res) => {
  try {
    const cities = await City.find().exec();
    return res.status(200).json(cities);
  } catch (err) {
    return res.status(400).json('Error: ' + err);
  }
};

module.exports = {
  createCity,
  getCities,
  deleteCity,
  updateCity,
};
