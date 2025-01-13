// TermsForm.js
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const SkillsForm = ({
  onSubmit,
  editingSkill,
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
    if (editingSkill) {
      setValue("name", editingSkill.name);
      setValue("proficiency", editingSkill.proficiency);
    } else {
      reset(); // Clear form on new entry
    }
  }, [editingSkill, setValue, reset]);

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
          <div className="addSkill-container">
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="form-container"
            >
              <h3 className="text-center">
                {editingSkill ? "Edit Skill" : "Add New Skill"}
              </h3>
              <div className="form-group">
                <input
                  type="text"
                  {...register("name")}
                  name="name"
                  className="form-control"
                  placeholder="Skill Name"
                />
              </div>

              {errors.name && (
                <p className="error-message">{errors.name.message}</p>
              )}

              <div className="form-group">
                <input
                  {...register("proficiency")}
                  name="proficiency"
                  className="form-control"
                  placeholder="Proficiency Level (%)"
                />
              </div>

              {errors.proficiency && (
                <p className="error-message">{errors.proficiency.message}</p>
              )}

              <button
                className="save-btn btn btn-sm"
                type="submit"
                disabled={isAdding || isEditing}
              >
                {editingSkill
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

export default SkillsForm;
