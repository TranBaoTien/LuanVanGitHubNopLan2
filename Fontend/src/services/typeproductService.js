
import axios from '../axios'

const getAll=()=>{
    return axios.get('/get-alltypeproduct')
    ///get-onedeliveri?id=${id}
}
const postcreate=(data)=>{
    return axios.post('/post-createtypeproduct',data)
}

const postdelete=(dataid)=>{
    //.log('is'+deliveriid)
    return axios.post('/post-deletetypeproduct',{id:dataid})

}

const putupdate=(data)=>{
    return axios.put('/put-updatetypeproduct',data)
}
export{getAll,postcreate,postdelete,putupdate}