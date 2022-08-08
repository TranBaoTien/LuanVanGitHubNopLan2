
import db from '../models/index';
import CRUDProductreview from '../services/CRUDProductreview'


//  tạo Productreview
let postcreateProductreview=async(req,res)=>{
    //xuat cai da nhap vao
     let data=await CRUDProductreview.createNewProductreview(req.body);
    return res.send(data);
}
//UPDATE Productreview theo id
let putupdateProductreview=async(req,res)=>{
    let Productreviewid=req.query.id;
    let data=await CRUDProductreview.updateProductreviewData(req.body,Productreviewid);
    return res.send(data);
}
//delete 
let postdeleteProductreview=async(req,res)=>{
    //lay id chon tren duong link
    let Productreviewid=req.body.id;
    if(Productreviewid){
       let data= await CRUDProductreview.postdeleteProductreview(Productreviewid);
        return res.send(data);
    }else{

        return res.send('khong co id can tim');
    }
}
//Lấy tất cả Productreview
let getAllProductreview=async(req,res)=>{
   
        let data=await CRUDProductreview.getAllProductreview();
        return res.send(data);
   
}

let getOneProductreview=async(req,res)=>{
    let Productreviewid=req.query.id;
    let data=await CRUDProductreview.getOneProductreview(Productreviewid);
    return res.send(data);
}
module.exports = {

    postcreateProductreview:postcreateProductreview,

    getAllProductreview:getAllProductreview,
    putupdateProductreview:putupdateProductreview,
    postdeleteProductreview:postdeleteProductreview,
    getOneProductreview:getOneProductreview
  
}
