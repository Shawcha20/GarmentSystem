import { useContext } from "react"
import AuthContext from "../Providers/authContext"

export const useAuth=()=>{
    return useContext(AuthContext);
}