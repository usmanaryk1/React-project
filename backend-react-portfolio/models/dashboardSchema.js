const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//advance mongodb query search query
const dashboardSchema = new Schema({
  Icon: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    require: true,
  },
});

//two argument need in schema 1st one is name  and 2nd one is Schema
const Dashboard_Model = mongoose.model("Dashboard", dashboardSchema);
module.exports = Dashboard_Model;
