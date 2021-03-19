const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/UserModel')
const User = require('../controllers/UserController')
const bcrypt = require('bcryptjs')

passport.use('signup',
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, next) => {
        try{
            const user = await User.createUser({username, password})

            return next(null, user)
        }catch (e) {
            return next(e)
        }
    }));
passport.use('login',
    new LocalStrategy({
    username: 'username',
    password: 'passwordHashed'
}, async (username, password, cb) => {
    try {
        const user = await UserModel.findOne({username: username})
        const passwordMatch = await bcrypt.compare(password, user.passwordHashed);

        if (!user) {
            return cb(null, false, {message: 'user doesnt exist'})
        }else if (!passwordMatch) {
            return cb(null, false, {message: 'Wrong password'})
        }
        return cb(null, user, {message: 'Logged in successfully'})
    } catch (e){
        cb(e);
    }
}))