import Portfolio from "../../Components/Portfolio";
import { useRef, useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import validationSchema from "./PortfolioValidation";
import useFetch from "../../Components/useFetch";
import { v4 } from "uuid";
import { storage } from "../../firebaseConfig"; // Import Firebase storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Resizer from "react-image-file-resizer"; // Import the image resizer
import Error from "../../Components/Error/Error";
import Loading from "../../Components/Loading/Loading";

const AddPortfolioForm = () => {
  const [currentPortfolio, setCurrentPortfolio] = useState(null);
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  const {
    data: works,
    setData: setWorks,
    refetch,
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
  const token = localStorage.getItem("token");
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
        356,
        223,
        "WEBP",
        50, // Adjust quality to manage file size
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
    if (currentPortfolio) {
      setValue("title", currentPortfolio.wTitle);
      setValue("link", currentPortfolio.pURL);
      setValue("category", currentPortfolio.wCategory);
      setValue("date", formatDate(currentPortfolio.wDate));
      setValue("isActive", currentPortfolio.isActive);
      setBase64Image(currentPortfolio.workImage);
      setImage(null); // or set to a placeholder if needed
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

  const uploadImageToFirebase = async (imageFile) => {
    if (!imageFile) return null;

    const imageRef = ref(storage, `projectImages/${imageFile.name + v4()}`);
    await uploadBytes(imageRef, imageFile);
    // Complete the upload
    setIsSubmitting(true);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  };
  const onSubmit = async (formObject, e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let imageUrl = base64Image;

    try {
      if (image) {
        imageUrl = await uploadImageToFirebase(image);
      }

      const updatedData = {
        wTitle: formObject.title,
        pURL: formObject.link,
        wCategory: formObject.category,
        wDate: formObject.date,
        workImage: imageUrl,
        isActive: formObject.isActive,
      };

      // console.log("imageUrl", imageUrl);

      if (currentPortfolio) {
        const response = await fetch(
          `${API_URL}/api/works/${currentPortfolio._id}`,
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
        setWorks(
          works.map((portfolio) =>
            portfolio._id === result._id ? result : portfolio
          )
        );
        toast.success("Portfolio updated successfully");
      } else {
        // Add new work card with a null workDetailsId initially
        const response = await fetch(`${API_URL}/api/works`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
        if (response.ok) {
          const result = await response.json();
          setWorks((prevPortfolioList) => [...prevPortfolioList, result]);
          toast.success("Portfolio added successfully");
        } else {
          toast.error("Failed to add Portfolio info");
        }
      }

      reset();
      refetch();
      setImage(null);
      setBase64Image("");
      setCurrentPortfolio(null);
      setIsSubmitting(false);
    } catch (error) {
      toast.error("Failed to upload images or submit the form");
      console.error("Error submitting the form:", error);
    }
  };

  const onReset = (e) => {
    reset();
    setImage(null);
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
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="img-container text-center">
                    <div className="image" onClick={handleImageClick}>
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt=""
                          className="img-display-before"
                        />
                      ) : (
                        <img
                          src={
                            base64Image ||
                            "../assets/img/default-work-image.webp"
                          }
                          alt="default"
                          className="img-display-before"
                        />
                      )}
                      <input
                        type="file"
                        name="file"
                        id="file-input"
                        {...register("file")}
                        multiple={false}
                        accept={acceptedFileTypes}
                        onChange={handleImageChange}
                        ref={imageRef}
                        style={{ display: "none" }}
                        required
                      />
                    </div>
                    <label className="my-3">
                      <b>Choose Project Image</b>
                    </label>
                    {errors.file && (
                      <p className="error-message">{errors.file.message}</p>
                    )}
                  </div>

                  <div className="from-group">
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      {...register("title")}
                      placeholder="Add title of Project"
                      required
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
                      required
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
                      required
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
                      required
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
