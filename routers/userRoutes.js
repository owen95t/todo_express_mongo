const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const UserController = require('../controllers/UserController')
const jwt = require('jsonwebtoken')
const secret = require('../config/secrets')
const auth = require('../auth/verifyToken')

router.use(bodyParser.json())

const {registerValidation, loginValidation} = require('../config/inputValidation')

// router
//     .route('/register')
//     .post(auth, UserController.createUser)
router.get('/', auth, (req, res) => {
    console.log('/api/user root requested')
    res.send('/api/user root. User ID: ' + req.user._id)
})
router.post('/register', async (req, res) => {
    //validate data before creating user
    //TODO: move validation into userController
    const {error} = registerValidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    //check if user is already in database:
    const email = await User.findOne({username: req.body.username})
    if (email) {
        return res.status(400).send('User under this email already exists.')
    }

    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        username: req.body.username,
        passwordHashed: hashedPass
    })
    try{
        const savedUser = await user.save()
        return res.status(201).send(savedUser)
    }catch (e) {
        return res.status(400).send(e)
    }
})
router.get('/:id', async (req, res) => {
    const findUser = User.findOne({username: req.body.username})
})

router.post('/login', async (req, res) => {
    //validate
    const {error} = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    //check if email exists
    const user = await User.findOne({username: req.body.username})
    if (!user) {
        return res.status(400).send('Email does not exist')
    }
    // res.send(email)
    //if email exists, check if password matches
    // await bcrypt.compare(req.body.password, email.passwordHashed).then(result => {
    //     if (!result) {
    //         return res.status(400).send('Invalid Pass')
    //     }
    // }).catch(e => {
    //     if (e) {
    //         return res.status(400).send('BCRYPT Error: ' + e)
    //     }
    // })
    const passwordCheck = await bcrypt.compare(req.body.password, user.passwordHashed)
    if (!passwordCheck) {
        return res.status(400).send('Invalid Password. Please try again')
    }
    //create and assign a token
    const token = jwt.sign({_id: user._id}, secret.secret, {expiredIn: 60 * 60}) //numeric: seconds. string; milliseconds. can specify 1h, 1d, 2 days, in string.
    res.header('auth-token', token).send(token)
    //res.send('Login success' + secret.secret)
})


module.exports = router