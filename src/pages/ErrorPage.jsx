
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='text-center'>
            <div className='flex justify-center items-center mt-24'>
                <img className='h-[400px]' src="https://i.ibb.co/2YQQS1v/20824298-6342464.jpg" alt="" />
            </div>
            <Link to={'/'}><button className="btn font-bold bg-green-500 hover:bg-transparent border-green-500 hover:border-green-500">Go back Home</button></Link>
        </div>
    );
};

export default ErrorPage;