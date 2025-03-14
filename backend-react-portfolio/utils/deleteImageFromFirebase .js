const admin = require("../api/firebaseAdmin.js");
const bucket = admin.storage().bucket();

// Delete image from Firebase
const deleteImageFromFirebase = async (imageUrl) => {
  try {
    if (!imageUrl) return;

    const filePath = decodeURIComponent(imageUrl.split("/o/")[1].split("?")[0]);
    const file = bucket.file(filePath);

    await file.delete();
    console.log("Old image deleted from Firebase");
  } catch (error) {
    console.error("Failed to delete image from Firebase:", error);
  }
};

module.exports = { deleteImageFromFirebase };
