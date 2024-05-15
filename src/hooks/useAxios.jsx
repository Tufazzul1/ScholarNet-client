import axios from "axios";

const axiosSecure = axios.create({
    baseURL: "https://scholar-net-server-gold.vercel.app",
    withCredentials: true 
})

const useAxios = () => {
    return axiosSecure
};

export default useAxios;