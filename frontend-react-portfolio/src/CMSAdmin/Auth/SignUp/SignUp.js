import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import "./Signup.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./SignupValidation";
import { useAuth } from "../AuthContext";
import { useState } from "react";

const SignUp = () => {
  const { onSignup } = useAuth();
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
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
    setIsSubmitting(true);

    try {
      // Make a request to your backend to handle signup
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          username: data.username,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Signup successful
        Swal.fire({
          icon: "success",
          title: "Success",
          text:
            result.message ||
            "Signup successful! Please check your email for verification.",
        });
        // console.log("userRecord", result.UserRecord);
        // console.log("userRecord", result.UserRecord.email);

        onSignup(result.user, false);
        // Optionally redirect user after successful signup
        history.push("/form/login-form");
      } else {
        // Handle backend error response
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message || "Signup failed. Please try again.",
        });
      }
    } catch (error) {
      // Handle general errors
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // const onSubmit = async (data) => {
  //   // console.log("Data", data);
  //   setIsSubmitting(true);
  //   try {
  //     // Prepare data for submission
  //     const { email, password, confirmPassword, username, ...userData } = data;

  //     // Step 3: Create user in Firebase
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     const firebaseUser = userCredential.user;

  //     // Send email verification
  //     await sendEmailVerification(firebaseUser);
  //     Swal.fire({
  //       icon: "success",
  //       title: "Success",
  //       text: "Verfification email is sent. Check your email!",
  //     });

  //     // Step 4: Save user in MongoDB
  //     const userWithFirebaseId = {
  //       ...userData,
  //       email: firebaseUser.email,
  //       firebaseUID: firebaseUser.uid,
  //       username,
  //     };
  //     // console.log("userWithFirebaseId", userWithFirebaseId);

  //     // Make the request to the server
  //     const response = await fetch(`${API_URL}/api/auth/register`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(userWithFirebaseId),
  //     });

  //     const responseData = await response.json();

  //     if (!response.ok) {
  //       // Check for specific error messages from the backend
  //       const errorMessage =
  //         responseData.message || "Signup failed. Please try again.";

  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: errorMessage,
  //       });
  //       setIsSubmitting(false);
  //       return;
  //     } else {
  //       // Handle successful signup
  //       // console.log("user", responseData.user);
  //       Swal.fire({
  //         icon: "success",
  //         title: "Success",
  //         text: "User registered successfully!",
  //       });
  //       onSignup(responseData.user, false);
  //       setIsSubmitting(false);
  //       history.push("/form/login-form");
  //     }
  //   } catch (err) {
  //     console.error("Error during signup:", err);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "An error occurred. Please try again." || err.message,
  //     });
  //     reset();
  //     setIsSubmitting(false);
  //   }
  // };

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
                  <div className="TandC">
                    <input
                      type="checkbox"
                      id="TandC"
                      name="TandC"
                      {...register("TandC")}
                      className="mx-2"
                      required
                    />
                    <Link to="/termsandconditions">
                      <label htmlFor="TandC">
                        Agree to the Terms and Condtions
                      </label>
                    </Link>
                  </div>
                  {errors.TandC && (
                    <p className="error-message">{errors.TandC.message}</p>
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
