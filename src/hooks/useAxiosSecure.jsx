import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: 'https://true-fit-server.vercel.app',
  withCredentials: false,
});



const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut, setLoading } = useAuth();

  useEffect(() => {
    // Request Intercepts
    axiosSecure.interceptors.request.use(
      (res) => {
        const token = localStorage.getItem("access-token");
        res.headers.authorization = `Bearer ${token}`;
        return res;
      },
      async (error) => {
        // console.log("Error caught from axios interceptor --->", error.response);
        if (error.response.status === 401 || error.response.status === 403) {
          await logOut();
          setLoading(false);
          navigate("/login");
        }
        return Promise.reject(error);
      },
    );

    // Response Intercepts
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
          await logOut();
          setLoading(false);
          navigate("/login");
        }
        return Promise.reject(error);
      },
    );
  }, [logOut, navigate, setLoading]);
  return axiosSecure;
};

export default useAxiosSecure;
