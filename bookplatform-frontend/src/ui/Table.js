import React, { useState } from 'react';
import { DeleteIcon, Edit2Icon } from 'lucide-react';
import BookService from '../services/bookService';
import toast from 'react-hot-toast';
import EditBookModal from './EditBookModal';

const Table = ({ bookData, fetchData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const deleteHandler = async (id) => {
    const book = new BookService();
    try {
      await book.delete(id);
      fetchData();
      toast.success('Book deleted successfully');
    } catch (err) {
      toast.error('Failed to delete the book');
      console.error(err);
    }
  };

  const openEditModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const updateBook = async (updatedData) => {
    const book = new BookService();
    try {
      await book.update(selectedBook._id, updatedData);
      fetchData();
      toast.success('Book updated successfully');
    } catch (err) {
      toast.error('Failed to update the book');
      console.error(err);
    }
  };

  return (
    <>
      <div className="overflow-x-auto mt-8">
        <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-white">
              <th className="px-6 py-3 text-left text-sm font-semibold">Author</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Genre</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Edit</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Delete</th>
            </tr>
          </thead>
          <tbody>
            {bookData && bookData.length > 0 ? (
              bookData.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4">{item.author}</td>
                  <td className="px-6 py-4">{item.title}</td>
                  <td className="px-6 py-4">{item.description}</td>
                  <td className="px-6 py-4">{item.genre}</td>
                  <td className="px-6 py-4 text-center">
                    <Edit2Icon
                      onClick={() => openEditModal(item)}
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <DeleteIcon
                      onClick={() => deleteHandler(item._id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No Book Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedBook && (
        <EditBookModal
          isOpen={isModalOpen}
          onClose={closeEditModal}
          onUpdate={updateBook}
          book={selectedBook}
        />
      )}
    </>
  );
};

export default Table;
