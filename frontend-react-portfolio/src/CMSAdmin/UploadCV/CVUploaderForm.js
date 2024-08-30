import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { storage } from "../../firebaseConfig";
import { toast } from "react-toastify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const CVUploader = () => {
  const { register, handleSubmit } = useForm();
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const onSubmit = async (data) => {
    if (file) {
      const storageRef = ref(storage, `cv/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress can be handled here if needed
        },
        (error) => {
          console.error("Upload failed:", error);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            // Save CV URL to MongoDB using fetch API
            const response = await fetch("/api/upload-cv", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: data.userId,
                cvUrl: url,
              }),
            });

            if (!response.ok) {
              throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            console.log("CV uploaded:", result);
            toast.success("CV Uploaded Successfully!");
          } catch (error) {
            console.error("Error uploading CV:", error);
            toast.error("Error uploading CV:", error);
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="file"
                    accept="application/pdf"
                    name="file"
                    {...register("file")}
                    onChange={onFileChange}
                  />
                  <button type="submit">Upload CV</button>
                  {preview && (
                    <div>
                      <h3>Preview:</h3>
                      <iframe src={preview} width="100%" height="500px" />
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CVUploader;
