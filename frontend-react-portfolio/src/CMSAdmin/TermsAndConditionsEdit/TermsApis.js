// services/termsService.js

import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

// Fetch all terms

export const fetchTerms = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/terms`);
    // No need to use response.json(), axios returns the data directly
    return response.data; // This should be the array of terms
  } catch (error) {
    toast.error("Failed to fetch terms");
    console.error(error);
    return []; // Return an empty array in case of an error
  }
};

// Add a new term
export const addTerm = async (newTerm) => {
  const response = await axios.post(`${API_URL}/api/terms`, newTerm);
  return response.data;
};

// Update an existing term
export const updateTerm = async (id, updatedTerm) => {
  const response = await axios.put(`${API_URL}/api/terms/${id}`, updatedTerm);
  return response.data;
};

// Delete a term
export const deleteTerm = async (id) => {
  const response = await axios.delete(`${API_URL}/api/terms/${id}`);
  return response.data;
};

// Reorder terms
export const reorderTerms = async (reorderedTerms) => {
  const response = await axios.patch(`${API_URL}/api/terms/reorder`, {
    reorderedTerms,
  });
  return response.data;
};
