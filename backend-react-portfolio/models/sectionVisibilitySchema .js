const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sectionVisibilitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isVisible: {
    type: Boolean,
    required: true,
  },
  order: {
    type: Number,
  },
});

//two argument need in schema 1st one is name  and 2nd one is Schema
const SectionVisibility_Model = mongoose.model(
  "SectionVisibility",
  sectionVisibilitySchema
);
module.exports = SectionVisibility_Model;
