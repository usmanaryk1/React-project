import React from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../CMSAdmin/Auth/AuthContext";
import "./Sections.css";

const Sections = ({ section = [], onEditClick, onDelete }) => {
  // console.log("sectionsData", section);
  const { isAuthenticated, isAdminPage } = useAuth();
  const handleDeleteClick = (sectionId) => {
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
        onDelete(sectionId);
      }
    });
  };
  return (
    <>
      <section id="section" className="section-mf sect-pt4 route">
        <div className="container">
          {isAuthenticated && isAdminPage && (
            <div className="admin-actions">
              {section &&
                section.map((section) => (
                  <div key={section._id}>
                    <button
                      className="admin-btn btn btn-primary btn-sm me-1"
                      onClick={() => onEditClick(section)}
                    >
                      <i className="bi bi-pencil" />
                    </button>
                    <button
                      className="admin-btn btn btn-danger btn-sm"
                      onClick={() => handleDeleteClick(section._id)}
                    >
                      <i className="bi bi-trash" />
                    </button>
                  </div>
                ))}
            </div>
          )}

          <div className="row">
            <div className="col-12">
              <div className="section-container">
                {section &&
                  section.map((section) => (
                    <div key={section._id}>
                      <div className="row">
                        <div className="col-12">
                          <div className="section-title title-box-2 d-flex justify-content-between">
                            <h5>{section.title}</h5>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="section-content">
                            {section.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sections;
