const _ = require('lodash')
const { bookModel , userModel } = require('../models');
const { BAD_REQUEST , NOT_FOUND, CONFLICT } = require('../utils/errors');
const {   AppError } = require('../utils');


const create = async (body, user) => {
    const { title, description, genre, author } = body;
    try {
        if (_.isEmpty(title) || _.isEmpty(description) || _.isEmpty(genre) || _.isEmpty(author)) {
            const error = BAD_REQUEST;
            error.message = "All fields must be provided";
            throw new AppError(error.code, error.message, error.statusCode);
        }
        const existingBook = await bookModel.findOne({ title, author });
        if (existingBook) {
            const error = CONFLICT;
            error.message = "Book already exists";
            throw new AppError(error.code, error.message, error.statusCode); 
        }
        const book = new bookModel({
            title,
            description,
            genre,
            author,
            owner: user._id
        });
        await book.save();
        await userModel.findByIdAndUpdate(
            user._id,
            { $push: { ownedBooks: book._id } },
            { new: true }
        );
        return book;
    } catch (err) {
        throw err;
    }
};


const update = async (body, params ,user) => {
    const { title, description, genre, author } = body;
    const { book } = params;
    try {
        const updatedBook = await bookModel.findByIdAndUpdate(
            book,
            { title, description, genre, author, owner: user._id },
            { new: true } 
        );

        if (!updatedBook) {
            const error = NOT_FOUND
            error.message = "Book not found"
            throw new AppError(error.code, error.message , error.statusCode)
        }

        return updatedBook;
    } catch (err) {
        throw err;
    }
};



const deleteOne = async (params) => {
    const { book } = params; 
    try {
        const deletedBook = await bookModel.findByIdAndDelete(book);

        if (!deletedBook) {
            const error = NOT_FOUND
            error.message = "Book not found"
            throw new AppError(error.code,error.message,error.statusCode);
        }

        return deletedBook;
    } catch (err) {
        throw err;
    }
};



const get = async (user) => {
    try {
        const userBooks = await bookModel.find({ owner: user._id });

        if (!userBooks ) {
            const error = NOT_FOUND
            error.message = 'No books found related to this search'
            throw new AppError(error.code, error.message, error.statusCode);
        }

        return userBooks;
    } catch (err) {
        throw err;
    }
};


const search = async (query) => {
    const { title, author, genre } = query;
    
    try {
        const trimmedTitle = title ? title.trim() : '';
        const trimmedAuthor = author ? author.trim() : '';
        const trimmedGenre = genre ? genre.trim() : '';
        
        const searchQuery = {};
        if (trimmedTitle) searchQuery.title = { $regex: trimmedTitle, $options: 'i' };
        if (trimmedAuthor) searchQuery.author = { $regex: trimmedAuthor, $options: 'i' };
        if (trimmedGenre) searchQuery.genre = { $regex: trimmedGenre, $options: 'i' };
        
        if (Object.keys(searchQuery).length === 0) {
            const error = NOT_FOUND
            error.message = 'Please provide atleast one search parameter'
            throw new AppError(error.code, error.message, error.statusCode);        }
        
        const books = await bookModel.find(searchQuery);

        if (!books || books.length === 0) {  
            const error = NOT_FOUND
            error.message = 'No book found related to this search query'
            throw new AppError(error.code, error.message, error.statusCode);         }

        return books;
    } catch (err) {
        console.error('Search Error:', err);
        throw err; 
    }
};




const getAll = async (user) => {
    try {
        const books = await bookModel.find({ owner: { $ne: user._id } }).populate('owner', 'name email'); 
        if (!books || books.length === 0) {
            const error = new Error("No books found");
            error.statusCode = 404;
            throw error;
        }
        return books;
    } catch (err) {
        throw err;
    }
};



module.exports = { create , update , deleteOne , get , getAll, search }