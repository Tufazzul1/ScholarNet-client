import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import Swal from 'sweetalert2'


const AddBook = () => {

    const { user } = useAuth() || {}
    const axiosSecure = useAxios()

    const handleAddBook = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const quantity = form.quantity.value;
        const author = form.author.value;
        const category = form.category.value;
        const rating = form.rating.value;
        const description = form.description.value;
        const contents = form.contents.value;
        const UserName = user.displayName;
        const email = user.email

        const newBooks = { name, image: photo, quantity, author, category, rating, description, contents, UserName, email }
        // console.log(newBooks);

        // send books to all books

        axiosSecure.post('/allBooks', newBooks)
            .then(response => {
                // console.log(response.data);
                if (response.data.insertedId) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Book inserted successfully',
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
        <div className="lg:w-3/4 mx-auto mt-10 border p-6">
            <div className="flex justify-center items-center" style={{ backgroundImage: 'url(https://i.ibb.co/kSSKbmC/pexels-pixabay-415071-1.jpg)', backgroundSize: 'cover', height: '200px' }}>
                <h2 className="text-4xl font-bold text-green-500">Add Booksss</h2>
            </div>
            <form onSubmit={handleAddBook} className="space-y-4">
                {/* name and image */}
                <div className="flex flex-col md:flex-row gap-4">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Name</span>
                        </div>
                        <input type="text" name="name" placeholder="Name" className="input input-bordered w-full" />

                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Photo URL</span>
                        </div>
                        <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered w-full" />

                    </label>
                </div>
                {/* Quantity and Authore name */}
                <div className="flex flex-col md:flex-row gap-4">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Quantity</span>
                        </div>
                        <input type="number" name="quantity" placeholder="Quantity" className="input input-bordered w-full" />

                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Author Name</span>
                        </div>
                        <input type="text" name="author" placeholder="Author" className="input input-bordered w-full" />

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
                        <input type="number" name="rating" placeholder="Rating" max={5} className="input input-bordered w-full" />

                    </label>
                </div>
                {/* description and content */}
                <div className="flex flex-col md:flex-row gap-4">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Description</span>
                        </div>
                        <input type="text" name="description" placeholder="Description" className="input input-bordered w-full" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Content</span>
                        </div>
                        <input type="text" name="contents" placeholder="Content" className="input input-bordered w-full" />
                    </label>
                </div>
                <input type="submit" value="Add Book" className="w-full btn border-green-500 hover:bg-green-500" />
            </form>
        </div>
    );
};

export default AddBook;