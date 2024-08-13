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

        // Prevent leading zero in price
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
                updatedAt: new Date().toISOString() // Set updatedAt to current date
            };
            await updateProduct(productId, updatedProduct);
            setEditingProduct(null);
            setErrors({});
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [productId]: validationErrors // Ensure this line correctly maps errors to the productId
            }));
        }
    };
    
    
    const handleCancelEdit = () =>{
        setEditingProduct(null);
        setErrors({});
    }

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
        <div>
            {showWarningCard && (
                <WarningCard
                    message="Are you sure you want to delete this product?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}

            <table className="min-w-full bg-white border border-gray-300">
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
                    {products.map(product => (
                        <tr key={product.id}>
                            <td className="py-2 px-4 border-b">
                                {editingProduct === product.id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={editedProduct.name}
                                        onChange={handleChange}
                                        className={`p-2 border border-gray-300 rounded w-full ${errors.name ? 'border-red-500' : ''}`}
                                    />
                                ) : (
                                    product.name
                                )}
                                {errors[product.id]?.name && <p className="text-red-500 text-sm">{errors[product.id].name}</p>}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {editingProduct === product.id ? (
                                    <input
                                        type="text"
                                        name="description"
                                        value={editedProduct.description}
                                        onChange={handleChange}
                                        className={`p-2 border border-gray-300 rounded w-full ${errors.description ? 'border-red-500' : ''}`}
                                    />
                                ) : (
                                    product.description
                                )}
                                {errors[product.id]?.description && <p className="text-red-500 text-sm">{errors[product.id].description}</p>}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {editingProduct === product.id ? (
                                    <input
                                        type="text"
                                        name="price"
                                        value={editedProduct.price}
                                        onChange={handleChange}
                                        className={`p-2 border border-gray-300 rounded w-full ${errors.price ? 'border-red-500' : ''}`}
                                    />
                                ) : (
                                    `$${Number(product.price).toFixed(2)}`
                                )}
                                {errors[product.id]?.price && <p className="text-red-500 text-sm">{errors[product.id].price}</p>}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {editingProduct === product.id ? (
                                    <input
                                        type="date"
                                        name="releaseDate"
                                        value={editedProduct.releaseDate}
                                        onChange={handleChange}
                                        className={`p-2 border border-gray-300 rounded w-full ${errors.releaseDate ? 'border-red-500' : ''}`}
                                    />
                                ) : (
                                    product.releaseDate
                                )}
                                {errors[product.id]?.releaseDate && <p className="text-red-500 text-sm">{errors[product.id].releaseDate}</p>}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {editingProduct === product.id ? (
                                    <input
                                        type="text"
                                        name="category"
                                        value={editedProduct.category}
                                        onChange={handleChange}
                                        className={`p-2 border border-gray-300 rounded w-full ${errors.category ? 'border-red-500' : ''}`}
                                    />
                                ) : (
                                    product.category
                                )}
                                {errors[product.id]?.category && <p className="text-red-500 text-sm">{errors[product.id].category}</p>}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {product.createdAt}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {editingProduct === product.id ? (
                                    'Not Edited Yet'
                                ) : (
                                    product.updatedAt
                                )}
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
                                            onClick={handleCancelEdit}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex gap-2">
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
