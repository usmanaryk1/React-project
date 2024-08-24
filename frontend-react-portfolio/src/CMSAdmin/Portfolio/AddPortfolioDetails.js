import { useRef } from "react";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import validationSchema from "./PortfolioDetailsValidation";
import PortfolioDetails from "../../Components/PortfolioDetails";
import useFetch from "../../Components/useFetch";
import {
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom";

const AddPortfolioDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      client: "",
      category: "",
      date: "",
      link: "",
      desc: "",
      isActive: false,
    },
  });

  const token = localStorage.getItem("token");
  const childRef = useRef();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const history = useHistory();
  const { id: workId } = useParams();
  // console.log("Initial workId", workId);

  const [currentDetails, setCurrentDetails] = useState(null);
  const { data: details, setData: setDetails } = useFetch("/workDetails");

  const [images, setImages] = useState([]);
  const [base64Images, setBase64Images] = useState([]);
  const imageRefs = useRef([]);

  const handleImageClick = (index) => {
    imageRefs.current[index].click();
  };

  const handleImageChange = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertBase64(file);
      // console.log("base64", base64);
      setBase64Images((prevState) => {
        const newImages = [...prevState];
        newImages[index] = base64;
        return newImages;
      });
      setImages((prevState) => {
        const newImages = [...prevState];
        newImages[index] = file;
        return newImages;
      });
    }
  };

  const addNewImageInput = () => {
    setImages((prevState) => [...prevState, null]);
    setBase64Images((prevState) => [...prevState, ""]);
  };

  const removeImage = (index) => {
    setImages((prevState) => prevState.filter((_, i) => i !== index));
    setBase64Images((prevState) => prevState.filter((_, i) => i !== index));
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    if (currentDetails) {
      console.log("Current Details", currentDetails);
      setValue("client", currentDetails.pClient);
      setValue("category", currentDetails.pCategory);
      setValue("date", currentDetails.pDate);
      setValue("link", currentDetails.pURL);
      setValue("desc", currentDetails.desc);
      setValue("isActive", currentDetails.isActive);
      setBase64Images(currentDetails.slideImages);
      setImages(new Array(currentDetails.slideImages.length).fill(null));
    } else {
      reset();
      setBase64Images([]);
      setImages([]);
    }
  }, [currentDetails, setValue, reset]);

  // console.log("currentDetails", currentDetails);

  const onSubmit = async (formObject) => {
    let imageUrls = [...base64Images];
    // console.log("imageUrls base64Images", imageUrls);

    for (let i = 0; i < images.length; i++) {
      if (images[i]) {
        // console.log(`image ${i}:`, images[i]);
        const imageFormData = new FormData();
        imageFormData.append("file", images[i]);

        try {
          const response = await fetch("/api/upload", {
            method: "POST",
            body: imageFormData,
          });
          const data = await response.json();
          // console.log(`Uploaded image ${i}:`, data.file);
          imageUrls[i] = data.file;
        } catch (error) {
          console.error("Error uploading the image:", error);
        }
      }
    }

    const updatedData = {
      pCategory: formObject.category,
      pClient: formObject.client,
      pDate: formObject.date,
      pURL: formObject.link,
      desc: formObject.desc,
      slideImages: imageUrls,
      isActive: formObject.isActive,
    };

    // console.log("ImgaeUrls:", imageUrls);
    // console.log("updatedData", updatedData);
    // console.log("workId", workId);
    try {
      // Send PUT request to update the JSON data
      if (currentDetails) {
        const response = await fetch(`/workDetails/${currentDetails._id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
        const result = await response.json();
        // console.log("update details response:", result);
        setDetails(
          details.map((detail) => (detail._id === result._id ? result : detail))
        );
        childRef.current.childFunction();
        // console.log("Updated Details: ", details);
        toast.success("Details updated successfully");
      } else {
        // Send POST request to update the JSON data
        const response = await fetch("/workDetails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
          throw new Error(`Failed to add details: ${response.statusText}`);
        }
        const result = await response.json();
        // console.log("RESULT", result, result._id);
        // Update the workDetailsId in the corresponding work
        const updatedWorkResponse = await fetch(`/works/${workId}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ workDetailsId: result._id }),
        });

        // Update the URL
        queryParams.set("workDetailsId", result._id);
        history.push({
          pathname: location.pathname,
          search: queryParams.toString(),
        });

        childRef.current.childFunction(result._id);
        // console.log("updatedWorkResponse", updatedWorkResponse);
        if (!updatedWorkResponse.ok) {
          throw new Error(
            `Failed to update work: ${updatedWorkResponse.statusText}`
          );
        }
        setDetails((prevDetails) => [...prevDetails, result]);
        childRef.current.childFunction();
        toast.success("Details added successfully");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }

    reset();
    setCurrentDetails(null);
    setBase64Images([]);
    setImages([]);
  };

  const onReset = () => {
    reset();
    setCurrentDetails(null);
    setBase64Images([]);
    setImages([]);
  };

  const handleEdit = (details) => {
    setCurrentDetails(details);
    // console.log("onEditClick: ", details);
  };

  const handleDelete = async (detailsId, workId) => {
    try {
      const response = await fetch(`/workDetails/${detailsId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to delete details: ${response.statusText}`);
      }
      // console.log("delete workId", workId);
      const updatedWorkResponse = await fetch(`/works/${workId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ workDetailsId: null }),
      });
      if (!updatedWorkResponse.ok) {
        throw new Error(
          `Failed to update work: ${updatedWorkResponse.statusText}`
        );
      }

      queryParams.set("workDetailsId", null);
      history.push({
        pathname: location.pathname,
        search: queryParams.toString(),
      });

      // Update the URL
      setDetails(details.filter((detail) => detail._id !== detailsId));
      if (childRef.current && childRef.current.childFunction) {
        childRef.current.childFunction();
      }
      toast.success("Details deleted successfully");
      history.push("/form/portfolio-form");
    } catch (error) {
      console.log("Error deleting details:", error);
      toast.error("Failed to delete details");
    }
  };

  return (
    <>
      {/* PortfolioDetails Form Start */}
      <section
        id="portfolioDetails-form"
        className="portfolioDetails-form form"
      >
        <div className="container">
          <div className="row">
            <div className="portfolioDetails-container">
              <div className="col-12">
                <h2>Add Portfolio Details Info!</h2>
              </div>
              <div className="col-12">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="text-center">
                    {base64Images.map((base64Image, index) => (
                      <div className="image" key={index}>
                        {/* Image or default placeholder */}
                        <div
                          className="image-preview"
                          onClick={() => handleImageClick(index)}
                        >
                          {base64Image ? (
                            <img
                              src={base64Image}
                              alt="Uploaded"
                              className="img-display-before mt-3"
                            />
                          ) : (
                            <img
                              src="../../assets/img/default-work-image.webp"
                              alt="default"
                              className="img-display-before"
                            />
                          )}
                        </div>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm mt-2"
                          onClick={() => removeImage(index)}
                        >
                          Remove
                        </button>
                        {/* File input */}
                        <input
                          type="file"
                          name={`file${index}`}
                          // id={`file-input${index}`}
                          {...register(`file${index}`)}
                          onChange={(e) => handleImageChange(e, index)}
                          ref={(el) => (imageRefs.current[index] = el)}
                          style={{ display: "none" }}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn add-more-btn my-3 text-center"
                      onClick={addNewImageInput}
                    >
                      {images.length === 0 ? "Add Project Image" : "Add More +"}
                    </button>
                  </div>

                  <div className="from-group">
                    <input
                      type="text"
                      name="client"
                      className="form-control"
                      {...register("client")}
                      placeholder="Client Company"
                      required
                    />
                  </div>
                  {errors.name && (
                    <p className="error-message">{errors.name.message}</p>
                  )}

                  <div className="from-group">
                    <input
                      type="text"
                      name="category"
                      className="form-control"
                      {...register("category")}
                      placeholder="Category of Project"
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
                      placeholder="Date (YY-MM-DD)"
                      required
                    />
                  </div>
                  {errors.date && (
                    <p className="error-message">{errors.date.message}</p>
                  )}

                  <div className="from-group">
                    <input
                      type="text"
                      name="link"
                      className="form-control"
                      {...register("link")}
                      placeholder="Enter link to your project"
                      required
                    />
                  </div>
                  {errors.link && (
                    <p className="error-message">{errors.link.message}</p>
                  )}

                  <div className="from-group">
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
                    <button className="submit" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </section>
      {/* PortfolioDetails Form End */}
      {/* <Portfolio /> */}
      <PortfolioDetails
        onEditClick={handleEdit}
        onDeleteClick={handleDelete}
        ref={childRef}
      />
    </>
  );
};

export default AddPortfolioDetails;
