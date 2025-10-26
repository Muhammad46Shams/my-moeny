import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query , where} from "firebase/firestore";

export const useCollection = (collec, _q) => {

    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    //if we dont use useRef --> infinite loop in useEffect
    // _query is an array and is different on every function call 
    const querySt = useRef(_q).current

    useEffect(() => {
        let ref = collection(db, collec)
        console.log(ref);
     
     
        
        if(querySt)
        {
            ref = query(ref , where(...querySt)) 
        }

        const unsubscribe = onSnapshot(ref, (snapshot) => {
            let results = []
                snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })
            
            // update state
            setDocuments(results)
            setError(null)
        } , (err) => {
            console.log(err);
            setError('could not fetch the data')
        })

        // unsubscribe on mount
        return () => unsubscribe()
    },[collec, querySt])

    return { documents , error}
}