
import db from '../models/index';
import CRUDPayment from '../services/CRUDPayment'


//  tạo Payment
let postcreatePayment=async(req,res)=>{
    //xuat cai da nhap vao
     let data=await CRUDPayment.createNewPayment(req.body);
    return res.send(data);
}
//UPDATE Payment theo id
let putupdatePayment=async(req,res)=>{
   // let Paymentid=req.query.id;
    let data=await CRUDPayment.updatePaymentData(req.body);
    return res.send(data);
}
//delete 
let postdeletePayment=async(req,res)=>{
    //lay id chon tren duong link
    let Paymentid=req.body.id;
    if(Paymentid){
       let data= await CRUDPayment.postdeletePayment(Paymentid);
        return res.send(data);
    }else{

        return res.send('khong co id can tim');
    }
}
//Lấy tất cả Payment
let getAllPayment=async(req,res)=>{
   
        let data=await CRUDPayment.getAllPayment();
       // console.log(data);
       // return res.send({data: JSON.stringify(data)});
        return res.send(data);
   
}

let getOnePayment=async(req,res)=>{
    let Paymentid=req.query.id;
    let data=await CRUDPayment.getOnePayment(Paymentid);
    return res.send(data);
}
module.exports = {

    postcreatePayment:postcreatePayment,

    getAllPayment:getAllPayment,
    putupdatePayment:putupdatePayment,
    postdeletePayment:postdeletePayment,
    getOnePayment:getOnePayment
  
}
