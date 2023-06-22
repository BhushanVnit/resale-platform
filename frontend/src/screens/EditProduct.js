import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = (props) => {
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get(`http://localhost:8000/api/v1/products/${productId}`);
        setProduct(response.data.data.product);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [productId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch("http://localhost:8000/api/v1/products/" + product._id, {
        name: product.name,
        price: product.price,
        description: product.description,
      });
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="m-20 p-10 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
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
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
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
          <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="w-full border border-gray-400 p-2 rounded-lg"
            id="description"
            value={product.description}
            onChange={(event) => setProduct({ ...product, description: event.target.value })}
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
          Submit
        </button>
      </form>

    </div>
  );
};

export default EditProduct;
