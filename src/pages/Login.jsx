import { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../hooks/useAuth';

const Login = () => {


    const { signIn, signInWithGoogle} = useAuth()
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    // console.log( "location from login",location)
    const navigate = useNavigate()


    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');


        signIn(email, password)
            .then(result => {
                console.log(result.user);
                toast.success("Logged in successfully!");
                // navigate the user 

                setTimeout(() => {
                    // navigate 
                    navigate(location?.state ? location.state : '/');
                }, 2000);

            })
            .catch(error => {
                console.log(error)
                toast.error("Invalid email or password")
            })
    }

    const handleSocialLogin = socialProvider => {

        socialProvider()
            .then(result => {
                console.log(result.user);
                toast.success("Login successfully")

                setTimeout(() => {
                    // navigate 
                    navigate(location?.state ? location.state : '/');
                }, 2000);
            })
            .catch(error => {
                console.log(error)
                toast.error("Invalid Email or Password");
            }
            )
    }
    return (
        <div>
            <div style={{ backgroundImage: 'url(https://i.ibb.co/7nWL1b5/pexels-felixmittermeier-956999.jpg)',}} className='mt-5'>
                <div className="hero min-h-[550px] w-full p-10" >
                    <div className="card shrink-0 max-w-lg bg-base-100 bg-opacity-30 shadow-2xl  lg:w-1/2">
                        <div>
                            <h3 className="text-3xl font-bold mt-7 text-center">Welcome back !</h3>
                        </div>
                        
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="input input-bordered "
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
                                    <a href="#" className="label-text-alt link link-hover font-bold">Forgot password?</a>
                                </label>
                            </div>


                            <div className="form-control mt-6">
                                <button className="btn bg-green-500 hover:bg-transparent border-green-500 hover:border-green-500 text-white">Login</button>
                            </div>
                        </form>

                        <div className="text-center font-bold space-y-3">
                           
                            <h3>or Login with </h3>
                            <button onClick={() => handleSocialLogin(signInWithGoogle)} className="btn bg-green-500 hover:bg-transparent border-green-500 hover:border-green-500 text-white w-[85%]"> <FaGoogle className='text-red-500 text-2xl' />Google</button>

                        </div>
                        <p className=" mb-4 mt-4 text-center">New in here ? Please <Link to={'/register'} className="text-blue-700 font-bold">Register</Link></p>
                    </div>
                </div>

            </div>
            <ToastContainer />
        </div>
    );
};




export default Login;