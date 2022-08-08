import bcrypt from 'bcryptjs';
import db from '../models/index'
const salt=bcrypt.genSaltSync(10);
//tao Typeuser
let CheckUser=(username)=>{
    return new Promise(async(resolve,reject)=>{
        try {
           let user= await db.Typeuser.findOne({
               where:{name:username}
            })
          if(user){
              resolve(true);
          }else{resolve(false);}
        } catch (e) {
            reject(e)
        }

    })
}
let createNewTypeuser=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let checkemail=await CheckUser(data.name);
            if(checkemail==true){
                resolve(
                    {errCode:10,
                    message:"Trùng tên"
                }
                )

            }
            else{
                 await db.Typeuser.create({
                    name: data.name,
                })
                resolve(
                    {
                        errCode:0,
                        message:"Create Thành Công",
                })
            }
                 
                }
        catch (e) {
            reject(e);
        } })
}

let getAllTypeuser=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Typeusers=db.Typeuser.findAll(
                {raw:true}
                );
        
            resolve(Typeusers);
        } catch (e) {
            reject(e);
        }

    })
}

let getOneTypeuser=async(Typeuserid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Typeusers=db.Typeuser.findOne({  where:{id:Typeuserid},raw:true});
            resolve(Typeusers);
        } catch (e) {
            reject(e);
        }

    })
}

let updateTypeuserData=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let checkemail=await CheckUser(data.name);
            if(checkemail==true){
                resolve(
                    {errCode:10,
                    message:"Trùng tên"
                }
                )

            }
            else{
                let Typeuser=await db.Typeuser.findOne({
                    where:{id:data.id}
                })
                if(Typeuser){
                    Typeuser.name= data.name;
                   
                    await Typeuser.save();
                    resolve({
                        errCode:0,
                        message:"Update thành công"
                });
                  }else{
                      resolve({
                        errCode:20,
                        message:"Sai Typeuser"
                });
                  }
            }
      
       
          
            
        } catch (e) {
            reject(e);
        }

    })
}
let postdeleteTypeuser=(Typeuserid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
          let Typeuser=await db.Typeuser.findOne({
              where:{id:Typeuserid}
          })
          let user=await db.User.findAll({
            where:{idtype:Typeuserid}
          })
          if(!user){
            if(Typeuser){
                await Typeuser.destroy();
                resolve({
                    errCode:0,
                    message:"Delete thành công"
            });
              }else{
                  resolve({
                    errCode:20,
                    message:"Không có id cần xoá"
            });
              }
          }
          else{
            resolve({
                errCode:21,
                message:"Tồn tại user không thể xoá"
        });
          }
          if(Typeuser){
            await Typeuser.destroy();
            resolve({
                errCode:0,
                message:"Delete thành công"
        });
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
createNewTypeuser:createNewTypeuser,
getAllTypeuser:getAllTypeuser,

updateTypeuserData:updateTypeuserData,
postdeleteTypeuser:postdeleteTypeuser,
getOneTypeuser:getOneTypeuser,CheckUser
};