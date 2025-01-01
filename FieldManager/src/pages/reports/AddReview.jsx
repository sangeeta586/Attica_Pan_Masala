import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import RangeSlider from "./RangeSlider";

const AddReview = ({ selectedProduct, setShowModal }) => {
  const fieldManagerId = localStorage.getItem("fieldManager_Id");
  const URI = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    fieldManagerId: fieldManagerId,
    productId: selectedProduct?._id || "",
    productName: selectedProduct?.title || "",
    fragrance: 1,
    tasteAndFlavor: 1,
    reviews: 1,
    productSimilarity: "",
    locations: [],
    createdAt: "",
    updatedAt: "",
  });

  const [loading, setLoading] = useState(false);
  const [isProductReviewed, setIsProductReviewed] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setFormData((prevData) => ({
        ...prevData,
        productId: selectedProduct._id,
        productName: selectedProduct.title,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

      // Check if the product is already reviewed
      const existingData = JSON.parse(localStorage.getItem("myData")) || [];
      const productReviewed = existingData.some(
        (data) => data.Product._id === selectedProduct._id
      );
      setIsProductReviewed(productReviewed);
    }
  }, [selectedProduct]);

  const handleSliderChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      formData.fragrance < 1 ||
      formData.fragrance > 10 ||
      formData.tasteAndFlavor < 1 ||
      formData.tasteAndFlavor > 10 ||
      formData.reviews < 1 ||
      formData.reviews > 10
    ) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Ratings",
        text: "Ratings must be between 1 and 10 for fragrance, taste & flavor, and overall review.",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${URI}/api/showCase/showcase`,
        formData
      );
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data.message || "Review submitted successfully.",
      });
      setShowModal(false);

      const newData = {
        review: response.data,
        Product: selectedProduct,
      };

      const existingData = JSON.parse(localStorage.getItem("myData")) || [];
      existingData.push(newData);
      localStorage.setItem("myData", JSON.stringify(existingData));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "An error occurred while submitting the review.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Add Review for{" "}
        <span className="text-red-500">{formData.productName}</span>
      </h2>
      <form onSubmit={handleSubmit}>
        <RangeSlider
          label={<span className="block text-center text-xl">Fragrance</span>}
          value={formData.fragrance}
          onChange={(value) => handleSliderChange("fragrance", value)}
        />
        <RangeSlider
          label={
            <span className="block text-center text-xl">Taste & Flavor</span>
          }
          value={formData.tasteAndFlavor}
          onChange={(value) => handleSliderChange("tasteAndFlavor", value)}
        />

        <div className="mb-6">
          <label
            htmlFor="productSimilarity"
            className="block text-xl text-center font-medium text-gray-700 "
          >
            Product Similarity
          </label>
          <input
            type="text"
            id="productSimilarity"
            name="productSimilarity"
            value={formData.productSimilarity}
            onChange={(e) =>
              setFormData({ ...formData, productSimilarity: e.target.value })
            }
            placeholder="Enter product similarity"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <RangeSlider
          label={
            <span className="block text-center text-xl">Overall Rating </span>
          }
          value={formData.reviews}
          onChange={(value) => handleSliderChange("reviews", value)}
        />

        <button
          type="submit"
          className={`w-full py-3 px-5 mt-4 ${
            isProductReviewed || loading ? "bg-gray-400" : "bg-blue-600"
          } text-white font-semibold rounded-lg`}
          disabled={isProductReviewed || loading}
        >
          {isProductReviewed
            ? "Already Reviewed"
            : loading
            ? "Submitting..."
            : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default AddReview;
