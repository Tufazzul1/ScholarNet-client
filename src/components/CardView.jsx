import { FaStar } from "react-icons/fa";
import { IoIosStarOutline } from "react-icons/io";
import Rating from "react-rating";
import { Link } from "react-router-dom";


const CardView = ({ book , handleUpdate}) => {

    const { author, category, contents, description, id, image, name, quantity, rating, _id } = book;
    return (
        
                <tr>
                   
                    <td>
                        <div className="flex items-center gap-3">
                            <img className="w-[50px] h-[50px]" src={image} alt="" />
                        </div>
                        <div>
                        <p><Rating
                        initialRating={rating}
                        emptySymbol={<IoIosStarOutline />}
                        fullSymbol={<FaStar className='text-orange-500' />}
                        readonly
                    /></p>
                        </div>
                    </td>
                    <td>
                        {name}
                    </td>
                    <td>{author}</td>
                    <th>
                        <Link to={`/update/${_id}`} className="btn border-green-500 w-full btn-sm hover:bg-green-500">Update</Link>
                    </th>
                </tr>
    );
};

export default CardView;