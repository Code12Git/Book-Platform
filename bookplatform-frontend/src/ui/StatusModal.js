import React, { useState } from 'react';

const StatusModel = ({ isOpen, onClose, request, onStatusChange }) => {
    const [status, setStatus] = useState(request.status || '');

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onStatusChange(status);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Status</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={status}
                            onChange={handleStatusChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Update Status
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StatusModel;
