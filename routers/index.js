const express = require('express');
const router = express.Router();
const auth = require('../auth/verifyToken')

// @desc

router.get('/', auth, (req, res, next) => {
    console.log('Root Requested')
    res.send('We are at root/index. User: ' + req.user._id)
    //console.log('get root')
});

router.get('/dashboard', auth, (req, res) => {
    console.log('Dashboard Requested')
    res.send('dashboard')
})


module.exports = router