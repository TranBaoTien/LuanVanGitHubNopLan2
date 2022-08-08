
import db from '../models/index';
import CRUDThuonghieu from '../services/CRUDThuonghieu'


//  tạo Thuonghieu
let postcreateThuonghieu=async(req,res)=>{
    //xuat cai da nhap vao
     let data=await CRUDThuonghieu.createNewThuonghieu(req.body);
    return res.send(data);
}
//UPDATE Thuonghieu theo id
let putupdateThuonghieu=async(req,res)=>{
    //let Thuonghieuid=req.query.id;
    let data=await CRUDThuonghieu.updateThuonghieuData(req.body);
    return res.send(data);
}
//delete 
let postdeleteThuonghieu=async(req,res)=>{
    //lay id chon tren duong link
    let Thuonghieuid=req.body.id;
    if(Thuonghieuid){
       let data= await CRUDThuonghieu.postdeleteThuonghieu(Thuonghieuid);
        return res.send(data);
    }else{

        return res.send('khong co id can tim');
    }
}
//Lấy tất cả Thuonghieu
let getAllThuonghieu=async(req,res)=>{
   
        let data=await CRUDThuonghieu.getAllThuonghieu(req.body);
       // console.log(data);
       // return res.send({data: JSON.stringify(data)});
        return res.send(data);
   
}

let getOneThuonghieu=async(req,res)=>{
    let Thuonghieuid=req.query.id;
    let data=await CRUDThuonghieu.getOneThuonghieu(Thuonghieuid);
    return res.send(data);
}
module.exports = {

    postcreateThuonghieu:postcreateThuonghieu,

    getAllThuonghieu:getAllThuonghieu,
    putupdateThuonghieu:putupdateThuonghieu,
    postdeleteThuonghieu:postdeleteThuonghieu,
    getOneThuonghieu:getOneThuonghieu
  
}
