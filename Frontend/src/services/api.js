import axios from "axios"

const API_URL = 'http://localhost:8080'

const API_MAIL = async (urlObject , payLoad) =>{
    return await axios({
        method:urlObject.method ,
        url:`${API_URL}/${urlObject.endpoint}` ,
        data:payLoad ,
        withCredentials: true
    })
}


export default API_MAIL ;