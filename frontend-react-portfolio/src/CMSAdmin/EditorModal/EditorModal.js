import React, { useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import "./EditorModal.css";

const EditorModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData); // Update formData when initialData changes
    }
  }, [initialData]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>{initialData._id ? "Edit Section" : "Add New Section"}</h4>
        <hr />

        <label htmlFor="title" className="editor-title">
          Title
        </label>
        <input
          type="text"
          placeholder="Enter title"
          value={formData.title}
          className="modal-title-input"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <label htmlFor="description" className="editor-label">
          Description
        </label>
        <JoditEditor
          value={formData.content}
          onChange={(newContent) =>
            setFormData({ ...formData, content: newContent })
          }
        />

        <div className="modal-actions">
          <button
            onClick={() => onSubmit(formData)}
            className="btn btn-primary modal-save button"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="btn btn-secondary modal-dancel button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorModal;
