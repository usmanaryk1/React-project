import Hero from "../../Components/Hero";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import validationSchema from "./HeroValidation";
import { useState, useEffect } from "react";
import useFetch from "../../Components/useFetch";
import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/Error/Error";
import "./HeroForm.css";

const HeroForm = () => {
  const token = localStorage.getItem("token");
  // console.log("Stored Token:", token);

  const [currentHero, setCurrentHero] = useState(null);
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status

  const {
    data: hero,
    setData: setHero,
    isPending,
    error,
  } = useFetch(`${API_URL}/api/hero`);
  // console.log("HeroForm", hero);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      skills: "",
      isActive: false,
    },
  });

  useEffect(() => {
    if (currentHero) {
      setValue("name", currentHero.name);
      setValue("skills", currentHero.skills);
      setValue("isActive", currentHero.isActive);
    } else {
      reset();
    }
  }, [currentHero, setValue, reset]);
  // console.log("currentHero ", currentHero);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const formData = {
      name: data.name,
      skills: data.skills,
      isActive: data.isActive,
    };
    if (currentHero) {
      // Update hero
      // const updatedHero = { ...currentHero, ...formData };
      const response = await fetch(`${API_URL}/api/hero/${currentHero._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        // console.log("Updated hero response:", result);
        setHero((prevHero) => {
          // console.log("Previous Hero:", prevHero);
          return prevHero.map((heroData) =>
            heroData._id === result._id ? result : heroData
          );
        });

        toast.success("Content updated successfully");
      }
    } else {
      // Add new service
      const response = await fetch(`${API_URL}/api/hero`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        // console.log("new hero: ", result);
        setHero((prevHero) => [...prevHero, result]);
        toast.success("Hero added successfully");
      } else {
        toast.error("Failed to add Hero");
      }
    }
    reset();
    setIsSubmitting(false);
    setCurrentHero(null);
  };

  const onReset = () => {
    reset();
    setCurrentHero(null);
  };

  const handleEdit = (heroItem) => {
    setCurrentHero(heroItem);
    // console.log("onedit: ", heroItem);
  };

  const handleDelete = async (id) => {
    // console.log("Deleting service with ID:", id);
    const response = await fetch(`${API_URL}/api/hero/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      setHero((prevHero) => prevHero.filter((heroData) => heroData._id !== id));
      toast.success("Hero section deleted successfully");
      // console.log("Hero section deleted successfully", hero);
    } else {
      console.error("Failed to delete section");
      toast.error("Failed to delete hero section");
    }
  };

  if (isPending) return <Loading />;

  if (error) return <Error message={error} />;

  return (
    <>
      <section id="hero-form" className="hero-form form">
        <div className="container">
          <div className="row">
            <div className="hero-container">
              <div className="col-12">
                <h2>Add Home Info!</h2>
              </div>
              <div className="col-12">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      {...register("name")}
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  {errors.name && (
                    <p className="error-message">{errors.name.message}</p>
                  )}
                  <div className="form-group">
                    <input
                      type="text"
                      name="skills"
                      className="form-control"
                      {...register("skills")}
                      placeholder="Designer, Developer, Freelancer, Photographer"
                      required
                    />
                  </div>
                  {errors.skills && (
                    <p className="error-message">{errors.skills.message}</p>
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
                    <button className="reset" type="button" onClick={onReset}>
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
      <Hero onEditClick={handleEdit} onDeleteClick={handleDelete} hero={hero} />
    </>
  );
};

export default HeroForm;
