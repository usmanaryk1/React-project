import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./Skills.css";
import Swal from "sweetalert2";
import { TouchBackend } from "react-dnd-touch-backend";
import NullData from "../NullData/NullData";
import SkillItem from "./SkillItem";

const Skills = ({ handleDelete, handleEditClick, skills, handleReorder }) => {
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
        {/* Render Existing Terms */}
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <SkillItem
              key={skill._id}
              skill={skill}
              index={index}
              moveSkill={handleReorder}
              handleEditClick={() => handleEditClick(skill)}
              handleDeleteClick={() => handleDeleteClick(skill._id)}
            />
          ))
        ) : (
          <NullData message="Skills" />
        )}
      </div>
    </DndProvider>
  );
};

export default Skills;
