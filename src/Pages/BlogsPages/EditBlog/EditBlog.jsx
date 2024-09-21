import React from 'react';
import useAuth from '../../../Hooks/UseAuth';
import { useNavigate, useParams } from 'react-router-dom';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const EditBlog = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [axiosSecure] = UseAxiosSecure();

    // Get blog by ID
    const { data: blog = null, refetch: blogRefetch } = useQuery({
        queryKey: ["blog", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/blogs/${id}`);
            return res.data;
        },
    });

    // Initialize react-hook-form
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: blog?.title || "",
            body: blog?.body || "",
        }
    });

    // Refetch blog when updated
    React.useEffect(() => {
        if (blog) {
            reset({
                title: blog.title,
                body: blog.body,
            });
        }
    }, [blog, reset]);

    const onSubmit = async (formData) => {
        const updatedBlog = {
            ...formData,
        };

        try {
            const response = await axiosSecure.put(`/blogs/${id}`, updatedBlog);
            if (response.data.acknowledged) {
                Swal.fire({
                    icon: 'success',
                    title: 'Blog Updated Successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/blogs');
            }
        } catch (error) {
            console.error('Failed to update blog:', error);
        }
    };

    return (
        <div className='w-full max-w-3xl flex items-center justify-center mx-auto min-h-[80vh] py-14 px-4'>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto flex flex-col gap-3 justify-center items-center rounded-lg p-4 md:p-10 shadow-md">
                <h1 className='w-full text-center text-xl font-semibold text-gray-500'>Edit a blog</h1>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Blog Title</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Blog title"
                        {...register("title", { required: true })}
                        className="input input-bordered input-success focus:outline-none  text-xs md:w-full"
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Blog</span>
                    </label>
                    <textarea
                        placeholder="Blog content"
                        {...register("body", { required: true })}
                        className="textarea textarea-bordered textarea-success h-52 text-sm focus:outline-none md:w-full"
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

export default EditBlog;
