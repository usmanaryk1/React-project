import { useState, useEffect } from "react";
import useFetch from "../../Components/useFetch";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import validationSchema from "./ServiceValidation";
import Services from "../../Components/Services";
import "../Icons/IconsDropdownCss.css";
import CustomIconDropdown from "../Icons/CustomIconDropdown";
import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/Error/Error";
import "./ServicesForm.css";

const AddServiceForm = () => {
  const token = localStorage.getItem("token");
  const [currentService, setCurrentService] = useState(null);
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status
  const [selectedIcon, setSelectedIcon] = useState(""); // Lift state up

  const {
    data: services,
    setData: setServices,
    refetch,
    isPending,
    error,
  } = useFetch(`${API_URL}/api/services`);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      icon: "",
      title: "",
      desc: "",
      isActive: false,
    },
  });

  useEffect(() => {
    if (currentService) {
      setValue("icon", currentService.sIcon);
      setSelectedIcon(currentService.sIcon); // Sync selectedIcon
      setValue("title", currentService.sTitle);
      setValue("desc", currentService.sDescription);
      setValue("isActive", currentService.isActive);
    } else {
      reset();
      setSelectedIcon(""); // Reset selectedIcon when no currentService
    }
  }, [currentService, setValue, reset]);

  console.log("currentService: ", currentService);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const formData = {
      sIcon: data.icon,
      sTitle: data.title,
      sDescription: data.desc,
      isActive: data.isActive,
    };

    try {
      if (currentService) {
        const response = await fetch(
          `${API_URL}/api/services/${currentService._id}`,
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
        // console.log("Updated service response:", result);

        setServices(
          services.map((service) =>
            service._id === result._id ? result : service
          )
        );
        // console.log(" Update service: ", services);
        toast.success("Service updated successfully");
      } else {
        // Add new service
        const response = await fetch(`${API_URL}/api/services`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const result = await response.json();
          // console.log("new service: ", result);
          setServices((prevServices) => [...prevServices, result]);
          // console.log("Added service: ", services);
          toast.success("Service added successfully");
        } else {
          toast.error("Failed to add service");
        }
      }
    } catch (error) {
      toast.error("Failed to perform the desired task");
    } finally {
      reset();
      setCurrentService(null);
      setIsSubmitting(false);
      setSelectedIcon(""); // Reset the selectedIcon state
      refetch(); // Ensure data is refreshed
    }
  };

  const onReset = () => {
    reset();
    setCurrentService(null);
    setSelectedIcon(""); // Reset the selectedIcon state
  };

  const handleEdit = (service) => {
    setCurrentService(service);
    // console.log("oneditClick: ", service);
  };

  const handleDelete = async (id) => {
    // console.log("Deleting service with ID:", id);
    const response = await fetch(`${API_URL}/api/services/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      setServices(services.filter((service) => service._id !== id));
      refetch();
      toast.success("Service deleted successfully");
      // console.log("Service deleted successfully", services);
    } else {
      toast.error("Failed to delete service");
    }
  };

  if (isPending) return <Loading />;

  if (error) return <Error message={error} />;

  return (
    <>
      {/* Service Form Start */}
      <section id="service-form" className="form">
        <div className="container">
          <div className="row">
            <div className="service-container">
              <div className="col-12">
                <h2>Add Services Info!</h2>
              </div>
              <div className="col-12">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="form-container"
                  noValidate
                >
                  <CustomIconDropdown
                    name="icon"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    selectedIcon={selectedIcon} // Pass selectedIcon
                    setSelectedIcon={setSelectedIcon} // Pass setter function // Add this line
                  />
                  <div className="form-group">
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      {...register("title")}
                      placeholder="Title of Service"
                      required
                    />
                  </div>
                  {errors.title && (
                    <p className="error-message">{errors.title.message}</p>
                  )}

                  <div className="form-group">
                    <textarea
                      name="desc"
                      className="form-control"
                      placeholder="Description"
                      {...register("desc")}
                      required
                    ></textarea>
                  </div>
                  {errors.desc && (
                    <p className="error-message">{errors.desc.message}</p>
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
                  </div>
                  {errors.isActive && (
                    <p className="error-message">{errors.isActive.message}</p>
                  )}

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
      {/* Service Form End */}
      <Services
        title="Services"
        subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
        onEdit={handleEdit}
        onDelete={handleDelete}
        services={services}
      />
    </>
  );
};

export default AddServiceForm;
