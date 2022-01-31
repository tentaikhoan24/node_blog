const User = require('../models/User')

class AuthController{
    registerForm(req, res, next) {
        return res.render('auth/register-form');
    }

    loginForm(req, res, next) {
        return res.render('auth/login-form');
    }

    logout(req, res, next) {
        return res.json('logout');
    }
}

module.exports = new AuthController();