import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./Skills.css";
import { toast } from "react-toastify";
import useFetch from "../../Components/useFetch";
import Swal from "sweetalert2";
import { TouchBackend } from "react-dnd-touch-backend";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import NullData from "../NullData/NullData";
import SkillItem from "./SkillItem";
import ApiService from "../../CMSAdmin/ApisService";

const Skills = ({ handleDelete, handleEditClick }) => {
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const {
    data: skills,
    isPending,
    error,
    setData: setSkills,
  } = useFetch(`${API_URL}/api/skills`);

  const skillsService = ApiService("api/skills");

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

  // Handle reordering the terms
  const handleReorder = async (dragIndex, hoverIndex) => {
    try {
      const reorderedList = [...skills];
      const [draggedItem] = reorderedList.splice(dragIndex, 1);
      reorderedList.splice(hoverIndex, 0, draggedItem);

      // Send reordered list to the server
      await skillsService.reorderItems(
        reorderedList.map((skill, index) => ({ _id: skill._id, order: index }))
      );
      setSkills(reorderedList); // Update state with new order
      toast.success("Skills reordered successfully");
    } catch (error) {
      toast.error("Failed to Update the Sequence of Skills");
    }
  };

  if (isPending) return <Loading />;
  if (error) return <Error message={error} />;

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
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
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
