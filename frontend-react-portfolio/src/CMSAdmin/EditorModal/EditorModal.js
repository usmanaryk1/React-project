import JoditEditor from "jodit-react";
import "./EditorModal.css";
import { useForm, Controller } from "react-hook-form";
import ValidationSchema from "./ValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const EditorModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
    resolver: yupResolver(ValidationSchema),
  });

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
          {/* <input
          type="text"
          placeholder="Enter title"
          value={formData.title}
          className="modal-title-input"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        /> */}

          {/* Description Field */}
          <label htmlFor="description" className="editor-label">
            Description
          </label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <JoditEditor {...field} value={field.value || ""} />
            )}
          />
          {errors.content && (
            <p className="error-message mt-2">{errors.content.message}</p>
          )}
          {/* <JoditEditor
          value={formData.content}
          onChange={(newContent) =>
            setFormData({ ...formData, content: newContent })
          }
        /> */}
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
