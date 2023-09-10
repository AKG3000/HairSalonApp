const express = require('express');
const {
  createCity,
  getCities,
  deleteCity,
  updateCity,
} = require('../controllers/location/CityController');
const router = express.Router();

router.route('/add').post(createCity);
router.route('/').get(getCities);
router.route('/:id').delete(deleteCity);
router.route('/update/:id').post(updateCity);

module.exports = router;
