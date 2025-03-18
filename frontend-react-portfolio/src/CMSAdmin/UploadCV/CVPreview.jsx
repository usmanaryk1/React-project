import Swal from "sweetalert2";
import { useAuth } from "../Auth/AuthContext";
import "./CVPreview.css";

const CVPreview = ({ cvs = [], preview, onEditClick }) => {
  const { isAuthenticated, isAdminPage } = useAuth();

  const handleDeleteClick = (cvId) => {
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
        // onDeleteClick(cvId);
      }
    });
  };

  return (
    <>
      {/* CV Previews */}
      {cvs?.map((cv) => (
        <div className="cv-preview container" key={cv._id}>
          {/* Admin Actions */}
          {isAuthenticated && isAdminPage && (
            <div className="admin-actions d-flex justify-content-end">
              <div className="d-inline-block mx-1">
                <button
                  className="admin-btn btn btn-primary btn-sm"
                  aria-label="Edit"
                  onClick={() => onEditClick(cv)}
                >
                  <i className="bi bi-pencil" />
                </button>
                <button
                  className="admin-btn btn btn-danger btn-sm"
                  aria-label="Delete"
                  onClick={() => handleDeleteClick(cv._id)}
                >
                  <i className="bi bi-trash" />
                </button>
              </div>
            </div>
          )}
          <iframe
            src={preview || cv.cvUrl} // Ensure `cv.cvUrl` is a valid URL
            width="100%"
            height="800px"
            title="CV Preview"
            className="cv-preview border border-dark border-5"
          ></iframe>
        </div>
      ))}
    </>
  );
};

export default CVPreview;
