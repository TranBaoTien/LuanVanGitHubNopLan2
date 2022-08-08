import bcrypt from 'bcryptjs';
import db from '../models/index'
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
let createNewUser=async(data)=>{
    return new Promise(async(resolve,reject)=>{
      
   
        try {
                
            let checkemail=await CheckEmail(data.email);
            console.log(data.email)
            if(checkemail==true){
                resolve(
                    {errCode:10,
                    message:"email đã đuọc đăng ký"
                }
                )

            }
            else{
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
                   let user= await db.User.create({

                        fullname: data.fullname,
                        username: data.username,
                        password:hashPasswordFromBcrypt,
                        idtype: 1,
                        email: data.email,
                        phone:data.phone
                    })
                    resolve(
                        {
                            errCode:0,
                            message:"Create Thanh Cong"
                    }
                    )
                }
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
let getAllUser=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let users=db.User.findAll(
                {raw:true}
                );
                if(users){
                    delete users.createdAt;
                    delete users.updatedAt;
                }
               
            resolve(users
            

               );
        } catch (e) {
            reject(e);
        }

    })
}

let getOneUSER=async(userid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let users=db.User.findOne({  where:{id:userid},raw:true});
            resolve(users);
        } catch (e) {
            reject(e);
        }

    })
}

let getUserByid=async(userid)=>{

    return new Promise(async(resolve,reject)=>{
        try {
            let users=await db.User.findOne({
                where:{id:userid},
                raw:true
            })
            if(users){
                resolve(users)
            }else{
                resolve({})
            }
        } catch (e) {
            reject(e);
        }

    })
}
let updatepass=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let userdata={};
          let hashPasswordFromBcrypt=await hashUserPassword(data.passwordnew);
          let user=await db.User.findOne({
              where:{id:data.id}
          })
       
            if(user )//&& user.idtype!=1
            {
                let check =await bcrypt.compareSync(data.password1,user.password);
                if(check)
                        {
                                                   user.fullname= user.fullname;
                        user.username= user.username;
                        user.password=hashPasswordFromBcrypt;
                        user.idtype= user.idtype;
                        user.email=user.email;
                        user.phone=user.phone;
                        await user.save();
                        resolve({
                            errCode:0,
                            message:"Thay đổi thành công"
                    });
                        }
                else
                    {  resolve({
                        errCode:2,
                        message:"mật khẩu hiện tại sai"
                });
                    }
            }
        else
            {    resolve({
                errCode:2,
                message:"Không tồn tại khách hàng"});
            
            }

                 //   resolve(userdata)
        } catch (e) {
            reject(e);
        }

    })
}
let updateUserData=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let hashPasswordFromBcrypt=await hashUserPassword('12345');
          let user=await db.User.findOne({
              where:{id:data.id}
          })
          if(user){

            // let checkemail=await CheckEmail(data.email);
      
            // if(checkemail==true){
            //     resolve(
            //         {errCode:10,
            //         message:"trung email"
            //     }
            //     )

            // }
            // else{
            //     let checkuser=await CheckUser(data.username);
            //     if(checkuser==true){
            //         resolve(
            //             {
            //                 errCode:11,
            //                 message:"trung username"
            //         }
            //         )
            //     }
            //     else{
            //         let checkphone=await CheckPhone(data.phone);
            //         if(checkphone==true){
            //             resolve(
            //                 {errCode:10,
            //                 message:"trung phone"
            //             }
            //             )
            //         }
            //         else{
                        user.fullname= data.fullname;
                        user.username= user.username;
                        user.password=user.password;
                        user.idtype= data.idtype;
                        user.email=data.email;
                        user.phone=data.phone;
                        await user.save();
                        resolve({
                            errCode:0,
                            message:"Update Thanh Cong"
                    });
            //         }
                    
            //     }
            // }
           
          }else{
              resolve({
                errCode:20,
                message:"Sai User"
        });
          }
          
            
        } catch (e) {
            reject(e);
        }

    })
}
let postdeleteUser=(userid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
          let user=await db.User.findOne({
              where:{id:userid}
          })
          if(user){
            //await user.destroy();
            await db.User.destroy({
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

let CheckUser=(username)=>{
    return new Promise(async(resolve,reject)=>{
    
        try {

           let user= await db.User.findOne({

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
let CheckEmail=async(data)=>{
    return new Promise(async(resolve,reject)=>{
    
        try {

           let user= await db.User.findOne({

               where:{email:data}
            })
          if(user){
              resolve(true);
          }else{resolve(false);}
        } catch (e) {
            reject(e)
        }

    })
}
let CheckPhone=(phone)=>{
    return new Promise(async(resolve,reject)=>{
    
        try {

           let user= await db.User.findOne({

               where:{phone:phone}
            })
          if(user){
              resolve(true);
          }else{resolve(false);}
        } catch (e) {
            reject(e)
        }

    })
}

module.exports={createNewUser:createNewUser,
hashUserPassword:hashUserPassword,
getAllUser:getAllUser,
getUserByid:getUserByid,
updateUserData:updateUserData,
postdeleteUser:postdeleteUser,
getOneUSER:getOneUSER,
CheckUser:CheckUser,
CheckEmail:CheckEmail,
CheckPhone:CheckPhone,
updatepass:updatepass
};