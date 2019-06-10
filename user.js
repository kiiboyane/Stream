const mongoose = require("mongoose"); 
const Schema = mongoose.Schema ; 

const UserSchema = new Schema({
	tags : [] ,
	peerId : String,
	last : Date 
}) ; 

const  User = mongoose.model('user' , UserSchema);

module.exports = User  ; 
