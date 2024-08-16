//need to make models to use for mongodb also called mongoose schema
//include mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//advance mongodb query search query
const personalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});

//two argument need in schema 1st one is name  and 2nd one is Schema
const Personal_SkillsModel = mongoose.model("Personal_Skills", personalSchema);
module.exports = Personal_SkillsModel;
