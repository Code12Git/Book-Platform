import React, { useEffect, useState } from 'react';
import MatchingTable from '../components/MatchingTable';
import BookService from '../services/bookService';
import PreferencesModal from '../ui/PreferencesModal';

const BookMatching = () => {
    const [bookData, setBookData] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [showModal, setShowModal] = useState(true);
    const bookService = new BookService();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await bookService.getAll();
            setBookData(res.data.data);
            setFilteredBooks(res.data.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleSavePreferences = (preferences) => {
        const { genres, authors } = preferences;

        const lowerCaseGenres = genres.map(genre => genre.trim().toLowerCase());
        const lowerCaseAuthors = authors.map(author => author.trim().toLowerCase());

        const filtered = bookData.filter(book => {
            const bookGenre = typeof book.genre === 'string' ? book.genre.toLowerCase() : '';
            const bookAuthor = typeof book.author === 'string' ? book.author.toLowerCase() : '';

            const matchesGenre = lowerCaseGenres.length === 0 || lowerCaseGenres.includes(bookGenre);
            const matchesAuthor = lowerCaseAuthors.length === 0 || lowerCaseAuthors.includes(bookAuthor);
            return matchesGenre && matchesAuthor;
        });

        setFilteredBooks(filtered);
        setShowModal(false);
    };

    return (
        <div>
            {showModal && <PreferencesModal onSavePreferences={handleSavePreferences} />}
            <MatchingTable books={filteredBooks} />
        </div>
    );
};

export default BookMatching;
