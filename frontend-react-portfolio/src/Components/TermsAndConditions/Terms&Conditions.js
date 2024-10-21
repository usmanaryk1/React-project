import { useState, useEffect } from "react";
import {
  fetchTerms,
  addTerm,
  updateTerm,
  deleteTerm,
  reorderTerms,
} from "../../CMSAdmin/TermsAndConditionsEdit/TermsApis";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAuth } from "../../CMSAdmin/Auth/AuthContext";
import "./TermsAndConditions.css";

const TermsandConditions = () => {
  const [termsList, setTermsList] = useState([]);
  const [isEditing, setIsEditing] = useState(null); // Track which term is being edited
  const [newTerm, setNewTerm] = useState({ title: "", content: "" });
  const { isAdminPage, isAuthenticated } = useAuth();
  // Fetch the terms when the component mounts
  useEffect(() => {
    const getTerms = async () => {
      const terms = await fetchTerms();
      if (terms && Array.isArray(terms)) {
        setTermsList(terms); // Only set terms if the data is an array
      } else {
        setTermsList([]); // In case of an error or invalid response, fallback to an empty array
      }
    };
    getTerms();
  }, []);

  // Handle adding a new term
  const handleAdd = async () => {
    const addedTerm = await addTerm(newTerm);
    setTermsList([...termsList, addedTerm]);
    setNewTerm({ title: "", content: "" }); // Clear the form
  };

  // Handle updating a term
  const handleUpdate = async (id) => {
    const updatedTerm = await updateTerm(id, newTerm);
    setTermsList(
      termsList.map((term) => (term._id === id ? updatedTerm : term))
    );
    setIsEditing(null); // Stop editing mode
  };

  // Handle deleting a term
  const handleDelete = async (id) => {
    await deleteTerm(id);
    setTermsList(termsList.filter((term) => term._id !== id));
  };

  // Handle reordering the terms
  const handleReorder = async (dragIndex, hoverIndex) => {
    const reorderedList = [...termsList];
    const [draggedItem] = reorderedList.splice(dragIndex, 1);
    reorderedList.splice(hoverIndex, 0, draggedItem);

    // Send reordered list to the server
    await reorderTerms(
      reorderedList.map((term, index) => ({ _id: term._id, order: index }))
    );
    setTermsList(reorderedList); // Update state with new order
  };

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
                            onClick={() => setIsEditing(term._id)}
                          >
                            Edit
                          </button>
                          <button
                            className="crud-btn btn btn-danger btn-sm"
                            onClick={() => handleDelete(term._id)}
                          >
                            Delete
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
          alt="Blog Details"
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
          <div>
            <input
              type="text"
              value={newTerm.title}
              onChange={(e) =>
                setNewTerm({ ...newTerm, title: e.target.value })
              }
              placeholder="Title"
            />
            <textarea
              value={newTerm.content}
              onChange={(e) =>
                setNewTerm({ ...newTerm, content: e.target.value })
              }
              placeholder="Content"
            />
            <button className="add-btn btn btn-sm" onClick={handleAdd}>
              Add New Term
            </button>
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
          <p>No terms available</p>
        )}

        {/* Editing Section */}
        {isEditing && isAdminPage && isAuthenticated && (
          <div>
            <h2>Edit Term</h2>
            <input
              type="text"
              value={newTerm.title}
              onChange={(e) =>
                setNewTerm({ ...newTerm, title: e.target.value })
              }
              placeholder="Edit Title"
            />
            <textarea
              value={newTerm.content}
              onChange={(e) =>
                setNewTerm({ ...newTerm, content: e.target.value })
              }
              placeholder="Edit Content"
            />
            <button onClick={() => handleUpdate(isEditing)}>Save</button>
            <button onClick={() => setIsEditing(null)}>Cancel</button>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default TermsandConditions;
