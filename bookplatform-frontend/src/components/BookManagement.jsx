import React, { useEffect, useState } from 'react';
import Table from '../ui/Table';

const BookManagement = ({ fetchData, bookData }) => {

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-clip bg-clip-text text-center font-bold mt-5">
                Book Management
            </h1>
            <Table bookData={bookData} fetchData={fetchData} />
        </div>
    );
}

export default BookManagement;
