
import axios from '../axios'

const getAlldeliveri=()=>{
    return axios.get('/get-alldeliveri')
    ///get-onedeliveri?id=${id}
}
const createNewdeliveri=(data)=>{
    return axios.post('/post-createdeliveri',data)
}

const deletedeliveri=(deliveriid)=>{
    //.log('is'+deliveriid)
    return axios.post('/post-deletedeliveri',{id:deliveriid})

}

const editupdatedeliveri=(data)=>{
    return axios.put('/put-updatedeliveri',data)
}
export{getAlldeliveri,createNewdeliveri,deletedeliveri,editupdatedeliveri}