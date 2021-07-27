const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
       title:{
              type: String,
              required: true,
              trim: true
       },
       author:{
              type: String,
              required: true,
              trim:true
       },
       summary:{
              type: String
       },
       descrption:{
              type: String,
              trim:true,
       },
       bookcover:{
              type: Buffer
       },
       published:{
              type: String,
              required: true
       },
       started:{
              type: String,
              required: true
       },
       ended:{
              type:String
       },
       owner: {
              type: mongoose.Schema.Types.ObjectId,
              required: true,
              ref: 'User'
       }

}, {
       timestamps:true
})

const Books = mongoose.model('Books', bookSchema)

module.exports = Books