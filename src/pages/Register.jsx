import { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { FaEyeSlash } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../hooks/useAuth';


const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { createUser } = useAuth()
    const navigate = useNavigate()

    const handleRegister = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const email = form.get('email');
        const photo = form.get('photo');
        const password = form.get('password');
        console.log(name, email, photo, password)

        if (password.length < 6) {
            toast.error("Password should be atleast 6 character");
            return
        }
        else if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain at least one uppercase letter");
            return;
        }
        else if (!/[a-z]/.test(password)) {
            toast.error("Password must contain at least one lowwercase letter");
            return
        }

        createUser( email, password)
            .then(result => {
                console.log(result.user)
                toast.success("User created succefully");
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            })
            .catch(error => {
                console.log(error.message)
                toast.error("Invalid email or password");
            })

    }
    return (
        <div>
            <div style={{ backgroundImage: 'url(https://i.ibb.co/7nWL1b5/pexels-felixmittermeier-956999.jpg)' }} className='mt-5' >

                <div className="hero min-h-[550px] w-full p-10" >

                    <div className="card shrink-0 max-w-lg shadow-2xl bg-base-100 bg-opacity-25 lg:w-1/2">
                        <div>
                            <h3 className="text-3xl font-bold mt-7 text-center">Please Register</h3>
                        </div>

                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Your Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">PhotoURL</span>
                                </label>
                                <input
                                    type="text"
                                    name="photo"
                                    placeholder="Photo URL"
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text font-bold">Password</span>

                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className="input input-bordered pl-8"
                                    required
                                />
                                <span onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-4 transform -translate-y-1/2">{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>


                            <div className="form-control mt-6">
                                <button className="btn bg-green-500 hover:bg-transparent border-green-500 hover:border-green-500 text-white">Register</button>
                            </div>
                        </form>


                        <p className="text-center mb-4 mt-4 text-white">Already have an account ? Please <Link to={'/login'} className="text-blue-700 font-bold">Login</Link></p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;