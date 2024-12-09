const userModel = require('../models/user.model')

module.exports.createUser = async({
    firstName,  // Changed from firstname to firstName
    lastName,   // Similarly, adjust this if needed
    email,
    password
})=>{
    if(!firstName || !email || !password){
        throw new Error('All fields are required');
    }
    const user = await userModel.create({  // Added await
        fullName:{
            firstName,   // Use the correct parameter name
            lastName
        },
        email,
        password
    })

    return user;
}