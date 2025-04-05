import { useAuth } from "../../CMSAdmin/Auth/AuthContext";

const Dynamicitem = ({ dynamicSection, onEditClick, handleDeleteClick }) => {
  const { isAdminPage, isAuthenticated } = useAuth();

  return (
    <section
      id={`${dynamicSection.name.toLowerCase()}`}
      className="dynamicSections route mt-4"
      key={dynamicSection._id}
    >
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="title-box text-center">
              <h3 className="title-a">{dynamicSection.name}</h3>
              <div className="line-mf" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="section-box anime-box">
              <div className="section-container">
                <div>
                  <div className="row">
                    <div className="col-12">
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
