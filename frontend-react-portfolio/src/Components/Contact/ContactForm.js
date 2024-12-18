import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import validationSchema from "./ContactFormValidation";
import { toast } from "react-toastify";

function ContactForm() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const userId = localStorage.getItem("userId");
  const onSubmit = async (formData) => {
    console.log("fromdata:", formData);

    try {
      const response = fetch(`${API_URL}/api/contactUs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userId }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "Message sent successfully!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
      console.error("Error:", error); // Log the error for debugging
    } finally {
      reset();
    }
  };
  return (
    <>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Your Name"
                  {...register("name")}
                  autoComplete="on"
                />
              </div>
              {errors.name && (
                <p className="error-message">{errors.name.message}</p>
              )}
            </div>
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Your Email"
                  {...register("email")}
                  autoComplete="on"
                />
              </div>
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </div>
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Subject"
                  name="subject"
                  {...register("subject")}
                />
              </div>
              {errors.subject && (
                <p className="error-message">{errors.subject.message}</p>
              )}
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <textarea
                  className="form-control"
                  name="message"
                  rows={5}
                  placeholder="Message"
                  {...register("message")}
                />
              </div>
              {errors.message && (
                <p className="error-message">{errors.message.message}</p>
              )}
            </div>

            <div className="col-md-12 text-center">
              <button
                type="submit"
                className="button button-a button-big button-rouded"
              >
                Send Message
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
export default ContactForm;
