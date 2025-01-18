import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { useSectionVisibility } from "../SectionVisibilityContext/SectionVisibilityContext";
import ApiService from "../ApisService";

export const useSectionManager = () => {
  const API_URL = useMemo(
    () => process.env.REACT_APP_BACKEND_URL || "http://localhost:8000",
    []
  );

  const { sections, setSections, isPending, error } = useSectionVisibility();
  const token = localStorage.getItem("token");

  // State for tracking reordered sections
  const [updatedSections, setUpdatedSections] = useState([]);
  const [isOrderChanged, setIsOrderChanged] = useState(false); // Button state
  const SectionsService = ApiService();

  useEffect(() => {
    setUpdatedSections(sections || []);
  }, [sections]);

  const toggleVisibility = async (name) => {
    const updated = updatedSections.map((section) =>
      section.name === name
        ? { ...section, isVisible: !section.isVisible }
        : section
    );

    setSections(updated);
    // Persist to backend
    try {
      const response = await fetch(`${API_URL}/api/sectionVisibility`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          isVisible: !sections.find((section) => section.name === name)
            .isVisible,
        }),
      });

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
    const draggedSection = updatedSections[dragIndex];
    const reorderedSections = [...updatedSections];
    reorderedSections.splice(dragIndex, 1);
    reorderedSections.splice(hoverIndex, 0, draggedSection);

    setUpdatedSections(reorderedSections);
    setIsOrderChanged(true);
  };

  const saveOrder = async () => {
    try {
      await SectionsService.reorderItems(reorderedSections);
      if (!response.ok) {
        toast.error("Failed to update the order of sections.");
      } else {
        toast.success("Order updated successfully.");
        setSections(updatedSections);
        setIsOrderChanged(false);
      }
    } catch (error) {
      console.error("Order Updated Failed:", error);
      toast.error("An error occurred while updating the order.");
    }
  };
  return {
    sections,
    updatedSections,
    isOrderChanged,
    isPending,
    error,
    toggleVisibility,
    moveSection,
    saveOrder,
  };
};
