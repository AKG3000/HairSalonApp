const express = require('express');
const {
  createState,
  getStates,
  deleteState,
  updateState,
} = require('../controllers/location/StateController');
const router = express.Router();

router.route('/add').post(createState);
router.route('/').get(getStates);
router.route('/:id').delete(deleteState);
router.route('/update/:id').post(updateState);

module.exports = router;
