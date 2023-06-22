import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const NewProduct = () => {
  const [product, setProduct] = useState({ name: "", price: "", description: "" });
  const { username } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/v1/products", { ...product, username });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg m-20">
      <h1 className="text-lg font-medium mb-4">Add New Product</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="w-full border border-gray-400 p-2 rounded-lg"
          type="text"
          id="name"
          value={product.name}
          onChange={(event) => setProduct({ ...product, name: event.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="price">
          Price
        </label>
        <input
          className="w-full border border-gray-400 p-2 rounded-lg"
          type="number"
          id="price"
          value={product.price}
          onChange={(event) => setProduct({ ...product, price: event.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          className="w-full border border-gray-400 p-2 rounded-lg"
          id="description"
          value={product.description}
          onChange={(event) => setProduct({ ...product, description: event.target.value })}
        />
      </div>
      <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg">
        Add Product
      </button>
    </form>
  );
};

export default NewProduct;
