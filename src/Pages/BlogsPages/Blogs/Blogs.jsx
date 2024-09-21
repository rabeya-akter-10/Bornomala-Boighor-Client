import React from 'react';
import UseBlogs from '../../../Hooks/UseBlogs';
import CustomLoader from '../../../Components/CustomLoader/CustomLoader';
import { FaTrashAlt } from 'react-icons/fa';
import UseAdmin from '../../../Hooks/UseAdmin';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';

const Blogs = () => {
    const [axiosSecure] = UseAxiosSecure();
    const { blogs, blogsRefetch } = UseBlogs();
    const { admin } = UseAdmin()

    if (!blogs) {
        return <CustomLoader />
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axiosSecure.delete(`/blogs/${id}`);
                blogsRefetch();
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });

    }

    // Scroll to top
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
    });
    return (
        <div className='w-full max-w-6xl mx-auto px-4'>

            <div className=' w-full grid grid-cols-1 md:grid-cols-2 gap-5 py-10'>
                {
                    blogs?.map(b => <div key={b._id}>
                        <div className='w-full mx-auto p-4 border shadow-lg rounded-lg'>
                            <h1 className='text-md h-12 overflow-hidden font-semibold text-gray-600'>{b.title}</h1>
                            <div className="mb-2 text-xs text-gray-500 w-full flex justify-between items-center lg:pr-20">
                                <p>Author: {b.authorName}</p>
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


                                {
                                    admin && <button onClick={() => { handleDelete(`${b._id}`) }} className='text-white bg-red-500 p-2 rounded-full hover:bg-white hover:border hover:border-red-500 hover:text-red-500 border-white border'><FaTrashAlt className='text-lg' /></button>
                                }


                            </div>
                            <dialog id="my_modal_3" className="modal">
                                <div className="modal-box w-11/12 max-w-5xl px-4 py-10 md:p-10">
                                    <h1 className='text-md font-semibold text-gray-600'>{b.title}</h1>
                                    <div className="mb-2 text-xs text-gray-500 w-full flex justify-between items-center lg:pr-20">
                                        <p>Author: {b.authorName}</p>
                                        <p>Published in: {new Date(b.postedIn).toLocaleDateString()}</p>
                                    </div>
                                    <div className={`relative  w-full pt-4`}>
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
    );
};

export default Blogs;