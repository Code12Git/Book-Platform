import React, { useState } from 'react';
import { motion } from 'framer-motion';
import bookValidation from '../validation/bookValidation';
import BookService from '../services/bookService';
import toast from 'react-hot-toast';
const BookForm = ({ fetchData }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        genre: '',
    });
    const [errors, setErrors] = useState({});

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const validationErrors = bookValidation(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const book = new BookService()

        try {

            await book.create(formData);
            setFormData({
                title: '',
                author: '',
                description: '',
                genre: '',
            });
            setErrors('')
            toast.success("Book created successfully");
            fetchData()
        } catch (err) {
            throw err;
        }
    };

    return (
        <motion.div
            className="max-w-md mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <motion.h2
                className="text-2xl font-bold text-gray-800 mb-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                Add a New Book
            </motion.h2>
            <form onSubmit={submitHandler}>
                <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={inputChangeHandler}
                        placeholder="Enter book title"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </motion.div>
                <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="author">Author</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={inputChangeHandler}
                        placeholder="Enter author's name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
                </motion.div>
                <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={inputChangeHandler}
                        placeholder="Enter book description"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        rows="4"
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </motion.div>
                <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="genre">Genre</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={inputChangeHandler}
                        placeholder="Enter book genre"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre}</p>}
                </motion.div>
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                >
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-red-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                        Add Book
                    </button>
                </motion.div>
            </form>
        </motion.div>
    );
};

export default BookForm;
