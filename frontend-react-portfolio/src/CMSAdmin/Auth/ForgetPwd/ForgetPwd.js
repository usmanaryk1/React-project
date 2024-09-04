import { Link, useHistory } from "react-router-dom";
import validationSchema from "./ForgetPwdValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
const ForgetPwd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
    },
  });
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const [isSubmitting, setIsSubmitting] = useState();
  const history = useHistory();

  const onSubmit = (email) => {
    setIsSubmitting(true);
    axios.defaults.withCredentials = true;
    axios
      .post(`${API_URL}/api/forgot-password`, { email })
      .then((res) => {
        if (res.data.message === "Success") {
          history.push("/form/login-form");
        }
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
        setIsSubmitting(false);
      });

    reset();
  };

  return (
    <>
      <section
        id="forget-form"
        className="forget-form form bg-image"
        style={{ backgroundImage: "url(../assets/img/overlay-bg.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="forget-container">
              <div className="col-12">
                <p>
                  Please enter your email address. You will recieve a link to
                  create a new password via email.
                </p>
              </div>
              <div className="col-12">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      autoComplete="off"
                      {...register("email")}
                      placeholder="Email"
                      required
                    />
                  </div>

                  {errors.email && (
                    <p className="error-message">{errors.email.message}</p>
                  )}
                  <div className="forget">
                    <button
                      className="get-button"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send"}
                    </button>
                    <Link to="/form/reset-form">Reset Password</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgetPwd;
