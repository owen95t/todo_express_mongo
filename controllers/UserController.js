const User = require('../models/UserModel');
const bcrypt = require('bcryptjs')

exports.createUser = (req,res) => {
    const hashedPass = bcrypt.hash(req.body.password, 10);
    //This is a shortcut way
    // User.create({
    //     username: req.body.username,
    //     password: hashedPass
    // })
    //This is a longer way

    const newUser = new User({
        username: req.body.username,
        password: hashedPass
    });
    newUser.save((err, user) => {
        if (err) {
            console.log('newUser save error: ' + err)
            return res.status(500).send(err)
        }
        res.status(201).send({auth: true, token: token})
    })
}