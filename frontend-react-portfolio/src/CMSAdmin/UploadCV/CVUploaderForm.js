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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  const userId = localStorage.getItem("userId"); // Retrieve userId from local storage
  const token = localStorage.getItem("token");
  const { data: cv, setData: setCv } = useFetch(
    `${API_URL}/api/getCV/${userId}`
  );
  useEffect(() => {
    if (cv) {
      setPreview(cv.cvUrl); // Load existing CV preview
      // console.log("preview initial:", preview);
    }
  }, [cv]);
  // console.log("cv", cv);
  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      toast.error("File is missing!");
    }
  };

  const onSubmit = async (data) => {
    // console.log(userId);

    if (!token) {
      toast.error("User not logged in!");
      return;
    }

    if (file) {
      const storageRef = ref(storage, `CV/${file.name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      setIsSubmitting(true);
      // console.log("data", data, userId);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("Upload is " + progress + "% done");
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
            setCv(url);
            // console.log("cvurl", url);
            // Save CV URL to MongoDB using fetch API
            const response = await fetch(`${API_URL}/api/upload-cv`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: userId,
                cvUrl: url,
              }),
            });

            if (!response.ok) {
              throw new Error(`${response.statusText}`);
            }

            // console.log("CV uploaded:", result);
            setPreview(url); // Set preview to uploaded file URL
            console.log("preview set:", preview);

            toast.success("CV Uploaded Successfully!");
          } catch (error) {
            // console.error("Error uploading CV:", error);
            toast.error("Error uploading CV:", error);
          } finally {
            setUploadProgress(0); // Reset progress
            setIsSubmitting(false);
            reset();

            setFile(null);
          }
        }
      );
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
            <CVPreview preview={preview} />
          </div>
        </div>
      </section>
    </>
  );
};

export default CVUploader;
