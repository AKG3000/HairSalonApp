const Salon = require('../models/salon.model');

const createSalon = (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const owner = req.body.owner;
  const salonImage = req.body.salonImage;
  const phoneNo = req.body.phoneNo;
  const rating = req.body.rating;

  if (
    name === undefined ||
    address === undefined ||
    phoneNo === undefined ||
    owner === undefined
  )
    res.status(400).json('Insufficient Data Added');
  const newSalon = new Salon({
    name,
    address,
    owner,
    salonImage,
    phoneNo,
    rating,
  });

  newSalon
    .save()
    .then(() => res.json('New Salon Added'))
    .catch((err) => res.status(400).json('Error: ' + err));
};

const getSalon = (req, res) => {
  Salon.find()
    .then((salon) => res.json(salon))
    .catch((err) => res.status(400).json('Error: ' + err));
};
const deleteSalon = (req, res) => {
  Salon.findByIdAndDelete(req.params.id)
    .then((salon) => res.json(salon))
    .catch((err) => res.status(400).json('Error: ' + err));
};
const updateSalon = (req, res) => {
  Salon.findById(req.params.id).then((salon) => {
    salon.name = req.body.name;
    salon.address = req.body.address;
    salon.owner = req.body.owner;
    salon.phoneNo = req.body.phoneNo;
    salon.salonImage = req.body.salonImage;
    salon.rating = req.body.rating;

    salon
      .save()
      .then(() => res.json('Salon updated!!'))
      .catch((err) => res.status(400).json('Error: ' + err));
  });
};

module.exports = {
  createSalon,
  getSalon,
  deleteSalon,
  updateSalon,
};
