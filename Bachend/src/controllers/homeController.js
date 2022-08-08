
import db from '../models/index';
import CRUDUser from '../services/CRUDUser'


//  tạo user
let postcreateUser=async(req,res)=>{
    //xuat cai da nhap vao
     let data=await CRUDUser.createNewUser(req.body);
    return res.send(data);
}
//UPDATE USER theo id
let putupdateUser=async(req,res)=>{
    //let userid=req.query.id;
    let data=await CRUDUser.updateUserData(req.body);
    return res.send(data);
}
let putupdatePass=async(req,res)=>{
    //let userid=req.query.id;
    let data=await CRUDUser.updatepass(req.body);
    return res.send(data);
}
//delete 
let postdeleteUser=async(req,res)=>{
    //lay id chon tren duong link
    let userid=req.body.id;
    if(userid){
       let data= await CRUDUser.postdeleteUser(userid);
        return res.send(data);
    }else{

        return res.send('khong co id can tim');
    }
}
//Lấy tất cả user
let getAllUSER=async(req,res)=>{
   
        let data=await CRUDUser.getAllUser(req.body);
       // console.log(data);
      // return res.send({data: JSON.stringify(data)});
        return res.send(data);
   
}

let getOneUSER=async(req,res)=>{
    let userid=req.query.id;
    let data=await CRUDUser.getOneUSER(userid);
    return res.send(data);
}
//SUA THEO ID
    
let getEditCRUD=async(req,res)=>{
    let userid=req.query.id;
    //console.log(userid);
    if(userid){
        let userData=await CRUDUser.getUserByid(userid);
       
        return res.render('editcrud.ejs')
    }else{

        return res.send("khong co id");
    }
}
let getHomePage = async(req, res) => {
    try {
        let data=await db.User.findAll();
        return res.render('homepage.ejs'
        ,{data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
    
}

let getCRUD=(req,res)=>{
return res.render('crud.ejs');
    
}



module.exports = {
    getHomePage: getHomePage,

    getCRUD:getCRUD,
    postcreateUser:postcreateUser,

    getAllUSER:getAllUSER,
    getEditCRUD:getEditCRUD,
    putupdateUser:putupdateUser,
    postdeleteUser:postdeleteUser,
    getOneUSER:getOneUSER,
    putupdatePass:putupdatePass
  
}
