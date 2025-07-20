const express = require('express');
const router = express.Router();
const { generateReports } = require('../controllers/reportController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin'); // Import admin middleware

router.get('/', [auth, admin], generateReports); // Apply both auth and admin middlewares

module.exports = router;
