// firebaseUtils.js

import { v4 as uuidv4 } from "uuid";
import { storage } from "../../firebaseConfig"; // Make sure the correct path is used for firebaseConfig
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Utility function to upload image to Firebase Storage
 * @param {File} imageFile - The image file to upload.
 * @param {string} folderName - The folder where the image will be uploaded in Firebase Storage.
 * @returns {Promise<string>} - The download URL of the uploaded image.
 */
export const uploadImageToFirebase = async (imageFile, folderName) => {
  try {
    const imageRef = ref(storage, `${folderName}/${imageFile.name + uuidv4()}`);
    const snapshot = await uploadBytes(imageRef, imageFile);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw new Error("Image upload failed");
  }
};
