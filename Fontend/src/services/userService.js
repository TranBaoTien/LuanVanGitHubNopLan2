
import axios from '../axios'
const handleLoginApi = (username,password) => {
    return  axios.post('/api/login',{username:username,password:password});
}
const getAlluser=()=>{
    return axios.get('/get-alluser')
    ///get-oneuser?id=${id}
}
const createNewUser=(data)=>{
    return axios.post('/post-createuser',data)
}
const deleteUser=(userid)=>{
    return axios.post('/post-deleteuser',{id:userid})

}

const editupdateUser=(data)=>{
    return axios.put('/put-updateuser',data)
}
const updatePass=(data)=>{
    return axios.put('/put-updatepass',data)
}
const getAlltypeuser=()=>{
    return axios.get('/get-alltypeuser')
}
const createTypeuser=(data)=>{
    return axios.post('/post-createtypeuser',data)
}
const deleteTypeuser=(userid)=>{
    return axios.post('/post-deletetypeuser',{id:userid})

}

const editupdateTypeuser=(data)=>{
    return axios.put('/put-updatetypeuser',data)
}
export{handleLoginApi,getAlluser,createNewUser,deleteUser,editupdateUser,
    getAlltypeuser,createTypeuser
    ,deleteTypeuser,editupdateTypeuser,updatePass}