import { useState } from "react"
import { useAuthContext } from "./useAuthContext";
import { projectAuth } from "../firebase/config"

export const useLogout = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    
    const { dispatch } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        // sign the use out
        try {

            await projectAuth.signOut()

            // dispatch the logout action
            dispatch({type: 'LOGOUT'})

            setError(null)
            setIsPending(false)
            
        } catch (err) {
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }
    }

    return { logout, error, isPending }
}