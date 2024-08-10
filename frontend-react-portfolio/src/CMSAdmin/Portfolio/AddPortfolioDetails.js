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
  // const { data: works, setData: setWorks } = useFetch("http://localhost:8000/works");
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

  const childRef = useRef();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const history = useHistory();
  const { id: workId } = useParams();
  console.log("Initial workId", workId);

  const [currentDetails, setCurrentDetails] = useState(null);
  const { data: details, setData: setDetails } = useFetch(
    "http://localhost:8000/workDetails"
  );

  // const [image1, setImage1] = useState(null);
  // const [image2, setImage2] = useState(null);
  // const [image3, setImage3] = useState(null);
  // const imageRef1 = useRef(null);
  // const imageRef2 = useRef(null);
  // const imageRef3 = useRef(null);
  // const [base64Image1, setBase64Image1] = useState("");
  // const [base64Image2, setBase64Image2] = useState("");
  // const [base64Image3, setBase64Image3] = useState("");

  // const [images, setImages] = useState([null, null, null]);
  // const [base64Images, setBase64Images] = useState(["", "", ""]);
  // const imageRefs = [useRef(null), useRef(null), useRef(null)];

  const [images, setImages] = useState([]);
  const [base64Images, setBase64Images] = useState([]);
  const imageRefs = useRef([]);

  const handleImageClick = (index) => {
    imageRefs.current[index].click();
  };

  // const handleImageClick = (index) => {
  //   document.getElementById(`file-input${index + 1}`).click();
  // };

  const handleImageChange = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertBase64(file);
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

  // const handleImage1Click = () => {
  //     document.getElementById('file-input1').click();
  // }
  // const handleImage2Click = () => {
  //     document.getElementById('file-input2').click();
  // }
  // const handleImage3Click = () => {
  //     document.getElementById('file-input3').click();
  // }

  // const handleImage1Change = async (e) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //         const base64 = await convertBase64(file);
  //         setBase64Image1(base64);
  //         setImage1(file);
  //     }
  // };

  // const handleImage2Change = async (e) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //         const base64 = await convertBase64(file);
  //         setBase64Image2(base64);
  //         setImage2(file);
  //     }
  // };
  // const handleImage3Change = async (e) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //         const base64 = await convertBase64(file);
  //         setBase64Image3(base64);
  //         setImage3(file);
  //     }
  // };

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
      // setBase64Images([
      //   currentDetails.slideImage1,
      //   currentDetails.slideImage2,
      //   currentDetails.slideImage3,
      // ]);
      // setImages([null, null, null]);
      // setBase64Image1(currentDetails.slideImage1);
      // setBase64Image2(currentDetails.slideImage2)
      // setBase64Image3(currentDetails.slideImage3)
      // setImage1(null);
      // setImage2(null);
      // setImage3(null);
      // setImages({ file1: null, file2: null, file3: null }); // or set to a placeholder if needed
    } else {
      reset();
      setBase64Images([]);
      setImages([]);

      // setBase64Images(["", "", ""]);
      // setBase64Image1("");
      // setBase64Image2("");
      // setBase64Image3("");
    }
  }, [currentDetails, setValue, reset]);

  console.log("currentDetails", currentDetails);

  const onSubmit = async (formObject) => {
    // formObject.slideImage1 = base64Images[0];
    // formObject.slideImage2 = base64Images[1];
    // formObject.slideImage3 = base64Images[2];

    // formObject.slideImage1 = base64Image1; // Add the base64 image to the form object
    // formObject.slideImage2 = base64Image2; // Add the base64 image to the form object
    // formObject.slideImage3 = base64Image3; // Add the base64 image to the form object

    let imageUrls = [...base64Images];

    for (let i = 0; i < images.length; i++) {
      if (images[i]) {
        const imageFormData = new FormData();
        imageFormData.append("file", images[i]);

        try {
          const response = await fetch("http://localhost:8000/upload", {
            method: "POST",
            body: imageFormData,
          });
          const data = await response.json();
          imageUrls[i] = data.url;
        } catch (error) {
          console.error("Error uploading the image:", error);
        }
      }
    }

    // console.log('Form Data:', formObject);

    // let imageUrl1 = formObject.slideImage1;
    // let imageUrl2 = formObject.slideImage2;
    // let imageUrl3 = formObject.slideImage3;

    // // If a new image is selected, upload it
    // if (image1) {
    //     const imageFormData = new FormData();
    //     imageFormData.append('file', image1);

    //     try {
    //         const response = await fetch('http://localhost:8000/upload', {
    //             method: 'POST',
    //             body: imageFormData
    //         });
    //         const data = await response.json();
    //         console.log('data image1', data)
    //         imageUrl1 = data.url; // Assuming the server responds with the URL of the uploaded image
    //     } catch (error) {
    //         console.error('Error uploading the image:', error);
    //     }
    // }

    // if (image2) {
    //     const imageFormData = new FormData();
    //     imageFormData.append('file', image2);

    //     try {
    //         const response = await fetch('http://localhost:8000/upload', {
    //             method: 'POST',
    //             body: imageFormData
    //         });
    //         const data = await response.json();
    //         console.log('data image2', data)
    //         imageUrl2 = data.url; // Assuming the server responds with the URL of the uploaded image
    //     } catch (error) {
    //         console.error('Error uploading the image:', error);
    //     }
    // }

    // if (image3) {
    //     const imageFormData = new FormData();
    //     imageFormData.append('file', image3);

    //     try {
    //         const response = await fetch('http://localhost:8000/upload', {
    //             method: 'POST',
    //             body: imageFormData
    //         });
    //         const data = await response.json();
    //         console.log('data image3', data)
    //         imageUrl3 = data.url; // Assuming the server responds with the URL of the uploaded image
    //     } catch (error) {
    //         console.error('Error uploading the image:', error);
    //     }
    // }

    const updatedData = {
      pCategory: formObject.category,
      pClient: formObject.client,
      pDate: formObject.date,
      pURL: formObject.link,
      desc: formObject.desc,
      // slideImage1: imageUrls[0],
      // slideImage2: imageUrls[1],
      // slideImage3: imageUrls[2],

      // slideImage1: imageUrl1,
      // slideImage2: imageUrl2,
      // slideImage3: imageUrl3,
      slideImages: imageUrls,
      isActive: formObject.isActive,
      workId: workId,
    };

    console.log("updatedData", updatedData);
    console.log("workId", workId);
    try {
      // Send PUT request to update the JSON data
      if (currentDetails) {
        const response = await fetch(
          `http://localhost:8000/workDetails/${currentDetails.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          }
        );
        const result = await response.json();
        console.log("update details response:", result);
        setDetails(
          details.map((detail) => (detail.id === result.id ? result : detail))
        );
        childRef.current.childFunction();
        console.log("Updated Details: ", details);
        toast.success("Details updated successfully");
      } else {
        // Send POST request to update the JSON data
        const response = await fetch("http://localhost:8000/workDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
          throw new Error(`Failed to add details: ${response.statusText}`);
        }
        const result = await response.json();
        console.log("RESULT", result, result.id);
        // Update corresponding work's workDetailsId
        const updatedWorkResponse = await fetch(
          `http://localhost:8000/works/${workId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ workDetailsId: result.id }),
          }
        );

        // Update the URL
        queryParams.set("workDetailsId", result.id);
        history.push({
          pathname: location.pathname,
          search: queryParams.toString(),
        });

        childRef.current.childFunction(result.id);
        console.log("updatedWorkResponse", updatedWorkResponse);
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
    // setBase64Images(["", "", ""]);
    // setImages([null, null, null]);
    setBase64Images([]);
    setImages([]);
  };

  const onReset = () => {
    reset();
    setCurrentDetails(null);
    // setBase64Images(["", "", ""]);
    // setImages([null, null, null]);
    setBase64Images([]);
    setImages([]);
  };

  const handleEdit = (details) => {
    setCurrentDetails(details);
    console.log("onEditClick: ", details);
  };

  const handleDelete = async (detailsId, workId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/workDetails/${detailsId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to delete details: ${response.statusText}`);
      }
      console.log("delete workId", workId);
      const updatedWorkResponse = await fetch(
        `http://localhost:8000/works/${workId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ workDetailsId: null }),
        }
      );
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
      setDetails(details.filter((detail) => detail.id !== detailsId));
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

                  {/* <div className="text-center">
                                        <div className="image" onClick={handleImage1Click}>
                                            {base64Image1 ? (
                                                <img
                                                    src={base64Image1}
                                                    alt="Uploaded"
                                                    className="img-display-before"
                                                />
                                            ) : (
                                                <img
                                                    src="../../assets/img/default-work-image.webp"
                                                    alt="default"
                                                    className="img-display-before"
                                                />
                                            )}
                                            <input
                                                type="file"
                                                name="file1"
                                                id="file-input1"
                                                {...register('file1')}
                                                multiple={false}
                                                onChange={handleImage1Change}
                                                ref={imageRef1}
                                                style={{ "display": "none" }}
                                            />
                                            <div className="label-container text-center">
                                                <label className=" my-3"><b>Choose Slide1 Image</b></label>
                                            </div>
                                        </div>
                                        <div className="image" onClick={handleImage2Click}>
                                            {base64Image2 ? (
                                                <img
                                                    src={base64Image2}
                                                    alt="Uploaded"
                                                    className="img-display-before"
                                                />
                                            ) : (
                                                <img
                                                    src="../../assets/img/default-work-image.webp"
                                                    alt="default"
                                                    className="img-display-before"
                                                />
                                            )}
                                            <input
                                                type="file"
                                                name="file2"
                                                id="file-input2"
                                                {...register('file2')}
                                                multiple={false}
                                                onChange={handleImage2Change}
                                                ref={imageRef2}
                                                style={{ "display": "none" }}
                                            />
                                            <div className="label-container text-center">
                                                <label className=" my-3"><b>Choose Slide2 Image</b></label>
                                            </div>
                                        </div>
                                        <div className="image" onClick={handleImage3Click}>
                                            {base64Image3 ? (
                                                <img
                                                    src={base64Image3}
                                                    alt="Uploaded"
                                                    className="img-display-before"
                                                />
                                            ) : (
                                                <img
                                                    src="../../assets/img/default-work-image.webp"
                                                    alt="default"
                                                    className="img-display-before"
                                                />
                                            )}
                                            <input
                                                type="file"
                                                name="file3"
                                                id="file-input3"
                                                {...register('file3')}
                                                multiple={false}
                                                onChange={handleImage3Change}
                                                ref={imageRef3}
                                                style={{ "display": "none" }}
                                            />
                                            <div className="label-container text-center">
                                                <label className=" my-3"><b>Choose Slide3 Image</b></label>
                                            </div>
                                        </div>
                                    </div> */}

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
