const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    lastEdited: {
        type: Date,
        default: Date.now()
    },
    tags: {
        type: Array,
    }

},{
    collection: 'todos',
})

module.exports = mongoose.model("Todo", TodoSchema);