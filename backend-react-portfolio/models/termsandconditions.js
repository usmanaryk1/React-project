//need to make models to use for mongodb also called mongoose schema
//include mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//advance mongodb query search query
const termsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  order: {
    type: Number, // To track the order of terms
    default: 0,
  },
});

//two argument need in schema 1st one is name  and 2nd one is Schema
const Terms_Model = mongoose.model("TermsAndConditions", termsSchema);
module.exports = Terms_Model;
