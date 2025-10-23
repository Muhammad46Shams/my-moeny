import { useEffect, useState } from "react"
import { useAuthContext } from "./useAuthContext";
import { projectAuth } from "../firebase/config"

export const useLogout = () => {
    const[isCancelled, setIsCancelled] = useState(false)
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

            //update state
            if(!isCancelled)
            {
                setError(null)
                setIsPending(false)
            }
            
        } catch (err) {
            if(!isCancelled)
            {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { logout, error, isPending }
}