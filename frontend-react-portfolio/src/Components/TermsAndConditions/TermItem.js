// TermItem.js
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { useAuth } from "../../CMSAdmin/Auth/AuthContext";

const TermItem = ({
  term,
  index,
  moveTerm,
  handleEditClick,
  handleDeleteClick,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TERM",
    item: { index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
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

  const { isAdminPage, isAuthenticated } = useAuth();

  return (
    <div
      ref={(node) => (isAdminPage && isAuthenticated ? drag(drop(node)) : null)}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isAdminPage && isAuthenticated ? "grab" : "default",
      }}
      className="term-item"
    >
      <section id="conditions" className="conditions-mf route">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
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
                        onClick={() => handleDeleteClick(term._id)}
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
  );
};

export default TermItem;
