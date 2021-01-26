const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    link:{type:String, required:true, unique:true},
    lid:{type:String, required:true, unique:true},
    date: {type:Date, default:Date.now}
})

const Link = mongoose.model('link', schema);

module.exports = Link;