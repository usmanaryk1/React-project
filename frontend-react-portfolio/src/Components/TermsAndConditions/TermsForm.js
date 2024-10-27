// TermsForm.js
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const TermsForm = ({
  onSubmit,
  editingTerm,
  isAdding,
  isEditing,
  cancelEdit,
  validationSchema,
  reset: parentReset, // Destructure reset passed from parent
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  React.useEffect(() => {
    if (editingTerm) {
      setValue("title", editingTerm.title);
      setValue("content", editingTerm.content);
    } else {
      reset(); // Clear form on new entry
    }
  }, [editingTerm, setValue, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data); // Call parent function
    parentReset(); // Reset form in parent
  };

  const handleCancel = () => {
    reset();
    cancelEdit();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="addTerm-container">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <h3 className="text-center">
                {editingTerm ? "Edit Term" : "Add New Term"}
              </h3>
              <input
                type="text"
                {...register("title")}
                name="title"
                placeholder="Title"
              />
              {errors.title && <p>{errors.title.message}</p>}

              <textarea
                {...register("content")}
                name="content"
                placeholder="Content"
              />
              {errors.content && <p>{errors.content.message}</p>}

              <button
                className="save-btn btn btn-sm"
                type="submit"
                disabled={isAdding || isEditing}
              >
                {editingTerm
                  ? isEditing
                    ? "Editing..."
                    : "Edit"
                  : isAdding
                  ? "Adding..."
                  : "Add"}
              </button>
              <button
                className="cancel-btn btn btn-primary btn-sm"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsForm;
