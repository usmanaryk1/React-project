import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { useSectionVisibility } from "../SectionVisibilityContext/SectionVisibilityContext";
import ApiService from "../ApisService";

export const useSectionManager = () => {
  const API_URL = useMemo(
    () => process.env.REACT_APP_BACKEND_URL || "http://localhost:8000",
    []
  );

  const { sections, setSections, isPending, error, refetch } =
    useSectionVisibility();
  const token = localStorage.getItem("token");

  // State for tracking reordered sections
  const [updatedSections, setUpdatedSections] = useState([]);
  const [isOrderChanged, setIsOrderChanged] = useState(false); // Button state
  const [isUpdating, setIsUpdating] = useState(false);
  const SectionsService = ApiService("api/sectionVisibility");

  useEffect(() => {
    setUpdatedSections(sections || []);
  }, [sections]);

  const toggleVisibility = async (name) => {
    const updated = updatedSections.map((section) =>
      section.name === name
        ? { ...section, isVisible: !section.isVisible }
        : section
    );

    setUpdatedSections(updated);
    setSections(updated); // Update context state
    // Persist to backend
    try {
      const response = await fetch(
        `${API_URL}/api/sectionVisibility/toggleVisibility`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            isVisible: !sections.find((section) => section.name === name)
              .isVisible,
          }),
        }
      );

      if (!response.ok) {
        toast.error("Failed to update the visibility state of sections.");
      } else {
        toast.success("Visibility State updated successfully.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occured." || error.message);
    }
  };

  const moveSection = (dragIndex, hoverIndex) => {
    const reorderedSections = [...updatedSections];
    const [draggedSection] = reorderedSections.splice(dragIndex, 1);
    reorderedSections.splice(hoverIndex, 0, draggedSection);
    // console.log("reordered sections", reorderedSections);
    setUpdatedSections(reorderedSections);
    setIsOrderChanged(true);
  };

  const saveOrder = async () => {
    try {
      setIsUpdating(true);
      // console.log("updatedSections in hook", updatedSections);
      // Make API call with the final reordered list

      const reorderedItems = updatedSections.map((section, index) => ({
        _id: section._id,
        order: index, // Use the correct order here
      }));
      // console.log("Final Payload to Save:", reorderedItems);
      const response = await SectionsService.reorderItems(reorderedItems);

      if (response.message === "Sections reordered successfully") {
        toast.success("Order updated successfully.");
        setSections(updatedSections);
        refetch();
        setIsUpdating(false);
        setIsOrderChanged(false);
      } else {
        throw new Error(response.message || "Failed to save order.");
      }
    } catch (error) {
      setIsOrderChanged(false);
      console.error("Order Updated Failed:", error);
      toast.error("An error occurred while updating the order.");
    }
  };
  return {
    sections,
    updatedSections,
    isOrderChanged,
    isUpdating,
    isPending,
    error,
    toggleVisibility,
    moveSection,
    saveOrder,
  };
};
