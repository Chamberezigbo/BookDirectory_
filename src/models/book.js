const mongoose = require('mongoose')
const { schema } = require('./user')

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
       description:{
              type: String,
              trim:true,
       },
       bookCover:{
              type: Buffer,
              required:true
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

bookSchema.methods.confirmBookCover = (error, req, res, next) => {
       res.status(400).send({ error: error.message })
}

const Books = mongoose.model('Books', bookSchema)

module.exports = Books