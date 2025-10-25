import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export const useCollection = (collec) => {

    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ref = collection(db, collec)
        console.log(ref);
        

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
    },[collec])

    return { documents , error}
}