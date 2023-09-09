const express = require('express');
const {
  createSalon,
  getSalons,
  getSalon,
  updateSalon,
  deleteSalon,
} = require('../controllers/SalonController');
const router = express.Router();

router.route('/add').post(createSalon);
router.route('/:id').get(getSalon);
router.route('/').get(getSalons);
router.route('/:id').delete(deleteSalon);
router.route('/update/:id').post(updateSalon);

module.exports = router;
