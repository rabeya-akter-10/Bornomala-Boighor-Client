import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom/dist";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetch("https://bornomala-boighor-server.vercel.app/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
      });
  }, []);

  const handleLink = (c) => {
    navigate(`/categories/${c}`)
  }


  // Scroll to top
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  return (
    <div className="min-h-[80vh] w-full px-4 ">
      <h1 className="text-center py-5 text-xl text-green-500 underline">ক্যাটাগরি সমুহ</h1>

      <div className="w-full max-w-xl grid grid-cols-1 md:grid-cols-2 mx-auto  gap-3 pb-16">
        {categories.map((category) => (
          <div key={category._id} >
            <p onClick={() => {
              handleLink(`${category.cat}`)
            }} className="px-4 py-2 border border-gray-400 rounded-md hover:bg-slate-100 cursor-pointer shadow-md hover:shadow-success">{category.cat}</p>
          </div>
        ))}
      </div>
    </div >
  );
};

export default Categories;
