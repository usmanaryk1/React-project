// let books = {
//       1: {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {} },
//       2: {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {} },
//       3: {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {} },
//       4: {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
//       5: {"author": "Unknown","title": "The Book Of Job", "reviews": {} },
//       6: {"author": "Unknown","title": "One Thousand and One Nights", "reviews": {} },
//       7: {"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {} },
//       8: {"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {} },
//       9: {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {} },
//       10: {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
// }

// module.exports=books;

//create connection like database mongodb
//go to mongodb.comand download community server and install that included compass during install if you are new to see mongodb database
//open compass and connect to see mongodb database
//install mongoose to use mongodb easily or alternatively you can use directally mongodb atlas {mongoClient} with install mongodb
require("dotenv").config();
//include mongoose
const mongoose = require("mongoose");

// const uri = "mongodb+srv://user:user123@cluster0.uogjtlx.mongodb.net/crud";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connection Successsful mongodb");
  } catch (error) {
    console.log(`Error in Connection mongodb ${error}`);
  }
};

module.exports = connectDB;

//to check connection is working run in cmd node db.js
//if any changes require need to run again and again after every changes if automatic changes should accour then install globally npm i nodemon  and run command again once only nodemon db.js
