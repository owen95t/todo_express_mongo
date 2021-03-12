const express = require('express');
const router = express.Router();

// @desc

router.get('/', (req, res, next) => {
     res.send('We are at root/index')
    //console.log('get root')
});

router.get('/dashboard', (req, res) => {
    res.send('dashboard')
})


module.exports = router