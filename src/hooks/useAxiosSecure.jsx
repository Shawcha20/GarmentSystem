import { useEffect } from "react";
import { useAuth } from "./useAuth";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

export default function useAxiosSecure() {
  const { user } = useAuth();

  useEffect(() => {
    const interceptor = instance.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      instance.interceptors.request.eject(interceptor);
    };
  }, [user]);

  return instance;
}
