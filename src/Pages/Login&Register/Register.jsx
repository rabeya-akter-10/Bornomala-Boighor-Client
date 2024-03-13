import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import useAuth from "../../Hooks/UseAuth";

const Register = () => {
    const [error, setError] = useState("");
    const { user, createUser, updateUser, loginWithGoogle } = useAuth();
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const name = form.name.value;
        const photo = form.photo.value;
        console.log(email, password, photo, name);
        createUser(email, password)
            .then((result) => {
                const loggedUser = result.user;
                updateUser(name, photo)
                    .then((result) => {
                        console.log("Succesfully upadateUser");
                    })
                    .catch((error) => {});
                setError("");
                toast.success("Successfully Login!");
                event.target.reset();
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
            });
    };
    // Google Login
    const hangleGoogle = () => {
        loginWithGoogle()
            .then((result) => {
                const loggedUser = result.user;
                console.log(loggedUser);
                toast.success("Successfully Login!");
                setError("");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
            });
    };
    return (
        <div className="w-full flex items-center justify-center min-h-[91vh]">
            <form
                onSubmit={handleSubmit}
                className="border shadow-xl rounded-2xl my-5 py-10 px-8"
            >
                <h1 className="text-3xl text-center font-medium mb-5">
                    Sign Up
                </h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="name"
                        name="name"
                        required
                        className="input rounded-lg py-[6px] input-bordered input-success focus:outline-none lg:w-[350px] w-[300px]"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Image</span>
                    </label>
                    <input
                        type="file"
                        placeholder="photoUrl"
                        name="photo"
                        className="input rounded-lg py-[6px] input-bordered input-success focus:outline-none lg:w-[350px] w-[300px]"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="email"
                        name="email"
                        required
                        className="input rounded-lg py-[6px] input-bordered input-success focus:outline-none lg:w-[350px] w-[300px]"
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
                        className="input rounded-lg py-[6px] input-bordered input-success  focus:outline-none  lg:w-[350px] w-[300px]"
                    />
                </div>
                <span className="w-full flex justify-center mt-4">
                    <small className="text-red-600">{error}</small>
                </span>
                <input
                    className="bg-[#149352] cursor-pointer text-white py-[10px] rounded-3xl mt-4 hover:bg-transparent hover:text-[#149352] hover:outline outline-[#149352] font-medium w-full"
                    type="submit"
                    value="Sign Up"
                />
                <div className="divider">OR</div>
                <div className="w-full flex justify-center">
                    <span onClick={hangleGoogle}>
                        <img
                            className="w-10 p-[6px] border rounded-full hover:saturate-0 bg-slate-200 cursor-pointer"
                            src="https://i.ibb.co/HX7Z8g9/google-logo-png-suite-everything-you-need-know-about-google-newest-0-removebg-preview.png"
                            alt=""
                        />
                    </span>
                </div>
                <span className="flex w-full justify-center mt-3">
                    <small className="text-center">
                        Already Have An Account?{" "}
                        <Link to={"/login"} className="text-info underline">
                            Login
                        </Link>
                    </small>
                </span>
            </form>
            <Toaster></Toaster>
        </div>
    );
};

export default Register;
