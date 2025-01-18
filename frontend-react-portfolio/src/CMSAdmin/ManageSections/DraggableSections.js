import { memo } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useAuth } from "../Auth/AuthContext";

const ItemType = "SECTION_ITEM";
const DraggableSections = memo(
  ({ section, index, sections, moveSection, toggleVisibility }) => {
    const { isAdminPage, isAuthenticated } = useAuth();

    const [{ isDragging }, drag] = useDrag({
      type: ItemType,
      item: { index },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    });

    const [, drop] = useDrop({
      accept: ItemType,
      hover: (draggedItem) => {
        if (draggedItem.index !== index) {
          const reordered = [...sections];
          const [movedItem] = reordered.splice(draggedItem.index, 1);
          reordered.splice(index, 0, movedItem);

          moveSection(reordered); // Notify parent of the new order
          draggedItem.index = index;
        }
      },
    });
    return (
      <>
        <div
          ref={(node) =>
            isAdminPage && isAuthenticated ? drag(drop(node)) : null
          }
          className="row section-item"
          style={{
            opacity: isDragging ? 0.5 : 1,
            cursor: isAdminPage && isAuthenticated ? "grab" : "default",
          }}
        >
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
                      section.isVisible ? "bi-toggle-on" : "bi-toggle-off"
                    }`}
                  ></i>
                </div>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default DraggableSections;
