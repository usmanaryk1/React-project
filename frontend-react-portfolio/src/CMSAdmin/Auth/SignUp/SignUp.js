import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import "./Signup.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./SignupValidation";
import { useAuth } from "../AuthContext";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

const SignUp = () => {
  const { onSignup } = useAuth();
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const history = useHistory(); // for programmatic navigation

  // console.log("Signup component received onSignup prop:", onSignup);

  const onSubmit = async (data) => {
    // console.log("Data", data);
    setIsSubmitting(true);
    try {
      // Prepare data for submission
      const { email, password, confirmPassword, ...userData } = data;
      // const { confirmPassword, ...userData } = data;
      if (password !== confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Passwords do not match!",
        });
        setIsSubmitting(false);
        return; // Add this to stop further execution
      }
      // Sign up user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // Add role to userData
      const userWithStatus = {
        ...userData,
        email: firebaseUser.email,
        firebaseUID: firebaseUser.uid, // Unique identifier from Firebase
        loggedIn: false,
      };

      // console.log("userWithStatus", userWithStatus);

      // Make the request to the server
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userWithStatus),
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Check for specific error messages from the backend
        const errorMessage =
          responseData.message || "Signup failed. Please try again.";

        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
        setIsSubmitting(false);
        return;
      }

      // Handle successful signup
      console.log("user", responseData.user);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User registered successfully!",
      });
      onSignup(responseData.user, false);
      setIsSubmitting(false);
      history.push("/form/login-form");
    } catch (err) {
      console.error("Error during signup:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again." || err.message,
      });
      reset();
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* SIGNUP FORM */}
      <section
        id="signup-form"
        className="signup-form form bg-image"
        style={{ backgroundImage: "url(../assets/img/overlay-bg.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="signup-container">
              <div className="col-12">
                <h2>SignUp</h2>
              </div>
              <div className="col-12">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="form-group">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      {...register("username")}
                      placeholder="Username"
                      required
                    />
                  </div>
                  {errors.username && (
                    <p className="error-message">{errors.username.message}</p>
                  )}

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      {...register("email")}
                      placeholder="Email"
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="error-message">{errors.email.message}</p>
                  )}

                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      autoComplete="off"
                      {...register("password")}
                      placeholder="Create Password"
                      required
                    />
                  </div>
                  {errors.password && (
                    <p className="error-message">{errors.password.message}</p>
                  )}

                  <div className="from-group">
                    <input
                      type="password"
                      name="confirmPassword"
                      autoComplete="off"
                      className="form-control"
                      {...register("confirmPassword")}
                      placeholder="Confirm Password"
                      required
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="error-message">
                      {errors.confirmPassword.message}
                    </p>
                  )}

                  <div className="sign">
                    <button
                      className="sign-button"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Signing Up..." : "Signup"}
                    </button>
                  </div>
                  <div className="log">
                    <Link to="/form/login-form">
                      Already have an account? Login
                    </Link>
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

export default SignUp;
