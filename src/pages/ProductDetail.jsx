import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
const ProductDetail = () => {
  const { productId } = useParams(); // Get productId from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        setError('Error fetching product details');
      }
    };

    fetchProduct();
  }, [productId]);

  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen p-4">
    <img
      src="https://mdb-community.s3.amazonaws.com/dark-mode-theme/dark-mode-bg.svg"
      alt="Background"
      className="absolute inset-0 object-cover w-full h-full z-negative "
    />
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full transition-shadow duration-300 ease-in-out hover:shadow-xl z-10 relative">
      <h1 className="text-2xl font-bold mb-4">Product Detail</h1>
      <p className="text-lg mb-2"><strong>Name:</strong> {product.name}</p>
      <p className="text-lg mb-2"><strong>Description:</strong> {product.description}</p>
      <p className="text-lg mb-2"><strong>Price:</strong> ${product.price}</p>
      <p className="text-lg mb-2"><strong>Release Date:</strong> {product.releaseDate}</p>
      <p className="text-lg mb-4"><strong>Category:</strong> {product.category}</p>
      <p className="text-lg mb-4"><strong>Created At:</strong> {product.createdAt}</p>
      <p className="text-lg mb-4"><strong>Updated At:</strong> {product.updatedAt}</p>
    </div>
      <Link 
        to="/products" 
        className="bg-green-500 text-white px-4 py-2 my-4 rounded hover:bg-green-600 transition-colors duration-300 ease-in-out"
      >
        Back to Products
      </Link>
  </div>

  );
};

export default ProductDetail;
