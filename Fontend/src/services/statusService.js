
import axios from '../axios'

const getAll=()=>{
    return axios.get('/get-allstatus')
    ///get-onedeliveri?id=${id}
}
const getOnestatus=(data)=>{
    return axios.get('/get-onestatus',data)
    ///get-onedeliveri?id=${id}
}
const postcreate=(data)=>{
    return axios.post('/post-createstatus',data)
}

const postdelete=(dataid)=>{
    //.log('is'+deliveriid)
    return axios.post('/post-deletestatus',{id:dataid})

}

const putupdate=(data)=>{
    return axios.put('/put-updatestatus',data)
}
export{getAll,postcreate,postdelete,putupdate}