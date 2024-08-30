import React, { useEffect, useState } from 'react';
import BookService from '../services/bookService';
import Search from '../components/Search';
import DiscoveryTable from '../components/DiscoveryTable';

const BookDiscovery = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const bookService = new BookService();
    const fetchData = async () => {
      const res = await bookService.getAll();
      setBooks(res.data.data);
    };
    fetchData();
  }, []);

  const handleSearchResults = (searchResults) => {
    setBooks(searchResults.data);
  };

  return (
    <div>
      <Search onSearchResults={handleSearchResults} />
      <DiscoveryTable books={books} />
    </div>
  );
};

export default BookDiscovery;
