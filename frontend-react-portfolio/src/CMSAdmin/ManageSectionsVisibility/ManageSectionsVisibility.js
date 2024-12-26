import { useMemo } from "react";
import { useSectionVisibility } from "../SectionVisibilityContext/SectionVisibilityContext";
import "./ManageSectionsVisibility.css";
import useFetch from "../../Components/useFetch";
import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/Error/Error";
import NullData from "../../Components/NullData/NullData";
import { toast } from "react-toastify";

const ManageSectionsVisibility = () => {
  // const { sections, toggleVisibility } = useSectionVisibility();
  const API_URL = useMemo(
    () => process.env.REACT_APP_BACKEND_URL || "http://localhost:8000",
    []
  );
  const { sections, setSections, isPending, error } = useSectionVisibility();
  const token = localStorage.getItem("token");

  console.log("sections", sections);

  const toggleVisibility = async (name) => {
    const updatedSections = sections.map((section) =>
      section.name === name
        ? { ...section, isVisible: !section.isVisible }
        : section
    );
    // Find the toggled section
    // const toggledSection = updatedSections.find(
    //   (section) => section.name === name
    // );

    // if (!toggledSection) {
    //   toast.error("Section not found.");
    //   return;
    // }

    setSections(updatedSections);
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

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <>
      <section id="manage-sections" className="sections">
        <div className="container">
          <div className="manage-sections-container">
            <div className="row">
              <div className="col-sm-12">
                <div className="visibility-heading">
                  <h2>Manage Sections</h2>
                </div>
              </div>
            </div>
            {sections && sections.length > 0 ? (
              sections.map((section) => (
                <div className="row section-item" key={section._id}>
                  <div className="col-8">
                    <div className="section-name">
                      <span>{section.name}</span>
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="toggle-container">
                      <button
                        onClick={() => toggleVisibility(section.name)}
                        className={`toggle-btn ${
                          section.isVisible ? "visible" : "hidden"
                        }`}
                      >
                        <div className="toggle-icon">
                          <i
                            className={`bi ${
                              section.isVisible
                                ? "bi-toggle-on"
                                : "bi-toggle-off"
                            }`}
                          ></i>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <NullData />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageSectionsVisibility;
