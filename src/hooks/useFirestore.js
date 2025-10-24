import { createContext, useEffect, useReducer, useState } from "react";
import { projectFireSotre, db } from "../firebase/config";
import { collection } from "firebase/firestore";

let initialState = {
    document: null,
    isPending: false,
    error:null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch(state, action) {

        default:
            return state
    }
}
export const  useFirestore = () => {
    const [ response , dispatch] = useReducer(firestoreReducer, initialState)

    const[isCancelled, setIsCancelled] = useState(false)

    // collection ref
    const ref = collection(db, 'myMoney')


    // add a document
    const addDocument = (doc) => {

    }

    // delete document 
    const deleteDocument = (id) => {

    }

    useEffect(() => {
        return () => setIsCancelled(true)
    })

    return { addDocument, deleteDocument, response}

}