const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const publicationsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Publications_Model = mongoose.model("publications", publicationsSchema);
module.exports = Publications_Model;
