// TermItem.js
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { useAuth } from "../../CMSAdmin/Auth/AuthContext";

const SkillItem = ({
  skill = [],
  index,
  moveSkill,
  handleEditClick,
  handleDeleteClick,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "SKILL",
    item: { index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: "SKILL",
    hover: (draggedSkill) => {
      if (draggedSkill.index !== index) {
        moveSkill(draggedSkill.index, index);
        draggedSkill.index = index;
      }
    },
  });

  const { isAdminPage, isAuthenticated } = useAuth();

  return (
    <div
      ref={(node) => (isAdminPage && isAuthenticated ? drag(drop(node)) : null)}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="skill-item"
    >
      <section id="skills" className="skills-mf route">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div
                className={
                  isAdminPage && isAuthenticated ? "skill-border" : "skill-box"
                }
              >
                <div className="skill-content">
                  <div className="d-flex justify-content-between">
                    <div className="content">
                      <span>{skill.name}</span>{" "}
                      <span className="pull-right">{skill.proficiency}%</span>
                    </div>

                    {isAdminPage && isAuthenticated && (
                      <div className="crud-actions d-flex justify-content-end">
                        <button
                          className="crud-button btn btn-primary btn-sm me-1"
                          onClick={() => handleEditClick(skill)}
                        >
                          <i className="bi bi-pencil" />
                        </button>
                        <button
                          className="crud-button btn btn-danger btn-sm"
                          onClick={() => handleDeleteClick(skill._id)}
                        >
                          <i className="bi bi-trash" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${skill.proficiency}%` }}
                      aria-valuenow={100}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkillItem;
