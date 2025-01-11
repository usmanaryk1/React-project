import { useState, useEffect } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css"; // Import Draft.js styles
import { toast } from "react-toastify";
import { convertFromHTML } from "draft-convert";

const EditorModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState("");
  //   const [content, setContent] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (isOpen) {
      setTitle(initialData.title || "");
      //   setContent(initialData.content || "");
      const contentState = initialData.content
        ? convertFromHTML(initialData.content)
        : EditorState.createEmpty().getCurrentContent();
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [isOpen, initialData]);

  const handleSave = () => {
    const content = editorState.getCurrentContent().getPlainText();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and Description is required.");
      return;
    }
    onSubmit({ title: title.trim(), content });
    onClose(); // Close the modal after save
  };

  if (!isOpen) return null;

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleChange = (newState) => {
    setEditorState(newState);
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <h4>{initialData._id ? "Edit Section" : "Add New Section"}</h4>
          <label htmlFor="title" className="editor-title">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            className="editor-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="description" className="editor-label">
            Description
          </label>
          <div className="editor-wrapper">
            <Editor
              editorState={editorState}
              onChange={handleChange}
              handleKeyCommand={handleKeyCommand}
              placeholder="Start typing..."
            />
          </div>

          <div className="modal-actions mt-3">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorModal;
