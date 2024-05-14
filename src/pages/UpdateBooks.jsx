import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


const UpdateBooks = () => {

    const { id } = useParams();
    const axiosSecure = useAxios();
    const [book, setBook] = useState({});

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axiosSecure.get(`/allBooks/${id}`);
                setBook(response.data);

            } catch (error) {
                toast.error("Failed to fetch book data");

            }
        };

        fetchBook();
    }, [axiosSecure, id]);
    const { image, name, category, author, rating } = book;

    const handleUpdate = async(e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const category = form.category.value;
        const photo = form.photo.value;
        const rating = form.rating.value;
        const author = form.author.value;


        const bookInfo = { name, category, image:photo, rating, author }
        

        try {
            const response = await axiosSecure.put(`/allBooks/${id}`, bookInfo, {
                headers: { "Content-Type": "application/json" }
            });
            const data = response.data;
            console.log(data);
            if (data?.modifiedCount > 0) {
                Swal.fire({
                    title: 'Success',
                    text: 'Spot Updated successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            }
        } catch (error) {
            console.error("There was an error updating the spot!", error);
        }
    }
    return (
        <div className="w-3/4 mx-auto mt-10 border p-6">
            <div className="flex justify-center items-center" style={{ backgroundImage: 'url(https://i.ibb.co/kSSKbmC/pexels-pixabay-415071-1.jpg)', backgroundSize: 'cover', height: '200px' }}>
                <h2 className="text-4xl font-bold text-green-500">Update Book</h2>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">
                {/* name and image */}
                <div className="flex flex-col md:flex-row gap-4">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Name</span>
                        </div>
                        <input type="text" defaultValue={name} name="name" placeholder="Name" className="input input-bordered w-full" />

                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Photo URL</span>
                        </div>
                        <input type="text" defaultValue={image} name="photo" placeholder="Photo URL" className="input input-bordered w-full" />

                    </label>
                </div>

                {/* Category and Rating */}
                <div className="flex flex-col md:flex-row gap-4">
                    <label className="form-control w-full">
                        <span className="label-text">Category</span>
                        <select className="input h-[40px] input-bordered w-full" name="category">
                            <option value="">--Select category--</option>
                            <option value="Novel">Novel</option>
                            <option value="Thriller">Thriller</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                        </select>
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Rating</span>
                        </div>
                        <input type="number" defaultValue={rating} name="rating" placeholder="Rating" max={5} className="input input-bordered w-full" />

                    </label>
                </div>
                <div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Author</span>
                        </div>
                        <input type="text" name="author" defaultValue={author} placeholder="Author" className="input input-bordered w-full" />
                    </label>
                </div>

                <input type="submit" value="Update Book" className="w-full btn border-green-500 hover:bg-green-500" />
            </form>
        </div>
    );
};

export default UpdateBooks;
