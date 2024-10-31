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
import Resizer from "react-image-file-resizer"; // Import the image resizer
import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/Error/Error";
import ImageCropper from "../ImageCropper/ImageCropper";

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
  const imageRef = useRef(null);
  const [base64Image, setBase64Image] = useState("");
  const [currentAbout, setCurrentAbout] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status
  const [isCropping, setIsCropping] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  const {
    data: about,
    setData: setAbout,
    isPending,
    error,
    refetch,
  } = useFetch(`${API_URL}/api/about`);

  console.log("about", about);

  useEffect(() => {
    if (currentAbout) {
      setValue("name", currentAbout.name);
      setValue("profile", currentAbout.profile);
      setValue("email", currentAbout.email);
      setValue("phone", currentAbout.phone);
      setValue("desc", currentAbout.desc1);
      setValue("isActive", currentAbout.isActive);
      setBase64Image(currentAbout.img);
    } else {
      reset();
      setBase64Image("");
    }
  }, [currentAbout, setValue, reset]);

  if (isPending) return <Loading />;

  if (error) return <Error message={error} />;

  const handleImageClick = () => imageRef.current.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
      setIsCropping(true);
    }
  };

  const handleCropComplete = async (croppedImg) => {
    if (croppedImg) {
      const resizedImage = await resizeImage(croppedImg);
      setCroppedImage(resizedImage.file);
      setBase64Image(resizedImage.base64);
      setIsCropping(false);
    } else {
      console.error("Cropped image is not valid");
    }
  };

  const resizeImage = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        150,
        150,
        "WEBP",
        70,
        0,
        (uri) => {
          const blob = new Blob([uri], { type: "image/webp" });
          const resizedFile = new File([blob], file.name, {
            type: "image/webp",
          });
          resolve({ base64: uri, file: resizedFile });
        },
        "base64"
      );
    });

  const uploadImageToFirebase = async (croppedImage) => {
    if (!croppedImage) return null;
    const imageRef = ref(storage, `aboutImages/${croppedImage.name + v4()}`);
    await uploadBytes(imageRef, croppedImage);
    return await getDownloadURL(imageRef); // Generate URL for displaying
  };

  const onSubmit = async (formData) => {
    console.log("formdata", formData);
    setIsSubmitting(true);
    console.log("base64Image", base64Image);
    let imageUrl = base64Image;
    console.log("imageUrl", imageUrl);
    if (croppedImage) {
      imageUrl = await uploadImageToFirebase(croppedImage);
      console.log("imageUrl2", imageUrl);
      if (!imageUrl) {
        toast.error("Image upload failed");
        setIsSubmitting(false);
        return;
      }
    }

    const updatedData = {
      ...formData,
      desc: formData.desc,
      img: imageUrl,
    };

    try {
      const method = currentAbout ? "PUT" : "POST";
      const url = currentAbout
        ? `${API_URL}/api/about/${currentAbout._id}`
        : `${API_URL}/api/about`;
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
        if (currentAbout) {
          setAbout(
            about.map((item) => (item._id === result._id ? result : item))
          );
          toast.success("About info updated successfully");
        } else {
          setAbout([...about, result]);
          toast.success("About info added successfully");
        }
        reset();
        setCurrentAbout(null);
      } else {
        throw new Error("Failed to save about info");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
      setBase64Image("");
    }
  };
  const onReset = () => {
    reset();
    setCurrentAbout(null);
    setBase64Image("");
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
                    <div className="image">
                      <img
                        src={base64Image || "../assets/img/default-image.jpg"}
                        alt="Profile"
                        className="img-display-before"
                        onClick={handleImageClick}
                      />

                      <input
                        type="file"
                        ref={imageRef}
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                      {isCropping && (
                        <ImageCropper
                          imageSrc={imageSrc}
                          onCropComplete={handleCropComplete}
                          onClose={() => setIsCropping(false)}
                        />
                      )}
                      {/* {croppedImage && (
                        <img
                          src={URL.createObjectURL(croppedImage)}
                          alt="Cropped"
                        />
                      )} */}
                    </div>
                    <label className="my-3">
                      <b>Choose Profile Image</b>
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
