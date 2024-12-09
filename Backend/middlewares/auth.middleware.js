const userModel =  require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.authUser = async(req, res, next) => {
    //created cookies in user.controller.js file
    //if we have cookies then there is no need to pass authorization (bearer type) as a header 
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }

    const isBlacklisted = await userModel.findOne({token: token});

    if(isBlacklisted){
        return res.status(401).json({message: 'Unauthorized'});
    }


    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;

        return next();

    }catch(err) {
        // Better error handling
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({message: 'Invalid token'});
        }
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({message: 'Token expired'});
        }
        return res.status(500).json({message: 'Server error'});
    }
}