const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    userID: {

    }
})

module.exports = mongoose.model("UserSchema", UserSchema)