const mongoose = require("mongoose");

const createDynamicCollection = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }
  try {
    const collectionName = title.replace(/\s+/g, "_").toLowerCase();
    console.log(`Creating collection: ${collectionName}`);
    // Define a dynamic schema
    const DynamicSchema = new mongoose.Schema({
      title: String,
      content: String,
      order: Number,
    });

    // Create a model with the dynamic collection name
    const DynamicModel = mongoose.model(collectionName, DynamicSchema);

    // Save the document in the new collection
    const newSection = new DynamicModel({ title, content });
    await newSection.save();

    res.status(201).json({
      message: "Collection created and data saved successfully",
      section: newSection,
    });
  } catch (error) {
    console.error("Error creating collection:", error);
    res
      .status(500)
      .json({ message: "Failed to create collection", error: error.message });
  }
};

module.exports = { createDynamicCollection };
