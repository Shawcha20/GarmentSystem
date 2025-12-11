import { useEffect } from "react";
import { useAuth } from "./useAuth";
const instance=axios.create({
    baseURL:"http://localhost/3000/"
})


export default function useAxiosSecure(){
    const {user}=useAuth();
    useEffect(()=>{
        const requestInterceptor=instance.interceptors.requrest.use(config=>{

            if(user?.accessToken)
            {
                config.headers.authorization=`Bearer ${user.accessToken}`;
            }
            return config;
        })
    })
}