import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import validationSchema from "./ResetPwdValidation";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
// import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../../firebaseConfig";
import { confirmPasswordReset } from "firebase/auth";

const ResetPwd = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const history = useHistory();
  // const { id, token } = useParams();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      password: "",
      confrimPassword: "",
    },
  });
  const query = new URLSearchParams(useLocation().search);
  const oobCode = query.get("oobCode"); // Extract the oobCode from the URL
  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Call Firebase's confirmPasswordReset method to finalize the password reset
      await confirmPasswordReset(auth, oobCode, data.password);
      toast.success("Password has been reset successfully. Please log in.");
      history.push("/form/login-form"); // Redirect the user to the login page
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  // const onSubmit = (formObject) => {
  //   setIsSubmitting(true);
  //   const data = {
  //     password: formObject.password,
  //     confirmPassword: formObject.confirmPassword,
  //   };

  //   axios.defaults.withCredentials = true;
  //   axios
  //     .post(`${API_URL}/api/reset-password/${id}/${token}`, data)
  //     .then((res) => {
  //       if (res.data.message === "Success") {
  //         history.push("/form/login-form");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error(err);
  //       setIsSubmitting(false);
  //     });
  //   reset();
  // };

  return (
    <>
      <section
        id="reset-form"
        className="reset-form form bg-image"
        style={{ backgroundImage: "url(../assets/img/overlay-bg.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="reset-container">
              <div className="col-12">
                <p>Enter your new password below:</p>
              </div>
              <div className="col-12">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      autoComplete="off"
                      className="form-control"
                      {...register("password")}
                      placeholder="Create Password"
                      required
                    />
                  </div>
                  {errors.password && (
                    <p className="error-message">{errors.password.message}</p>
                  )}
                  <div className="form-group">
                    <input
                      type="password"
                      name="confirmPassword"
                      autoComplete="off"
                      {...register("confirmPassword")}
                      className="form-control"
                      placeholder="Confirm Password"
                      required
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="error-message">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                  <div className="reset-button">
                    <button
                      className={isSubmitting ? "reset-dots" : "reset-link"}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Reset Password"}
                    </button>
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
export default ResetPwd;
