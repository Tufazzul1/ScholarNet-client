

const BorrowedBooksCard = ({book , handleDelete}) => {
    const {image, email, name, category, borrow, bookReturn}= book;

    return (
        <div>
            <div className="flex p-2 border rounded-xl gap-3 mt-10">
                <div>
                    <img className="h-[190px]" src={image} alt="" />
                </div>
                <div>
                    <h2 className="">Name: {name}</h2>
                    <h2 className="">category: {category}</h2>
                    <h2 className="">Borrowed Date: {borrow}</h2>
                    <h2 className="">Return Date: {bookReturn}</h2>
                    <button onClick={handleDelete} className="btn btn-sm w-full mt-8">Return</button>
                </div>
            </div>
        </div>
    );
};

export default BorrowedBooksCard;