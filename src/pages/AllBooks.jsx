import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import AllBooksCard from "../components/AllBooksCard";
import Swal from "sweetalert2";
import CardView from "../components/CardView";


const AllBooks = () => {

    const axiosSecure = useAxios();
    const [allBooks, setAllBooks] = useState([]);
    const [showAvailableBooks, setShowAvailableBooks] = useState(false);
    const [viewType, setViewType] = useState('card');

    const handleAvailableBooks = () => {
        setShowAvailableBooks((prevState) => !prevState);
    };

    const filteredBooks = showAvailableBooks
        ? allBooks.filter((book) => book.quantity > 0) : allBooks;


    const handleChangeViewType = (event) => {
        setViewType(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get(`/allBooks`);
                setAllBooks(response.data);
            } catch (error) {
                // console.log(error)
            }
        };

        fetchData();
    }, [axiosSecure]);

    const handleUpdate = _id => {
        axiosSecure.patch(`/allBooks/${_id}`)
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Update",
                        text: "Book updated successfully.",
                        icon: "success"
                    });
                    setAllBooks((prevList) => prevList.filter((item) => item._id !== _id));
                }
            })
            .catch((error) => {
                console.error('Error deleting book:', error);
            });
    }
    return (
        <div>
            <div>
                <div className="flex justify-center items-center" style={{ backgroundImage: 'url(https://i.ibb.co/kSSKbmC/pexels-pixabay-415071-1.jpg)', backgroundSize: 'cover', height: '200px' }}>
                    <h2 className="text-4xl font-bold text-green-500">All Books</h2>

                </div>
                <div className="mt-8 space-x-2 text-center">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleAvailableBooks}
                    >
                        {showAvailableBooks ? "All Books" : "Available Books"}
                    </button>
                    <select
                        className="bg-white border border-gray-300 rounded px-4 py-2"
                        value={viewType}
                        onChange={handleChangeViewType}
                    >
                        <option value="card">Card View</option>
                        <option value="table">Table View</option>
                    </select>
                </div>

                {viewType === "card" ?
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-3">
                        {
                            filteredBooks.map(book => <AllBooksCard
                                key={book._id}
                                book={book}
                                handleUpdate={() => handleUpdate(book._id)}
                            ></AllBooksCard>)
                        }
                    </div> :
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>

                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Author</th>
                                    <th>Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBooks.map(book => <CardView
                                    key={book._id}
                                    book={book}
                                    handleUpdate={() => handleUpdate(book._id)}
                                ></CardView>)}
                            </tbody>
                        </table>
                    </div>
                }

            </div>
        </div>
    );
};

export default AllBooks;