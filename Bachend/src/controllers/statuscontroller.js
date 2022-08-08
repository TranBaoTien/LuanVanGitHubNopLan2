
import db from '../models/index';
import CRUDStatus from '../services/CRUDStatus'


//  tạo Status
let postcreateStatus=async(req,res)=>{
    //xuat cai da nhap vao
     let data=await CRUDStatus.createNewStatus(req.body);
    return res.send(data);
}
//UPDATE Status theo id
let putupdateStatus=async(req,res)=>{
    let Statusid=req.query.id;
    let data=await CRUDStatus.updateStatusData(req.body);
    return res.send(data);
}
//delete 
let postdeleteStatus=async(req,res)=>{
    //lay id chon tren duong link
    let Statusid=req.body.id;
    if(Statusid){
       let data= await CRUDStatus.postdeleteStatus(Statusid);
        return res.send(data);
    }else{

        return res.send('khong co id can tim');
    }
}
//Lấy tất cả Status
let getAllStatus=async(req,res)=>{
   
        let data=await CRUDStatus.getAllStatus(req.body);
       // console.log(data);
       // return res.send({data: JSON.stringify(data)});
        return res.send(data);
   
}

let getOneStatus=async(req,res)=>{
    let Statusid=req.body.id;
    let data=await CRUDStatus.getOneStatus(Statusid);
    return res.send(data);
}
module.exports = {

    postcreateStatus:postcreateStatus,

    getAllStatus:getAllStatus,
    putupdateStatus:putupdateStatus,
    postdeleteStatus:postdeleteStatus,
    getOneStatus:getOneStatus
  
}
