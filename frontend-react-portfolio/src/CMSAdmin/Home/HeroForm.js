import Hero from "../../Components/Hero";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import validationSchema from "./HeroValidation";
import { useState, useEffect, useRef } from "react";
import useFetch from "../../Components/useFetch";
import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/Error/Error";
import "./HeroForm.css";
import { uploadImageToFirebase } from "../Util Functions/uploadImageToFirebase";
import { getImageAspectRatio } from "../Util Functions/getImageAspectRatio";

const HeroForm = () => {
  const token = localStorage.getItem("token");
  // console.log("Stored Token:", token);

  const [currentHero, setCurrentHero] = useState(null);
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status
  const imageRef = useRef(null);
  const [base64Image, setBase64Image] = useState("");
  const [isCropping, setIsCropping] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [cropAspectRatio, setCropAspectRatio] = useState(null);

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

  const handleImageClick = () => {
    imageRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const imageDataUrl = URL.createObjectURL(file);
      // console.log("imageDataUrl", imageDataUrl);
      setImageSrc(imageDataUrl); // Set image for cropper
      const aspect = await getImageAspectRatio(imageDataUrl); // Dynamically determine aspect ratio
      // console.log("aspect", aspect);
      setCropAspectRatio(aspect);
      setIsCropping(true); // Open cropper modal
    }
  };

  const handleCropComplete = async (croppedImg) => {
    if (croppedImg) {
      // console.log("croppedImg", croppedImg);
      setCroppedImage(croppedImg); // Use the cropped image directly
      // console.log("cropped image on crop complete", croppedImage);
      setBase64Image(URL.createObjectURL(croppedImg));
      setIsCropping(false);
    } else {
      console.error("Cropped image is not valid");
    }
  };

  useEffect(() => {
    if (currentHero) {
      setValue("name", currentHero.name);
      setValue("skills", currentHero.skills);
      setValue("isActive", currentHero.isActive);
      setBase64Image(currentHero.image);
    } else {
      reset();
    }
  }, [currentHero, setValue, reset]);
  // console.log("currentHero ", currentHero);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    let imageUrl = base64Image;

    if (croppedImage) {
      imageUrl = await uploadImageToFirebase(croppedImage, "projectImages");

      // console.log("imageUrl2", imageUrl);
    }

    const formData = {
      image: imageUrl,
      name: data.name,
      skills: data.skills,
      isActive: data.isActive,
    };

    try {
      const method = currentHero ? "PUT" : "POST";
      const url = currentHero
        ? `${API_URL}/api/hero/${currentHero._id}`
        : `${API_URL}/api/hero`;
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        if (currentHero) {
          setHero((prevHero) => {
            // console.log("Previous Hero:", prevHero);
            return prevHero.map((heroData) =>
              heroData._id === result._id ? result : heroData
            );
          });
          toast.success("Introduction Content Updated Successfully");
        } else {
          setHero([...hero, result]);
          toast.success("Introduction Content Added Successfully");
        }
        // console.log("Updated hero response:", result);
      } else {
        throw new Error("Failed to save Introduction info");
      }
      reset();
      setCurrentHero(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset();
      setIsSubmitting(false);
      setCurrentHero(null);
    }
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
      toast.success("Hero Content Deleted Successfully");
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
                <h2>Add Introduction Info!</h2>
              </div>
              <div className="col-12">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="form-container"
                  noValidate
                >
                  <div className="img-container text-center">
                    <div className="image">
                      <img
                        src={
                          base64Image || "../assets/img/default-work-image.webp"
                        }
                        alt="default"
                        className="img-display-before"
                      />

                      <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={imageRef}
                        style={{ display: "none" }}
                      />
                      {isCropping && (
                        <ImageCropper
                          imageSrc={imageSrc}
                          fileName={fileName}
                          onCropComplete={handleCropComplete}
                          onClose={() => setIsCropping(false)}
                          width={356} // Pass the desired width
                          height={223} // Pass the desired height
                          aspect={cropAspectRatio} // Dynamic aspect ratio
                          cropShape="rect"
                        />
                      )}
                    </div>
                    <label className="my-3 img-btn" onClick={handleImageClick}>
                      Choose Project Image
                    </label>
                  </div>
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
      <Hero
        onEditClick={handleEdit}
        onDeleteClick={handleDelete}
        hero={hero?.[0] || []}
      />
    </>
  );
};

export default HeroForm;
