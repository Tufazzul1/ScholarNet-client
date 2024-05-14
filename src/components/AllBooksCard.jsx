import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { IoIosStarOutline } from 'react-icons/io';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';

const AllBooksCard = ({ book , handleUpdate}) => {
    const [isHovered, setIsHovered] = useState(false);
    const { author, category, contents, description, id, image, name, quantity, rating, _id } = book;
    return (
        <div>
            <div className={`card card-compact transition-transform duration-300 ease-in-out transform ${isHovered ? 'hover:scale-105' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <figure><img className="h-[235px] w-[175px]" src={image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p><Rating
                        initialRating={rating}
                        emptySymbol={<IoIosStarOutline />}
                        fullSymbol={<FaStar className='text-orange-500' />}
                        readonly
                    /></p>
                    <div className="badge bg-orange-300 text-black">{author}</div>
                    <div className="badge bg-green-500 text-black">{category}</div>
                    <div className="card-actions justify-end">
                        <Link to={`/update/${_id}`} className="btn border-green-500 w-full btn-sm hover:bg-green-500">Update</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllBooksCard;


