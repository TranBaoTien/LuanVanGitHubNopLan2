import db from '../models/index'
import bcrypt, { hash } from 'bcryptjs';
const salt=bcrypt.genSaltSync(10);

//tao password tu dong nhu md5
let hashUserPassword=(password)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            var hashPassword=await bcrypt.hashSync(password,salt);
            resolve(hashPassword);
        } catch (e) {
            //consolog.log(e)
            reject(e);
        }
    })
}
//tao user
let createNhanvien=async(data)=>{
    return new Promise(async(resolve,reject)=>{
      
   
        try {
          
                let checkuser=await CheckUser(data.username);
                if(checkuser==true){
                    resolve(
                        {
                            errCode:11,
                            message:"tên người dùng đã tồn tại"
                    }
                    )
                }
                else{
                    let hashPasswordFromBcrypt=await hashUserPassword(data.password);
                   let user= await db.Admin.create({

                        fullname: data.fullname,
                        username: data.username,
                        password:hashPasswordFromBcrypt,
                        idtype: 2,
                        phone:data.phone
                    })
                    resolve(
                        {
                            errCode:0,
                            message:"Create Thanh Cong"
                    }
                    )
                }
            
       
        } catch (e) {
            reject(e);
        }

    })

}
  //tao address
            // await db.Address.create({

            //     iduser: data.iduser,
            //     address: data.address,
            //     phone: data.phone
            // })
let getAllNhanVien=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let users=db.Admin.findAll(
                {raw:true}
                );
                if(users){
                    delete users.createdAt;
                    delete users.updatedAt;
                }
               
            resolve(users);
        } catch (e) {
            reject(e);
        }

    })
}
let handleuserlogin=(username,password)=>{
    return new Promise(async(resolve,reject)=>{

        try {
            let userdata={};
            let isExist= await CheckUser(username);
           if(isExist==true)
                {
            //user co ton tai
                    let user= await db.Admin.findOne({

                        where:{username:username},
                       // attributes:['fullname','idtype','email','password','phone'],
                        raw:true,
                    });
                    if(user )//&& user.idtype!=1
                        {
                            let check =await bcrypt.compareSync(password,user.password);
                            if(check)
                                    {
                                        userdata.errCode=0;
                                        userdata.errMessage="Đăng nhập thành công";
                                        userdata.user=user;
                                        //xoa mat khau de khong bi hack
                                        delete user.password;
                                        delete user.createdAt;
                                        delete user.updatedAt;
                                    }
                            else
                                {
                                    userdata.errCode=3;
                                    userdata.errMessage="Sai mật khẩu";
                                }
                        }
                    else
                        {
                            userdata.errCode=2;
                            userdata.errMessage="Tài khoản không tồn tại ";
                        
                        }
                    
                }
           else
            {
                userdata.errCode=1;
                userdata.errMessage="Tài Khoản không tồn tại ";
            
            } 
           
           resolve(userdata)

        } catch (e) {
            reject(e)
        }

    })

}

let CheckUser=(username)=>{
    return new Promise(async(resolve,reject)=>{
    
        try {

           let user= await db.Admin.findOne({

               where:{username:username}
            })
          if(user){
              resolve(true);
          }else{resolve(false);}
        } catch (e) {
            reject(e)
        }

    })
}
let postdeleteUser=(userid)=>{
    console.log(userid)
    return new Promise(async(resolve,reject)=>{
        try {
          let user=await db.Admin.findOne({
              where:{id:userid}
          })
          if(user){
            //await user.destroy();
            await db.Admin.destroy({
                where:{id:userid}
            })
            resolve({
                errCode:0,
                message:"Delete Thanh Cong"
        });//nhu return
          }else{
              resolve({
                errCode:20,
                message:"Không có id cần xoá"
        });
          }
          
            
        } catch (e) {
            reject(e);
        }

    })

}
module.exports={
    handleuserlogin:handleuserlogin,
    CheckUser:CheckUser ,
    getAllNhanVien:getAllNhanVien,
    createNhanvien:createNhanvien,
    postdeleteUser:postdeleteUser
}