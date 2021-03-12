const express = require('express');
const router = express.Router();
const todoController = require('../controllers/TodoController')
const bodyParser = require('body-parser')
router.use(bodyParser.json())


router
    .route('/')
    .get(todoController.listAllTodos)

router
    .route('/add')
    //.get(todoController.getTodo)
    .post(todoController.createNewTodo)
    // .post((req, res) => {
    //     console.log(req.body.data)
    // })
    //.delete(todoController.deleteTodo)


module.exports = router;