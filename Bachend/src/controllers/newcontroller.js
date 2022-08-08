
import db from '../models/index';
import CRUDNews from '../services/CRUDNews'


//  tạo News
let postcreateNews=async(req,res)=>{
    //xuat cai da nhap vao
     let data=await CRUDNews.createNewNews(req.body);
    return res.send(data);
}
//UPDATE News theo id
let putupdateNews=async(req,res)=>{
    //let Newsid=req.query.id;
    let data=await CRUDNews.updateNewsData(req.body);
    return res.send(data);
}
//delete 
let postdeleteNews=async(req,res)=>{
    //lay id chon tren duong link
    let Newsid=req.body.id;
    if(Newsid){
       let data= await CRUDNews.postdeleteNews(Newsid);
        return res.send(data);
    }else{

        return res.send('khong co id can tim');
    }
}
//Lấy tất cả News
let getAllNews=async(req,res)=>{
   
        let data=await CRUDNews.getAllNews(req.body);
       // console.log(data);
       // return res.send({data: JSON.stringify(data)});
        return res.send(data);
   
}

let getOneNews=async(req,res)=>{
    let Newsid=req.query.id;
    let data=await CRUDNews.getOneNews(Newsid);
    return res.send(data);
}
module.exports = {

    postcreateNews:postcreateNews,

    getAllNews:getAllNews,
    putupdateNews:putupdateNews,
    postdeleteNews:postdeleteNews,
    getOneNews:getOneNews
  
}
