const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dynamicSectionsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  order: {
    type: Number, // To track the order of terms
  },
  isDynamic: {
    type: Boolean,
  },
});

const DynamicSectionsModel = mongoose.model(
  "DynamicSections",
  dynamicSectionsSchema
);
module.exports = DynamicSectionsModel;
