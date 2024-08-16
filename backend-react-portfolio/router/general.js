const express = require("express");
let books = require("./database.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const Personal_SkillsModel = require("../models/personalSchema.js");

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async (req, res) => {
  //Write your code here
  try {
    let isbn = req.params.isbn;
    const book = books[isbn];
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get book details based on author
public_users.get("/author/:author", async (req, res) => {
  //Write your code here
  try {
    const author = req.params.author;
    const filteredBook = Object.values(books).filter(
      (book) => book.author === author
    );
    if (filteredBook.length > 0) {
      return res.status(200).json(filteredBook);
    } else {
      return res
        .status(404)
        .json({ message: "NO books found for this author" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all books based on title
public_users.get("/title/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const filteredTitleBooks = Object.values(books).filter(
      (book) => book.title === title
    );

    if (filteredTitleBooks.length > 0) {
      return res.status(200).json(filteredTitleBooks);
    } else {
      return res.status(404).json({ message: "NO books found for this title" });
    }
    //Write your code here
    // return res.status(300).json({message: "Yet to be implemented"});
  } catch (error) {
    res.status(500).send(error);
  }
});

//  Get book review
public_users.get("/review/:isbn", async (req, res) => {
  //Write your code here
  try {
    let isbn = req.params.isbn;
    const book = books[isbn];
    if (book && book.reviews) {
      return res.status(200).json(book.reviews);
    } else {
      return res
        .status(404)
        .json({ message: "No reviews found for this book" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST PERSONAL INFO

public_users.post("/hero", async (req, res) => {
  console.log("Inside post function");

  const data = new Personal_SkillsModel({
    name: req.body.name,
    skills: req.body.skills,
    id: req.body.id,
  });

  try {
    const val = await data.save();
    res.json(val);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

public_users.get("/hero", async (req, res) => {
  try {
    const PersonalSkills = await Personal_SkillsModel.find(); // Ensure you're querying by the correct field, `email` not `id`
    if (PersonalSkills.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.send(PersonalSkills);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports.general = public_users;
