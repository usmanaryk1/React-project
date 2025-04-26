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
import ImageCropper from "../ImageCropper/ImageCropper";

const HeroForm = () => {
  const token = localStorage.getItem("token");
  // console.log("Stored Token:", token);

  const [currentPersonalSkills, setCurrentPersonalSkills] = useState(null);
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
    data: personalSkills,
    setData: setPersonalSkills,
    isPending,
    error,
    refetch,
  } = useFetch(`${API_URL}/api/personalSkills`);
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
    if (currentPersonalSkills) {
      setValue("name", currentPersonalSkills.name);
      setValue("skills", currentPersonalSkills.skills);
      setValue("isActive", currentPersonalSkills.isActive);
      setBase64Image(currentPersonalSkills.image);
    } else {
      reset();
    }
  }, [currentPersonalSkills, setValue, reset]);
  // console.log("currentPersonalSkills ", currentPersonalSkills);

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
      const method = currentPersonalSkills ? "PUT" : "POST";
      const url = currentPersonalSkills
        ? `${API_URL}/api/personalSkills/${currentPersonalSkills._id}`
        : `${API_URL}/api/personalSkills`;
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
        if (currentPersonalSkills) {
          setPersonalSkills((prevSkills) => {
            // console.log("Previous Hero:", prevHero);
            return prevSkills.map((skillsData) =>
              skillsData._id === result._id ? result : skillsData
            );
          });
          toast.success("Introduction Content Updated Successfully");
        } else {
          setPersonalSkills([...personalSkills, result]);
          toast.success("Introduction Content Added Successfully");
        }
        refetch();
        reset();
        setCurrentPersonalSkills(null);
        // console.log("Updated hero response:", result);
      } else {
        throw new Error("Failed to save Introduction info");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset();
      setIsSubmitting(false);
      setCurrentPersonalSkills(null);
    }
  };

  const onReset = () => {
    reset();
    setCurrentPersonalSkills(null);
  };

  const handleEdit = (heroItem) => {
    setCurrentPersonalSkills(heroItem);
    // console.log("onedit: ", heroItem);
  };

  const handleDelete = async (id) => {
    // console.log("Deleting service with ID:", id);
    const response = await fetch(`${API_URL}/api/personalSkills/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      setPersonalSkills((prevSkills) =>
        prevSkills.filter((skillsData) => skillsData._id !== id)
      );
      toast.success("Introduction Content Deleted Successfully");
      // console.log("Introduction section deleted successfully", personalSkills);
    } else {
      console.error("Failed to delete section");
      toast.error("Failed to delete introduction section");
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
        personalSkills={personalSkills?.[0] || []}
      />
    </>
  );
};

export default HeroForm;
