import { useMemo, useState, useCallback } from "react";
import Publications from "../../Components/Publications/Publications";
import "./PublicationsEdit.css";
import useFetch from "../../Components/useFetch";
import ApiService from "../ApisService";
import EditorModal from "../EditorModal/EditorModal";
import { toast } from "react-toastify";
import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/Error/Error";

const PublicationsEdit = () => {
  const API_URL = useMemo(
    () => process.env.REACT_APP_BACKEND_URL || "http://localhost:8000",
    []
  );

  const {
    data: publications,
    setData: setPublications,
    isPending,
    error,
  } = useFetch(`${API_URL}/api/publications`);

  // console.log("publications in form", publications);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPublications, setCurrentPublications] = useState(null);

  const publicationsService = ApiService("api/publications");

  const handleAddClick = useCallback(() => {
    // console.log("Add button clicked");
    setCurrentPublications(null);
    setIsModalOpen(true);
  }, []);

  const handleEditClick = useCallback((publication) => {
    // console.log("Edit button clicked", publication);
    setCurrentPublications(publication);
    setIsModalOpen(true);
  }, []);

  const handleModalSubmit = useCallback(
    (data) => {
      // console.log("Save button clicked");
      // Ensure the form data is not empty before making API calls
      if (!data.title || !data.content) {
        toast.error("Please fill out all fields before submitting.");
        return;
      }
      if (currentPublications) {
        console.log("currentPublications", currentPublications);
        publicationsService
          .updateItem(currentPublications._id, data)
          .then((updatedData) => {
            setPublications((prevPublication) =>
              prevPublication.map((publication) =>
                publication._id === updatedData._id ? updatedData : publication
              )
            );
            toast.success("Data updated successfully");
          })
          .catch((err) => {
            console.error(err);
            toast.error(
              "Failed to update data",
              err.response?.data?.message || err.message
            );
          });
      } else {
        publicationsService
          .addItem(data)
          .then((addedData) => {
            console.log("addedData", addedData);
            setPublications((prevData) => [...prevData, addedData]);
            toast.success("Data added successfully");
          })
          .catch((err) => {
            console.error(err);
            toast.error(
              "Server error.Please try again.",
              err.response?.data?.message || err.message
            );
          });
      }
      setIsModalOpen(false);
    },
    [currentPublications, publicationsService, setPublications]
  );

  const handleDelete = useCallback(
    (id) => {
      // console.log("delete button clicked");
      try {
        publicationsService.deleteItem(id).then(() => {
          setPublications((prevPub) =>
            prevPub.filter((publication) => publication._id !== id)
          );
          toast.success("Data Deleted successfully");
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to Delete the Data", error.message);
      }
    },
    [publicationsService, setPublications]
  );

  if (isPending) return <Loading />;

  if (error) return <Error message={error} />;

  return (
    <>
      <div id="publications-form">
        <div className="d-flex justify-content-end">
          <button className="addSection-btn" onClick={handleAddClick}>
            Add New Section
          </button>
        </div>
        <Publications
          publications={publications}
          onEditClick={handleEditClick}
          onDelete={handleDelete}
        />
        <EditorModal
          isOpen={isModalOpen}
          onSubmit={handleModalSubmit}
          onClose={() => setIsModalOpen(false)}
          initialData={currentPublications ?? { title: "", content: "" }}
        />
      </div>
    </>
  );
};

export default PublicationsEdit;
