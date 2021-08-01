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
              type: String,
              required:true
       },
       published:{
              type: String,
              required: true
       },
       startedDate:{
              type: String,
              required: true
       },
       endedDate:{
              type:String
       },
       howLong:{
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