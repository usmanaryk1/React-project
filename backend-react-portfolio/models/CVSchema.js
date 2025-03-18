const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cvSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  cvUrl: { type: String, required: true },
  isVisible: { type: Boolean, default: true }, // Control visibility of CV
});

const CV_Model = mongoose.model("CV", cvSchema);
module.exports = CV_Model;
