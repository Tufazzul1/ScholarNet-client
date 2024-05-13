import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import CatBooks from "./CatBooks";


const SpaceCategory = () => {

    const { category } = useParams();
    const axiosSecure = useAxios();
    const [categoryBooks, setCategoryBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/categories/${category}`);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [category]);
    console.log(categoryBooks)

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await axiosSecure.get('/allBooks');
                const filteredData = response.data.filter(item => item.category === category);
                setCategoryBooks(filteredData);

            } catch (error) {
                console.log(error)
            }
        };

        fetchBookData();
    }, [axiosSecure, category]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-16">
            {
                categoryBooks.map(catBooks =>
                     <CatBooks
                      key={catBooks._id}
                      catBooks={catBooks}
                      ></CatBooks>
                    )
            }
        </div>
    );
};

export default SpaceCategory;