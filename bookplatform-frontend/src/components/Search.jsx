import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BookService from '../services/bookService';

const Search = ({ onSearchResults }) => {
    const [searchParams, setSearchParams] = useState({
        title: '',
        author: '',
        genre: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
    };

    const searchBooks = async () => {
        const { title, author, genre } = searchParams;
        if (!title && !author && !genre) {
            setError('Please enter a search parameter.');
            return;
        }

        const bookService = new BookService();
        setLoading(true);
        setError('');
        try {
            const result = await bookService.search(searchParams);
            onSearchResults(result);
        } catch (error) {
            console.error('Error fetching books:', error);
            setError('Error fetching books. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8">
            <motion.h1
                className="text-4xl text-white font-bold mb-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                Discover Books
            </motion.h1>
            <div className="max-w-3xl mx-auto mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <motion.input
                        type="text"
                        name="title"
                        placeholder="Search by title"
                        value={searchParams.title}
                        onChange={handleInputChange}
                        className="p-3 rounded-md shadow-md focus:ring-2 focus:ring-purple-500"
                        whileHover={{ scale: 1.05 }}
                        whileFocus={{ scale: 1.05 }}
                    />
                    <motion.input
                        type="text"
                        name="author"
                        placeholder="Search by author"
                        value={searchParams.author}
                        onChange={handleInputChange}
                        className="p-3 rounded-md shadow-md focus:ring-2 focus:ring-purple-500"
                        whileHover={{ scale: 1.05 }}
                        whileFocus={{ scale: 1.05 }}
                    />
                    <motion.input
                        type="text"
                        name="genre"
                        placeholder="Search by genre"
                        value={searchParams.genre}
                        onChange={handleInputChange}
                        className="p-3 rounded-md shadow-md focus:ring-2 focus:ring-purple-500"
                        whileHover={{ scale: 1.05 }}
                        whileFocus={{ scale: 1.05 }}
                    />
                </div>
                <motion.button
                    onClick={searchBooks}
                    className="w-full p-3 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </motion.button>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>
        </div>
    );
};

export default Search;
