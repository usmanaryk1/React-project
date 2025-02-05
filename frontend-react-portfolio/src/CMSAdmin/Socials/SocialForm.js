import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import validationSchema from "./SocialValidation";
import useFetch from "../../Components/useFetch";
import { useState, useEffect } from "react";
import Contact from "../../Components/Contact/Contact";
import "../Icons/IconsDropdownCss.css";
import CustomIconDropdown from "../Icons/CustomIconDropdown";
import Error from "../../Components/Error/Error";
import Loading from "../../Components/Loading/Loading";
import "./SocialForm.css";

const SocialForm = () => {
  const [currentLinks, setCurrentLinks] = useState(null);
  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status
  const [selectedIcon, setSelectedIcon] = useState(""); // Lift state up

  const {
    data: links,
    setData: setLinks,
    refetch,
    isPending,
    error,
  } = useFetch(`${API_URL}/api/social`);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (currentLinks) {
      setValue("platformIcon", currentLinks.platformIcon);
      setSelectedIcon(currentLinks.platformIcon); // Sync selectedIcon
      setValue("link", currentLinks.link);
      setValue("isActive", currentLinks.isActive);
    } else {
      reset();
      setSelectedIcon(""); // Reset selectedIcon when no currentService
    }
  }, [currentLinks, setValue, reset]);
  // console.log("selected icon:", selectedIcon);
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const formData = {
      platformIcon: data.platformIcon,
      isActive: data.isActive,
    };
    // console.log("platformicon:", data.platformIcon);
    // if the platform is whatsapp, create the link
    if (data.platformIcon === "bi-whatsapp") {
      formData.link = `https://wa.me/${data.link.replace(/\D/g, "")}`; // Strip the non-numeric character
    } else {
      formData.link = data.link;
    }
    // console.log("formdata link:", formData.link);
    if (currentLinks) {
      // Update service
      //   const updatedLink = { ...currentLinks, ...formData };
      const response = await fetch(
        `${API_URL}/api/social/${currentLinks._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      // console.log("Updated links response:", result);

      setLinks(links.map((link) => (link._id === result._id ? result : link)));
      // console.log("Updating links: ", links);
      toast.success("Link updated successfully");
    } else {
      // Add new service
      const response = await fetch(`${API_URL}/api/social`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        // console.log("Added links response: ", result);
        setLinks((prevLinks) => [...prevLinks, result]);
        // console.log("Added links: ", links);
        toast.success("Link added successfully");
      } else {
        toast.error("Failed to add Link");
      }
    }
    reset();
    setCurrentLinks(null);
    setIsSubmitting(false);
    setSelectedIcon(""); // Reset the selectedIcon state
    refetch();
  };

  const onReset = () => {
    reset();
    setCurrentLinks(null);
    setSelectedIcon(""); // Reset the selectedIcon state
  };

  const handleEdit = (links) => {
    setCurrentLinks(links);
    // console.log("onedit: ", links);
  };

  const handleDelete = async (id) => {
    // console.log("Deleting service with ID:", id);
    const response = await fetch(`${API_URL}/api/social/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      setLinks(links.filter((links) => links._id !== id));
      refetch();
      toast.success("Link deleted successfully");
      // console.log("Link deleted", links);
    } else {
      toast.error("Failed to delete Link");
    }
  };

  if (isPending) return <Loading />;

  if (error) return <Error message={error} />;

  return (
    <>
      <section id="social-form" className="social-form form">
        <div className="container">
          <div className="row">
            <div className="social-container">
              <div className="col-12">
                <h2>Add Social Links!</h2>
              </div>
              <div className="col-12">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="form-container"
                  noValidate
                >
                  <CustomIconDropdown
                    name="platformIcon"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    selectedIcon={selectedIcon} // Pass selectedIcon
                    setSelectedIcon={setSelectedIcon} // Pass setter function // Add this line
                  />

                  <div className="form-group">
                    <input
                      type="text"
                      name="link"
                      className="form-control"
                      {...register("link")}
                      placeholder="Link of your account"
                      required
                    />
                  </div>
                  {errors.link && (
                    <p className="error-message">{errors.link.message}</p>
                  )}

                  <div className="isActive">
                    <input
                      type="checkbox"
                      id="active"
                      name="isActive"
                      {...register("isActive")}
                      className="mx-2"
                      required
                    />
                    <label htmlFor="active">isActive</label>
                    {errors.isActive && (
                      <p className="error-message">{errors.isActive.message}</p>
                    )}
                  </div>

                  <div className="buttons">
                    <button className="reset" type="reset" onClick={onReset}>
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </section>
      <Contact
        onEditClick={handleEdit}
        onDeleteClick={handleDelete}
        links={links}
      />
    </>
  );
};

export default SocialForm;
