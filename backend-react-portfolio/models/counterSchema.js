const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//advance mongodb query search query
const counterSchema = new Schema({
  icon: {
    type: String,
    required: true,
  },
  counterEnd: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  id: { type: Number },
});

//two argument need in schema 1st one is name  and 2nd one is Schema
const Counter_Model = mongoose.model("Counter", counterSchema);
module.exports = Counter_Model;
