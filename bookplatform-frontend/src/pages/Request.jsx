import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ExchangeService from '../services/exchangeService';
import StatusModel from '../ui/StatusModal';

const Request = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const exchange = new ExchangeService();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await exchange.get();
                setRequests(res.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError('No requests found.');
                toast.error('Failed to fetch requests.');
            }
        };

        fetchRequests();
    }, []);

    const openSelectModal = (request) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    const closeSelectModal = () => {
        setIsModalOpen(false);
        setSelectedRequest(null);
    };

    const handleStatusChange = async (status) => {
        try {
            await exchange.update(selectedRequest._id, status);
            toast.success('Status updated successfully');
            const res = await exchange.get();
            setRequests(res.data);
            closeSelectModal();
        } catch (err) {
            toast.error('Failed to update status.');
        }
    };

    if (loading) return <div>Loading...</div>;

    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 p-24 text-center">Exchange Requests</h1>
            <div className="overflow-x-auto">
                {requests.length === 0 ? (
                    <div className="text-gray-500">No requests found.</div>
                ) : (
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr className="text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                                <th className="px-4 py-2 text-left">Sender</th>
                                <th className="px-4 py-2 text-left">Receiver</th>
                                <th className="px-4 py-2 text-left">Sender Book</th>
                                <th className="px-4 py-2 text-left">Receiver Book</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Date</th>
                                <th className='px-4 py-2 text-left'>Change Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request._id} className="border-b border-gray-200 bg-gradient-to-r from-gray-100 to-gray-200 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300">
                                    <td className="px-4 py-2">{request.sender.name}</td>
                                    <td className="px-4 py-2">{request.receiver.name}</td>
                                    <td className="px-4 py-2">{request.senderBook.title}</td>
                                    <td className="px-4 py-2">{request.receiverBook.title}</td>
                                    <td className="px-4 py-2">{request.status}</td>
                                    <td className="px-4 py-2">{new Date(request.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => openSelectModal(request)}
                                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                        >
                                            Change Status
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {selectedRequest && (
                <StatusModel
                    isOpen={isModalOpen}
                    onClose={closeSelectModal}
                    request={selectedRequest}
                    onStatusChange={handleStatusChange}
                />
            )}
        </div>
    );
};

export default Request;
