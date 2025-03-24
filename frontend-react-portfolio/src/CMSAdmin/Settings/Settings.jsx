import { useState, useEffect } from "react";
import "./Settings.css";
import ApiService from "../ApisService";
import useFetch from "../../Components/useFetch";
import { toast } from "react-toastify";
import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/Error/Error";

const Settings = () => {
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const {
    data: settings,
    setData: setSettings,
    isPending,
    error,
    refetch,
  } = useFetch(`${API_URL}/api/settings`);

  const settingsAPI = ApiService("api/settings");

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (settings) {
      // Initialize formData with existing settings OR empty default values
      const initialData = {};
      settings.forEach((s) => {
        initialData[s._id] = { title: s.title, subtitle: s.subtitle };
      });
      setFormData(initialData);
    }
  }, [settings]);

  const handleChange = (sectionId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], [field]: value },
    }));
  };

  const handleSave = async (sectionId) => {
    if (!sectionId) return;

    try {
      let updatedSetting;
      if (sectionId) {
        // Update existing section
        updatedSetting = await settingsAPI.updateItem(
          // settingToUpdate._id,
          sectionId,
          formData[sectionId]
        );
      } else {
        // Create a new section if it doesn't exist
        updatedSetting = await settingsAPI.addItem({
          title: formData[sectionId]?.title || "",
          subtitle: formData[sectionId]?.subtitle || "",
        });
      }

      // Update settings state
      setSettings((prevSettings) => {
        if (sectionId) {
          // If existing, replace updated item
          return prevSettings.map((s) =>
            s._id === sectionId ? updatedSetting : s
          );
        } else {
          // If new, add to state
          return [...prevSettings, updatedSetting];
        }
      });
      refetch();
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
      console.error(error);
    }
  };

  const handleCancel = (sectionId) => {
    const originalData = settings?.find((s) => s._id === sectionId);
    setFormData((prev) => ({
      ...prev,
      [sectionId]: {
        title: originalData?.title || "",
        subtitle: originalData?.subtitle || "",
      },
    }));
  };

  if (isPending) return <Loading />;

  if (error) return <Error message={error} />;

  return (
    <>
      <section id="settings" className="settings-form">
        <div className="container">
          <div className="row">
            <div className="settings-container">
              <div className="col-12">
                <form className="form-card">
                  {settings?.map((section) => (
                    <div key={section._id}>
                      <div className="form-group">
                        <label htmlFor={section.title}>{section.title}</label>
                        <div>
                          <>
                            <input
                              type="text"
                              className="form-control"
                              name={section.title}
                              id={section._id}
                              value={
                                formData[section._id]?.title || section.title
                              }
                              onChange={(e) =>
                                handleChange(
                                  section._id,
                                  "title",
                                  e.target.value
                                )
                              }
                            />
                            {section.hasSubtitle && (
                              <textarea
                                name="subtitle"
                                className="form-control"
                                id={`subtitle-${section._id}`}
                                value={
                                  formData[section._id]?.subtitle ||
                                  section.subtitle
                                }
                                onChange={(e) =>
                                  handleChange(
                                    section._id,
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
                                onClick={() => handleSave(section._id)}
                              >
                                Update
                              </button>
                              <button
                                className="cancel-btn"
                                type="button"
                                onClick={() => handleCancel(section._id)}
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
