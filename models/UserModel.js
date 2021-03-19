const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHashed: {
        type: String,
        required: true
    }
}, {
    collection: 'users',
})
//encrypting password before storing
//Handled in UserController
// UserSchema.pre("save", async (next) => {
//     const user = this;
//     if(this.isModified("password") || this.isNew){
//         user.password = bcrypt.hashSync(user.password, 10)
//     }else{
//         return next();
//     }
// })

module.exports = mongoose.model("UserSchema", UserSchema)