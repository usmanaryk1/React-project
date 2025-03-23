import { useState } from "react";
import "./Settings.css";
import ApiService from "../ApisService";
import useFetch from "../../Components/useFetch";
import { toast } from "react-toastify";

const Settings = () => {
  const [formData, setFormData] = useState({});
  const settingsAPI = ApiService("/api/settings");
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const { data: settings, setData: setSettings } = useFetch(
    `${API_URL}/api/settings`
  );

  const sections = [
    { title: "About" },
    {
      title: "Services",
      subtitle: "Delivering solutions that exceed expectations.",
    },
    { title: "Portfolio", subtitle: "We turn ideas into impactful results." },
    {
      title: "Certifications",
      subtitle: "Showcasing milestones of excellence",
    },
    { title: "Terms and Conditions" },
    { title: "Contact" },
    // "About",
    // "Services",
    // "Portfolio",
    // "Certifications",
    // "Terms and Conditions",
    // "Contact",
  ];

  const handleChange = (sectionTitle, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [sectionTitle]: { ...prev[sectionTitle], [field]: value },
    }));
  };

  const handleUpdate = async (sectionTitle) => {
    if (!sectionTitle) return;

    try {
      const updatedSettings = await settingsAPI.updateItem(
        formData[sectionTitle]
      );

      setSettings((prevSettings) =>
        prevSettings.map((setting) =>
          setting.title === sectionTitle ? updatedSettings : setting
        )
      );
      toast.success("Settings Updated Successfully");
    } catch (error) {
      toast.error("Failed to Update the Settings");
      console.error(error);
    }
  };

  const handleCancel = (sectionTitle) => {
    setFormData((prev) => ({
      ...prev,
      [sectionTitle]: settings?.[sectionTitle] || {},
    }));
  };

  return (
    <>
      <section id="settings" className="settings-form">
        <div className="container">
          <div className="row">
            <div className="settings-container">
              <div className="col-12">
                <form className="form-card">
                  {sections.map((section) => (
                    <div key={section.title}>
                      <div className="form-group">
                        <label htmlFor={section.title}>{section.title}</label>
                        <div>
                          <>
                            <input
                              type="text"
                              className="form-control"
                              name={section.title}
                              id={section.title}
                              value={
                                formData[section.title]?.title || section.title
                              }
                              onChange={(e) =>
                                handleChange(
                                  section.title,
                                  "title",
                                  e.target.value
                                )
                              }
                            />
                            {section.title !== "About" &&
                              section.title !== "Terms and Conditions" &&
                              section.title !== "Contact" && (
                                <textarea
                                  name="subtitle"
                                  className="form-control"
                                  id={`subtitle-${section.title}`}
                                  value={
                                    formData[section.title]?.subtitle ||
                                    section.subtitle
                                  }
                                  onChange={(e) =>
                                    handleChange(
                                      section.title,
                                      "subtitle",
                                      e.target.value
                                    )
                                  }
                                />
                              )}
                            <div>
                              <button
                                className="updateTitle-btn"
                                type="button"
                                onClick={() => handleUpdate(section.title)}
                              >
                                Update
                              </button>
                              <button
                                className="cancel-btn"
                                type="button"
                                onClick={() => handleCancel(section.title)}
                              >
                                Cancel
                              </button>
                            </div>
                          </>
                        </div>
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
