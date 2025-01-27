import { useMemo, useState, useCallback, useEffect } from "react";
import "./DynamicSectionsEdit.css";
import useFetch from "../../Components/useFetch";
import ApiService from "../ApisService";
import EditorModal from "../EditorModal/EditorModal";
import { toast } from "react-toastify";
import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/Error/Error";
import DynamicSections from "../../Components/DynamicSections/DynamicSections";
import { useSectionVisibility } from "../SectionVisibilityContext/SectionVisibilityContext";

const DynamicSectionsEdit = () => {
  const API_URL = useMemo(
    () => process.env.REACT_APP_BACKEND_URL || "http://localhost:8000",
    []
  );

  const {
    data: dynamicSections,
    setData: setDynamicSections,
    isPending,
    error,
  } = useFetch(`${API_URL}/api/dynamicSections`);

  const { sections, setSections, refetch } = useSectionVisibility();

  console.log("dynamicSections in form", dynamicSections);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDynamicSection, setCurrentDynamicSection] = useState(null);

  const DynamicSectionService = ApiService("api/dynamicSections");

  useEffect(() => {
    console.log("currentDynamicSection updated:", currentDynamicSection);
  }, [currentDynamicSection]);

  const handleAddClick = useCallback(() => {
    // console.log("Add button clicked");
    setCurrentDynamicSection(null);
    setIsModalOpen(true);
  }, []);

  const handleEditClick = useCallback((dynamicSection) => {
    console.log("Edit button clicked", dynamicSection);
    setCurrentDynamicSection(dynamicSection);
    console.log("currentPubllications", currentDynamicSection);
    setIsModalOpen(true);
  }, []);

  const handleModalSubmit = useCallback(
    async (data) => {
      // console.log("Save button clicked");
      // Ensure the form data is not empty before making API calls
      if (!data.title || !data.content) {
        toast.error("Please fill out all fields before submitting.");
        return;
      }
      try {
        if (currentDynamicSection) {
          // Update an existing section
          const updatedData = await DynamicSectionService.updateItem(
            currentDynamicSection._id,
            data
          );
          setDynamicSections((prevSections) =>
            prevSections.map((section) =>
              section._id === updatedData._id ? updatedData : section
            )
          );
          toast.success("Data updated successfully");
        } else {
          // Add a new section
          const addedData = await DynamicSectionService.addItem(data);
          setDynamicSections((prevData) => [...prevData, addedData]);
          toast.success("Data added successfully");

          // Also update the Manage Sections collection
          const manageSectionPayload = {
            name: `${addedData.title} Section`,
            isVisible: true,
          };
          console.log("manageSectionPayload", manageSectionPayload);
          const newSection = await ApiService("api/sectionVisibility").addItem(
            manageSectionPayload
          );
          setSections((prevSec) => [...prevSec, newSection]);
          console.log("sections is dynamic section:", sections);
          refetch();
        }
      } catch (error) {
        console.error(err);
        toast.error(
          "Error occurred while processing the request.",
          err.response?.data?.message || err.message
        );
      }
      setIsModalOpen(false);
    },
    [currentDynamicSection, DynamicSectionService, setDynamicSections]
  );

  const handleDelete = useCallback(
    (id) => {
      // console.log("delete button clicked");
      try {
        DynamicSectionService.deleteItem(id).then(() => {
          setDynamicSections((prevSec) =>
            prevSec.filter((section) => section._id !== id)
          );
          toast.success("Data Deleted successfully");
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to Delete the Data", error.message);
      }
    },
    [DynamicSectionService, setDynamicSections]
  );

  if (isPending) return <Loading />;

  if (error) return <Error message={error} />;

  return (
    <>
      <div id="dynamicSections-form">
        <div className="d-flex justify-content-end">
          <button className="addSection-btn" onClick={handleAddClick}>
            Add New Section
          </button>
        </div>
        <DynamicSections
          dynamicSections={dynamicSections}
          onEditClick={handleEditClick}
          onDelete={handleDelete}
        />
        <EditorModal
          isOpen={isModalOpen}
          onSubmit={handleModalSubmit}
          onClose={() => setIsModalOpen(false)}
          initialData={currentDynamicSection ?? { title: "", content: "" }}
        />
      </div>
    </>
  );
};

export default DynamicSectionsEdit;