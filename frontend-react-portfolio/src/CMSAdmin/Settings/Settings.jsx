import "./Settings.css";

const Settings = () => {
  const sections = [
    "About",
    "Services",
    "Portfolio",
    "Certifications",
    "Terms and Conditions",
    "Contact",
  ];
  return (
    <>
      <section id="settings" className="settings-form">
        <div className="container">
          <div className="row">
            <div className="settings-container">
              <div className="col-12">
                <form className="form-card">
                  {sections.map((section) => (
                    <div key={section}>
                      <label htmlFor={section}>{section}</label>
                      <div className="d-flex flex-lg-row flex-column justify-content-between">
                        <>
                          <input
                            type="text"
                            name={section}
                            id={section}
                            value={section || ""}
                          />
                          <div>
                            <button className="updateTitle-btn" type="submit">
                              Update
                            </button>
                            <button className="cancel-btn" type="reset">
                              Cancel
                            </button>
                          </div>
                        </>
                      </div>

                      <hr />
                    </div>
                  ))}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Settings;
