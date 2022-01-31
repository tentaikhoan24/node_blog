const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');
const accountController = require('../app/controllers/AuthController');

router.get('/search', siteController.search);
router.get('/register', accountController.registerForm);
router.get('/login', accountController.loginForm);
router.get('/logout', accountController.logout);
router.get('/', siteController.home);

module.exports = router;
