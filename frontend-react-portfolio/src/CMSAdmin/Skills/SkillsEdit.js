import { useState } from "react";
import ApiService from "../ApisService";
import SkillsForm from "./SkillsForm";
import useFetch from "../../Components/useFetch";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/Error/Error";
import validationSchema from "./SkillsValidation";
import About from "../../Components/About";

const SkillsEdit = () => {
  const [editingSkill, setEditingSkill] = useState(null); // Track which term is being edited
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [reorderedSkills, setReorderedSkills] = useState([]); // To track reordering changes
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const {
    data: skills,
    isPending,
    error,
    setData: setSkills,
  } = useFetch(`${API_URL}/api/skills`);

  const { reset } = useForm();
  const skillsService = ApiService("api/skills");
  // Handle adding a new term
  const handleAdd = async (formData) => {
    try {
      // Clear editing term if adding
      setIsAdding(true);
      setEditingSkill(null);
      const addedSkill = await skillsService.addItem(formData);
      if (addedSkill && addedSkill._id) {
        // Ensure addedTerm contains _id
        setSkills((prevSkills) => [...prevSkills, addedSkill]);
        toast.success("Skill Added Successfully");
      } else {
        toast.error("Failed to Add the Skill. Invalid response from server.");
      }
      setIsAdding(false);
      reset();
    } catch (error) {
      toast.error("Failed to Add the Skill");
      setIsAdding(false);
    }
  };

  // Handle updating an existing term
  const handleUpdate = async (formData) => {
    if (!editingSkill) return;
    try {
      setIsEditing(true);
      const updatedSkill = await skillsService.updateItem(
        editingSkill._id,
        formData
      );
      setSkills((prevSkills) =>
        prevSkills.map((skill) =>
          skill._id === editingSkill._id ? updatedSkill : skill
        )
      );
      setEditingSkill(null); // Stop editing mode
      toast.success("Skill Updated Successfully");
      setIsEditing(false);
      reset();
    } catch (error) {
      toast.error("Failed to Update the Skill");
      setIsEditing(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await skillsService.deleteItem(id);
      setSkills((prevSkills) => prevSkills.filter((skill) => skill._id !== id));
      toast.success("Skill deleted successfully");
    } catch (error) {
      toast.error("Failed to Delete the Skill");
    }
  };

  const handleReorder = async (dragIndex, hoverIndex) => {
    const reorderedList = [...skills];
    const [draggedItem] = reorderedList.splice(dragIndex, 1);
    reorderedList.splice(hoverIndex, 0, draggedItem);
    console.log("reorderedList skills", reorderedList);

    setSkills(reorderedList); // Update the skills list locally
    setReorderedSkills(reorderedList);
  };

  const handleSaveReorder = async () => {
    try {
      setUpdating(true);
      // Make API call with the final reordered list

      const reorderedSkill = skills.map((skill, index) => ({
        _id: skill._id,
        order: index, // Use the correct order here
      }));
      console.log("Final Payload to Save:", reorderedSkill);

      await skillsService.reorderItems(reorderedSkill);
      setUpdating(false);
      toast.success("Skills reordered successfully");
      setReorderedSkills([]);
    } catch (error) {
      setUpdating(false);
      toast.error("Failed to update the sequence of skills");
    }
  };

  if (isPending) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <>
      <section className="skills-form">
        <SkillsForm
          onSubmit={editingSkill ? handleUpdate : handleAdd}
          editingSkill={editingSkill}
          isAdding={isAdding}
          isEditing={isEditing}
          reset={reset} // Pass reset here
          cancelEdit={() => setEditingSkill(null)}
          validationSchema={validationSchema}
        />
      </section>
      {/* Update Order Button */}
      <hr />
      <div className="d-flex justify-content-end">
        <button
          className="updateorder-btn"
          onClick={handleSaveReorder}
          disabled={!reorderedSkills.length || updating}
        >
          {updating ? "Updating" : "Update Order"}
        </button>
      </div>

      <About
        handleEditClick={(skill) => setEditingSkill(skill)}
        handleDelete={handleDelete}
        handleReorder={handleReorder}
        skills={skills}
      />
    </>
  );
};

export default SkillsEdit;
