
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useEffect, useState, useRef } from "react";
import Rating from "react-rating";
import { IoIosStarOutline } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const BookDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const axiosSecure = useAxios();
    const [bookDetails, setBookDetails] = useState({});
    const modalRef = useRef(null);

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await axiosSecure.get(`/allBooks/${id}`);
                setBookDetails(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBookData();
    }, [axiosSecure, id]);


    const handleBorrow = async (e) => {
        e.preventDefault();
        const form = e.target;
        const displayName = user?.displayName;
        const email = user?.email;
        const borrow = form.borrow.value;
        const bookReturn = form.returnDate.value;
        const { _id, image, name, category } = bookDetails;

        const borrowBooks = { displayName, email, borrow, bookReturn, image, name, category, bookId: _id };

        try {
            const response = await axiosSecure.post('/borrow', borrowBooks);
            if (response.data.insertedId) {
                Swal.fire({
                    title: 'Success',
                    text: 'Book borrowed successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                setBookDetails((prevDetails) => ({
                    ...prevDetails,
                    quantity: prevDetails.quantity - 1
                }));
                modalRef.current.close();
            }
        } catch (error) {
            // console.error('Error:', error);
            if (error.response?.data?.error === 'Book out of stock') {
                Swal.fire({
                    title: 'Error',
                    text: 'Book is out of stock',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        }
    };


    return (
        <div>
            <div className="flex justify-center items-center" style={{ backgroundImage: 'url(https://i.ibb.co/kSSKbmC/pexels-pixabay-415071-1.jpg)', backgroundSize: 'cover', height: '200px' }}>
                <h2 className="text-4xl font-bold text-green-500">Books Details</h2>
            </div>
            <div className="flex md:flex-row flex-col mt-16 p-8 border mx-auto md:w-[70%]">
                <div className="md:flex-1m p-4">
                    <img className="h-[400px] w-[270px]" src={bookDetails.image} alt={bookDetails.name} />
                </div>
                <div className="md:flex-1 p-3 md:p-6">
                    <h2 className="text-4xl font-bold text-green-500">{bookDetails.name}</h2>
                    <p>
                        <Rating
                            initialRating={bookDetails.rating}
                            emptySymbol={<IoIosStarOutline />}
                            fullSymbol={<FaStar className='text-orange-500' />}
                            readonly
                        />
                    </p>
                    <h2 className="mt-8"> <span className="font-bold">Author :</span> {bookDetails.author}</h2>
                    <h2> <span className="font-bold">Category :</span> {bookDetails.category}</h2>
                    <h2> <span className="font-bold">Quantity :</span> {bookDetails.quantity}</h2>
                    <h2> <span className="font-bold">Description :</span> {bookDetails.description}</h2>
                    <h2> <span className="font-bold">Contents :</span> {bookDetails.contents}</h2>

                    <div>
                        <div>
                            {bookDetails.quantity > 0 ? (
                                <button className="btn mt-6 font-bold bg-green-500 hover:bg-transparent border-green-500 hover:border-green-500" onClick={() => modalRef.current.showModal()}>
                                    Borrow
                                </button>
                            ) : (
                                <button className="btn mt-6 font-bold bg-gray-500 cursor-not-allowed" disabled>
                                    Out of Stock
                                </button>
                            )}
                        </div>


                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" ref={modalRef}>
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
                                    <input type="submit" className="btn w-full font-bold bg-green-500 hover:bg-transparent border-green-500 hover:border-green-500" value="Confirm" disabled={bookDetails.quantity === 0} />
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
