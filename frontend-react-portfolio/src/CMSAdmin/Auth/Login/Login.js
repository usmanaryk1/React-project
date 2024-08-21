import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./LoginValidation";
import { useAuth } from "../AuthContext";

const Login = () => {
  const { onLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const history = useHistory(); // for programmatic navigation

  console.log("Login component received onLogin prop:", onLogin);

  // const onSubmit = async (data) => {

  //   const response = await fetch("http://localhost:8000/auth/login");
  //   const users = await response.json();

  //   // Check if the credentials match any user
  //   const user = users.find(
  //     (user) => user.email === data.email && user.password === data.password
  //   );

  //   if (user) {
  //     // Update user status and redirect
  //     await fetch(`http://localhost:8000/users/${user.id}`, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ loggedIn: true }),
  //     });

  //     console.log("user", user);

  //     onLogin(user, true);

  //     toast.success("Login Successfully");

  //     history.push("/form/dashboard");
  //   } else {
  //     toast.error("Invalid email or password.");
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        const loggedInUser = { ...result.UserModel, loggedIn: true };
        console.log("loggedInUser", loggedInUser);

        // Save the token to localStorage
        // localStorage.setItem("token", result.accessToken);
        console.log("Result accessToken", result.accessToken);
        // Update user status in the context
        onLogin(loggedInUser, result.accessToken, true);

        toast.success("Login Successfully");

        history.push("/form/dashboard");
      } else {
        toast.error(result.error || "Invalid email or password.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Login error:", error);
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
                      {...register("password")}
                      placeholder="Enter Password"
                      required
                    />
                  </div>
                  {errors.password && (
                    <p className="error-message">{errors.password.message}</p>
                  )}

                  <div className="pwd">
                    <button className="login-button" type="submit">
                      Login
                    </button>
                    <p>
                      <a href="/form/forget-form">Forgot Password?</a>
                    </p>
                  </div>

                  <div className="signup-link text-center">
                    <a href="/form/signup-form">New User? SignUp</a>
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
