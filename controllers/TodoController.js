const Todo = require('../models/TodoModel')

exports.listAllTodos = (req, res) => {
    console.log('list all todos')
    Todo.find({}, (err, todo) =>{
        if (err) {
            res.status(500).send(err)
        }
        res.status(200).json(todo)
    })
}

exports.getTodo = (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (err) {
            res.status(500).send(err)
        }
        res.status(200).json(todo)
    })
}

exports.createNewTodo = (req, res) => {
    console.log('Request body:' + req.body.title)
    const newTodo = new Todo(req.body)
    newTodo.save((err, todo) => {
        if (err) {
            res.status(500).send(err)
            console.log(err)
        }
        res.status(201).json(todo)
    })
}

exports.updateTodo = (req, res) => {
    Todo.findOneAndUpdate(
        {_id: req.params.todoid},
        req.body,
        {new: true},
        (err, todo) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).json(todo)
        })
}

exports.deleteTodo = (req, res) => {
    Todo.findByIdAndDelete({_id: req.params.todoid}, (err, todo) => {
        if (err) {
            res.status(500).send(err)
        }
        res.status(200).json({message: 'Task ' + req.params.title + 'removed successfuly'})
    })
}

