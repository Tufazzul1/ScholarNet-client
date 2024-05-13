import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";

const BookDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxios();
    const [bookDetails, setBookDetails] = useState({});

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await axiosSecure.get(`/allBooks/${id}`);
                setBookDetails(response.data);
            } catch (error) {
                console.log(error)
            }
        };
        fetchBookData();
    }, [axiosSecure, id]);

    return (
        <div>
            <h2 className="text-2xl">Book details {bookDetails.name}</h2>
        </div>
    );
};

export default BookDetails;