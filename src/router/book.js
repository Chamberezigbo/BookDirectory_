const parser = require('../middleware/upload')
const express = require("express");
const multer = require('multer')
const sharp = require('sharp')
require("../middleware/cloudinary")


const Books = require("../models/book");
const auth = require("../middleware/auth");
const { request, response } = require("express");
const { parse } = require("dotenv");

const router = new express.Router();


router.post("/books", auth,  parser().single("bookCover"), async (req, res) => {
  let existBook = await Books.findOne({title: req.body.title })

  if (existBook) {
    return res.status(401).json({
      success: false ,
      resMassage: `sorry book title already existing`
    })
  }
  
  const book = new Books({
    ...req.body, bookCover:req.file.path,
    owner: req.user._id,
  });
  try {

    let sd = new Date(book.startedDate)
    let ed = new Date(book.endedDate)
    let red = sd.getTime() - ed.getTime()  
    red = red /(1000*3600*24)
    book.howLong = red
    await book.save();
    res.status(201).json({
      success: true,
      responseMassage: book,
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/books/:id", auth, async (request, response) => {
  try {
    const bookId = request.params.id;
    let getBook = await Books.findById(bookId);
    console.log(getBook);
    return response.status(200).json({ success: true, Message: getBook });
  } catch (error) {
    return response.status(401).json({
      success: false,
      responseMessage: ` Failed to get a book by ID due to {error}`,
    });
  }
});

router.get("/books-title-author", async (request, response) => {
  try {
    let { title, author } = request.body;
    let searchBookByTitleAuthor = await Books.find({$or:[{ title:title},{ author:author }] });
    return response
      .status(200)
      .json({ success: true, responseMessage: searchBookByTitleAuthor });
  } catch (error) {
    return response
      .status(400)
      .json({
        success: false,
        responseMessage: `Failed to get book by title or author due to this error ${error}`,
      });
  }
});

router.delete("/books/:id", auth, async (req, res) => {
  try {
    const book = await Books.findOneAndDelete({
      _id: req.params.id,
    });
    if (!book) {
      res.status(404).json({
        success: true,
        resMassage: "book not found",
      });
    }
    res.json({
      success: true,
      resMassage: book,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      resMassage: "error occurred",
    });
  }
});


router.put("/books-update/:id", auth, async (request,response) => {
  try {
    const bookId = request.params.id
    let {endedDate , summary} = request.body

    let updateBook =  await Books.findById(bookId)
    let newEndedDate = endedDate
    let sd = new Date(updateBook.startedDate)
    let ed = new Date({newEndedDate})
    let red = sd.getTime() - ed.getTime()  
    red = red /(1000*3600*24)
    let newUpdatedBook = await Books.findByIdAndUpdate(bookId , {endedDate:newEndedDate , summary:summary,HowLong: red } , {new:true})
    return response.status(200).json({success:true, responseMassage:newUpdatedBook})
} catch (error) {
    return response.status(400).json({success:false ,responseMassage:`Failed to update book due to ${error}`})
  }
})

router.put('/books')

module.exports = router;
