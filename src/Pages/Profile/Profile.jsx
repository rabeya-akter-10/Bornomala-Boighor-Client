import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/UseAuth";

import locationsData from "../../../public/location.json";

const Profile = () => {
    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedUpazila, setSelectedUpazila] = useState("");
    const { user } = useAuth();
    const [thisUser, setThisUser] = useState(null);

    const [axiosSecure] = UseAxiosSecure();

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const res = await axiosSecure.get(`/users/${user.email}`);
                    setThisUser(res.data);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };
            fetchData();
        }
    }, [user, axiosSecure]);

    useEffect(() => {
        if (thisUser) {
        }
    }, [thisUser]);

    const handleDivisionChange = (e) => {
        const division = e.target.value;
        setSelectedDivision(division);
        setSelectedDistrict(""); // Reset district when changing division
        setSelectedUpazila(""); // Reset upazila when changing division
    };

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setSelectedUpazila(""); // Reset upazila when changing district
    };

    const handleUpazilaChange = (e) => {
        setSelectedUpazila(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const phone = form.phone.value;
        const street = form.street.value;

        const usersInfo = {
            phone,
            address: {
                division: selectedDivision,
                district: selectedDistrict,
                upazila: selectedUpazila,
                street,
            },
        };
        axiosSecure.put(`/users/${user.email}`, usersInfo).then((response) => {
            console.log(response);
        });
        window.location.reload();
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <div>
            <div className="p-4">
                <img
                    className="w-36 h-36 rounded-full outline outline-green-500 mx-auto m-10"
                    src={thisUser?.photoURL}
                    alt=""
                />

                <p>
                    <span className="text-gray-400">Name:</span>{" "}
                    {thisUser?.name}
                </p>
                <p>
                    <span className="text-gray-400">Email:</span>{" "}
                    {thisUser?.email}
                </p>
                <p>
                    <span className="text-gray-400">Phone:</span>{" "}
                    {thisUser?.phone}
                </p>

                <button
                    className="w-fit px-4 py-1 mt-2 bg-green-500 text-white hover:bg-green-600 cursor-pointer text-xs rounded-sm"
                    onClick={() =>
                        document.getElementById("my_modal_5").showModal()
                    }
                >
                    Edit Profile
                </button>
            </div>

            <dialog
                id="my_modal_5"
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box">
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="phone number"
                                defaultValue={thisUser?.phone}
                                className="input rounded-lg  input-bordered input-success  focus:outline-none  w-full"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    Division:
                                </label>
                                <select
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    value={selectedDivision}
                                    onChange={handleDivisionChange}
                                >
                                    <option value="">Select Division</option>
                                    {locationsData.divisions.map((division) => (
                                        <option
                                            key={division.label}
                                            value={division.label}
                                        >
                                            {division.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    District:
                                </label>
                                <select
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    value={selectedDistrict}
                                    onChange={handleDistrictChange}
                                    required
                                    disabled={!selectedDivision}
                                >
                                    <option value="">Select District</option>
                                    {selectedDivision &&
                                        locationsData.divisions
                                            .find(
                                                (division) =>
                                                    division.label ===
                                                    selectedDivision
                                            )
                                            ?.districts.map((district) => (
                                                <option
                                                    key={district.label}
                                                    value={district.label}
                                                >
                                                    {district.label}
                                                </option>
                                            ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    Upazila:
                                </label>
                                <select
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    value={selectedUpazila}
                                    onChange={handleUpazilaChange}
                                    required
                                    disabled={!selectedDistrict}
                                >
                                    <option value="">Select Upazila</option>
                                    {selectedDistrict &&
                                        locationsData.divisions
                                            .find(
                                                (division) =>
                                                    division.label ===
                                                    selectedDivision
                                            )
                                            ?.districts.find(
                                                (district) =>
                                                    district.label ===
                                                    selectedDistrict
                                            )
                                            ?.upazilas.map((upazila) => (
                                                <option
                                                    key={upazila}
                                                    value={upazila}
                                                >
                                                    {upazila}
                                                </option>
                                            ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input
                                type="text"
                                name="street"
                                defaultValue={thisUser?.address?.street}
                                placeholder="House no,building,street,area"
                                className="input rounded-lg  input-bordered input-success  focus:outline-none  w-full"
                            />
                        </div>

                        <div className="w-fit mx-auto mt-4">
                            <button
                                type="submit"
                                className="px-4 py-1 bg-green-500 rounded-sm cursor-pointer hover:bg-green-600 text-white"
                            >
                                Save
                            </button>
                        </div>
                    </form>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Profile;
