import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import BorrowedBooksCard from "../components/BorrowedBooksCard";
import Swal from "sweetalert2";

const BorrowedBooks = () => {
    const axiosSecure = useAxios();
    const [borrowedBooks, setBorrowedBooks] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get('/borrow');
                setBorrowedBooks(response.data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, [axiosSecure]);
    // console.log(borrowedBooks)

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Return it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/borrow/${_id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Return!",
                                text: "Book has been Returned.",
                                icon: "success"
                            });
                            setBorrowedBooks((prevList) => prevList.filter((item) => item._id !== _id));
                        }
                    })
                    .catch((error) => {
                        console.error('Error deleting book:', error);
                    });
            }
        });
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