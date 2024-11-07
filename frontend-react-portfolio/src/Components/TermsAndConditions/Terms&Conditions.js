import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAuth } from "../../CMSAdmin/Auth/AuthContext";
import "./TermsAndConditions.css";
import { toast } from "react-toastify";
import useFetch from "../../Components/useFetch";
import validationSchema from "../../CMSAdmin/TermsAndConditionsEdit/TermsValidation";
import Swal from "sweetalert2";
import { TouchBackend } from "react-dnd-touch-backend";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import TermItem from "./TermItem";
import { useForm } from "react-hook-form";
import NullData from "../NullData/NullData";
import TermsForm from "../../CMSAdmin/TermsAndConditionsEdit/TermsForm";
import ApiService from "../../CMSAdmin/ApisService";

const TermsandConditions = () => {
  const [editingTerm, setEditingTerm] = useState(null); // Track which term is being edited
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null); // Track deleting by ID
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const {
    data: termsList,
    isPending,
    error,
    setData: setTermsList,
  } = useFetch(`${API_URL}/api/terms`);

  const { reset } = useForm();
  const { isAdminPage, isAuthenticated } = useAuth();
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
      setIsAdding(false);
      reset();
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

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
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
    try {
      const reorderedList = [...termsList];
      const [draggedItem] = reorderedList.splice(dragIndex, 1);
      reorderedList.splice(hoverIndex, 0, draggedItem);

      // Send reordered list to the server
      await termsService.reorderItems(
        reorderedList.map((term, index) => ({ _id: term._id, order: index }))
      );
      setTermsList(reorderedList); // Update state with new order
      toast.success("Term reordered successfully");
    } catch (error) {
      toast.error("Failed to Update the Sequence of Term");
    }
  };

  if (isPending) return <Loading />;
  if (error) return <Error message={error} />;

  const isTouchDevice = "ontouchstart" in window; // Simple check for touch support

  return (
    <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
      <div>
        {/* ======= Terms and Conditions ======= */}
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

        {/* Add New Term Section */}
        {isAdminPage && isAuthenticated && (
          <TermsForm
            onSubmit={editingTerm ? handleUpdate : handleAdd}
            editingTerm={editingTerm}
            isAdding={isAdding}
            isEditing={isEditing}
            reset={reset} // Pass reset here
            cancelEdit={() => setEditingTerm(null)}
            validationSchema={validationSchema}
          />
        )}

        {/* Render Existing Terms */}
        {termsList.length > 0 ? (
          termsList.map((term, index) => (
            <TermItem
              key={term._id}
              term={term}
              index={index}
              moveTerm={handleReorder}
              handleEditClick={(term) => setEditingTerm(term)}
              handleDeleteClick={handleDeleteClick}
              isDeleting={isDeleting === term._id}
            />
          ))
        ) : (
          <NullData message="Terms" />
        )}
      </div>
    </DndProvider>
  );
};

export default TermsandConditions;
