import Certifications from "../../Components/Certifications";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./CertificationValidation";
import { toast } from "react-toastify";
import useFetch from "../../Components/useFetch";
import Error from "../../Components/Error/Error";
import Loading from "../../Components/Loading/Loading";
import "./AddCertification.css";
import ImageCropper from "../ImageCropper/ImageCropper";
import { uploadImageToFirebase } from "../Util Functions/uploadImageToFirebase";
import { getImageAspectRatio } from "../Util Functions/getImageAspectRatio";
import { Redirect } from "react-router-dom/cjs/react-router-dom";

const AddCertificationForm = () => {
  const [currentCertifications, setCurrentCertifications] = useState(null);
  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  const {
    data: certifications,
    setData: setCertifications,
    isPending,
    error,
    refetch,
  } = useFetch(`${API_URL}/api/certifications`);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      name: "",
      time: "",
      isActive: false,
    },
  });

  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const [base64Image1, setBase64Image1] = useState("");
  const [base64Image2, setBase64Image2] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status
  const [isCropping1, setIsCropping1] = useState(false);
  const [isCropping2, setIsCropping2] = useState(false);
  const [imageSrc1, setImageSrc1] = useState(null);
  const [imageSrc2, setImageSrc2] = useState(null);
  const [croppedImage1, setCroppedImage1] = useState(null);
  const [croppedImage2, setCroppedImage2] = useState(null);
  const [fileName1, setFileName1] = useState("");
  const [fileName2, setFileName2] = useState("");
  const [cropAspectRatio, setCropAspectRatio] = useState(null);

  useEffect(() => {
    if (!token) {
      toast.error("Please log in to continue.");
      // Redirect logic here, e.g., window.location.href = "/login";
      Redirect("/form/login-form");
    }
  }, [token]);

  const handleImageClick = (inputId) => {
    document.getElementById(inputId).click();
  };

  const handleImage1Change = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName1(file.name);
      const imageDataUrl = URL.createObjectURL(file);
      // console.log("imageDataUrl", imageDataUrl);
      setImageSrc1(imageDataUrl); // Set image for cropper
      const aspect = await getImageAspectRatio(imageDataUrl); // Dynamically determine aspect ratio
      // console.log("aspect", aspect);
      setCropAspectRatio(aspect);
      setIsCropping1(true); // Open cropper modal
    }
  };

  useEffect(() => {
    if (imageSrc1) return () => URL.revokeObjectURL(imageSrc1);
  }, [imageSrc1]);

  const handleImage2Change = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName2(file.name);
      const imageDataUrl = URL.createObjectURL(file);
      // console.log("imageDataUrl", imageDataUrl);
      setImageSrc2(imageDataUrl); // Set image for cropper
      setIsCropping2(true); // Open cropper modal
    }
  };
  useEffect(() => {
    if (imageSrc2) return () => URL.revokeObjectURL(imageSrc2);
  }, [imageSrc2]);
  const handleCropComplete1 = async (croppedImg) => {
    if (croppedImg) {
      // console.log("croppedImg1", croppedImg);
      setCroppedImage1(croppedImg); // Use the cropped image directly
      // console.log("cropped image1 on crop complete", croppedImage1);
      setBase64Image1(URL.createObjectURL(croppedImg));
      setIsCropping1(false);
    } else {
      console.error("Cropped image is not valid");
    }
  };

  const handleCropComplete2 = async (croppedImg) => {
    if (croppedImg) {
      // console.log("croppedImg2", croppedImg);
      setCroppedImage2(croppedImg); // Use the cropped image directly
      // console.log("cropped image2 on crop complete", croppedImage2);
      setBase64Image2(URL.createObjectURL(croppedImg));
      setIsCropping2(false);
    } else {
      console.error("Cropped image is not valid");
    }
  };

  useEffect(() => {
    if (currentCertifications) {
      setValue("title", currentCertifications.cardTitle);
      setValue("description", currentCertifications.cardDescription);
      setValue("category", currentCertifications.cardCategory);
      setValue("name", currentCertifications.authorName);
      setValue("time", currentCertifications.postDate);
      setValue("isActive", currentCertifications.isActive);
      setBase64Image1(currentCertifications.image);
      setBase64Image2(currentCertifications.authorImage);
    } else {
      reset();
    }
  }, [currentCertifications, setValue, reset]);

  const onSubmit = async (formData) => {
    // console.log("formdata", formData);
    // console.log("croppedImage1 in submit", croppedImage1);
    // console.log("croppedImage2 in submit", croppedImage2);
    setIsSubmitting(true);
    // console.log("base64Image1", base64Image1);
    // console.log("base64Image2", base64Image2);

    let imageUrl1 = base64Image1 || "";
    let imageUrl2 = base64Image2 || "";
    // console.log("imageUrl1", imageUrl1);
    // console.log("imageUrl2", imageUrl2);
    // console.log("Certification Data:", formObject);

    if (croppedImage1) {
      imageUrl1 = await uploadImageToFirebase(
        croppedImage1,
        "certificationImages"
      );

      // console.log("imageUrl1", imageUrl1);
    }
    if (croppedImage2) {
      imageUrl2 = await uploadImageToFirebase(
        croppedImage2,
        "certificationImages"
      );

      // console.log("imageUrl2", imageUrl2);
    }
    if (!imageUrl1 || !imageUrl2) {
      toast.error("Failed to upload images. Please try again.");
      setIsSubmitting(false);
      return;
    }

    const updatedData = {
      cardTitle: formData.title,
      cardCategory: formData.category,
      cardDescription: formData.description,
      postDate: formData.time,
      authorName: formData.name,
      image: imageUrl1,
      authorImage: imageUrl2,
      isActive: formData.isActive,
    };

    // console.log("imageUrl1", imageUrl1);
    // console.log("imageUrl2", imageUrl2);

    try {
      const method = currentCertifications ? "PUT" : "POST";
      const url = currentCertifications
        ? `${API_URL}/api/certifications/${currentCertifications._id}`
        : `${API_URL}/api/certifications`;
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
        if (currentCertifications) {
          setCertifications(
            certifications.map((certification) =>
              certification._id === result._id ? result : certification
            )
          );
          toast.success("Certification Updated Successfully");
        } else {
          setCertifications((prevCertificationList) => [
            ...prevCertificationList,
            result,
          ]);
          toast.success("Certification Added Successfully");
        }
        reset();
        setCurrentCertifications(null);
      } else {
        throw new Error("Failed to save certification info");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
      setBase64Image1("");
      setBase64Image2("");
      setCroppedImage1(null);
      setCroppedImage2(null);
    }
  };

  const onReset = () => {
    reset();
    setBase64Image1("");
    setBase64Image2("");
    setCurrentCertifications(null);
    setCroppedImage1(null);
    setCroppedImage2(null);
  };

  const handleEdit = (certification) => {
    setCurrentCertifications(certification);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/certifications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setCertifications(
          certifications.filter((certification) => certification._id !== id)
        );
        refetch();
        // console.log("Deleted certification:", certifications);
        toast.success("Certificate deleted successfully");
      } else {
        toast.error("Failed to delete Certificate");
      }
    } catch (error) {
      console.error("Error deleting Certificate:", error);
    }
  };

  if (isPending) return <Loading />;

  if (error) return <Error message={error} />;

  return (
    <>
      {/* Certification Form Start */}
      <section id="certification-form" className="certification-form form">
        <div className="container">
          <div className="row">
            <div className="certification-container">
              <div className="col-12">
                <h2>Add Certifications Info!</h2>
              </div>
              <div className="col-12">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="form-container p-0"
                >
                  <div className="img-container row justify-content-center">
                    <div className="image col-12 col-sm-6 text-center mb-4">
                      <div>
                        <img
                          src={
                            base64Image1 ||
                            "../assets/img/default-work-image.webp"
                          }
                          alt="default"
                          className="img-display mx-auto"
                        />

                        <input
                          type="file"
                          name="file1"
                          id="file-input1"
                          accept="image/*"
                          onChange={handleImage1Change}
                          ref={image1Ref}
                          style={{ display: "none" }}
                        />
                        {isCropping1 && (
                          <ImageCropper
                            imageSrc={imageSrc1}
                            fileName={fileName1}
                            onCropComplete={handleCropComplete1}
                            onClose={() => setIsCropping1(false)}
                            width={354} // Pass the desired width
                            height={236} // Pass the desired height
                            aspect={cropAspectRatio} // Dynamic aspect ratio
                            cropShape="rect"
                          />
                        )}
                      </div>
                      <label
                        className="my-3 img-btn"
                        onClick={() => handleImageClick("file-input1")}
                      >
                        Select Certification
                      </label>
                    </div>
                    <div className="image col-12 col-sm-6 text-center mb-4">
                      <div>
                        <img
                          src={
                            base64Image2 || "../assets/img/default-image.jpg"
                          }
                          alt="default"
                          className="profile"
                        />

                        <input
                          type="file"
                          name="file2"
                          id="file-input2"
                          accept="image/*"
                          onChange={handleImage2Change}
                          ref={image2Ref}
                          style={{ display: "none" }}
                        />
                        {isCropping2 && (
                          <ImageCropper
                            imageSrc={imageSrc2}
                            fileName={fileName2}
                            onCropComplete={handleCropComplete2}
                            onClose={() => setIsCropping2(false)}
                            width={32} // Pass the desired width
                            height={32} // Pass the desired height
                            cropShape="round"
                          />
                        )}
                      </div>
                      <label
                        className="mx-auto img-btn my-3"
                        onClick={() => handleImageClick("file-input2")}
                      >
                        Choose Profile Image
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      {...register("title")}
                      placeholder="Tille of Certificate"
                    />
                  </div>
                  {errors.title && (
                    <p className="error-message">{errors.title.message}</p>
                  )}

                  <div className="form-group">
                    <input
                      type="text"
                      name="category"
                      className="form-control"
                      {...register("category")}
                      placeholder="Category of Certificate"
                    />
                  </div>
                  {errors.category && (
                    <p className="error-message">{errors.category.message}</p>
                  )}

                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      {...register("name")}
                      placeholder="Your Name"
                    />
                  </div>
                  {errors.name && (
                    <p className="error-message">{errors.name.message}</p>
                  )}

                  <div className="form-group">
                    <input
                      type="text"
                      name="time"
                      id="time"
                      className="form-control"
                      placeholder="Duration (6 months)"
                      {...register("time")}
                    />
                  </div>
                  {errors.time && (
                    <p className="error-message">{errors.time.message}</p>
                  )}

                  <div className="form-group">
                    <textarea
                      name="description"
                      className="form-control"
                      {...register("description")}
                      placeholder="Description"
                    ></textarea>
                  </div>
                  {errors.description && (
                    <p className="error-message">
                      {errors.description.message}
                    </p>
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
                    {errors.isActive && (
                      <p className="error-message">{errors.isActive.message}</p>
                    )}
                  </div>

                  <div className="buttons d-flex">
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
      {/* Certification Form End */}
      <Certifications
        title="Certifications"
        subtitle="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
        onEditClick={handleEdit}
        onDeleteClick={handleDelete}
        certifications={certifications}
      />
    </>
  );
};

export default AddCertificationForm;
