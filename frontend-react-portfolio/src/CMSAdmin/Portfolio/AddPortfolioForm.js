import Portfolio from "../../Components/Portfolio";
import { useRef, useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import validationSchema from "./PortfolioValidation";
import useFetch from "../../Components/useFetch";
import Error from "../../Components/Error/Error";
import Loading from "../../Components/Loading/Loading";
import "./PortfolioForm.css";
import ImageCropper from "../ImageCropper/ImageCropper";
import { uploadImageToFirebase } from "../Util Functions/uploadImageToFirebase";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import { getImageAspectRatio } from "../Util Functions/getImageAspectRatio";

const AddPortfolioForm = () => {
  const token = localStorage.getItem("token");
  const [currentPortfolio, setCurrentPortfolio] = useState(null);
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  const {
    data: works,
    setData: setWorks,
    isPending,
    error,
  } = useFetch(`${API_URL}/api/works`);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      link: "",
      category: "",
      date: "",
      workDetailsId: null,
      isActive: false,
    },
  });

  const imageRef = useRef(null);
  const [base64Image, setBase64Image] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status
  const [isCropping, setIsCropping] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [cropAspectRatio, setCropAspectRatio] = useState(null);

  useEffect(() => {
    if (!token) {
      toast.error("Please log in to continue.");
      // Redirect logic here, e.g., window.location.href = "/login";
      Redirect("/form/login-form");
    }
  }, [token]);

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
    if (currentPortfolio) {
      setValue("title", currentPortfolio.wTitle);
      setValue("link", currentPortfolio.pURL);
      setValue("category", currentPortfolio.wCategory);
      setValue("date", formatDate(currentPortfolio.wDate));
      setValue("isActive", currentPortfolio.isActive);
      setBase64Image(currentPortfolio.workImage);
    } else {
      reset();
    }
  }, [currentPortfolio, setValue, reset]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}-${day}-${year}`;
  };

  const onSubmit = async (formData) => {
    // console.log("formdata", formData);
    // console.log("croppedImage in submit", croppedImage);

    setIsSubmitting(true);

    // console.log("base64Image", base64Image);

    let imageUrl = base64Image;

    // console.log("imageUrl", imageUrl);

    if (croppedImage) {
      imageUrl = await uploadImageToFirebase(croppedImage, "projectImages");

      // console.log("imageUrl2", imageUrl);
    }

    const updatedData = {
      wTitle: formData.title,
      pURL: formData.link,
      wCategory: formData.category,
      wDate: formData.date,
      workImage: imageUrl,
      isActive: formData.isActive,
    };

    try {
      const method = currentPortfolio ? "PUT" : "POST";
      const url = currentPortfolio
        ? `${API_URL}/api/works/${currentPortfolio._id}`
        : `${API_URL}/api/works`;
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const result = await response.json();
        if (currentPortfolio) {
          setWorks(
            works.map((project) =>
              project._id === result._id ? result : project
            )
          );
          toast.success("Project Updated Successfully");
        } else {
          setWorks([...works, result]);
          toast.success("Project Added Successfully");
        }
        reset();
        setCurrentPortfolio(null);
      } else {
        throw new Error("Failed to save project info");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
      setBase64Image("");
      setCroppedImage(null);
    }
  };

  const onReset = (e) => {
    reset();
    setBase64Image("");
    setCurrentPortfolio(null);
  };

  const handleEdit = (portfolio) => {
    setCurrentPortfolio(portfolio);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/works/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setWorks(works.filter((portfolio) => portfolio._id !== id));
        toast.success("Portfolio deleted successfully");
      } else {
        toast.error("Failed to delete portfolio");
      }
    } catch (error) {
      console.error("Error deleting portfolio:", error);
    }
  };

  if (isPending) return <Loading />;

  if (error) return <Error message={error} />;

  return (
    <>
      <section id="portfolio-form" className="form">
        <div className="container">
          <div className="row">
            <div className="portfolio-container">
              <div className="col-12">
                <h2>Add Portfolio Info!</h2>
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

                  <div className="from-group">
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      {...register("title")}
                      placeholder="Add title of Project"
                    />
                  </div>
                  {errors.title && (
                    <p className="error-message">{errors.title.message}</p>
                  )}

                  <div className="from-group">
                    <input
                      type="text"
                      name="link"
                      className="form-control"
                      {...register("link")}
                      placeholder="Share Link of Project"
                    />
                  </div>
                  {errors.link && (
                    <p className="error-message">{errors.link.message}</p>
                  )}

                  <div className="from-group">
                    <input
                      type="text"
                      name="category"
                      className="form-control"
                      {...register("category")}
                      placeholder="Add the category of Project"
                    />
                  </div>
                  {errors.category && (
                    <p className="error-message">{errors.category.message}</p>
                  )}

                  <div className="from-group">
                    <input
                      type="date"
                      name="date"
                      className="form-control"
                      {...register("date")}
                    />
                  </div>
                  {errors.date && (
                    <p className="error-message">{errors.date.message}</p>
                  )}

                  <div className="isActive">
                    <input
                      type="checkbox"
                      id="active"
                      name="isActive"
                      {...register("isActive")}
                      className="mx-2"
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
      <Portfolio
        title="Portfolio"
        subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
        onEdit={handleEdit}
        onDelete={handleDelete}
        works={works}
      />
    </>
  );
};

export default AddPortfolioForm;
