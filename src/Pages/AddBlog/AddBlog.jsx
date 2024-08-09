import React from 'react';
import useAuth from '../../Hooks/UseAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';

const AddBlog = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [axiosSecure] = UseAxiosSecure();

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const body = form.body.value;

        const blog = {
            title,
            body,
            postedIn: new Date(),
            authorName: user?.displayName,
            authorEmail: user?.email
        };

        axiosSecure.post('/blogs', blog).then((response) => {
            if (response.data.acknowledged) {
                Swal.fire({
                    icon: 'success',
                    title: 'Blog Added Successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });

                form.reset();
                navigate('/blogs');
            }
        });
    };

    // Scroll to top
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
    });

    return (
        <div className='w-full max-w-3xl mx-auto min-h-[80vh] py-14 px-4'>
            <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto flex flex-col gap-3 justify-center items-center py-10 rounded-lg px-10 shadow-md">
                <h1 className='w-full text-center text-2xl font-semibold text-gray-500 p2-10'>Write a blog</h1>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Blog Title</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Blog title"
                        name="title"
                        required
                        className="input input-bordered input-success focus:outline-none w-[300px] md:w-full"
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Blog</span>
                    </label>
                    <textarea
                        placeholder="Blog content"
                        name="body"
                        required
                        className="textarea textarea-bordered textarea-success h-52 focus:outline-none w-[300px] md:w-full"
                    />
                </div>
                <input
                    className="bg-[#149352] cursor-pointer text-white py-[10px] rounded-3xl mt-4 hover:bg-transparent hover:text-[#149352] hover:outline outline-[#149352] font-medium w-full"
                    type="submit"
                    value="Save"
                />
            </form>
        </div>
    );
};

export default AddBlog;
