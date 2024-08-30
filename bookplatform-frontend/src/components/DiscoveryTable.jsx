import React from 'react';
import { motion } from 'framer-motion';

const DiscoveryTable = ({ books }) => {
    return (
        <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                            <th className="px-4 py-2 text-left">Title</th>
                            <th className="px-4 py-2 text-left">Author</th>
                            <th className="px-4 py-2 text-left">Genre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books && books.length > 0 ? (
                            books.map((book, index) => (
                                <motion.tr
                                    key={book._id}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="border-b border-gray-200 bg-gradient-to-r from-gray-100 to-gray-200 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300"
                                >
                                    <td className="px-4 py-2">{book.title}</td>
                                    <td className="px-4 py-2">{book.author}</td>
                                    <td className="px-4 py-2">{book.genre}</td>
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center text-xl py-4 text-red-500">
                                    No books found related to your preferences
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DiscoveryTable;
