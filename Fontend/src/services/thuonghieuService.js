
import axios from '../axios'

const getAll=()=>{
    return axios.get('/get-allthuonghieu')
    ///get-onedeliveri?id=${id}
}
const postcreate=(data)=>{
    return axios.post('/post-createthuonghieu',data)
}

const postdelete=(dataid)=>{
    //.log('is'+deliveriid)
    return axios.post('/post-deletethuonghieu',{id:dataid})

}

const putupdate=(data)=>{
    return axios.put('/put-updatethuonghieu',data)
}
export{getAll,postcreate,postdelete,putupdate}