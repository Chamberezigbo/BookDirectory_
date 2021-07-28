const express = require("express");

const Books = require("../models/book");
const auth = require("../middleware/auth");
const { request, response } = require("express");

const router = new express.Router();

router.post("/books", auth, async (req, res) => {
  const book = new Books({
    ...req.body,
    owner: req.user._id,
  });

  try {
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

router.get("/books-title-author", auth, async (request, response) => {
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
              let {ended , summary} = request.body

              let updateBook =  await Books.findById(bookId)
              let sd = new Date(updateBook.started)
              let ed = new Date(ended)
              let red = sd.getTime() - ed.getTime()  
              red = red /(1000*3600*24)
              console.log(red)
              let newUpdatedBook = await Books.findByIdAndUpdate(bookId , {ended:red , summary:summary} , {new:true})
              return response.status(200).json({success:true, responseMassage:newUpdatedBook})
       } catch (error) {
              return response.status(400).json({success:false ,responseMassage:`Failed to update book due to ${error}`})
       }
})

module.exports = router;
