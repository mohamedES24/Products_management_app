import React, { useState } from 'react';

const CreateProductForm = ({ createProduct,updateCategories }) => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        releaseDate: '',
        category: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'price' && (value.startsWith('0') && value.length > 1)) {
            return; // Prevent input if it starts with a leading zero and is more than one digit
        }

        setNewProduct(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const errors = {};
        if (!newProduct.name || newProduct.name.length < 5 || /\d/.test(newProduct.name)) {
            errors.name = 'Name must be at least 5 characters long and contain no numbers';
        }
        if (!newProduct.description || newProduct.description.length <= 10) {
            errors.description = 'Description must be more than 10 characters';
        }
        if (!newProduct.price || isNaN(newProduct.price) || newProduct.price <= 0 || newProduct.price > 10000000) {
            errors.price = 'Price must be a positive number greater than zero and not exceed 10 million';
        }
        if (!newProduct.releaseDate) {
            errors.releaseDate = 'Release Date is required';
        } else {
            const [year, month, day] = newProduct.releaseDate.split('-').map(Number);
            if (year < 2007) errors.releaseDate = 'Year must be 2007 or later';
            if (month < 1 || month > 12) errors.releaseDate = 'Month must be between 01 and 12';
            if (day < 1 || day > 31) errors.releaseDate = 'Day must be between 01 and 31';
        }
        if (!newProduct.category || newProduct.category.length > 20) {
            errors.category = 'Category must be 20 characters or less';
        }
        return errors;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            createProduct({
                ...newProduct,
                createdAt: new Date().toISOString(), // Add createdAt date
                updatedAt: new Date().toISOString(), // Add updatedAt date
            });
    
            setNewProduct({
                name: '',
                description: '',
                price: '',
                releaseDate: '',
                category: ''
            });
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };
    

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Create New Product</h2>
            <form className="flex flex-wrap gap-4" onSubmit={handleSubmit}>
                <div className="flex-1">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className={`p-2 border border-gray-300 rounded w-full ${errors.name ? 'border-red-500' : ''}`}
                        value={newProduct.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div className="flex-1">
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        className={`p-2 border border-gray-300 rounded w-full ${errors.description ? 'border-red-500' : ''}`}
                        value={newProduct.description}
                        onChange={handleChange}
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>
                <div className="flex-1">
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        className={`p-2 border border-gray-300 rounded w-full ${errors.price ? 'border-red-500' : ''}`}
                        value={newProduct.price}
                        onChange={handleChange}
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                </div>
                <div className="flex-1">
                    <input
                        type="date"
                        name="releaseDate"
                        className={`p-2 border border-gray-300 rounded w-full ${errors.releaseDate ? 'border-red-500' : ''}`}
                        value={newProduct.releaseDate}
                        onChange={handleChange}
                    />
                    {errors.releaseDate && <p className="text-red-500 text-sm">{errors.releaseDate}</p>}
                </div>
                <div className="flex-1">
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        className={`p-2 border border-gray-300 rounded w-full ${errors.category ? 'border-red-500' : ''}`}
                        value={newProduct.category}
                        onChange={handleChange}
                    />
                    {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                </div>
                <div className="flex-1">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded w-full"
                    >
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProductForm;
