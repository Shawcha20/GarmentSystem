import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://garment-system-theta.vercel.app",
});

export default function useAxiosPublic() {
  return axiosPublic;
}
