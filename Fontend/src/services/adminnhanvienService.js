
import axios from '../axios'
const handleLoginApi = (username,password) => {
    return  axios.post('/api/adlogin',{username:username,password:password});
}
const getAllNhanvien=()=>{
    return axios.get('/get-allnhanvien')
    ///get-oneuser?id=${id}
}
const createNhanvien=(data)=>{
    return axios.post('/post-createnhanvien',data)
}
 const deleteUser=(userid)=>{
    return axios.post('/post-deletenhanvien',{id:userid})

}

// const editupdateUser=(data)=>{
//     return axios.put('/put-updateuser',data)
// }
// const getAlltypeuser=()=>{
//     return axios.get('/get-alltypeuser')
// }
// const createTypeuser=(data)=>{
//     return axios.post('/post-createtypeuser',data)
// }
// const deleteTypeuser=(userid)=>{
//     return axios.post('/post-deletetypeuser',{id:userid})

// }

// const editupdateTypeuser=(data)=>{
//     return axios.put('/put-updatetypeuser',data)
// }
export{handleLoginApi,getAllNhanvien,createNhanvien,deleteUser}
//,deleteUser,editupdateUser,
// getAlltypeuser,createTypeuser
// ,deleteTypeuser,editupdateTypeuser