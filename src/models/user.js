const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

require('dotenv').config()

const userSchema = new mongoose.Schema({
       firstName: {
              type: String,
              required: true,
              trim: true
       },
       lastName: {
              type: String,
              required: true,
              trim:true
       },
       email:{
              type: String,
              unique: true,
              required: true,
              trim:true,
              lowercase: true,
              validator(value) {
                     if (!validator.isEmail(value)) {
                            throw new Error('Email is invalid')
                     }
              }
       },
       password: {
              type: String,
              required:true,
              minlength:7,
              trim: true,
              validator(value){
                     if (value.toLowerCase().includes('password')) {
                            throw new Error ('Password cannot contain "password')
                     }
              }
       },
       gender: {
              type: String,
              required: true,
              trim: true
       }

}, {
       timestamps: true
})

userSchema.virtual('book', {
       ref: 'Books',
       localField: '_id',
       foreignField: 'owner'
})
userSchema.virtual('token', {
       ref: 'token',
       localField: '_id',
       foreignField: 'userId'
})


// to validate login //
userSchema.statics.findByCredentials = async (email, password) => {
       const user = await User.findOne({email})
       if (!user) {
              throw new Error ('unable to login')
       }
       const isMatch = await bcrypt.compare(password, user.password)
       if (!isMatch) {
              throw new Error('Unable to login')
       }
       return user 
}

// Hash the plan text password before saving //
userSchema.pre('save', async function (next) {
       const user = this 

       if (user.isModified('password')) {
              user.password = await bcrypt.hash(user.password, 8)
       }

       next()

})

// delete the object from the database //
userSchema.methods.toJSON = function () {
       const user = this 
       const userObject = user.toObject()

       delete userObject.password
       return userObject
}

const User = mongoose.model('User', userSchema)

module.exports = User