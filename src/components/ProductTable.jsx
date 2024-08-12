import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WarningCard from './WarningCard';

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

    const validate = () => {
        const errors = {};
        if (!editedProduct.name || editedProduct.name.length < 5 || /\d/.test(editedProduct.name)) {
            errors.name = 'Name must be at least 5 characters long and contain no numbers';
        }
        if (!editedProduct.description || editedProduct.description.length <= 10) {
            errors.description = 'Description must be more than 10 characters';
        }
        if (!editedProduct.price || isNaN(editedProduct.price) || editedProduct.price <= 0 || editedProduct.price > 10000000) {
            errors.price = 'Price must be a positive number greater than zero and not exceed 10 million';
        }
        if (!editedProduct.releaseDate) {
            errors.releaseDate = 'Release Date is required';
        } else {
            const [year, month, day] = editedProduct.releaseDate.split('-').map(Number);
            if (year < 2007) errors.releaseDate = 'Year must be 2007 or later';
            if (month < 1 || month > 12) errors.releaseDate = 'Month must be between 01 and 12';
            if (day < 1 || day > 31) errors.releaseDate = 'Day must be between 01 and 31';
        }
        if (!editedProduct.category || editedProduct.category.length > 20) {
            errors.category = 'Category must be 20 characters or less';
        }
        return errors;
    };

    const handleUpdate = async (productId) => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            const updatedProduct = {
                ...editedProduct,
                updatedAt: new Date().toISOString() // Set updatedAt to current date
            };
            await updateProduct(productId, updatedProduct);
            setEditingProduct(null);
            setErrors({});
        } else {
            setErrors(validationErrors);
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
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
                                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
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
                                {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
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
                                {errors.releaseDate && <p className="text-red-500 text-sm">{errors.releaseDate}</p>}
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
                                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
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
                                            onClick={() => setEditingProduct(null)}
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
