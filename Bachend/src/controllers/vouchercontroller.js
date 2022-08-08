
import db from '../models/index';
import CRUDVoucher from '../services/CRUDVoucher'


//  tạo Voucher
let postcreateVoucher=async(req,res)=>{
    //xuat cai da nhap vao
     let data=await CRUDVoucher.createNewVoucher(req.body);
    return res.send(data);
}
//UPDATE Voucher theo id
let putupdateVoucher=async(req,res)=>{

    let data=await CRUDVoucher.updateVoucherData(req.body);
    return res.send(data);
}
//delete 
let postdeleteVoucher=async(req,res)=>{
    //lay id chon tren duong link
    let Voucherid=req.body.id;
    if(Voucherid){
       let data= await CRUDVoucher.postdeleteVoucher(Voucherid);
        return res.send(data);
    }else{

        return res.send('khong co id can tim');
    }
}
//Lấy tất cả Voucher
let getAllVoucher=async(req,res)=>{
   
        let data=await CRUDVoucher.getAllVoucher();
        return res.send(data);
   
}

let getOneVoucher=async(req,res)=>{
    let Voucherid=req.query.id;
    let data=await CRUDVoucher.getOneVoucher(Voucherid);
    return res.send(data);
}
module.exports = {

    postcreateVoucher:postcreateVoucher,

    getAllVoucher:getAllVoucher,
    putupdateVoucher:putupdateVoucher,
    postdeleteVoucher:postdeleteVoucher,
    getOneVoucher:getOneVoucher
  
}
