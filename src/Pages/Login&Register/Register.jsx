import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import useAuth from "../../Hooks/UseAuth";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Register = () => {
    const [error, setError] = useState("");
    const { createUser, updateUser, logout } = useAuth();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_HOSTING_KEY
    }`;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        const { name, email, password, gender, phone } = data;

        const formData = new FormData();
        formData.append("image", data.image[0]);
        fetch(imageHostingUrl, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((imgResponse) => {
                if (imgResponse.success) {
                    const imgUrl = imgResponse.data.display_url;
                    const savedUser = {
                        name,
                        email,
                        photoURL: imgUrl,
                        gender,
                        phone,
                        role: "buyer",
                    };

                    createUser(email, password)
                        .then((result) => {
                            const loggedUser = result.user;
                            updateUser(name, imgUrl)
                                .then((result) => {
                                    fetch(
                                        "https://bornomala-boighor-server.vercel.app/users",
                                        {
                                            method: "POST",
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                            },
                                            body: JSON.stringify(savedUser),
                                        }
                                    );

                                    Swal.fire({
                                        icon: "success",
                                        title: "User Created Successfully Please Login to continue",
                                        showConfirmButton: false,
                                        timer: 1500,
                                    });

                                    logout()
                                        .then((result) => {
                                            navigate("/login");
                                        })
                                        .catch((error) => {});
                                })
                                .catch((error) => {
                                    console.log(error.message);
                                });
                            console.log(loggedUser);
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                }
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
                onSubmit={handleSubmit(onSubmit)}
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
                        {...register("name", { required: true })}
                        required
                        className="input rounded-lg  input-bordered input-success focus:outline-none lg:w-[350px] w-[300px]"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="email"
                        {...register("email", { required: true })}
                        required
                        className="input rounded-lg  input-bordered input-success focus:outline-none lg:w-[350px] w-[300px]"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input
                        type="file"
                        {...register("image", { required: true })}
                        className="file-input file-input-bordered file-input-success max-w-xs rounded-lg  focus:outline-none lg:w-[350px] w-[300px]"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="password"
                        {...register("password", { required: true })}
                        required
                        className="input rounded-lg  input-bordered input-success  focus:outline-none  lg:w-[350px] w-[300px]"
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Phone Number</span>
                    </label>
                    <input
                        type="text"
                        placeholder="phone number"
                        {...register("phone", { required: true })}
                        className="input rounded-lg  input-bordered input-success  focus:outline-none  lg:w-[350px] w-[300px]"
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Gender</span>
                    </label>
                    <select
                        {...register("gender", {
                            required: true,
                        })}
                        className="select rounded-lg  input-bordered select-success  focus:outline-none  lg:w-[350px] w-[300px]"
                    >
                        <option value={""}>Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>

                <span className="w-full flex justify-center mt-4">
                    <small className="text-red-600">{error}</small>
                </span>
                <input
                    className="bg-[#149352] cursor-pointer text-white py-[10px] rounded-3xl mt-4 hover:bg-transparent hover:text-[#149352] hover:outline outline-[#149352] font-medium w-full"
                    type="submit"
                    value={"Register"}
                />
                <div className="divider">OR</div>
                <GoogleLogin></GoogleLogin>
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
