import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import validationSchema from "./SocialValidation";
import useFetch from "../../Components/useFetch";
import { useState, useEffect } from "react";
import Contact from "../../Components/Contact";

const SocialForm = () => {
  const [currentLinks, setCurrentLinks] = useState(null);
  const token = localStorage.getItem("token");

  const { data: links, setData: setLinks, refetch } = useFetch("/social");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      platformIcon: "",
      link: "",
      isActive: false,
    },
  });

  useEffect(() => {
    if (currentLinks) {
      setValue("platformIcon", currentLinks.platformIcon);
      setValue("link", currentLinks.link);
      setValue("isActive", currentLinks.isActive);
    } else {
      reset();
    }
  }, [currentLinks, setValue, reset]);

  const onSubmit = async (data) => {
    const formData = {
      platformIcon: data.platformIcon,
      link: data.link,
      isActive: data.isActive,
    };

    if (currentLinks) {
      // Update service
      //   const updatedLink = { ...currentLinks, ...formData };
      const response = await fetch(`/social/${currentLinks._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("Updated links response:", result);

      setLinks(links.map((link) => (link._id === result._id ? result : link)));
      console.log("Updating links: ", links);
      toast.success("Link updated successfully");
    } else {
      // Add new service
      const response = await fetch("/social", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Added links response: ", result);
        setLinks((prevLinks) => [...prevLinks, result]);
        console.log("Added links: ", links);
        toast.success("Link added successfully");
      } else {
        toast.error("Failed to add Link");
      }
    }
    reset();
    setCurrentLinks(null);
    refetch();
  };

  const onReset = () => {
    reset();
    setCurrentLinks(null);
  };

  const handleEdit = (links) => {
    setCurrentLinks(links);
    console.log("onedit: ", links);
  };

  const handleDelete = async (id) => {
    console.log("Deleting service with ID:", id);
    const response = await fetch(`/social/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      setLinks(links.filter((links) => links._id !== id));
      refetch();
      toast.success("Link deleted successfully");
      console.log("Link deleted", links);
    } else {
      toast.error("Failed to delete Link");
    }
  };

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
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="form-group">
                    <input
                      type="text"
                      name="platformIcon"
                      className="form-control"
                      {...register("platformIcon")}
                      placeholder="Icon of Social Media (bi bi-facebook)"
                      required
                    />
                  </div>
                  {errors.platform && (
                    <p className="error-message">{errors.platform.message}</p>
                  )}

                  <div className="form-group">
                    <input
                      type="text"
                      name="link"
                      className="form-control"
                      {...register("link")}
                      placeholder="Link of your accounnt"
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
                    <button className="submit" type="submit">
                      Submit
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
