import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import BorrowedBooksCard from "../components/BorrowedBooksCard";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const BorrowedBooks = () => {
    const axiosSecure = useAxios();
    const { user } = useAuth()
    const [borrowedBooks, setBorrowedBooks] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get(`/borrow?email=${user.email}`);
                setBorrowedBooks(response.data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, [axiosSecure, user]);

    const handleDelete = async (id) => {
        try {
            const response = await axiosSecure.delete(`/borrow/${id}`);
            if (response.data.deleteResult.deletedCount > 0) {
                Swal.fire({
                    title: 'Success',
                    text: 'Book returned successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                setBorrowedBooks(borrowedBooks.filter(book => book._id !== id));
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to return book',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    };

    return (
        <div>
            <div className="flex justify-center items-center" style={{ backgroundImage: 'url(https://i.ibb.co/kSSKbmC/pexels-pixabay-415071-1.jpg)', backgroundSize: 'cover', height: '200px' }}>
                <h2 className="text-4xl font-bold text-green-500">Borrowed Books</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {
                    borrowedBooks.map((book, index) => (
                        <BorrowedBooksCard
                            key={index}
                            book={book}
                            handleDelete={() => handleDelete(book._id)}>
                        </BorrowedBooksCard>
                    ))
                }
            </div>
        </div>
    );
};

export default BorrowedBooks;