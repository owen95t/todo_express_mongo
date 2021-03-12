const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser')
//const router = express.Router()
const todoController = require('./controllers/TodoController');
const connectDB = require('./config/db')
const cors = require('cors')

//const todoRoutes = require('./routers/todoRoutes');
//settings
connectDB();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
//app.use(express.json())
app.use(cors())
//prettify json payload/dump
app.set('json spaces', 2)

app.listen(PORT, () => {
    console.log('Alive on localhost: ', PORT)
})

app.use('/', require('./routers/index'))
app.use('/todo', require('./routers/todoRoutes'))

// app.get('/', (req, res) => {
//    res.send("root")
// });
