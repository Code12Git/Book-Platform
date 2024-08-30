import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import UserAuthentication from '../services/authService';
import toast from 'react-hot-toast';
import { validateCredentials } from '../validation/authValidation';

const Register = () => {
    const [credentials, setCredentials] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };
    console.log(credentials);

    const submitHandler = async (e) => {
        e.preventDefault();

        const validationErrors = validateCredentials(credentials);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }


        const auth = new UserAuthentication();
        try {
            const res = await auth.register(credentials);
            console.log(res.data);
        } catch (err) {
            toast.error("Registration failed!");
            console.error(err);
        }
    };


    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")' }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative z-10 bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
            >
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create an Account</h2>
                <p className="text-center text-gray-600 italic mb-6">
                    "The only thing that you absolutely have to know, is the location of the library." - Albert Einstein
                </p>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name='name'
                            value={credentials.name}
                            onChange={inputChangeHandler}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Choose a name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name='username'
                            value={credentials.username}
                            onChange={inputChangeHandler}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Choose a username"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={credentials.email}
                            name='email'
                            onChange={inputChangeHandler}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name='password'
                            value={credentials.password}
                            onChange={inputChangeHandler}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Create a password"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name='confirmPassword'
                            value={credentials.confirmPassword}
                            onChange={inputChangeHandler}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-purple-500 text-white font-bold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                        Register
                    </motion.button>
                </form>
                <p className="text-center text-gray-500 mt-6">
                    Already have an account? <NavLink to="/login" className="text-purple-500 hover:underline">Login</NavLink>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
