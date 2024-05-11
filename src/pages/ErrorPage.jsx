import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div>
            <Link to={'/'} className="text-3xl">Go back home</Link>
        </div>
    );
};

export default ErrorPage;