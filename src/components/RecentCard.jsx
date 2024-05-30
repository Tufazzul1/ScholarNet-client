
const RecentCard = ({ book }) => {
    const { image, name, author } = book;
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{author}</p>
            </div>
        </div>
    );
};

export default RecentCard;