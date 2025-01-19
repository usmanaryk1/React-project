// services/termsService.js

// services/apiService.js

import axios from "axios";
const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
const token = localStorage.getItem("token");

// Factory function to create service functions for any API endpoint
const ApiService = (apiEndpoint) => {
  return {
    // Add a new item
    addItem: async (newItem) => {
      try {
        const response = await axios.post(
          `${API_URL}/${apiEndpoint}`,
          newItem,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error(
          "Error adding item:",
          error.response?.data || error.message
        );
      }
    },

    // Update an existing item
    updateItem: async (id, updatedItem) => {
      try {
        const response = await axios.put(
          `${API_URL}/${apiEndpoint}/${id}`,
          updatedItem,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error(
          "Failed to update item:",
          error.response?.data || error.message
        );
      }
    },

    // Delete an item
    deleteItem: async (id) => {
      try {
        const response = await axios.delete(`${API_URL}/${apiEndpoint}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error(
          "Failed to delete item:",
          error.response?.data || error.message
        );
      }
    },

    // Reorder items
    reorderItems: async (reorderedItems) => {
      try {
        const response = await axios.patch(
          `${API_URL}/${apiEndpoint}/reorder`,
          { reorderedItems }, // Request body
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error(
          "Failed to reorder items:",
          error.response?.data || error.message
        );
        return error.message;
      }
    },
  };
};

export default ApiService;
