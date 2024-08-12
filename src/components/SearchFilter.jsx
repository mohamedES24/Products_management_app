import React from 'react';

const SearchFilter = ({ searchTerm, setSearchTerm, categoryFilter, setCategoryFilter, releaseDateFilter, setReleaseDateFilter, categories }) => {
    return (
        <div className="mb-4">
            {/* Search */}
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name"
                className="p-2 border border-gray-300 rounded w-full mb-2"
            />

            {/* Category Filter */}
            <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full mb-2"
            >
                <option value="">All Categories</option>
                {categories.map(category => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            {/* Release Date Filter */}
            <input
                type="date"
                value={releaseDateFilter}
                onChange={(e) => setReleaseDateFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
            />
        </div>
    );
};

export default SearchFilter;
