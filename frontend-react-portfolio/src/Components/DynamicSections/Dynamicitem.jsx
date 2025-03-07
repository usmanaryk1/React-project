import { useAuth } from "../../CMSAdmin/Auth/AuthContext";
import { useDrag, useDrop } from "react-dnd";

const Dynamicitem = ({
  dynamicSection,
  index,
  // moveTerm,
  onEditClick,
  handleDeleteClick,
}) => {
  // console.log("dynamic section", dynamicSection);
  // const [{ isDragging }, drag] = useDrag({
  //   type: "DYNAMICITEM",
  //   item: { index },
  //   collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  // });

  // const [, drop] = useDrop({
  //   accept: "DYNAMICITEM",

  //   hover: (draggedItem) => {
  //     if (draggedItem.index !== index) {
  //       moveTerm(draggedItem.index, index);
  //       draggedItem.index = index;
  //     }
  //   },
  // });

  const { isAdminPage, isAuthenticated } = useAuth();

  return (
    <section
      id="section"
      // ref={(node) => (isAdminPage && isAuthenticated ? drag(drop(node)) : null)}
      className="section-mf route"
      key={dynamicSection._id}
      style={{
        // opacity: isDragging ? 0.5 : 1,
        cursor: isAdminPage && isAuthenticated ? "grab" : "default",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div
              className={
                isAdminPage && isAuthenticated
                  ? "section-border"
                  : "section-box"
              }
            >
              <div className="section-container">
                <div>
                  <div className="row">
                    <div className="col-9">
                      <div className="section-title title-box-2 d-flex justify-content-between">
                        <h5>{dynamicSection.title}</h5>
                      </div>
                    </div>
                    <div className="col-3">
                      {isAuthenticated && isAdminPage && (
                        <div className="admin-actions crud-btns">
                          <div>
                            <button
                              className="admin-btn btn btn-primary btn-sm me-1"
                              onClick={() => onEditClick(dynamicSection)}
                            >
                              <i className="bi bi-pencil" />
                            </button>
                            <button
                              className="admin-btn btn btn-danger btn-sm"
                              onClick={() =>
                                handleDeleteClick(dynamicSection._id)
                              }
                            >
                              <i className="bi bi-trash" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div
                        className="section-content"
                        dangerouslySetInnerHTML={{
                          __html: dynamicSection.content,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dynamicitem;
