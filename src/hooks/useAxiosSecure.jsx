import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL:'https://localchefbazar-iota.vercel.app'
})

const useAxiosSecure = () => {
      const {user,logOut} = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        // intercept request
      const requestInterceptor=  axiosSecure.interceptors.request.use(config=>{
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config;
        })
0
        // interceptor response
        const responseInterceptor = axiosSecure.interceptors.response.use((res)=>{return res},(error)=>{
        //    console.log(error);
           const statusCode = error.status;
           if(statusCode===401 || statusCode === 403){
            logOut().then(()=>{
                navigate('/auth-layout/login')
            })
           }
           return Promise.reject(error);
           
        })

        return ()=>{
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
            
        }
    },[user,logOut,navigate])


    return axiosSecure;
};

export default useAxiosSecure;