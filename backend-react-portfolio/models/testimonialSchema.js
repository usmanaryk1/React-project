const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//advance mongodb query search query
const testimonialSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});

//two argument need in schema 1st one is name  and 2nd one is Schema
const Testimonial_Model = mongoose.model("Testimonial", testimonialSchema);
module.exports = Testimonial_Model;
