import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import UserAuthentication from '../services/authService';
import { validateLoginCredentials } from '../validation/authValidation';
import toast from 'react-hot-toast';

const Login = ({ setIsLoggedIn }) => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate()
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState('');

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const validationErrors = validateLoginCredentials(credentials);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const auth = new UserAuthentication();
        try {
            const response = await auth.login(credentials);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
            localStorage.setItem('token', JSON.stringify(response.data.data.token));
            toast.success('Login successful')
            setIsLoggedIn(true)
        } catch (err) {
            setLoginError("An error occurred. Please try again later.");
            console.error("Login failed: ", err);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")' }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative z-10 bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
            >
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login to Book Exchange</h2>
                <p className="text-center text-gray-600 italic mb-6">
                    "A book is a dream that you hold in your hand." - Neil Gaiman
                </p>
                {loginError && <p className="text-red-500 text-center mb-4">{loginError}</p>}
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={inputChangeHandler}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={inputChangeHandler}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Login
                    </motion.button>
                </form>
                <p className="text-center text-gray-500 mt-6">
                    Don't have an account? <NavLink to="/register" className="text-blue-500 hover:underline">Sign up</NavLink>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
