import React from 'react';

const ConfirmationModal = ({ onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold">Confirm Delete</h2>
                <p className="mt-4">Are you sure you want to delete this job?</p>
                <div className="mt-6 flex justify-end space-x-4">
                    <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
