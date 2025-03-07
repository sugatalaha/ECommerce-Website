import React, { useState } from "react";
import axios from "axios";
import backendUrl from "../constanst/backendUrl";
import { toast } from "react-toastify";

export const Add = () => {
  const [images, setImages] = useState([null, null, null, null]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [productType, setProductType] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [price, setPrice] = useState("");

  const handleImageUpload = (index, file) => {
    if (file) {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
    }
  };

  const handleSizeChange = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      console.log(images);
      formData.append("image1", images[0]);
      formData.append("image2", images[1]);
      formData.append("image3", images[2]);
      formData.append("image4", images[3]);
      formData.append("name", productName);
      formData.append("category", category);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("description", description);
      formData.append("bestseller", bestSeller);
      formData.append("type", productType);
      formData.append("price", price);

      const response = await axios.post(`${backendUrl}/api/products/add`, formData, { withCredentials: true });
      toast.success(response.data.message);
      setBestSeller(false);
      setCategory("");
      setPrice("");
      setProductType("");
      setDescription("");
      setImages([]);
      setSizes([]);
      setProductName("");
    } catch (error) {
      console.log("Error in handleAddProduct ", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pl-4 pr-4 bg-white shadow-lg rounded-lg mt-5">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {images.map((img, index) => (
          <div key={index} className="w-24 h-24 border rounded-lg flex items-center justify-center relative overflow-hidden">
            {img ? (
              <img src={URL.createObjectURL(img)} alt={`Upload ${index}`} className="w-full h-full object-cover rounded-lg" />
            ) : (
              <label className="absolute inset-0 flex items-center justify-center text-gray-500 border-2 border-dashed cursor-pointer">
                +
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(index, e.target.files[0])} />
              </label>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block font-medium">Product Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required={true}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Product Description</label>
          <textarea
            className="w-full p-2 border rounded-lg"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required={true}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium">Product Category</label>
            <select className="w-full p-2 border rounded-lg" value={category} onChange={(e) => setCategory(e.target.value)} required={true}>
              <option value="">Select Category</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Product Type</label>
            <select className="w-full p-2 border rounded-lg" value={productType} onChange={(e) => setProductType(e.target.value)} required={true}>
              <option value="">Select Sub-category</option>
              <option value="topwear">Topwear</option>
              <option value="bottomwear">Bottomwear</option>
              <option value="winterwear">Winterwear</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Available Sizes</label>
          <div className="flex gap-4 mt-2">
            {["S", "M", "XL", "XXL"].map((size) => (
              <label key={size} className="flex items-center space-x-2">
                <input type="checkbox" checked={sizes.includes(size)} onChange={() => handleSizeChange(size)} />
                <span>{size}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={bestSeller} onChange={() => setBestSeller(!bestSeller)} />
            <span>Mark as Best-Seller</span>
          </label>
          <div className="w-1/3">
            <label className="block font-medium">Price</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required={true}
            />
          </div>
        </div>

        <button type="submit" className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
};
