
import db from '../models/index';
import CRUDOder from '../services/CRUDOder'
import CRUDDetailoder from'../services/CRUDDetailoder'
import Emailservice from '../services/Emailservice'
let getAllDetailOder=async(req,res)=>{
   
    let data=await CRUDDetailoder.getAllDetailOder();
    return res.send(data);

}
//  tạo OdercreateOder
let postcreateOder=async(req,res)=>{
    //xuat cai da nhap vao
     let data=await CRUDOder.createNewOder(req.body);
    return res.send(data);
}

let addOder=async(req,res)=>{
    //xuat cai da nhap vao
     let data=await CRUDOder.createOder(req.body);
    return res.send(data);
}
//UPDATE Oder theo id
let putupdateOder=async(req,res)=>{
    // let Oderid=req.query.id;
    let data=await CRUDOder.updateOderData(req.body);
    return res.send(data);
}
let puthuydon=async(req,res)=>{
    // let Oderid=req.query.id;
    let data=await CRUDOder.huydon(req.body);
    return res.send(data);
}
//delete 
let postdeleteOder=async(req,res)=>{
    //lay id chon tren duong link
    let Oderid=req.body.id;
    if(Oderid){
       let data= await CRUDOder.postdeleteOder(Oderid);
        return res.send(data);
    }else{

        return res.send('khong co id can tim');
    }
}
//Lấy tất cả Oder
let getAllOder=async(req,res)=>{
   
        let data=await CRUDOder.getAllOder();
       // console.log(data);
       // return res.send({data: JSON.stringify(data)});
        return res.send(data);
   
}

let getOneOder=async(req,res)=>{
    let Oderid=req.query.id;
    let data=await CRUDOder.getOneOder(Oderid);
    return res.send(data);
}
module.exports = {

    postcreateOder:postcreateOder,

    getAllOder:getAllOder,
    putupdateOder:putupdateOder,
    postdeleteOder:postdeleteOder,
    getOneOder:getOneOder,
    getAllDetailOder:getAllDetailOder,
    addOder:addOder,
    puthuydon:puthuydon
  
}
