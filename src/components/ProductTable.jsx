import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WarningCard from './WarningCard';
import { validateProduct } from '../utils/Validation';

const ProductTable = ({ products, updateProduct, deleteProduct }) => {
    const [editingProduct, setEditingProduct] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});
    const [errors, setErrors] = useState({});
    const [showWarningCard, setShowWarningCard] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const handleEditClick = (product) => {
        setEditingProduct(product.id);
        setEditedProduct({ ...product });
        setErrors({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'price') {
            if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
                setEditedProduct((prev) => ({ ...prev, [name]: value }));
            }
        } else {
            setEditedProduct((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleUpdate = async (productId) => {
        const validationErrors = validateProduct({ editedProduct }, 'editedProduct');
        if (Object.keys(validationErrors).length === 0) {
            const updatedProduct = {
                ...editedProduct,
                updatedAt: new Date().toISOString()
            };
            await updateProduct(productId, updatedProduct);
            setEditingProduct(null);
            setErrors({});
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [productId]: validationErrors
            }));
        }
    };

    const handleDeleteClick = (productId) => {
        setProductToDelete(productId);
        setShowWarningCard(true);
    };

    const confirmDelete = async () => {
        await deleteProduct(productToDelete);
        setShowWarningCard(false);
        setProductToDelete(null);
    };

    const cancelDelete = () => {
        setShowWarningCard(false);
        setProductToDelete(null);
    };

    return (
        <div className="overflow-x-auto">
            {showWarningCard && (
                <WarningCard
                    message="Are you sure you want to delete this product?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
            <table className="min-w-full bg-white border border-gray-300 text-sm md:text-base">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Price</th>
                        <th className="py-2 px-4 border-b">Release Date</th>
                        <th className="py-2 px-4 border-b">Category</th>
                        <th className="py-2 px-4 border-b">Created At</th>
                        <th className="py-2 px-4 border-b">Updated At</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="py-2 px-4 border-b">
                                {editingProduct === product.id ? (
                                    <>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editedProduct.name}
                                            onChange={handleChange}
                                            className={`p-2 border border-gray-300 rounded w-full ${errors[product.id]?.name ? 'border-red-500' : ''}`}
                                        />
                                        {errors[product.id]?.name && (
                                            <p className="text-red-500 text-xs">{errors[product.id].name}</p>
                                        )}
                                    </>
                                ) : (
                                    product.name
                                )}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {editingProduct === product.id ? (
                                    <>
                                        <input
                                            type="text"
                                            name="description"
                                            value={editedProduct.description}
                                            onChange={handleChange}
                                            className={`p-2 border border-gray-300 rounded w-full ${errors[product.id]?.description ? 'border-red-500' : ''}`}
                                        />
                                        {errors[product.id]?.description && (
                                            <p className="text-red-500 text-xs">{errors[product.id].description}</p>
                                        )}
                                    </>
                                ) : (
                                    product.description
                                )}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {editingProduct === product.id ? (
                                    <>
                                        <input
                                            type="text"
                                            name="price"
                                            value={editedProduct.price}
                                            onChange={handleChange}
                                            className={`p-2 border border-gray-300 rounded w-full ${errors[product.id]?.price ? 'border-red-500' : ''}`}
                                        />
                                        {errors[product.id]?.price && (
                                            <p className="text-red-500 text-xs">{errors[product.id].price}</p>
                                        )}
                                    </>
                                ) : (
                                    `$${Number(product.price).toFixed(2)}`
                                )}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {editingProduct === product.id ? (
                                    <input
                                        type="date"
                                        name="releaseDate"
                                        value={editedProduct.releaseDate}
                                        onChange={handleChange}
                                        className={`p-2 border border-gray-300 rounded w-full ${errors[product.id]?.releaseDate ? 'border-red-500' : ''}`}
                                    />
                                ) : (
                                    product.releaseDate
                                )}
                                {errors[product.id]?.releaseDate && <p className="text-red-500 text-xs">{errors[product.id].releaseDate}</p>}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {editingProduct === product.id ? (
                                    <>
                                        <input
                                            type="text"
                                            name="category"
                                            value={editedProduct.category}
                                            onChange={handleChange}
                                            className={`p-2 border border-gray-300 rounded w-full ${errors[product.id]?.category ? 'border-red-500' : ''}`}
                                        />
                                        {errors[product.id]?.category && (
                                            <p className="text-red-500 text-xs">{errors[product.id].category}</p>
                                        )}
                                    </>
                                ) : (
                                    product.category
                                )}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {product.createdAt}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {product.updatedAt || 'Not Edited Yet'}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {editingProduct === product.id ? (
                                    <div className="flex gap-2">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleUpdate(product.id)}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="bg-gray-500 text-white px-4 py-2 rounded"
                                            onClick={() => setEditingProduct(null)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2 sm:flex-row">
                                        <Link
                                            to={`/products/${product.id}`}
                                            className="bg-blue-500 text-white px-4 py-2 rounded inline-block text-center"
                                        >
                                            Show Product
                                        </Link>
                                        <button
                                            className="bg-yellow-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleEditClick(product)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleDeleteClick(product.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
