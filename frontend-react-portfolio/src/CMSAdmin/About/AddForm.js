import { useRef, useState, useEffect } from "react";
import About from "../../Components/About";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import validationSchema from "./AboutValidation";
import useFetch from "../../Components/useFetch";
import { storage } from "../../firebaseConfig"; // Import Firebase storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const AddForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      profile: "",
      email: "",
      phone: "",
      desc: "",
      isActive: false,
    },
  });

  const token = localStorage.getItem("token");
  const [image, setImage] = useState(null);
  const imageRef = useRef(null);
  const [base64Image, setBase64Image] = useState("");
  const [currentAbout, setCurrentAbout] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status

  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  const {
    data: about,
    setData: setAbout,
    refetch,
  } = useFetch(`${API_URL}/api/about`);

  // console.log("about:", about);
  useEffect(() => {
    if (currentAbout) {
      setValue("name", currentAbout.name);
      setValue("profile", currentAbout.profile);
      setValue("email", currentAbout.email);
      setValue("phone", currentAbout.phone);
      setValue("desc", currentAbout.desc1);
      setValue("isActive", currentAbout.isActive);
      setBase64Image(currentAbout.img);
      setImage(null);
    } else {
      reset();
      setBase64Image("");
    }
  }, [currentAbout, setValue, reset]);

  const acceptedFileTypes =
    "image/x-png, image/png, image/jpg, image/webp, image/jpeg";

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBase64Image(base64);
    // console.log("base64", base64);
    setImage(file);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader(file);
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImageClick = () => {
    document.getElementById("file-input").click();
  };

  const uploadImageToFirebase = async (imageFile) => {
    if (!imageFile) return null;

    const imageRef = ref(storage, `aboutImages/${imageFile.name + v4()}`);
    await uploadBytes(imageRef, imageFile);
    // Complete the upload
    setIsSubmitting(true);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  };

  const onSubmit = async (formObject) => {
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
      profile: formObject.profile,
      email: formObject.email,
      phone: formObject.phone,
      desc1: formObject.desc, // Assuming all desc is in one textarea
      img: imageUrl,
      isActive: formObject.isActive,
    };
    // console.log("imageUrl", imageUrl);

    if (currentAbout) {
      const response = await fetch(`${API_URL}/api/about/${currentAbout._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const result = await response.json();
      setAbout(about.map((item) => (item._id === result._id ? result : item)));
      // console.log("About info updated successfully", about);
      toast.success("About info updated successfully");
    } else {
      const response = await fetch(`${API_URL}/api/about`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        const result = await response.json();
        setAbout((prevAboutList) => [...prevAboutList, result]);

        // console.log("About info added successfully", about);
        toast.success("About info added successfully");
      } else {
        toast.error("Failed to add about info");
      }
    }

    reset();
    setImage(null);
    setBase64Image("");
    setIsSubmitting(false);
    setCurrentAbout(null);
  };

  const onReset = () => {
    reset();
    setImage(null);
    setBase64Image("");
    setIsSubmitting(false);
    setCurrentAbout(null); // Clear the image state
  };

  const handleEdit = (about) => {
    setCurrentAbout(about);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${API_URL}/api/about/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      setAbout(about.filter((item) => item._id !== id));
      refetch();
      toast.success("About info deleted successfully");
      // console.log("About info deleted successfully", about);
    } else {
      toast.error("Failed to delete about info");
    }
  };

  return (
    <>
      <section id="about-form" className="form">
        <div className="container">
          <div className="row">
            <div className="add-container">
              <div className="col-12">
                <h2>Add About Info!</h2>
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
                      <b>Choose Profile Image</b>
                    </label>
                  </div>
                  {errors.file && (
                    <p className="error-message">{errors.file.message}</p>
                  )}
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
                      name="profile"
                      className="form-control"
                      {...register("profile")}
                      placeholder="Occupation"
                      required
                    />
                  </div>
                  {errors.profile && (
                    <p className="error-message">{errors.profile.message}</p>
                  )}

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      {...register("email")}
                      placeholder="Email"
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="error-message">{errors.email.message}</p>
                  )}

                  <div className="form-group">
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      {...register("phone")}
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                  {errors.phone && (
                    <p className="error-message">{errors.phone.message}</p>
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
      <About
        onEditClick={handleEdit}
        onDeleteClick={handleDelete}
        about={about}
      />
    </>
  );
};

export default AddForm;
