

import API_MAIL from "../services/api"
import { useState } from "react";

const useApi =  (urlObject) =>{
    let [response , setResponse] = useState(null)
    let [err , setErr] = useState("null")
    let [isLodeing , setIsLoding] = useState(false) ;

    const call = async(payLoad) =>{
        setResponse(null)
        setIsLoding(true)
        setErr("")
        try {
            let res =  await API_MAIL(urlObject , payLoad) ;
            setResponse(res.data) ;
     
         } catch (error) {
             setErr(error.message)
         }
         finally{
            setIsLoding(false)
         }
    }
    return {call , response , err , isLodeing} ;
    
}

export default useApi ;