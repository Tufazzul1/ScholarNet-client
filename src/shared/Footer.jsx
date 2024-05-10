import { CiLocationOn } from 'react-icons/ci';
import logo from '../../public/book-and-studen-logo-free-vector.jpg'
import { IoCallOutline, IoLogoFacebook, IoLogoTwitter, IoLogoYoutube } from 'react-icons/io5';
import { MdOutlineMailOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 border-t-green-500 border-t-2 mt-16 text-base-content">
                <aside>
                    <div className='inline-flex border-b-2 space-x-2 pb-2'>
                        <img className='w-[50px] rounded-full' src={logo} alt="" />
                        <span className='text-3xl font-bold text-green-500'>ScholarNet</span>
                    </div>

                    <div className='space-y-4'>
                        <p><CiLocationOn className='text-xl' />07, Rose world Building, Street # 02, <br /> AT246T Sylhet</p>
                        <p><IoCallOutline className='text-xl' />+8801795749543</p>
                        <p><MdOutlineMailOutline className='text-xl' />tufajjul2017@gmail.com</p>
                    </div>


                </aside>
                <nav>
                    <h6 className="footer-title text-lg text-green-500">Company</h6>
                    <Link to={'/'} className="link link-hover">Home</Link>
                    <Link to={'/addBooks'} className="link link-hover">Add Book</Link>
                    <Link to={'/allBooks'} className="link link-hover">All Books</Link>
                    <Link to={'/borrowedBooks'} className="link link-hover">Borrowed Books</Link>

                </nav>
                <nav>
                <h6 className="footer-title text-lg text-green-500">Social</h6>
                <h3 className='text-lg'>Follow us on :</h3>
                    <div className="grid grid-flow-col gap-4">
                        <a><IoLogoYoutube className='text-2xl' /></a>
                        <a><IoLogoTwitter className='text-2xl' /></a>
                        <a><IoLogoFacebook className='text-2xl' /></a>               
                    </div>
                </nav>
            </footer>
            <footer className="footer footer-center p-4 bg-[#484848] text-white">
                <aside>
                    <p>Copyright © 2024 - All right reserved by ScholarNet</p>
                </aside>
            </footer>
        </div>

    );
};

export default Footer;