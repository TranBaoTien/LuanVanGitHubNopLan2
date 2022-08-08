
import db from '../models/index';
import CRUDDelivery from '../services/CRUDDelivery'


//  tạo Delivery
let postcreateDelivery=async(req,res)=>{
    //xuat cai da nhap vao
     let data=await CRUDDelivery.createNewDelivery(req.body);
    return res.send(data);
}
//UPDATE Delivery theo id
let putupdateDelivery=async(req,res)=>{
    //let Deliveryid=req.query.id;
    let data=await CRUDDelivery.updateDeliveryData(req.body);
    return res.send(data);
}
//delete 
let postdeleteDelivery=async(req,res)=>{
    //lay id chon tren duong link
    let Deliveryid=req.body.id;
    if(Deliveryid){
       let data= await CRUDDelivery.postdeleteDelivery(Deliveryid);
        return res.send(data);
    }else{

        return res.send('khong co id can tim');
    }
}
//Lấy tất cả Delivery
let getAllDelivery=async(req,res)=>{
   
        let data=await CRUDDelivery.getAllDelivery(req.body);
       // console.log(data);
       // return res.send({data: JSON.stringify(data)});
        return res.send(data);
   
}

let getOneDelivery=async(req,res)=>{
    let Deliveryid=req.query.id;
    let data=await CRUDDelivery.getOneDelivery(Deliveryid);
    return res.send(data);
}
module.exports = {

    postcreateDelivery:postcreateDelivery,

    getAllDelivery:getAllDelivery,
    putupdateDelivery:putupdateDelivery,
    postdeleteDelivery:postdeleteDelivery,
    getOneDelivery:getOneDelivery
  
}
