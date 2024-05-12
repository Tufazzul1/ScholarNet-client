import { useState } from "react";
import { Link } from "react-router-dom";


const Category = ({ cat }) => {
    const { category, image } = cat;
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div>
            <div className={`card border mt-10 card-compact transition-transform duration-300 ease-in-out transform ${isHovered ? 'hover:scale-105' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <figure><img className="h-[235px] w-[175px] mt-4" src={image} alt="Books" /></figure>
                <div className="card-body">

                    <Link to={`categories/${category}`} className="btn w-full font-bold bg-green-500 hover:bg-transparent border-green-500 hover:border-green-500">Category : {category}</Link>

                </div>
            </div>
        </div>
    );
};

export default Category;