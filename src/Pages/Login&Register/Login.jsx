import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Toaster, toast } from "react-hot-toast";
import useAuth from "../../Hooks/UseAuth";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";

const Login = () => {
    const [error, setError] = useState("");
    const { user, login, loginWithGoogle } = useAuth();
    const location = useLocation();
    const from = location?.state?.pathname || "/"; 
    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        login(email, password)
            .then((result) => {
                const loggedUser = result.user;
                toast.success("Successfully Login!");
                setError("");
                navigate(from);
                event.target.reset();
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
            });
    };

    // Scroll to top
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
    return (
        <div className="w-full flex items-center justify-center min-h-[91vh]">
            <form
                onSubmit={handleSubmit}
                className="border shadow-xl rounded-2xl py-10 px-8"
            >
                <h1 className="text-3xl text-center font-medium mb-8">Login</h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="email"
                        name="email"
                        required
                        className="input input-bordered input-success focus:outline-none lg:w-[350px] w-[300px]"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        required
                        className="input input-bordered input-success  focus:outline-none  lg:w-[350px] w-[300px]"
                    />
                </div>
                <span className="w-full flex justify-center mt-4">
                    <small className="text-red-600">{error}</small>
                </span>
                <input
                    className="bg-[#149352] cursor-pointer text-white py-[10px] rounded-3xl mt-4 hover:bg-transparent hover:text-[#149352] hover:outline outline-[#149352] font-medium w-full"
                    type="submit"
                    value="Login"
                />
                <div className="divider">OR</div>
                <GoogleLogin></GoogleLogin>
                <span className="flex w-full justify-center mt-3">
                    <small className="text-center">
                        Dont’t Have An Account?{" "}
                        <Link
                            to={"/register"}
                            className="text-warning underline"
                        >
                            Register
                        </Link>
                    </small>
                </span>
            </form>
            <Toaster></Toaster>
        </div>
    );
};

export default Login;
