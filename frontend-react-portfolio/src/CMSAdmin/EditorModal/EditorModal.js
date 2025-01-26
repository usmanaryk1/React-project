import JoditEditor from "jodit-react";
import "./EditorModal.css";
import { useForm, Controller } from "react-hook-form";
import ValidationSchema from "./ValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

const EditorModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    // defaultValues: initialData || { title: "", content: "" }, // Provide fallback
    resolver: yupResolver(ValidationSchema),
  });
  console.log("Inital data in editor", initialData);
  // Use useEffect to reset the form when initialData changes
  useEffect(() => {
    reset(initialData); // Reset the form with the new initial data
  }, [initialData, reset]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>{initialData._id ? "Edit Section" : "Add New Section"}</h4>
        <hr />
        {/* Title Field */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title" className="editor-title">
            Title
          </label>
          {/* Used controller instaed of register because it doesn't work well with custom inputs like JoditEditor */}
          <Controller
            name="title" // specifies the field's name in the form
            control={control} // connects the field to React Hook Form's internal state management
            // The render function provides the field object (which includes value, onChange, onBlur, etc.) to bind to the input component
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter title"
                className="modal-title-input"
              />
            )}
          />
          {errors.title && (
            <p className="error-message">{errors.title.message}</p>
          )}

          {/* Description Field */}
          <label htmlFor="description" className="editor-label">
            Description
          </label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <JoditEditor
                {...field}
                value={field.value || ""}
                onChange={(newContent) => field.onChange(newContent)} // Update the form state on change
              />
            )}
          />
          {errors.content && (
            <p className="error-message mt-2">{errors.content.message}</p>
          )}

          <div className="modal-actions">
            <button
              // onClick={() => onSubmit(formData)}
              type="submit"
              className="btn btn-primary modal-save button"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary modal-dancel button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditorModal;
