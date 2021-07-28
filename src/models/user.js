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
                            throw new Error('Email is invalide')
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
       },
       tokens: [{
              token: {
                     type: String,
                     required: true
              }
       }]

}, {
       timestamps: true
})

userSchema.virtual('book', {
       ref: 'Books',
       localField: '_id',
       foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function () {
       const user = this 
       const token = jwt.sign({_id: user.id.toString()},process.env.JWT_SECRET)

       user.tokens = user.tokens.concat({ token })
       await user.save()

       return token 
}

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
userSchema.method.toJSON = function () {
       const user = this 
       const userObject = user.toObject()

       delete userObject.password
       delete userObject.token

       return userObject
}

const User = mongoose.model('User', userSchema)

module.exports = User