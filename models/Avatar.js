const mongoose = require('mongoose')

const avatarSchema = new mongoose.Schema({
    name:String,
    src:String,
})

const socialworkSchema = new mongoose.Schema({
    names:Array
})

const Avatar = mongoose.model('avatar', avatarSchema)
const Socialwork = mongoose.model('socialwork', socialworkSchema)

module.exports = Avatar
module.exports=Socialwork