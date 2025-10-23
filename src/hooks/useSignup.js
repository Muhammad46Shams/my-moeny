import { useEffect, useState } from "react"
import { useAuthContext } from "./useAuthContext";
import { projectAuth } from "../firebase/config"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'


export const useSignup = () => {
    const[isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    
    const { dispatch } = useAuthContext()
    const signup = async (email,password, displayName) => {
        setError(null)
        setIsPending(true)
        
        try {
            // signup user
            const res =  await createUserWithEmailAndPassword(projectAuth,email,password)
            console.log(res.user);

            if(!res)
            {
                throw new Error('Could not complete the signup')
            }
            // add display name to user
            await updateProfile(projectAuth.currentUser ,  { 
                displayName: displayName 
            })

            // dispatch login action
            dispatch({type: 'LOGIN', payload: res.user})

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

    return { signup, error, isPending }
}