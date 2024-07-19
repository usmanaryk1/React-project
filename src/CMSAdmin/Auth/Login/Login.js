import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./LoginValidation";
import { useAuth } from "../AuthContext";

const Login = () => {

    const { onLogin } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })


    const history = useHistory(); // for programmatic navigation

    console.log("Login component received onLogin prop:", onLogin);

    const onSubmit = async (data) => {

        const response = await fetch('http://localhost:8000/users');
        const users = await response.json();

        // Check if the credentials match any user
        const user = users.find(user =>
            (user.email === data.email) &&
            user.password === data.password
        );

        if (user) {
            // Update user status and redirect
            await fetch(`http://localhost:8000/users/${user.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ loggedIn: true })
            });

            console.log("user", user);

            onLogin(user, true);

            toast.success('Login Successfully');

            history.push('/form/dashboard');
        } else {
            toast.error("Invalid email or password.");
        }

    };

    return (
        <>
            <section id="login-form" className="login-form form bg-image" style={{ backgroundImage: 'url(../assets/img/overlay-bg.jpg)' }}>
                <div className="container">
                    <div className="row">
                        <div className="login-container">
                            <div className="col-12">
                                <h2>Login</h2>
                            </div>
                            <div className="col-12">
                                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                    {/* {error && <p className="error-message">{error}</p>} */}
                                    <input
                                        type="email"
                                        name="email"
                                        {...register('email')}
                                        placeholder="Email"
                                        required
                                    />
                                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                                    <input
                                        type="password"
                                        name="password"
                                        {...register('password')}
                                        placeholder="Enter Password"
                                        required
                                    />
                                    {errors.password && <p className="error-message">{errors.password.message}</p>}
                                    {/* <p className="error-message">{formError.password}</p> */}
                                    <div className="pwd">
                                        <button className="login-button" type="submit">Login</button>
                                        <p><a href="/form/forget-form">Forgot Password?</a></p>
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
}

export default Login;