
import axios from '../axios'
const getalloder=()=>{
    return axios.get('/get-alloder')
    ///get-oneproduct?id=${id}
}
const getoder=()=>{
    return axios.get('/get-alloder')
    ///get-oneproduct?id=${id}
}
const createoder=(data)=>{
    return axios.post('/post-createoder',data)
}
const addoder=(data)=>{
    return axios.post('/post-addoder',data)
}
const deleteoder=(productid)=>{
   // console.log('is'+productid)
    return axios.post('/post-deleteoder',{id:productid})

    
}
const editoder=(data)=>{
    return axios.put('/put-updateoder',data)
}
const huydon=(data)=>{
    return axios.put('/put-huydon',data)
}
const getvoucher=()=>{
    return axios.get('/get-allvoucher')
    ///get-oneproduct?id=${id}
}
const createvoucher=(data)=>{
    return axios.post('/post-createvoucher',data)
}

const deletevoucher=(productid)=>{
   // console.log('is'+productid)
    return axios.post('/post-deletevoucher',{id:productid})

    
}
const editvoucher=(data)=>{
    return axios.put('/put-updatevoucher',data)
}

const getpayment=()=>{
    return axios.get('/get-allpayment')
    ///get-oneproduct?id=${id}
}
const createpayment=(data)=>{
    return axios.post('/post-createpayment',data)
}

const deletepayment=(productid)=>{
   // console.log('is'+productid)
    return axios.post('/post-deletepayment',{id:productid})

    
}
const editpayment=(data)=>{
    return axios.put('/put-updatepayment',data)
}
const getalldetail=()=>{
    return axios.get('/get-alldetailoder')
    ///get-oneproduct?id=${id}
}
const getAllstatus=()=>{
    return axios.get('/get-allstatus')
    ///get-onedeliveri?id=${id}
}
const getOnestatus=(data)=>{
    return axios.get('/get-onestatus',data)
    ///get-onedeliveri?id=${id}
}
const getAlldeliveri=()=>{
    return axios.get('/get-alldeliveri')
    ///get-onedeliveri?id=${id}
}
const getAlluser=()=>{
    return axios.get('/get-alluser')
    ///get-oneuser?id=${id}
}
export{
    getalloder,createoder,deleteoder,editoder,
    getvoucher,createvoucher,deletevoucher,editvoucher,
    getpayment,createpayment,deletepayment,editpayment,
    getalldetail,getoder,getAllstatus,getAlldeliveri
    ,getOnestatus,getAlluser,addoder,huydon
}