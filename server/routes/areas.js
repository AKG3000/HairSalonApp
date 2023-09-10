const express = require('express');
const {
  createArea,
  getAreas,
  deleteArea,
  updateArea,
} = require('../controllers/location/AreaController');
const router = express.Router();

router.route('/add').post(createArea);
router.route('/').get(getAreas);
router.route('/:id').delete(deleteArea);
router.route('/update/:id').post(updateArea);

module.exports = router;
