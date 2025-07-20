const express = require('express');
const router = express.Router();
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  trackFollowUp,
} = require('../controllers/customerController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin'); // Import admin middleware

router.post('/', [auth, admin], createCustomer); // Apply both auth and admin middlewares
router.get('/', auth, getAllCustomers);
router.get('/:id', auth, getCustomerById);
router.put('/:id', [auth, admin], updateCustomer); // Apply both auth and admin middlewares
router.delete('/:id', [auth, admin], deleteCustomer); // Apply both auth and admin middlewares
router.post('/:id/followup', [auth, admin], trackFollowUp); // Apply both auth and admin middlewares

module.exports = router;
