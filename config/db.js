const mongoose = require('mongoose');
const uri = require('./config')

const dbURI = uri.uri

// mongoose.connect(dbURI).then(() => {
//     console.log("DB connection established")
// }).catch(err => {
//     console.log(err)
// })

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }).then((con) => {
            console.log("MongoDB connected: " + con.connection.host)
        });
    } catch (e) {
        console.log(e.reason);
        process.exit(1);
    }
}

module.exports = connectDB