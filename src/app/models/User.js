const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const User = new Schema({
    username : {type: String, lowercase: true, unique: true, require},
    password : {type: String, lowercase: true, require},
    fullName : {type: String, lowercase: true, require},
    email : {type: String, lowercase: true, unique: true, require},
},
{timestamps: true})

// User.pre('save',async function(err){
//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(this.password);
//         this.password = hashPassword;
//         next();
//     } catch (error) {
//         console.log(error);;
//     }
// })

module.exports = mongoose.model('User', User);