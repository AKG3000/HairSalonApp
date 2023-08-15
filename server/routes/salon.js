const express = require('express');
const {
  createSalon,
  getSalon,
  updateSalon,
  deleteSalon,
} = require('../controllers/SalonController');
const router = express.Router();

router.route('/add').post(createSalon);
router.route('/').get(getSalon);
router.route('/:id').delete(deleteSalon);
router.route('/update/:id').post(updateSalon);

module.exports = router;
