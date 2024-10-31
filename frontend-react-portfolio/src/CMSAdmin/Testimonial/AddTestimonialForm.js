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
import Resizer from "react-image-file-resizer"; // Import the image resizer
import Error from "../../Components/Error/Error";
import Loading from "../../Components/Loading/Loading";
import "./TestimonialForm.css";

const AddTestimonialForm = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(null);
  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  const {
    data: testimonials,
    setData: setTestimonials,
    refetch,
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

  const [image, setImage] = useState(null);
  const imageRef = useRef(null);
  const [base64Image, setBase64Image] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status

  const acceptedFileTypes =
    "image/x-png, image/png, image/jpg, image/webp, image/jpeg";

  const handleImageClick = () => {
    document.getElementById("file-input").click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const resizedImage = await resizeImage(file);
    setBase64Image(resizedImage.base64);
    // console.log("base64", base64);
    setImage(resizedImage.file);
  };
  const resizeImage = (file) => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        150,
        150,
        "WEBP",
        70, // Adjust quality to manage file size
        0,
        async (uri) => {
          const blob = await fetch(uri).then((r) => r.blob());
          const resizedFile = new File([blob], file.name, {
            type: "image/webp",
          });
          resolve({ base64: uri, file: resizedFile });
        },
        "base64"
      );
    });
  };

  useEffect(() => {
    if (currentTestimonial) {
      setValue("name", currentTestimonial.name);
      setValue("desc", currentTestimonial.description);
      setValue("isActive", currentTestimonial.isActive);
      setBase64Image(currentTestimonial.img);
      setImage(null); // or set to a placeholder if needed
    } else {
      reset();
    }
  }, [currentTestimonial, setValue, reset]);

  const uploadImageToFirebase = async (imageFile) => {
    if (!imageFile) return null;

    const imageRef = ref(storage, `testimonialImages/${imageFile.name + v4()}`);
    await uploadBytes(imageRef, imageFile);
    // Complete the upload
    setIsSubmitting(true);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  };

  // console.log("currentTestimonial:", currentTestimonial);
  const onSubmit = async (formObject, e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let imageUrl = base64Image;

    // If a new image is selected, upload it to Firebase Storage
    if (image) {
      try {
        imageUrl = await uploadImageToFirebase(image);
      } catch (error) {
        console.error("Error uploading image to Firebase:", error);
        toast.error("Failed to upload image");
        return;
      }
    }

    const updatedData = {
      name: formObject.name,
      description: formObject.desc, // Assuming all desc is in one textarea
      img: imageUrl,
      isActive: formObject.isActive,
    };
    // console.log("imageUrl", imageUrl);

    if (currentTestimonial) {
      const response = await fetch(
        `${API_URL}/api/testimonials/${currentTestimonial._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      const result = await response.json();
      // console.log("Updated testimonial response: ", result);
      setTestimonials(
        testimonials.map((testimonial) =>
          testimonial._id === result._id ? result : testimonial
        )
      );
      // console.log("Updated testimonial: ", testimonials);
      toast.success("Testimonial updated successfully");
    } else {
      const response = await fetch(`${API_URL}/api/testimonials`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        const result = await response.json();
        // console.log("Added testimonial response: ", result);
        setTestimonials((prevTestimonialList) => [
          ...prevTestimonialList,
          result,
        ]);
        // console.log("Added testimonial: ", testimonials);
        toast.success("Testimonial added successfully");
      } else {
        toast.error("Failed to add testimonial info");
      }
    }

    reset();
    setImage(null);
    setBase64Image("");
    setIsSubmitting(false);
    setCurrentTestimonial(null);
    refetch();
  };

  const onReset = (e) => {
    reset();
    setImage(null);
    setBase64Image("");
    setCurrentTestimonial(null);
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
                    <div className="image" onClick={handleImageClick}>
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt=""
                          className="img-display-after"
                        />
                      ) : (
                        <img
                          src={base64Image || "../assets/img/default-image.jpg"}
                          alt="default"
                          className="img-display-before"
                        />
                      )}
                      <input
                        type="file"
                        name="file"
                        id="file-input"
                        {...register("file")}
                        accept={acceptedFileTypes}
                        multiple={false}
                        onChange={handleImageChange}
                        ref={imageRef}
                        style={{ display: "none" }}
                      />
                    </div>
                    <label className="my-3">
                      <b>Choose Client Image</b>
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
