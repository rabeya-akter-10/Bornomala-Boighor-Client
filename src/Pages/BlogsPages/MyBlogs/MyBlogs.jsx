import React, { useState } from 'react';
import useAuth from '../../../Hooks/UseAuth';
import UseBlogs from '../../../Hooks/UseBlogs';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import CustomLoader from '../../../Components/CustomLoader/CustomLoader';
import { FaPenClip, FaTrash } from 'react-icons/fa6';
import { FaTrashAlt } from 'react-icons/fa';

const MyBlogs = () => {
    const { user } = useAuth()
    const email = user?.email;

    const [axiosSecure] = UseAxiosSecure();
    // Get usersBlogs
    const { data: userBlogs = null, refetch: userBlogsRefetch } = useQuery({
        queryKey: ["userBlogs"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/blogs/email/${email}`);
            return res.data;
        },
    });

    if (!userBlogs) {
        return <CustomLoader />
    }

    const handleDelete = (id) => {
        console.log(id);
    }

    // Scroll to top
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
    return (
        <div>

            {
                userBlogs?.length > 0 ? (<div>
                    <div className='px-4 flex flex-col items-center justify-center gap-4 pt-4 pb-10'>
                        <h1 className='text-center text-xl text-gray-600 py-3'>Blogs posted by me:</h1>
                        <div className='space-y-4'>
                            {
                                userBlogs.map(b => <div key={b._id}>
                                    <div className='w-full max-w-lg mx-auto p-4 border shadow-lg rounded-lg'>
                                        <h1 className='text-md font-semibold text-gray-600'>{b.title}</h1>
                                        <div className="mb-2 text-xs text-gray-500 w-full flex justify-end items-center lg:pr-20">
                                            <p>Published in: {new Date(b.postedIn).toLocaleDateString()}</p>
                                        </div>
                                        <div className={`relative h-24 overflow-hidden`}>
                                            <pre className="whitespace-pre-wrap text-sm">{b.body}</pre>
                                            {(
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent h-20"></div>
                                            )}
                                        </div>
                                        <div className='w-full flex justify-start gap-10 items-center'>
                                            <button onClick={() => document.getElementById('my_modal_3').showModal()} className="mt-1 text-warning text-xs font-medium hover:text-yellow-600">
                                                Read More
                                            </button>

                                            <Link to={`/edit-blog/${b._id}`} className='text-white bg-sky-500 p-2 rounded-full hover:bg-white hover:border hover:border-sky-500 hover:text-sky-500 border-white border'><FaPenClip className='text-lg' /></Link>

                                            <button onClick={() => { handleDelete(`${b._id}`) }} className='text-white bg-red-500 p-2 rounded-full hover:bg-white hover:border hover:border-red-500 hover:text-red-500 border-white border'><FaTrashAlt className='text-lg' /></button>
                                        </div>

                                        <dialog id="my_modal_3" className="modal">
                                            <div className="modal-box w-11/12 max-w-5xl px-4 py-10 md:p-10">
                                                <h1 className='text-md font-semibold text-gray-600'>{b.title}</h1>
                                                <div className="mb-2 text-xs text-gray-500 w-full flex justify-end items-center lg:pr-20">
                                                    <p>Published in: {new Date(b.postedIn).toLocaleDateString()}</p>
                                                </div>
                                                <div className={`relative  w-full`}>
                                                    <pre className="whitespace-pre-wrap text-sm">{b.body}</pre>

                                                </div>
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                    <div className='w-full flex justify-end mt-4'> <button className="btn btn-sm">Close</button></div>
                                                </form>

                                            </div>
                                        </dialog>
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                </div>) : (
                    <div>
                        <div className='w-full min-h-[80vh] flex flex-col gap-2 items-center justify-center'>
                            <h1 className='text-gray-500'>No blogs to show !</h1>
                            <Link to={'/add-blog'} className='bg-green-500 px-2 py-1 rounded-md text-white hover:bg-green-700 text-sm border border-green-700 shadow-lg duration-300'>Write a Blog</Link>
                        </div>
                    </div>
                )
            }

        </div>
    );
};

export default MyBlogs;