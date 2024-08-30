import React, { useState } from 'react';

const PreferencesModal = ({ onSavePreferences }) => {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [error, setError] = useState('');

    const handleSave = () => {
         if (selectedGenres.length === 0 && selectedAuthors.length === 0) {
            setError('Please fill out at least one of the genres or authors fields.');
            return;
        }
        setError('');
        onSavePreferences({ genres: selectedGenres, authors: selectedAuthors });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Select Your Preferences</h2>
                
                {error && (
                    <div className="mb-4 text-red-500">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-gray-700">Genres:</label>
                    <input 
                        type="text"
                        value={selectedGenres}
                        onChange={(e) => setSelectedGenres(e.target.value.split(','))}
                        placeholder="Enter genres separated by commas"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Authors:</label>
                    <input 
                        type="text"
                        value={selectedAuthors}
                        onChange={(e) => setSelectedAuthors(e.target.value.split(','))}
                        placeholder="Enter authors separated by commas"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Save Preferences
                </button>
            </div>
        </div>
    );
};

export default PreferencesModal;
