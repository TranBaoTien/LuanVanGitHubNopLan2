
import db from '../models/index';
import CRUDTypeproduct from '../services/CRUDTypeproduct'


//  tạo Typeproduct
let postcreateTypeproduct=async(req,res)=>{
    //xuat cai da nhap vao
     let data=await CRUDTypeproduct.createNewTypeproduct(req.body);
    return res.send(data);
}
//UPDATE Typeproduct theo id
let putupdateTypeproduct=async(req,res)=>{
   // let Typeproductid=req.query.id;
    let data=await CRUDTypeproduct.updateTypeproductData(req.body);
    return res.send(data);
}
//delete 
let postdeleteTypeproduct=async(req,res)=>{
    //lay id chon tren duong link
    let Typeproductid=req.body.id;
    if(Typeproductid){
       let data= await CRUDTypeproduct.postdeleteTypeproduct(Typeproductid);
        return res.send(data);
    }else{

        return res.send('khong co id can tim');
    }
}
//Lấy tất cả Typeproduct
let getAllTypeproduct=async(req,res)=>{
   
        let data=await CRUDTypeproduct.getAllTypeproduct(req.body);
       // console.log(data);
       // return res.send({data: JSON.stringify(data)});
        return res.send(data);
   
}

let getOneTypeproduct=async(req,res)=>{
    let Typeproductid=req.query.id;
    let data=await CRUDTypeproduct.getOneTypeproduct(Typeproductid);
    return res.send(data);
}
module.exports = {

    postcreateTypeproduct:postcreateTypeproduct,

    getAllTypeproduct:getAllTypeproduct,
    putupdateTypeproduct:putupdateTypeproduct,
    postdeleteTypeproduct:postdeleteTypeproduct,
    getOneTypeproduct:getOneTypeproduct
  
}
