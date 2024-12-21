const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//advance mongodb query search query
const socialSchema = new Schema({
  platformIcon: {
    type: String,
    required: true,
  },
  link: {
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
const Social_Model = mongoose.model("Social", socialSchema);
module.exports = Social_Model;
