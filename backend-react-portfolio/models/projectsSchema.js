const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//advance mongodb query search query
const projectSchema = new Schema({
  workImage: {
    type: String,
  },
  wTitle: {
    type: String,
    required: true,
  },
  wCategory: {
    type: String,
    required: true,
  },
  wDate: {
    type: Date,
    required: true,
  },
  pURL: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,6})([/\w .-]*)*\/?$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  workDetailsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectDetails_Model", // Ensure this matches the name of your `workDetails` model
    required: false, // Make it required if necessary
    default: null,
  },
});

//two argument need in schema 1st one is name  and 2nd one is Schema
const Project_Model = mongoose.model("Project", projectSchema);
module.exports = Project_Model;
