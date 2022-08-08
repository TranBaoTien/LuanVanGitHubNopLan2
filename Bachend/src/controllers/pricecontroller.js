
import db from '../models/index';
import CRUDPrice from '../services/CRUDPrice'


//  tạo Price
let postcreatePrice=async(req,res)=>{
    //xuat cai da nhap vao
     let data=await CRUDPrice.createNewPrice(req.body);
    return res.send(data);
}
//UPDATE Price theo id
let putupdatePrice=async(req,res)=>{
 
    let data=await CRUDPrice.updatePriceData(req.body);
    return res.send(data);
}
//delete 
let postdeletePrice=async(req,res)=>{
    //lay id chon tren duong link
    let Priceid=req.body.id;
    if(Priceid){
       let data= await CRUDPrice.postdeletePrice(Priceid);
        return res.send(data);
    }else{

        return res.send('khong co id can tim');
    }
}
//Lấy tất cả Price
let getAllPrice=async(req,res)=>{
   
        let data=await CRUDPrice.getAllPrice();
       // console.log(data);
       // return res.send({data: JSON.stringify(data)});
        return res.send(data);
   
}

let getOnePrice=async(req,res)=>{
    let Priceid=req.query.idpro;
 

    if(Priceid){
        let data=await CRUDPrice.getOnePrice(Priceid);
        return res.send(data);
    }else{

        return res.status(200).json({
            errCode:2,
            price:[]
        });
    }
}
module.exports = {

    postcreatePrice:postcreatePrice,

    getAllPrice:getAllPrice,
    putupdatePrice:putupdatePrice,
    postdeletePrice:postdeletePrice,
    getOnePrice:getOnePrice
  
}
