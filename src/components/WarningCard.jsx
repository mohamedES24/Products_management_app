import React from 'react';

const WarningCard = ({ onConfirm, onCancel }) => (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow-lg p-4 rounded">
        <h2 className="text-xl font-bold mb-4">Warning</h2>
        <p className="mb-4">Are you sure you want to delete this product?</p>
        <div className="flex justify-end gap-2">
            <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={onConfirm}
            >
                Delete
            </button>
            <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={onCancel}
            >
                Cancel
            </button>
        </div>
    </div>
);

export default WarningCard;