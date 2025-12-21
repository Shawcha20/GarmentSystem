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



//  const demoProducts = [
//     {
//       _id: "1",
//       name: "Elegant Bridal Lehenga",
//       category: "Bridal",
//       price: 2500,
//       quantity: 3,
//       image:
//         "https://images.unsplash.com/photo-1593032457869-382a725464ec?w=800&q=80",
//     },
//     {
//       _id: "2",
//       name: "Men’s Premium Blazer",
//       category: "Men",
//       price: 1200,
//       quantity: 5,
//       image:
//         "https://images.unsplash.com/photo-1520975940657-7f6fd1b55c05?w=800&q=80",
//     },
//     {
//       _id: "3",
//       name: "Women’s Party Gown",
//       category: "Women",
//       price: 1800,
//       quantity: 2,
//       image:
//         "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
//     },
//     {
//       _id: "4",
//       name: "Kids Festive Dress",
//       category: "Kids",
//       price: 600,
//       quantity: 6,
//       image:
//         "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80",
//     },
//     {
//       _id: "5",
//       name: "Designer Saree",
//       category: "Women",
//       price: 2200,
//       quantity: 4,
//       image:
//         "https://images.unsplash.com/photo-1503341981062-cf57ebb85d5c?w=800&q=80",
//     },
//     {
//       _id: "6",
//       name: "Traditional Sherwani",
//       category: "Men",
//       price: 2800,
//       quantity: 2,
//       image:
//         "https://images.unsplash.com/photo-1593032739988-2a2b4ccb5704?w=800&q=80",
//     },
//     {
//       _id: "7",
//       name: "Party Saree",
//       category: "Women",
//       price: 1500,
//       quantity: 7,
//       image:
//         "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&q=80",
//     },
//     {
//       _id: "8",
//       name: "Men Formal Suit",
//       category: "Men",
//       price: 2000,
//       quantity: 3,
//       image:
//         "https://images.unsplash.com/photo-1520975434080-9f8a1e4c8f31?w=800&q=80",
//     },
//     {
//       _id: "9",
//       name: "Kids Traditional Wear",
//       category: "Kids",
//       price: 500,
//       quantity: 9,
//       image:
//         "https://images.unsplash.com/photo-1600628422011-b9d5ef42e381?w=800&q=80",
//     },
//   ];