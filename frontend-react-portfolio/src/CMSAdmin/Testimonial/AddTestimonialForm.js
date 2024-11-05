import { useRef, useState, useEffect } from "react";
import Testimonial from "../../Components/Testimonial";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./TestimonialValidation";
import useFetch from "../../Components/useFetch";
import { v4 } from "uuid";
import { storage } from "../../firebaseConfig"; // Import Firebase storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Error from "../../Components/Error/Error";
import Loading from "../../Components/Loading/Loading";
import "./TestimonialForm.css";
import ImageCropper from "../ImageCropper/ImageCropper";

const AddTestimonialForm = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(null);
  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  const {
    data: testimonials,
    setData: setTestimonials,
    isPending,
    error,
  } = useFetch(`${API_URL}/api/testimonials`);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      file: "",
      name: "",
      desc: "",
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

  const handleImageClick = () => {
    imageRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    // console.log("filename", file.name);
    setFileName(file.name);
    // console.log("file name:", fileName);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result); // Display the original image format for cropping
        // console.log("imageSrc", reader.result);
        setFileName(file.name); // Keep the original file name and format
        setIsCropping(true); // Open the cropping modal
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
      reader.readAsDataURL(file);
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
    if (currentTestimonial) {
      setValue("name", currentTestimonial.name);
      setValue("desc", currentTestimonial.description);
      setValue("isActive", currentTestimonial.isActive);
      setBase64Image(currentTestimonial.img);
    } else {
      reset();
    }
  }, [currentTestimonial, setValue, reset]);

  const uploadImageToFirebase = async (croppedImage) => {
    if (!croppedImage) return null;

    // console.log("croppedImage.name", croppedImage.name);

    const imageRef = ref(storage, `testimonialImages/${fileName + v4()}`);

    try {
      await uploadBytes(imageRef, croppedImage);
      // console.log("Image uploaded successfully:", croppedImage.name);
      const downloadURL = await getDownloadURL(imageRef);
      // console.log("Download URL:", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  // console.log("currentTestimonial:", currentTestimonial);

  const onSubmit = async (formData) => {
    // console.log("formdata", formData);
    // console.log("croppedImage in submit", croppedImage);

    setIsSubmitting(true);

    // console.log("base64Image", base64Image);

    let imageUrl = base64Image;

    // console.log("imageUrl", imageUrl);

    if (croppedImage) {
      imageUrl = await uploadImageToFirebase(croppedImage);

      // console.log("imageUrl2", imageUrl);

      if (!imageUrl) {
        toast.error("Image upload failed");

        setIsSubmitting(false);

        return;
      }
    } else {
      toast.error("Please crop the image before submitting.");
      setIsSubmitting(false);
      return;
    }

    const updatedData = {
      name: formData.name,
      description: formData.desc, // Assuming all desc is in one textarea
      img: imageUrl,
      isActive: formData.isActive,
    };

    try {
      const method = currentTestimonial ? "PUT" : "POST";
      const url = currentTestimonial
        ? `${API_URL}/api/testimonials/${currentTestimonial._id}`
        : `${API_URL}/api/testimonials`;
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
        if (currentTestimonial) {
          setTestimonials(
            testimonials.map((testimonial) =>
              testimonial._id === result._id ? result : testimonial
            )
          );
          toast.success("Testimonial Updated Successfully");
        } else {
          setTestimonials([...testimonials, result]);
          toast.success("Testimonial Added Successfully");
        }
        reset();
        setCurrentTestimonial(null);
      } else {
        throw new Error("Failed to save testimonial info");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
      setBase64Image("");
      setCroppedImage(null);
    }
  };

  const onReset = () => {
    reset();
    setBase64Image("");
    setCurrentTestimonial(null);
    setCroppedImage(null);
  };

  const handleEdit = (testimonial) => {
    setCurrentTestimonial(testimonial);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/testimonials/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setTestimonials(
          testimonials.filter((testimonial) => testimonial._id !== id)
        );
        // console.log("Deleted testimonial: ", testimonials);
        toast.success("Testimonial deleted successfully");
      } else {
        toast.error("Failed to delete testimonial");
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };
  if (isPending) return <Loading />;

  if (error) return <Error message={error} />;

  return (
    <>
      {/* Testimonial Form Start */}
      <section id="testimonial-form" className="form">
        <div className="container">
          <div className="row">
            <div className="testimonial-container">
              <div className="col-12">
                <h2>Add Testimonial Info!</h2>
              </div>
              <div className="col-12">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="img-container text-center">
                    <div className="image">
                      <img
                        src={base64Image || "../assets/img/default-image.jpg"}
                        alt="default"
                        className="img-display"
                      />

                      <input
                        type="file"
                        name="file"
                        id="file-input"
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
                          width={150} // Pass the desired width
                          height={150} // Pass the desired height
                          cropShape="round"
                        />
                      )}
                    </div>
                    <label className="my-3 img-btn" onClick={handleImageClick}>
                      Choose Client Image
                    </label>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      {...register("name")}
                      placeholder="Client Name"
                      required
                    />
                  </div>
                  {errors.name && (
                    <p className="error-message">{errors.name.message}</p>
                  )}

                  <div className="form-group">
                    <textarea
                      name="desc"
                      className="form-control"
                      {...register("desc")}
                      placeholder="Description"
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
                      {...register("isActive")}
                      name="isActive"
                      className="mx-2"
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
      {/* Testimonial Form End */}
      <Testimonial
        onEditClick={handleEdit}
        onDeleteClick={handleDelete}
        testimonials={testimonials}
      />
    </>
  );
};

export default AddTestimonialForm;
