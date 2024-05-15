import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import Category from "./Category";


const Categories = () => {

    const axiosSecure = useAxios();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get('/categories');
                console.log(response.data)
                setCategories(response.data);
            } catch (error) {
                // console.log(error)
            }
        };

        fetchData();
    }, [axiosSecure]);
    return (
        <div className="mt-16">
            <h2 className="text-4xl font-bold text-center">Book Categories</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {
                    categories.map(category =>
                         <Category
                          key={category._id}
                          cat={category}
                         ></Category>)
                }
            </div>
        </div>
    );
};

export default Categories;