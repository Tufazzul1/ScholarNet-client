import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import Category from "./Category";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";

const Categories = () => {
    const axiosSecure = useAxios();
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { loading: authLoading } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [axiosSecure]);

    
    if (authLoading || isLoading) {
        return <Loading />;
    }

    return (
        <div className="mt-16">
            <h2 className="text-4xl font-bold text-center">Book Categories</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {categories.map(category => (
                    <Category key={category._id} cat={category} />
                ))}
            </div>
        </div>
    );
};

export default Categories;
