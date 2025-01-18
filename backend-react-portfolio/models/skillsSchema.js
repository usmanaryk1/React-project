const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//advance mongodb query search query
const skillsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  proficiency: {
    type: String,
    required: true,
  },
  order: {
    type: Number, // To track the order of terms
  },
});

//two argument need in schema 1st one is name  and 2nd one is Schema
const Skills_Model = mongoose.model("Skills", skillsSchema);
module.exports = Skills_Model;
