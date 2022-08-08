import CRUDAdmin from '../services/CRUDAdmin'

let handlelogin=async(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
//check user
//check pass
//tra ve user
if(!username||!password)
{
    return res.status(200).json(
        {
       errCode:1,
       message:"Chưa nhập tên người dùng hoặc mật khẩu"
        }
    )
}
else{
    let userdata=await CRUDAdmin.handleuserlogin(username,password)
    return res.status(200).json({
        errCode:userdata.errCode,
        message:userdata.errMessage,
        user: userdata.user ? userdata.user : {}

    })
    //return res.send(userdata);
}

}
let postcreateNhanvien=async(req,res)=>{
    //xuat cai da nhap vao
     let data=await CRUDAdmin.createNhanvien(req.body);
    return res.send(data);
}
// let putupdateUser=async(req,res)=>{
    
//     return new Promise(async(resolve,reject)=>{
//         try {
//             let hashPasswordFromBcrypt=await hashUserPassword(data.password);
//           let user=await db.User.findOne({
//               where:{id:data.id}
//           })
//           if(user){
//             user.fullname= data.fullname;
//             user.username= user.username;
//             user.password=hashPasswordFromBcrypt;
//             user.idtype= data.idtype;
//             user.email=user.email;
//             user.phone=data.phone
//             await user.save();
//             resolve({
//                 errCode:0,
//                 message:"Update Thanh Cong"
//         });
//           }else{
//               resolve({
//                 errCode:20,
//                 message:"Sai User"
//         });
//           }
          
            
//         } catch (e) {
//             reject(e);
//         }

//     })
// }
// //delete 
let postdeleteUser=async(req,res)=>{
    //lay id chon tren duong link
    let userid=req.body.id;
    if(userid){
       let data= await CRUDAdmin.postdeleteUser(userid);
        return res.send(data);
    }else{

        return res.send('khong co id can tim');
    }
}
//Lấy tất cả user
let getAllNhanvien=async(req,res)=>{
   
        let data=await CRUDAdmin.getAllNhanVien(req.body);
        return res.send(data);
   
}

// let getOneUSER=async(req,res)=>{
//     let userid=req.query.id;
//     let data=await CRUDAdmin.getOneUSER(userid);
//     return res.send(data);
// }
// //SUA THEO ID
    
// let getEditCRUD=async(req,res)=>{
//     let userid=req.query.id;
//     //console.log(userid);
//     if(userid){
//         let userData=await CRUDAdmin.getUserByid(userid);
       
//         return res.render('editcrud.ejs')
//     }else{

//         return res.send("khong co id");
//     }
// }




module.exports = {
   handlelogin:handlelogin,
   postcreateNhanvien:postcreateNhanvien,

   getAllNhanvien:getAllNhanvien,
//    getEditCRUD:getEditCRUD,
//    putupdateUser:putupdateUser,
    postdeleteUser:postdeleteUser,
//    getOneUSER:getOneUSER
}