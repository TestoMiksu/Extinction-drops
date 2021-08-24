const DB = require('mongoose')
const Schema = DB.Schema

const Drops = new Schema({
    userid: { type: String, required: true},
    username: { type: String, required: true},
    drop: {type: Number, default: 1}
})

module.exports = DB.model('drops', Drops)