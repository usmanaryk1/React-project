const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//advance mongodb query search query
const serviceSchema = new Schema({
  sIcon: {
    type: String,
  },
  sTitle: {
    type: String,
    required: true,
  },
  sDescription: {
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
const Service_Model = mongoose.model("Services", serviceSchema);
module.exports = Service_Model;
