import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { data } from '../data/bookData';

const Navbar = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));

    const logoutHandler = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
        setIsLoggedIn(false);
    };
    return (
        user && token && (
            <motion.nav
                className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 shadow-lg"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="container mx-auto flex justify-between items-center">
                    <motion.div
                        className="text-white font-bold text-2xl"
                        whileHover={{ scale: 1.1 }}
                    >
                        <Link to="/">Book Management</Link>
                    </motion.div>
                    <div className="space-x-6 flex items-center">
                        {data.map((item) => (
                            <motion.div
                                key={item.id}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    to={item.link}
                                    className="text-gray-200 hover:text-white transition-colors duration-300"
                                >
                                    {item.title}
                                </Link>
                            </motion.div>
                        ))}
                        <motion.button
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={logoutHandler}
                        >
                            Logout
                        </motion.button>
                    </div>
                </div>
            </motion.nav>
        )
    );
};

export default Navbar;
