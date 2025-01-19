import "./ManageSectionsVisibility.css";
import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/Error/Error";
import NullData from "../../Components/NullData/NullData";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import DraggableSections from "./DraggableSections";
import { useSectionManager } from "./useSectionManager";

const ManageSections = () => {
  const {
    sections,
    updatedSections,
    isOrderChanged,
    isPending,
    error,
    toggleVisibility,
    moveSection,
    saveOrder,
  } = useSectionManager();
  // console.log("sections", sections);
  // console.log("updatedSections", updatedSections);

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  return (
    <>
      <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
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
              <button
                className="update-order-btn"
                onClick={saveOrder}
                disabled={!isOrderChanged}
              >
                Update Order
              </button>
              {updatedSections && updatedSections.length > 0 ? (
                updatedSections.map((section, index) => (
                  <DraggableSections
                    key={section._id}
                    section={section}
                    index={index}
                    moveSection={moveSection}
                    toggleVisibility={toggleVisibility}
                  />
                ))
              ) : (
                <NullData link="/" />
              )}
            </div>
          </div>
        </section>
      </DndProvider>
    </>
  );
};

export default ManageSections;
