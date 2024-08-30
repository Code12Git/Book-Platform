import React, { useEffect, useState } from 'react'
import BookManagement from '../components/BookManagement'
import BookForm from '../components/BookForm'
import bookService from '../services/bookService';

const Dashboard = () => {
    const [bookData, setBookData] = useState([])

    const book = new bookService()
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        const response = await book.get()
        setBookData(response.data.data)
    }
    return (
        <>
            <BookForm fetchData={fetchData} />
            <BookManagement bookData={bookData} fetchData={fetchData} />
        </>
    )
}

export default Dashboard