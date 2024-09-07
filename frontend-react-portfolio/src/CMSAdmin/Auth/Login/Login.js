import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./LoginValidation";
import { useAuth } from "../AuthContext";
import { useState } from "react";

const Login = () => {
  const { onLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const history = useHistory(); // for programmatic navigation
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const [isSubmitting, setIsSubmitting] = useState(false);

  // console.log("Login component received onLogin prop:", onLogin);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        const loggedInUser = { ...result.UserModel, loggedIn: true };
        // console.log("loggedInUser", loggedInUser);
        // Update user status in the context
        onLogin(loggedInUser, result.accessToken, true);

        toast.success("Login Successfully");
        reset();
        history.push("/form/dashboard");
      } else {
        toast.error(result.error || "Invalid email or password.");
        setIsSubmitting(false);
      }
      reset();
      setIsSubmitting(false);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Login error:", error);
      setIsSubmitting(false);
      reset();
    }
  };

  return (
    <>
      <section
        id="login-form"
        className="login-form form bg-image"
        style={{ backgroundImage: "url(../assets/img/overlay-bg.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="login-container">
              <div className="col-12">
                <h2>Login</h2>
              </div>
              <div className="col-12">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/* {error && <p className="error-message">{error}</p>} */}
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      autoComplete="off"
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
                      autoComplete="off"
                      className="form-control"
                      {...register("password")}
                      placeholder="Enter Password"
                      required
                    />
                  </div>
                  {errors.password && (
                    <p className="error-message">{errors.password.message}</p>
                  )}

                  <div className="pwd">
                    <button
                      className="login-button"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Logging In..." : "Login"}
                    </button>
                    <p className="forget-link">
                      <Link to="/form/forget-form">Forgot Password?</Link>
                    </p>
                  </div>

                  <div className="signup-link text-center">
                    <Link to="/form/signup-form">New User? SignUp</Link>
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

export default Login;
