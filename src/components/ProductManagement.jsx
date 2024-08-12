import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductTable from './ProductTable';
import SearchFilter from './SearchFilter';
import CreateProductForm from './CreateProductForm';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [releaseDateFilter, setReleaseDateFilter] = useState('');
    const [categories, setCategories] = useState([]); // State for categories

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchTerm, categoryFilter, releaseDateFilter, products]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/products');
            setProducts(response.data);
            updateCategories(response.data); // Update categories when fetching products
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const updateCategories = (products) => {
        const uniqueCategories = Array.from(new Set(products.map(product => product.category)));
        setCategories(uniqueCategories);
    };

    const createProduct = async (product) => {
        try {
            await axios.post('http://localhost:3000/products', product);
            fetchProducts(); // Refresh products and categories after adding a new product
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const updateProduct = async (id, updatedProduct) => {
        try {
            await axios.put(`http://localhost:3000/products/${id}`, updatedProduct);
            fetchProducts(); // Refresh products and categories after updating a product
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/products/${id}`);
            fetchProducts(); // Refresh products and categories after deleting a product
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const applyFilters = () => {
        let filtered = products;

        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (categoryFilter) {
            filtered = filtered.filter(product =>
                product.category === categoryFilter
            );
        }

        if (releaseDateFilter) {
            filtered = filtered.filter(product =>
                product.releaseDate === releaseDateFilter
            );
        }

        setFilteredProducts(filtered);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Products List</h1>

            {/* Search and Filter */}
            <SearchFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                releaseDateFilter={releaseDateFilter}
                setReleaseDateFilter={setReleaseDateFilter}
                categories={categories} // Pass categories to SearchFilter
            />

            {/* Display counts */}
            <div className="mb-4">
                <p>Total Products: {products.length}</p>
                <p>Products After Filtering: {filteredProducts.length}</p>
            </div>

            {/* Product Table */}
            <ProductTable
                products={filteredProducts}
                updateProduct={updateProduct}
                deleteProduct={deleteProduct} // Pass deleteProduct function to ProductTable
            />

            {/* Create Product */}
            <CreateProductForm createProduct={createProduct} />
        </div>
    );
};

export default ProductManagement;
