const express = require('express');
const router = express.Router();
const { sendFollowUpEmail } = require('../controllers/emailController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin'); // Import admin middleware

router.post('/send', [auth, admin], sendFollowUpEmail); // Apply both auth and admin middlewares

module.exports = router;
