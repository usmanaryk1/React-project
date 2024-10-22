import { useState, useEffect } from "react";
import {
  addTerm,
  updateTerm,
  deleteTerm,
  reorderTerms,
} from "../../CMSAdmin/TermsAndConditionsEdit/TermsApis";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAuth } from "../../CMSAdmin/Auth/AuthContext";
import "./TermsAndConditions.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFetch from "../../Components/useFetch";
import validationSchema from "./TermsValidation";

const TermsandConditions = () => {
  const [editingTerm, setEditingTerm] = useState(null); // Track which term is being edited
  const [newTerm, setNewTerm] = useState([]);
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
  const { isAdminPage, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  // Handle adding a new term
  const handleAdd = async (index) => {
    try {
      // Clear editing term if adding
      setIsAdding(true);
      setEditingTerm(null);
      const addedTerm = await addTerm(newTerm);
      setTermsList([...termsList, addedTerm]);
      toast.success("Term Added Successfully");
      setIsAdding(false);
      reset();
    } catch (error) {
      toast.error("Failed to Add the Term");
      setIsAdding(false);
    }
  };

  // Handle adding a new blank term input
  const AddNewTermInput = () => {
    setNewTerm([...newTerm, { title: "", content: "" }]);
  };

  // Handle updating the state for a new term input
  const NewTermChange = (index, field, value) => {
    const updatedNewTerms = newTerm.map((term, i) =>
      i === index ? { ...term, [field]: value } : term
    );
    setNewTerm(updatedNewTerms);
  };

  const RemoveTermInput = (index) => {
    // Remove the term at the specified index
    const updatedNewTerms = newTerm.filter((_, i) => i !== index);
    setNewTerm(updatedNewTerms);
  };

  const handleEditClick = (term) => {
    setEditingTerm(term); // Set the term to edit
    setNewTerm([{ title: term.title, content: term.content }]); // Populate the fields with current term data
  };
  useEffect(() => {
    if (editingTerm) {
      setValue("title", editingTerm.title);
      setValue("content", editingTerm.content);
    } else {
      reset();
    }
  }, [editingTerm, setValue, reset]);
  // Handle updating an existing term
  const handleUpdate = async (id) => {
    if (!editingTerm) return;
    try {
      setIsEditing(true);
      const updatedTerm = await updateTerm(editingTerm._id, newTerm[0]);
      // setTermsList((prevTerms) =>
      //   prevTerms.map((term) =>
      //     term._id === editingTerm._id ? updatedTerm : term
      //   )
      // );
      setTermsList(
        termsList.map((term) => (term._id === id ? updatedTerm : term))
      );
      setEditingTerm(null); // Stop editing mode
      toast.success("Term Updated Successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to Update the Term");
      setIsEditing(false);
    }
  };

  // Handle deleting a term
  const handleDelete = async (id) => {
    try {
      setIsDeleting(id);
      await deleteTerm(id);
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
      await reorderTerms(
        reorderedList.map((term, index) => ({ _id: term._id, order: index }))
      );
      setTermsList(reorderedList); // Update state with new order
      toast.success("Terms reordered successfully");
    } catch (error) {
      toast.error("Failed to Update the Sequence of Terms");
    }
  };

  if (isPending) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  // Drag-and-drop functionality
  const Term = ({ term, index, moveTerm }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "TERM",
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: "TERM",
      hover: (draggedItem) => {
        if (draggedItem.index !== index) {
          moveTerm(draggedItem.index, index);
          draggedItem.index = index;
        }
      },
    });

    return (
      <>
        <div
          ref={(node) =>
            isAdminPage && isAuthenticated ? drag(drop(node)) : null
          }
          style={{ opacity: isDragging ? 0.5 : 1 }}
          className="term-item"
        >
          <section id="conditions" className="conditions-mf route">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div
                    className={
                      isAdminPage && isAuthenticated
                        ? "conditions-border"
                        : "conditions-box"
                    }
                  >
                    <div className="conditions-content">
                      <h3 className="conditions-title">{term.title}</h3>
                      <p className="conditions-description">{term.content}</p>
                      {isAdminPage && isAuthenticated && (
                        <div className="crud-actions d-flex justify-content-end pt-3">
                          <button
                            className="crud-btn btn btn-primary btn-sm"
                            onClick={() => handleEditClick(term)}
                          >
                            Edit
                          </button>
                          <button
                            className="crud-btn btn btn-danger btn-sm"
                            onClick={() => handleDelete(term._id)}
                            disabled={isDeleting === term._id} // Disable while submitting
                          >
                            {isDeleting === term._id
                              ? "Deleteing..."
                              : "Delete"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="addTerm-container">
                  <form
                    onSubmit={handleSubmit(
                      editingTerm ? handleUpdate : handleAdd
                    )}
                  >
                    <h3 className="text-center">
                      {editingTerm ? "Edit Term" : "Add New Term"}
                    </h3>
                    <div className="form-group">
                      <input
                        type="text"
                        {...register("title")}
                        className="form-control"
                        placeholder="Title"
                      />
                      {errors.title && (
                        <p className="error-message">{errors.title.message}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <textarea
                        {...register("content")}
                        className="form-control"
                        placeholder="Content"
                      />
                      {errors.content && (
                        <p className="error-message">
                          {errors.content.message}
                        </p>
                      )}
                    </div>
                    <div className="buttons d-flex justify-content-end">
                      <button
                        className="save-btn btn btn-sm"
                        type="submit"
                        disabled={isDeleting}
                      >
                        {editingTerm
                          ? isDeleting
                            ? "Editing..."
                            : "Edit"
                          : isDeleting
                          ? "Adding..."
                          : "Add"}
                      </button>
                      {editingTerm && (
                        <button
                          className="cancel-btn btn btn-primary btn-sm"
                          type="button"
                          onClick={() => {
                            setEditingTerm(null);
                            reset();
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                  {/* {!editingTerm && (
                    <>
                      <div className="d-flex justify-content-end align-items-center">
                        <button
                          className="add-btn btn btn-sm"
                          onClick={AddNewTermInput}
                        >
                          Add New Term
                        </button>
                      </div>
                      {newTerm.map((term, index) => (
                        <div key={index} className="new-term">
                          <div className="form-group">
                            <input
                              type="text"
                              value={term.title}
                              className="form-control"
                              {...register("title")}
                              onChange={(e) =>
                                NewTermChange(index, "title", e.target.value)
                              }
                              placeholder="Title"
                            />
                          </div>
                          {errors.title && (
                            <p className="error-message">
                              {errors.title.message}
                            </p>
                          )}
                          <div className="form-group">
                            <textarea
                              value={term.content}
                              className="form-control"
                              {...register("content")}
                              onChange={(e) =>
                                NewTermChange(index, "content", e.target.value)
                              }
                              placeholder="Content"
                            />
                          </div>
                          {errors.content && (
                            <p className="error-message">
                              {errors.content.message}
                            </p>
                          )}
                          <div className="buttons d-flex justify-content-end">
                            <button
                              className="save-btn btn btn-sm"
                              onClick={() => handleAdd(index)}
                              disabled={isAdding} // Disable while submitting
                            >
                              {isAdding ? "Adding..." : "Add"}
                            </button>
                            <button
                              className="remove-btn btn btn-danger btn-sm"
                              onClick={() => RemoveTermInput(index)}
                            >
                              Remove Input Field
                            </button>
                          </div>
                        </div>
                      ))}
                    </>
                  )} */}

                  {/* Editing Section */}
                  {/* {editingTerm && isAdminPage && isAuthenticated && (
                    <div>
                      <h3 className="text-center">Edit Term</h3>
                      <div className="form-group">
                        <input
                          type="text"
                          value={newTerm[0]?.title || ""}
                          {...register("title")}
                          className="form-control"
                          onChange={(e) => {
                            const updatedTerm = {
                              ...newTerm[0],
                              title: e.target.value,
                            };
                            setNewTerm([updatedTerm]);
                          }}
                        />
                      </div>
                      {errors.title && (
                        <p className="error-message">{errors.title.message}</p>
                      )}
                      <div className="form-group">
                        <textarea
                          value={newTerm[0]?.content || ""}
                          className="form-control"
                          {...register("content")}
                          onChange={(e) => {
                            const updatedTerm = {
                              ...newTerm[0],
                              content: e.target.value,
                            };
                            setNewTerm([updatedTerm]);
                          }}
                        />
                      </div>
                      {errors.content && (
                        <p className="error-message">
                          {errors.content.message}
                        </p>
                      )}
                      <div className="buttons d-flex justify-content-end">
                        <button
                          className="save-btn btn btn-sm"
                          onClick={handleUpdate}
                          disabled={isEditing} // Disable while submitting
                        >
                          {isEditing ? "Editing..." : "Edit"}
                        </button>
                        <button
                          className="cancel-btn btn btn-primary btn-sm"
                          onClick={() => {
                            setEditingTerm(null);
                            setNewTerm([]); // Clear new term state
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Render Existing Terms */}
        {termsList.length > 0 ? (
          termsList.map((term, index) => (
            <Term
              key={term._id}
              term={term}
              index={index}
              moveTerm={handleReorder}
            />
          ))
        ) : (
          <p className="zeroTerms mb-3">No terms available</p>
        )}
      </div>
    </DndProvider>
  );
};

export default TermsandConditions;
