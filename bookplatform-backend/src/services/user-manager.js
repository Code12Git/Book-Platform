const { userModel } = require('../models');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { BAD_REQUEST , CONFLICT } = require('../utils/errors')
const { AppError } = require('../utils')
const { fromEnv } = require('../utils')

const register = async(body) => {
    const { name, email, username, password, confirmPassword } = body;
    try {
        if (_.isEmpty(name) || _.isEmpty(email) || _.isEmpty(username) || _.isEmpty(password)) {
            const error = BAD_REQUEST;
            error.message = 'All fields are required';
            throw new AppError(error.code, error.message, error.statusCode);
        }

        const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            const error = CONFLICT;
            error.message = 'Username or Email already exists';
            throw new AppError(error.code, error.message, error.statusCode);
        }

        if (confirmPassword !== password) {
            const error = BAD_REQUEST;
            error.message = 'Passwords do not match';
            throw new AppError(error.code, error.message, error.statusCode);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name,
            email,
            username,
            password: hashedPassword
        });

        await user.save();
        return user;
    } catch (err) {
        throw err;
    }
};


const login = async(body) => {
    const { email, password } = body;
    try {
        if (_.isEmpty(email) || _.isEmpty(password)) {
            const error = BAD_REQUEST;
            error.message = 'Email and Password are required';
            throw new AppError(error.code, error.message, error.statusCode);
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            const error = BAD_REQUEST;
            error.message = 'Invalid email or password';
            throw new AppError(error.code, error.message, error.statusCode);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = BAD_REQUEST;
            error.message = 'Invalid email or password';
            throw new AppError(error.code, error.message, error.statusCode);
        }

        const token = jwt.sign({ id: user._id, email: user.email }, fromEnv('JWT_SECRET'), {
            expiresIn: '1d'
        });

        return { user, token };
    } catch (err) {
        throw err;
    }
};

module.exports = { register, login }