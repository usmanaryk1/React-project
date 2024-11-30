import { useState } from "react";
import TermsandConditions from "../../Components/TermsAndConditions/Terms&Conditions";
import TermsForm from "./TermsForm";
import useFetch from "../../Components/useFetch";
import ApiService from "../ApisService";
import { toast } from "react-toastify";
import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/Error/Error";
import { useForm } from "react-hook-form";
import validationSchema from "./TermsValidation";

const TermsAndConditionsEdit = () => {
  const [editingTerm, setEditingTerm] = useState(null); // Track which term is being edited
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null); // Track deleting by ID
  const [updating, setUpdating] = useState(false);
  const [reorderedTerms, setReorderedTerms] = useState([]); // To track reordering changes

  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const {
    data: termsList,
    isPending,
    error,
    setData: setTermsList,
  } = useFetch(`${API_URL}/api/terms`);

  const { reset } = useForm();
  const termsService = ApiService("api/terms");

  // Handle adding a new term

  const handleAdd = async (formData) => {
    try {
      // Clear editing term if adding
      setIsAdding(true);
      setEditingTerm(null);
      const addedTerm = await termsService.addItem(formData);
      if (addedTerm && addedTerm._id) {
        // Ensure addedTerm contains _id
        setTermsList([...termsList, addedTerm]);
        toast.success("Term Added Successfully");
      } else {
        toast.error("Failed to Add the Term. Invalid response from server.");
      }
      reset();
      setIsAdding(false);
    } catch (error) {
      toast.error("Failed to Add the Term");
      setIsAdding(false);
    }
  };

  // Handle updating an existing term

  const handleUpdate = async (formData) => {
    if (!editingTerm) return;
    try {
      setIsEditing(true);
      const updatedTerm = await termsService.updateItem(
        editingTerm._id,
        formData
      );
      setTermsList((prevTerms) =>
        prevTerms.map((term) =>
          term._id === editingTerm._id ? updatedTerm : term
        )
      );
      setEditingTerm(null); // Stop editing mode
      toast.success("Term Updated Successfully");
      setIsEditing(false);
      reset();
    } catch (error) {
      toast.error("Failed to Update the Term");
      setIsEditing(false);
    }
  };

  // Handle deleting a term
  const handleDelete = async (id) => {
    try {
      setIsDeleting(id);
      await termsService.deleteItem(id);
      setTermsList((prevTerms) => prevTerms.filter((term) => term._id !== id));
      toast.success("Term deleted successfully");
      setIsDeleting(null);
    } catch (error) {
      toast.error("Failed to Delete the Term");
      setIsDeleting(null);
    }
  };

  // Handle reordering the terms

  const handleReorder = async (dragIndex, hoverIndex) => {
    const reorderedList = [...termsList];
    const [draggedItem] = reorderedList.splice(dragIndex, 1);
    reorderedList.splice(hoverIndex, 0, draggedItem);

    setTermsList(reorderedList); // Update state with new order
    setReorderedTerms(reorderedList);
  };

  const handleSaveReorder = async () => {
    try {
      setUpdating(true);
      // Make API call with the final reordered list

      const reorderedTerm = termsList.map((term, index) => ({
        _id: term._id,
        order: index, // Use the correct order here
      }));
      console.log("Final Payload to Save:", reorderedTerm);

      await termsService.reorderItems(reorderedTerm);
      setUpdating(false);
      toast.success("Skills reordered successfully");
      setReorderedTerms([]);
    } catch (error) {
      setUpdating(false);
      toast.error("Failed to update the sequence of skills");
    }
  };

  if (isPending) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <>
      <div
        className="hero hero-single route bg-image"
        alt="Terms and Conditions"
        style={{ backgroundImage: "url(../assets/img/overlay-bg.jpg)" }}
      >
        <div className="overlay-mf"></div>
        <div className="hero-content display-table">
          <div className="table-cell">
            <div className="container">
              <h2 className="hero-title mb-4">TERMS AND CONDITIONS</h2>
            </div>
          </div>
        </div>
      </div>
      <TermsForm
        onSubmit={editingTerm ? handleUpdate : handleAdd}
        editingTerm={editingTerm}
        isAdding={isAdding}
        isEditing={isEditing}
        reset={reset} // Pass reset here
        cancelEdit={() => setEditingTerm(null)}
        validationSchema={validationSchema}
      />
      <div className="d-flex justify-content-end">
        <button
          className="updateorder-btn"
          onClick={handleSaveReorder}
          disabled={!reorderedTerms.length || updating}
        >
          {updating ? "Updating" : "Update Order"}
        </button>
      </div>
      <TermsandConditions
        handleEditClick={(term) => setEditingTerm(term)}
        handleDelete={handleDelete}
        handleReorder={handleReorder}
        termsList={termsList}
      />
    </>
  );
};

export default TermsAndConditionsEdit;
