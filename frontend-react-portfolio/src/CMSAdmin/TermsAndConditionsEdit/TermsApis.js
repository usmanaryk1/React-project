// services/termsService.js

import axios from "axios";
const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
const token = localStorage.getItem("token");

// Add a new term
export const addTerm = async (newTerm) => {
  try {
    const response = await axios.post(`${API_URL}/api/terms`, newTerm, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding term:", error.response?.data || error.message);
  }
};

// Update an existing term
export const updateTerm = async (id, updatedTerm) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/terms/${id}`,
      updatedTerm,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to update term:",
      error.response?.data || error.message
    );
  }
};

// Delete a term
export const deleteTerm = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/terms/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Failed to delete term:",
      error.response?.data || error.message
    );
  }
};

// Reorder terms
export const reorderTerms = async (reorderedTerms) => {
  try {
    const response = await axios.patch(
      `${API_URL}/api/terms/reorder`,
      { reorderedTerms }, // Request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to update the sequence:",
      error.response?.data || error.message
    );
  }
};
