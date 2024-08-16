const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//advance mongodb query search query
const certificationSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  cardCategory: {
    type: String,
    required: true,
  },
  cardTitle: {
    type: String,
    required: true,
  },
  cardDescription: {
    type: String,
    required: true,
  },
  authorImage: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  postDate: {
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
const Certification_Model = mongoose.model(
  "Certification",
  certificationSchema
);
module.exports = Certification_Model;
