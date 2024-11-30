import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./TermsAndConditions.css";
import Swal from "sweetalert2";
import { TouchBackend } from "react-dnd-touch-backend";
import TermItem from "./TermItem";
import { useForm } from "react-hook-form";
import NullData from "../NullData/NullData";

const TermsandConditions = ({
  handleDelete,
  handleEditClick,
  termsList,
  handleReorder,
}) => {
  const [isDeleting, setIsDeleting] = useState(null); // Track deleting by ID

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

  return (
    <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
      <div>
        {/* ======= Terms and Conditions ======= */}

        {/* Render Existing Terms */}
        {termsList.length > 0 ? (
          termsList.map((term, index) => (
            <TermItem
              key={term._id}
              term={term}
              index={index}
              moveTerm={handleReorder}
              handleEditClick={() => handleEditClick(term)}
              handleDeleteClick={() => handleDeleteClick(term._id)}
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
