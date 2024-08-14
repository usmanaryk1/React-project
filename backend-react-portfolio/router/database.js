//create connection like database mongodb
//go to mongodb.comand download community server and install that included compass during install if you are new to see mongodb database
//open compass and connect to see mongodb database
//install mongoose to use mongodb easily or alternatively you can use directally mongodb atlas {mongoClient} with install mongodb
require("dotenv").config({ path: "./api/.env" });
//include mongoose
const mongoose = require("mongoose");

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
