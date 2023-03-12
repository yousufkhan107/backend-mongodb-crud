const mongoose = require("mongoose");


const schema = mongoose.Schema({
    email:{
        type:String
    },
    name:{
        type:String
    },
    password:{
        type:String
    }
})

const userModal = mongoose.model('user',schema);
module.exports = userModal ;
