import axios from 'axios'


const axiosPublic = axios.create({
    baseURL: 'https://true-fit-server.vercel.app',
    withCredentials: false,
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;