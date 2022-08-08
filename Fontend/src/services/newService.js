
import axios from '../axios'

const getAll=()=>{
    return axios.get('/get-allnew')
    ///get-onedeliveri?id=${id}
}
const postcreate=(data)=>{
    return axios.post('/post-createnew',data)
}

const postdelete=(deliveriid)=>{
    //.log('is'+deliveriid)
    return axios.post('/post-deletenew',{id:deliveriid})

}

const putupdate=(data)=>{
    return axios.put('/put-updatenew',data)
}
export{getAll,postcreate,postdelete,putupdate}