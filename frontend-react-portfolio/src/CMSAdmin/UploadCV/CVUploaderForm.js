import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { storage } from "../../firebaseConfig";
import { toast } from "react-toastify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import validationSchema from "./CVValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import "./CVForm.css";

const CVUploader = () => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

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
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token"); // Retrieve userId from local storage
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
            toast.success("CV Uploaded Successfully!");
          } catch (error) {
            // console.error("Error uploading CV:", error);
            toast.error("Error uploading CV:", error);
          } finally {
            setUploadProgress(0); // Reset progress
            setIsSubmitting(false);
            reset();
            setPreview(null);
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
                  <button className="cancel-btn" onClick={() => reset()}>
                    Cancel
                  </button>
                </form>
              </div>
            </div>
            <hr />
            {preview && (
              <div className="cv-preview">
                <h3>Preview:</h3>
                <iframe
                  src={preview}
                  width="80%"
                  height="700px"
                  title="CV_Preview"
                  className="border border-dark  border-5 "
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CVUploader;
