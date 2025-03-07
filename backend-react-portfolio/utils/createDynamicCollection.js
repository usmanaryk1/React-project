const mongoose = require("mongoose");
const DynamicSectionsModel = require("../models/dynamicSectionsSchema");

const createDynamicCollection = async (req, res) => {
  const { title, content, order } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }
  try {
    let collectionName = title.replace(/\s+/g, "_").toLowerCase();
    // Check for existing collections and add a suffix if necessary
    let counter = 1;
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    const collectionNames = collections.map((col) => col.name);

    while (collectionNames.includes(collectionName)) {
      collectionName = `${title.replace(/\s+/g, "_").toLowerCase()}_${counter}`;
      counter++;
    }
    console.log(`Creating collection: ${collectionName}`);
    // Define a dynamic schema
    const DynamicSchema = new mongoose.Schema({
      title: String,
      content: String,
      order: Number,
    });

    // Create or reuse the model with the dynamic collection name
    const DynamicModel =
      mongoose.models[collectionName] ||
      mongoose.model(collectionName, DynamicSchema);

    // Save the document in the new collection
    const newSection = new DynamicModel({ title, content, order });
    await newSection.save();

    // Save the same data in DynamicSectionsModel
    const dynamicSections = new DynamicSectionsModel({ title, content, order });
    await dynamicSections.save();

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

const updateDynamicCollection = async (collectionName, updatedData) => {
  try {
    const db = mongoose.connection.db;
    // Check if the collection exists
    const collections = await db
      .listCollections({ name: collectionName })
      .toArray();

    if (collections.length === 0) {
      console.log(`Collection '${collectionName}' not found`);
      return;
    }

    // Update the collection with the new data
    const collection = db.collection(collectionName);
    await collection.updateOne({}, { $set: updatedData });
    console.log(`Collection '${collectionName}' updated successfully`);
  } catch (error) {
    console.error("Error updating dynamic collection:", error.message);
  }
};

const deleteDynamicCollection = async (collectionName) => {
  try {
    const db = mongoose.connection.db;

    // Convert collection name to lowercase and replace spaces with underscores (if needed)
    const formattedCollectionName = collectionName
      .toLowerCase()
      .replace(/\s+/g, "_");

    // Check if the collection exists before attempting to drop it
    const collections = await db
      .listCollections({ name: formattedCollectionName })
      .toArray();

    if (collections.length > 0) {
      await db.dropCollection(formattedCollectionName);
      console.log(
        `Collection '${formattedCollectionName}' deleted successfully`
      );
    } else {
      console.log(`Collection '${formattedCollectionName}' not found`);
    }
  } catch (error) {
    console.error("Error deleting collection:", error.message);
  }
};
module.exports = {
  createDynamicCollection,
  deleteDynamicCollection,
  updateDynamicCollection,
};
