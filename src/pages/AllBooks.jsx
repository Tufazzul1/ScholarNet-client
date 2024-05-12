import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import AllBooksCard from "../components/AllBooksCard";


const AllBooks = () => {

    const axiosSecure = useAxios();
    const [allBooks, setAllBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get('/allBooks');
                console.log(response.data)
                setAllBooks(response.data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, [axiosSecure]);
    return (
        <div>
            <div>
                <div className="flex justify-center items-center" style={{ backgroundImage: 'url(https://i.ibb.co/kSSKbmC/pexels-pixabay-415071-1.jpg)', backgroundSize: 'cover', height: '200px' }}>
                    <h2 className="text-4xl font-bold text-green-500">All Books</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-3">
                    {
                        allBooks.map(book => <AllBooksCard
                             key={book._id}
                             book={book}
                             ></AllBooksCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AllBooks;