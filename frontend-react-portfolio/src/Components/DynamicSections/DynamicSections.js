import React from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../CMSAdmin/Auth/AuthContext";
import "./DynamicSections.css";

const DynamicSections = ({ dynamicSections = [], onEditClick, onDelete }) => {
  console.log("dynamicSections in home", dynamicSections);
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
      {dynamicSections &&
        dynamicSections.map((dynamicSection) => (
          <section
            id="section"
            className="section-mf route"
            key={dynamicSection._id}
          >
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="section-container">
                    <div>
                      <div className="row">
                        <div className="col-9">
                          <div className="section-title title-box-2 d-flex justify-content-between">
                            <h5>{dynamicSection.title}</h5>
                          </div>
                        </div>
                        <div className="col-3">
                          {isAuthenticated && isAdminPage && (
                            <div className="admin-actions crud-btns">
                              <div>
                                <button
                                  className="admin-btn btn btn-primary btn-sm me-1"
                                  onClick={() => onEditClick(dynamicSection)}
                                >
                                  <i className="bi bi-pencil" />
                                </button>
                                <button
                                  className="admin-btn btn btn-danger btn-sm"
                                  onClick={() =>
                                    handleDeleteClick(dynamicSection._id)
                                  }
                                >
                                  <i className="bi bi-trash" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div
                            className="section-content"
                            dangerouslySetInnerHTML={{
                              __html: dynamicSection.content,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
    </>
  );
};

export default DynamicSections;
