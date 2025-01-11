import { useMemo, useState, useCallback } from "react";
import Publications from "../../Components/Publications/Publications";
import "./PublicationsEdit.css";
import useFetch from "../../Components/useFetch";
import ApiService from "../ApisService";
import EditorModal from "../EditorModal/EditorModal";
import { toast } from "react-toastify";

const PublicationsEdit = () => {
  const API_URL = useMemo(
    () => process.env.REACT_APP_BACKEND_URL || "http://localhost:8000",
    []
  );

  const { data: publications, setData: setPublications } = useFetch(
    `${API_URL}/api/publications`
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPublications, setCurrentPublications] = useState(null);

  const publicationsService = ApiService("/api/publications");

  const handleAddClick = useCallback(() => {
    setCurrentPublications(null);
    setIsModalOpen(true);
  }, []);

  const handleEditClick = useCallback(() => {
    setCurrentPublications(publications);
    setIsModalOpen(true);
  }, [publications]);

  const handleModalSubmit = useCallback(
    (data) => {
      if (currentPublications) {
        publicationsService
          .updateItem(currentPublications._id, data)
          .then((updatedData) => {
            setPublications((prevPublication) =>
              prevPublication.map((publication) =>
                publication._id === updatedData._id ? updatedData : publication
              )
            );
            setIsModalOpen(false);
            toast.success("Data updated successfully");
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to update data", err.message);
          });
      } else {
        publicationsService
          .addItem(data)
          .then((addedData) => {
            setPublications((prevData) => [...prevData, addedData]);
            setIsModalOpen(false);
            toast.success("Data added successfully");
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to Add Data", err.message);
          });
      }
    },
    [currentPublications, publicationsService, setPublications]
  );

  const handleDelete = useCallback(
    (id) => {
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
          initialData={currentPublications || {}}
        />
      </div>
    </>
  );
};

export default PublicationsEdit;
