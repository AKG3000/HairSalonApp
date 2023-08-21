const { findById } = require('../models/salon.model');
const Salon = require('../models/salon.model');

const createSalon = (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const owner = req.body.owner;
  const salonImage = req.body.salonImage;
  const phoneNo = req.body.phoneNo;
  const rating = req.body.rating;

  try {
    if (
      name !== undefined ||
      address !== undefined ||
      phoneNo !== undefined ||
      owner !== undefined
    ) {
      const newSalon = new Salon({
        name,
        address,
        owner,
        salonImage,
        phoneNo,
        rating,
      });

      newSalon.save().then(() => res.status(200).json('New Salon Added'));
    } else res.status(400).json('Insufficient Data Added');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

const getSalons = async (req, res) => {
  try {
    const salons = await Salon.find();
    console.log(salons.length);
    console.log('Inside error catch');
    return res.status(200).json(salons);
  } catch (err) {
    return res.status(400).json('Error: ' + err);
  }
};

const deleteSalon = (req, res) => {
  Salon.findByIdAndDelete(req.params.id)
    .then((salon) => res.status(200).json(salon))
    .catch((err) => res.status(400).json('Error: ' + err));
};

const updateSalon = (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const owner = req.body.owner;
  const salonImage = req.body.salonImage;
  const phoneNo = req.body.phoneNo;
  const rating = req.body.rating;
  console.log(address);
  Salon.findById(req.params.id).then((salon) => {
    if (name !== undefined) salon.name = name;
    if (address !== undefined) salon.address = address;
    if (owner !== undefined) salon.owner = owner;
    if (phoneNo !== undefined) salon.phoneNo = phoneNo;
    if (salonImage !== undefined) salon.salonImage = salonImage;
    if (rating !== undefined) salon.rating = rating;

    salon
      .save()
      .then(() => res.status(200).json('Salon updated!!'))
      .catch((err) => res.status(400).json('Error: ' + err));
  });
};

const getSalon = async (req, res) => {
  try {
    const salon = await Salon.findById(req.params.id);
    if (salon !== null) res.status(200).json(salon);
    else res.status(400).json('Salon does not exist');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

module.exports = {
  createSalon,
  getSalons,
  deleteSalon,
  updateSalon,
  getSalon,
};
