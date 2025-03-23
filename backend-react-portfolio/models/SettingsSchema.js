const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//advance mongodb query search query
const settingsSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
});

//two argument need in schema 1st one is name  and 2nd one is Schema
const Settings_Model = mongoose.model("Settings", settingsSchema);
module.exports = Settings_Model;
