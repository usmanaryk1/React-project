//need to make models to use for mongodb also called mongoose schema
//include mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//advance mongodb query search query
const personalSchema = new Schema({
  name: { type: String },
  skills: { type: String },
  id: { type: Number },
});
// const bookSchema= new Schema({
//     title:{type: String, required:true, unique:true},
//     year:Number,
//     authors:[authorSchema]
// })

//two argument need in schema 1st one is name  and 2nd one is Schema
const Personal_SkillsModel = mongoose.model("Personal_Skills", personalSchema);
module.exports = Personal_SkillsModel;
