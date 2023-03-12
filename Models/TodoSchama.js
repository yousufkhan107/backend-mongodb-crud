const mongoose = require("mongoose");


const schema = mongoose.Schema({
    todo:{
        type:String
    }
})

const TodoModel = mongoose.model('todo',schema);
module.exports = TodoModel;
