import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ExchangeService from '../services/exchangeService';
import GetBook from '../ui/GetBook';
import toast from 'react-hot-toast'
const MatchingTable = ({ books }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [senderBookId, setSenderBookId] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };
    const openSelectModal = (book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    const closeSelectModal = () => {
        setIsModalOpen(false);
        setSelectedBook(null);
    };

    const handleBookSelection = (bookId) => {
        setSenderBookId(bookId);
        closeSelectModal();
    };

    const exchangeService = new ExchangeService();

    const onExchangeRequest = async (receiverBookId, bookOwnerId) => {
        try {
            await exchangeService.exchangeRequest(user._id, bookOwnerId, senderBookId, receiverBookId);
            toast.success("Request Successfully sent to user")
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                            <th className="px-4 py-2 text-left">Title</th>
                            <th className="px-4 py-2 text-left">Author</th>
                            <th className="px-4 py-2 text-left">Genre</th>
                            <th className="px-4 py-2 text-left">Owner</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                            <th className="px-4 py-2 text-left">Select Book</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.length > 0 ? (
                            books.map((book, index) => (
                                <motion.tr
                                    key={book._id}
                                    variants={rowVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="border-b border-gray-200 bg-gradient-to-r from-gray-100 to-gray-200 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300"
                                >
                                    <td className="px-4 py-2">{book.title}</td>
                                    <td className="px-4 py-2">{book.author}</td>
                                    <td className="px-4 py-2">{book.genre}</td>
                                    <td className="px-4 py-2">{book.owner.name}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => onExchangeRequest(book._id, book.owner)}
                                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                        >
                                            Request Exchange
                                        </button>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => openSelectModal(book)}
                                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                        >
                                            Select
                                        </button>
                                    </td>
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-xl py-4 text-red-500">
                                    No books found related to your preferences
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>
            </div>
            {selectedBook && (
                <GetBook
                    isOpen={isModalOpen}
                    onClose={closeSelectModal}
                    book={selectedBook}
                    onSelectBook={handleBookSelection}
                    senderBookId={senderBookId}
                />
            )}
        </div>
    );
};

export default MatchingTable;
