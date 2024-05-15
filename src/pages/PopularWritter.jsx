
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
const   PopularWritter = () => {
    const axiosSecure = useAxios();
    const [popular, setpopular] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get('/popular');
                setpopular(response.data);
            } catch (error) {
                console.log("Error fetching  popular writter:", error);
            }
        };

        fetchData();
    }, [axiosSecure]);
    return (
        <div>
            <div className="text-center mt-10 md:mt-16">
                <h2 className="text-4xl font-bold  mb-6">Most Popular Writter</h2>
                <p>Discover the Talented Authors Whose Works Have Shaped Literature and Captivated Millions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                {
                    popular.map(popu => (
                            
                                <div key={popu._id} className="card card-side border h-[200px] bg-base-100 shadow-xl">
                                    <figure><img className="rounded-full ml-4 mr-4 h-[100px] w-[100px]" src={popu?.image} alt="image"/></figure>
                                    <div className="card-body">
                                        <h2 className="card-title text-green-500">
                                        {popu?.writer_name}
                                        </h2>
                                        <p><span className="font-bold">Book Name : </span>{popu?.popular_book}</p>
                                        <p><span className="font-bold">Nationality : </span>{popu?.nationality}</p>
                                        
                                    </div>
                                    </div>
                    ))
                }
            </div>
            
        </div>
    );
};

export default PopularWritter;
