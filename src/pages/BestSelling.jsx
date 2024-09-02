
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";

const BestSelling = () => {
    const axiosSecure = useAxios();
    const [bestSelling, setBestSelling] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const { loading: authLoading } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get('/selling');
                setBestSelling(response.data);
            } catch (error) {
                console.log("Error fetching best selling books:", error);
            }
            finally{
                setIsLoading(false)
            }
        };

        fetchData();
    }, [axiosSecure]);

    if(isLoading || authLoading){
        return <Loading />;
    }

    return (
        <div className="lg:w-3/4 mx-auto">
            <div className="text-center mt-10 md:mt-16">
                <h2 className="text-4xl font-bold  mb-6">Best Selling Books</h2>
                <p>Explore the Most Popular and Influential Books that Captivate Readers Worldwide</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                {
                    bestSelling.map(selling => (
                            <div key={selling._id} className=" bg-base-100 shadow-xl">
                                <div className=" flex items-center justify-center">
                                    <img src={selling.image} alt="book" className="rounded-xl h-[300px] w-[200px]" />
                                </div>
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title">{selling.book_name}</h2>
                                    <p>Author: {selling.author}</p>
                                    <p>Release Year: {selling.release_year}</p>
                                </div>
                            </div>
                    
                    ))
                }
            </div>
        </div>
    );
};

export default BestSelling;
