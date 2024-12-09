const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    fullName:{
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'First name should be at least 3 characters long'],
        },
        lastName: {
            type: String,
            minlength: [3, 'Last name should be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: [5, 'Email must be atleast 5 characters long']
    },
    password:{
        type: String,
        required: true,
        // /By setting select: false on the password field, you're telling Mongoose to not return the password field in the results of queries (such as find(), findOne(), etc.). This is typically done for security reasons so that sensitive data (like passwords) isn't returned to the client unless specifically requested.
        select: false,
    },
    //to track driver and passenger's current location
    socketId:{
        type: String
    },
})

userSchema.methods.generateAuthToken = function(){
    //added expires in for blacklisting tokens: blacklisttoken.model.js
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'})
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
//next step - this model is being used in controllers folder