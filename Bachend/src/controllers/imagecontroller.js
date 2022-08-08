
import db from '../models/index';
import CRUDImage from '../services/CRUDImage'


//  tạo Image
let postcreateImage=async(req,res)=>{
    //xuat cai da nhap vao
     let data=await CRUDImage.createNewImage(req.body);
    return res.send(data);
}
//UPDATE Image theo id
let putupdateImage=async(req,res)=>{
   // let Imageid=req.query.id;
    let data=await CRUDImage.updateImageData(req.body);
    return res.send(data);
}
//delete 
let postdeleteImage=async(req,res)=>{
    //lay id chon tren duong link
    let Imageid=req.body.id;
    if(Imageid){
       let data= await CRUDImage.postdeleteImage(Imageid);
        return res.send(data);
    }else{

        return res.send('khong co id can tim');
    }
}
//Lấy tất cả Image
let getAllImage=async(req,res)=>{
   
        let data=await CRUDImage.getAllImage();
       // console.log(data);
       // return res.send({data: JSON.stringify(data)});
        return res.send(data);
   
}

let getOneImage=async(req,res)=>{
    let Imageid=req.query.id;
    let data=await CRUDImage.getOneImage(Imageid);
    return res.send(data);
}
module.exports = {

    postcreateImage:postcreateImage,

    getAllImage:getAllImage,
    putupdateImage:putupdateImage,
    postdeleteImage:postdeleteImage,
    getOneImage:getOneImage
  
}
