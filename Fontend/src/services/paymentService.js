
import axios from '../axios'

const getAll=()=>{
    return axios.get('/get-allpayment')
    ///get-onedeliveri?id=${id}
}
const postcreate=(data)=>{
    return axios.post('/post-createpayment',data)
}

const postdelete=(deliveriid)=>{
    //.log('is'+deliveriid)
    return axios.post('/post-deletepayment',{id:deliveriid})

}

const putupdate=(data)=>{
    return axios.put('/put-updatepayment',data)
}
export{getAll,postcreate,postdelete,putupdate}