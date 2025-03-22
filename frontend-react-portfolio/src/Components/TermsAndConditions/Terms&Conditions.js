import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./TermsAndConditions.css";
import Swal from "sweetalert2";
import { TouchBackend } from "react-dnd-touch-backend";
import TermItem from "./TermItem";
import { useForm } from "react-hook-form";
import NullData from "../NullData/NullData";
import { useAuth } from "../../CMSAdmin/Auth/AuthContext";
import { useMemo } from "react";
import useFetch from "../useFetch";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
const TermsandConditions = ({
  handleDelete,
  handleEditClick,
  termsList = [], // Default value
  isEdit = false,
  handleReorder,
}) => {
  const API_URL = useMemo(
    () => process.env.REACT_APP_BACKEND_URL || "http://localhost:8000",
    []
  );
  const {
    data: termsData,
    isPending,
    error,
  } = useFetch(`${API_URL}/api/terms`);
  console.log("isEdit outside");
  if (!isEdit) {
    termsList = termsData;
    console.log("isEdit inside");
  }

  const { isAuthenticated, isAdminPage } = useAuth();

  // console.log("termslist", termsList);
  const { reset } = useForm();

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

  const isTouchDevice = "ontouchstart" in window; // Simple check for touch support
  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

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
                <h2 className="hero-title">TERMS AND CONDITIONS</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Render Existing Terms */}
        {termsList?.length > 0 ? (
          termsList.map((term, index) => (
            <TermItem
              key={term._id}
              term={term}
              index={index}
              moveTerm={handleReorder}
              handleEditClick={() => handleEditClick(term)}
              handleDeleteClick={() => handleDeleteClick(term._id)}
              parentReset={reset}
            />
          ))
        ) : (
          <NullData message="Terms" link="/" redirect_to="Home" />
        )}
      </div>
    </DndProvider>
  );
};

export default TermsandConditions;
