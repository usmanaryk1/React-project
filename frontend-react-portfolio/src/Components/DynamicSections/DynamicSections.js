import React from "react";
import Swal from "sweetalert2";
import "./DynamicSections.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import Dynamicitem from "./Dynamicitem";
import NullData from "../NullData/NullData";
import { useForm } from "react-hook-form";

const DynamicSections = ({
  dynamicSections = [],
  onEditClick,
  onDelete,
  // handleReorder,
}) => {
  console.log("dynamicSections in home", dynamicSections);
  const { reset } = useForm();

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
  const isTouchDevice = "ontouchstart" in window; // Simple check for touch support

  return (
    <>
      <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
        {dynamicSections && dynamicSections.length > 0 ? (
          dynamicSections.map((dynamicSection, index) => (
            <Dynamicitem
              key={dynamicSection._id || index}
              dynamicSection={dynamicSection}
              index={index}
              // moveTerm={handleReorder}
              onEditClick={() => onEditClick(dynamicSection)}
              handleDeleteClick={() => handleDeleteClick(dynamicSection._id)}
              parentReset={reset}
            />
          ))
        ) : (
          <NullData message="Section" link="/" redirect_to="Home" />
        )}
      </DndProvider>
    </>
  );
};

export default DynamicSections;
