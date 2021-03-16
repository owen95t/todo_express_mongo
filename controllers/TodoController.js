const Todo = require('../models/TodoModel')

exports.listAllTodos = (req, res) => {
    console.log('list all todos')
    Todo.find({}, (err, todo) =>{
        if (err) {
            console.log(err)
            return res.status(500).send(err)
        }
        res.status(200).json(todo)
    })
}

exports.getTodo = (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err)
        }
        res.status(200).json(todo)
    })
}

exports.createNewTodo = (req, res) => {
    console.log('Request body:' + req.body.title)
    const newTodo = new Todo(req.body)
    newTodo.save((err, todo) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err)
        }
        res.status(201).json(todo)
    })
}

exports.updateTodo = (req, res) => {
    Todo.findOneAndUpdate(
        {_id: req.params._id}, //find with filter
        req.body, //update with this info
        {new: true}, //this option returns the document after update
        (err, todo) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).json(todo)
        })
}

exports.deleteTodo = (req, res) => {
    console.log('Delete todo called')
    console.log('DELETE params: '+req.params)
    //console.log('DELETE params _id: '+req.params._id)
    Todo.findByIdAndDelete(req.params, (err, todo) => {
        if (err) {
            console.log('DELETE ERROR' + err)
            return res.status(500).send(err)
        }
        res.status(200).json({message: 'Task ' + req.params + ' removed successfully'})
    })
}

