const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//advance mongodb query search query
const contactSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  id: { type: Number },
});

//two argument need in schema 1st one is name  and 2nd one is Schema
const Contact_Model = mongoose.model("Contact", contactSchema);
module.exports = Contact_Model;
