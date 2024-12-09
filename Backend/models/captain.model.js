const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
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
    status: {
        type: String,
        enum: ['available', 'unavailable', 'on duty'],
        default: 'unavailable'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Colour must be atleast 3 chracters long']
        },
        plate:{
            type:String,
            required: true,
            unique: true,
            minlength: [7, 'Plate number must be atleast 7 characters long']
        },
        capacity:{
            type: Number,
            required: true,
            min: 1,
            max: 7
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ['car', 'auto', 'bike']
        }
    },
    location:{
        lat:{
            type: Number
        },
        lng:{
            type:Number
        }

    }
});

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

const captainModel = mongoose.model('captain',captainSchema);

module.exports = captainModel;