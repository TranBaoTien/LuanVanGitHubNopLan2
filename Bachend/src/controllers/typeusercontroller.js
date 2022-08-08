
import db from '../models/index';
import CRUDTypeuser from '../services/CRUDTypeuser'


//  tạo Typeuser
let postcreateTypeuser=async(req,res)=>{
    //xuat cai da nhap vao
     let data=await CRUDTypeuser.createNewTypeuser(req.body);
    return res.send(data);
}
//UPDATE Typeuser theo id
let putupdateTypeuser=async(req,res)=>{
   // let Typeuserid=req.query.id;
    let data=await CRUDTypeuser.updateTypeuserData(req.body);
    return res.send(data);
}
//delete 
let postdeleteTypeuser=async(req,res)=>{
    //lay id chon tren duong link
    let Typeuserid=req.body.id;
    if(Typeuserid){
       let data= await CRUDTypeuser.postdeleteTypeuser(Typeuserid);
        return res.send(data);
    }else{

        return res.send('khong co id can tim');
    }
}
//Lấy tất cả Typeuser
let getAllTypeuser=async(req,res)=>{
   
        let data=await CRUDTypeuser.getAllTypeuser(req.body);
       // console.log(data);
       // return res.send({data: JSON.stringify(data)});
        return res.send(data);
   
}

let getOneTypeuser=async(req,res)=>{
    let Typeuserid=req.query.id;
    let data=await CRUDTypeuser.getOneTypeuser(Typeuserid);
    return res.send(data);
}
module.exports = {

    postcreateTypeuser:postcreateTypeuser,

    getAllTypeuser:getAllTypeuser,
    putupdateTypeuser:putupdateTypeuser,
    postdeleteTypeuser:postdeleteTypeuser,
    getOneTypeuser:getOneTypeuser
  
}
