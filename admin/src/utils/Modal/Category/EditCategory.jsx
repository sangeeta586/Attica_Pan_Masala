// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useLocation, useNavigate } from 'react-router-dom';

// function EditCategory() {
//   const navigate = useNavigate()
//   const location = useLocation();
//   const path = location.pathname.split('/')
//   const catId = path[2];

//   const [formData, setFormData] = useState({
//     name: "",
//     status: "",
//   });

//   useEffect(() => {
//     const fetchCategory = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/api/categorys/${catId}`);
//         setFormData(response.data);
//       } catch (error) {
//         console.error("Error fetching category:", error);
//       }
//     };

//     fetchCategory();
//   }, [catId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleCancel = (e) => {
//    navigate("/category")
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(`${BASE_URL}/api/categorys/${catId}`, formData);
//       console.log(response)
//       if (response.status === 200) {
//         toast.success("Category updated successfully");
//       }
//     } catch (error) {
//       console.error("Error updating category:", error);
//       toast.error("Failed to update category");
//     }
    
//   };

//   return (
//     <>
      
//       <ToastContainer />
//       <div className="pt-6 mb-4 text-4xl item-center font-bold text-center text-gray-900">
//         <h3>Edit Category</h3>
//       </div>
//       <div className="border border-black rounded-lg py-5 px-6 mx-auto w-1/3">
//         <form onSubmit={handleSubmit}>
//           <div className="flex flex-row">
//             <div className="w-1/2 pr-2">
//               <label htmlFor="name" className="block my-2 text-left text-sm font-medium text-gray-900">
//                 NAME
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 id="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//                 placeholder="Enter Category Name"
//                 required
//               />
//             </div>
//           </div>

//           <div className="flex flex-row">
//             <div className="w-1/2 pr-2">
//               <label className="block my-2 text-left text-sm font-medium text-gray-900">
//                 Status
//               </label>
//               <div>
//                 <input
//                   type="radio"
//                   id="active"
//                   name="status"
//                   value="active"
//                   checked={formData.status === "active"}
//                   onChange={handleChange}
//                 />
//                 <label htmlFor="active" className="ml-2">
//                   Active
//                 </label>
//               </div>
//               <div>
//                 <input
//                   type="radio"
//                   id="inactive"
//                   name="status"
//                   value="inactive"
//                   checked={formData.status === "inactive"}
//                   onChange={handleChange}
//                 />
//                 <label htmlFor="inactive" className="ml-2">
//                   Inactive
//                 </label>
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 item-center">
//             <div className="flex gap-10 content-center items-center">
//             <button
//               type="submit"
//               className="mt-2 p-2 text-white rounded-lg border-green-600 bg-purple-600 hover:scale-105"
//             >
//               Update Category
//             </button>

//             <button onClick={handleCancel}
//               type="submit"
//               className="mt-2 p-2 text-white rounded-lg border-green-600 bg-yellow-400 hover:scale-105"
//             >
//               Cancel
//             </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

// export default EditCategory;
