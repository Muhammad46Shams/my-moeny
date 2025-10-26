import { useEffect, useReducer, useState } from "react";
import { db, timeStamp } from "../firebase/config";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";

let initialState = {
    document: null,
    isPending: false,
    error:null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch(action.type) {
        case 'IS_PENDING':
            return {isPending:true , document:null, success: false, error: null}
        case 'ADDED_DOCUMENT':
            return { isPending:false, document: action.payload, success: true, error: null }
        case 'DELETED_DOCUMENT':
            return { isPending:false, document: action.payload, success: true, error: null }
        case 'ERROR':
            return { isPending:false, document:null, success: false, error: action.payload }
        default:
            return state
    }
}
export const  useFirestore = (collec) => {
    const [ response , dispatch] = useReducer(firestoreReducer, initialState)

    const[isCancelled, setIsCancelled] = useState(false)

    // collection ref
    const ref = collection(db, collec)

    // only dispatch is not cancelled
    const dispatchIfNotCancelled = (action) => {
        if(!isCancelled)
        {
            dispatch(action)
        }
    } 

    // add a document
    const addDocument = async (doc) => {
        dispatch({type: 'IS_PENDING'})

        try {
            const created_at = timeStamp.fromDate(new Date())
            console.log('created_at', created_at);
            const addedDocument = await addDoc(ref, {doc, created_at})

            dispatchIfNotCancelled({type: 'ADDED_DOCUMENT', payload: addedDocument})
            
        } catch (error) {
            console.log(error.message);
            
            dispatchIfNotCancelled({type: 'ERROR', payload: error.message})
            
        }

    }

    // delete document 
    const deleteDocument = async (id) => {
        dispatch({type: 'IS_PENDING'})
        
        try {
            
            const deleteDocument = await deleteDoc(doc(ref, id))

            dispatchIfNotCancelled({type: 'DELETED_DOCUMENT', payload: deleteDocument})

        } catch (error) {
            console.log(error.message);
            
            dispatchIfNotCancelled({type: 'ERROR', payload: error.message})
        }
    }

    useEffect(() => {
        // return () => setIsCancelled(true)
    })

    return { addDocument, deleteDocument, response}

}