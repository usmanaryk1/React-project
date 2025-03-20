import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { storage } from "../../firebaseConfig";
import { toast } from "react-toastify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import validationSchema from "./CVValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import "./CVForm.css";
import CVPreview from "./CVPreview";
import useFetch from "../../Components/useFetch";

const CVUploader = () => {
  const [preview, setPreview] = useState();
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status
  const [currentCV, setCurrentCV] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  const token = localStorage.getItem("token");
  const {
    data: cvs = [],
    setData: setCvs,
    refetch,
  } = useFetch(`${API_URL}/api/cv`);
  console.log("cvs:", cvs);

  // console.log("cv", cv);
  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const newPreview = URL.createObjectURL(selectedFile);
      setPreview(newPreview); // Append instead of replacing
    } else {
      toast.error("File is missing!");
    }
  };

  const handleEdit = async (cv) => {
    setCurrentCV(cv);
    setValue("file", cv.cvUrl); // Set form value (assuming it's a text URL)
    // Set the preview to the CV URL
    setPreview(cv.cvUrl); // Set only the current CV URL as preview // Set only the current CV URL as preview
  };

  // useEffect(() => {
  //   if (currentCV) {
  //     setValue("file", currentCV.cvUrl);
  //   } else {
  //     reset();
  //   }
  // }, [currentCV, setValue, reset]);

  const onSubmit = async (data) => {
    if (!token) {
      toast.error("User not logged in!");
      return;
    }

    if (file) {
      const storageRef = ref(storage, `CV/${file.name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      setIsSubmitting(true);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
          toast.error("Upload failed: " + error.message);
          setIsSubmitting(false);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            setCvs((prevCvs) => [...prevCvs, { cvUrl: url }]);

            const method = currentCV ? "PUT" : "POST";
            const apiUrl = currentCV
              ? `${API_URL}/api/cv/${currentCV._id}`
              : `${API_URL}/api/cv/uploadCv`;

            const response = await fetch(apiUrl, {
              method: method,
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ isVisible: true, cvUrl: url }),
            });

            if (response.ok) {
              const result = await response.json();
              if (currentCV) {
                setCvs((prevCvs) =>
                  prevCvs.map((item) =>
                    item._id === result._id ? result : item
                  )
                );
                toast.success("CV updated successfully");
              } else {
                setCvs([...cvs, result]);
                toast.success("CV Uploaded Successfully");
              }
            } else {
              throw new Error(`${response.statusText}`);
            }

            setPreview((prevPreviews) => [...prevPreviews, url]);
          } catch (error) {
            console.error("Error uploading CV:", error);
            toast.error("Error uploading CV:", error.message);
          } finally {
            setUploadProgress(0);
            setIsSubmitting(false);
            reset();
            setFile(null);
          }
        }
      );
    }
  };

  const handleDelete = async (id) => {
    console.log(`Attempting to delete: ${API_URL}/api/cv/${id}`);

    if (!id) {
      toast.error("Invalid CV ID");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/cv/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setCvs((prevCvs) => prevCvs.filter((item) => item._id !== id));
        refetch();
        toast.success("CV deleted successfully");
      } else {
        const errorData = await response.json();
        toast.error(`Failed to delete CV: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting CV:", error);
      toast.error("Error deleting CV. Please try again.");
    }
  };
  return (
    <>
      <section id="CV-form" className="form">
        <div className="container">
          <div className="row">
            <div className="CV-container">
              <div className="col-12">
                <h2>Upload Your CV!</h2>
              </div>
              <div className="col-12">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="form-container"
                >
                  <input
                    type="file"
                    accept="application/pdf"
                    name="file"
                    {...register("file")}
                    onChange={onFileChange}
                  />
                  {errors.file && (
                    <p className="error-message">{errors.file.message}</p>
                  )}
                  <button
                    type="submit"
                    className="uploadcv"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? `Uploading ${Math.round(uploadProgress)}%`
                      : "Upload CV"}
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => {
                      reset();
                      setFile(null);
                    }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
            <hr />
            <CVPreview
              preview={preview}
              cvs={cvs || []}
              onEditClick={handleEdit}
              onDeleteClick={handleDelete}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default CVUploader;
