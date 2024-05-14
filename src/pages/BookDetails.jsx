import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";
import Rating from "react-rating";
import { IoIosStarOutline } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const BookDetails = () => {
    const { user } = useAuth()
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

    const handleBorrow = e => {
        e.preventDefault();
        const form = e.target;
        const displayName = form.name.value;
        const email = form.email.value;
        const borrow = form.borrow.value;
        const bookReturn = form.returnDate.value;
        const { image, name, category } = bookDetails; 

        const borrowBooks = { displayName, email, borrow, bookReturn, image, name, category };

        axiosSecure.post('/borrow', borrowBooks)
            .then(response => {
                console.log(response.data);
                if (response.data.insertedId) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Book borrowed successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }



    return (
        <div>
            <div className="flex justify-center items-center" style={{ backgroundImage: 'url(https://i.ibb.co/kSSKbmC/pexels-pixabay-415071-1.jpg)', backgroundSize: 'cover', height: '200px' }}>
                <h2 className="text-4xl font-bold text-green-500">Books Details</h2>
            </div>
            <div className="flex md:flex-row flex-col mt-16 p-8 border max-w-fit mx-auto">
                <div className="md:w-[30%]">
                    <img src={bookDetails.image} />
                </div>
                <div className="md:w-70% p-3 md:p-6">
                    <h2 className="text-4xl font-bold text-green-500">{bookDetails.name}</h2>
                    <p><Rating
                        initialRating={bookDetails.rating}
                        emptySymbol={<IoIosStarOutline />}
                        fullSymbol={<FaStar className='text-orange-500' />}
                        readonly
                    /></p>
                    <h2 className="mt-8"> <span className="font-bold">Author :</span> {bookDetails.author}</h2>
                    <h2> <span className="font-bold">Category :</span> {bookDetails.category}</h2>
                    <h2> <span className="font-bold">Quantity :</span> {bookDetails.quantity}</h2>
                    <h2> <span className="font-bold">description :</span> {bookDetails.description}</h2>

                    <div>
                        <button className="btn mt-10 font-bold bg-green-500 hover:bg-transparent border-green-500 hover:border-green-500" onClick={() => document.getElementById('my_modal_5').showModal()}>Borrow</button>

                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">

                            <form onSubmit={handleBorrow} className="modal-box flex flex-col items-center">
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text font-bold">Borrow Date</span>
                                    </div>
                                    <input type="date" required name="borrow" placeholder="Borrow Date" className="input input-bordered w-full max-w-xs" />

                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text font-bold">Return Date</span>
                                    </div>
                                    <input type="date" required name="returnDate" placeholder="Return Date" className="input input-bordered w-full max-w-xs" />

                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text font-bold">Name</span>
                                    </div>
                                    <input type="text" name="name" defaultValue={user.displayName} readOnly className="input input-bordered w-full max-w-xs" />

                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text font-bold">Email</span>
                                    </div>
                                    <input type="text" name="email" defaultValue={user.email} readOnly className="input input-bordered w-full max-w-xs" />

                                </label>
                                <div className="modal-action">
                                    <input type="submit" className="btn w-full font-bold bg-green-500 hover:bg-transparent border-green-500 hover:border-green-500" value="Confirm" />
                                </div>
                            </form>
                        </dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;