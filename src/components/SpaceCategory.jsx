import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";


const SpaceCategory = () => {

    const { category } = useParams();
    const axiosSecure = useAxios();
    const [categoryBooks, setCategoryBooks] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`http://localhost:5000/categories/${category}`);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [category]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get('/allBooks');
                const filteredData = response.data.filter(item => item.category === category);
                setCategoryBooks(filteredData);

            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, [axiosSecure, category]);

    return (
        <div>
            <h2>{categoryBooks.length}</h2>
        </div>
    );
};

export default SpaceCategory;