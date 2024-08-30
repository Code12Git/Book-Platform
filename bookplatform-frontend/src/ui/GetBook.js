import React, { useState, useEffect } from 'react';
import BookService from '../services/bookService';

const GetBook = ({ isOpen, onClose, book, onSelectBook, senderBookId }) => {
    const [bookData, setBookData] = useState([]);
    const bookService = new BookService();

    useEffect(() => {
        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    const fetchData = async () => {
        try {
            const response = await bookService.get();
            setBookData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectBook = (bookId) => {
        onSelectBook(bookId);  
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="overflow-x-auto mt-8">
                    <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-white">
                                <th className="px-6 py-3 text-left text-sm font-semibold">Author</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Genre</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Select</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookData && bookData.length > 0 ? (
                                bookData.map((item) => (
                                    <tr key={item._id} className="border-b hover:bg-gray-100">
                                        <td className="px-6 py-4">{item.author}</td>
                                        <td className="px-6 py-4">{item.title}</td>
                                        <td className="px-6 py-4">{item.description}</td>
                                        <td className="px-6 py-4">{item.genre}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleSelectBook(item._id)}
                                                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                                            >
                                                Select
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-gray-500">
                                        No Books Available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GetBook;
