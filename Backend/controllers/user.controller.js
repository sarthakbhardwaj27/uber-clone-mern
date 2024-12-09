const userModel = require('../models/user.model');
const userService = require('../services/user.services');
const { validationResult } = require('express-validator') 
const blacklistTokenModel = require('../models/blacklistToken.model')


module.exports.registerUser = async(req,res,next)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {fullName,email,password} = req.body;
    console.log({fullName,email,password});
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({token, user})
}

module.exports.loginUser = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user ||!(await user.comparePassword(password))){
        return res.status(401).json({error: 'Invalid credentials'});
    }

    const token = user.generateAuthToken();

    //for handling auth.middleware with cookies -> benefit would be the we can directly read from cookies instead of passing bearer token
    res.cookie('token',token)

    res.status(200).json({token, user})
}

module.exports.getUserProfile = async(req,res,next)=>{
    //created a auth.middleware.js file for this route to see who the user is and is it authorized? 
    // console.log('Inside user controller');
    res.status(200).json(req.user);
}

module.exports.logoutUser = async(req,res,next)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({token});

    res.status(200).json({messsage: "Logged Out"});
}