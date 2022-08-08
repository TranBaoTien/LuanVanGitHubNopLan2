import bcrypt from 'bcryptjs';
import db from '../models/index'
const salt=bcrypt.genSaltSync(10);
//tao Status
let CheckStatus=(proname)=>{
    return new Promise(async(resolve,reject)=>{
    
        try {

           let user= await db.Status.findOne({

               where:{name:proname}
            })
          if(user){
              resolve(true);
          }else{resolve(false);}
        } catch (e) {
            reject(e)
        }

    })
}
let createNewStatus=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let check=await CheckStatus(data.name);
            if(check==true){
                resolve(
                    {errCode:10,
                    message:"Trùng tên"
                }
                )

            }else{

                let Status= await db.Status.create({
                    name: data.name,
                })
                resolve(
                    {
                        errCode:0,
                        message:"Create Thành Công",
                })}
            }
        catch (e) {
            reject(e);
        } })
}

let getAllStatus=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Statuss=db.Status.findAll(
                {raw:true}
                );
        
            resolve(Statuss);
        } catch (e) {
            reject(e);
        }

    })
}

let getOneStatus=async(Statusid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Statuss= await db.Status.findOne({  where:{id:Statusid},raw:true});
            resolve(Statuss);
        } catch (e) {
            reject(e);
        }

    })
}


let updateStatusData=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let check=await CheckStatus(data.name);
            if(check==true){
                resolve(
                    {errCode:10,
                    message:"Trùng tên"
                }
                )

            }else{
                let Status=await db.Status.findOne({
                    where:{id:data.id}
                })
                if(Status){
                  Status.name= data.name;
                 
                  await Status.save();
                  resolve({
                      errCode:0,
                      message:"Update thành công"
              });
                }else{
                    resolve({
                      errCode:20,
                      message:"Sai Status"
              });
                }
            }
  
          
            
        } catch (e) {
            reject(e);
        }

    })
}
let postdeleteStatus=(Statusid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
          let Status=await db.Status.findOne({
              where:{id:Statusid}
          })
          if(Status){
            await Status.destroy();
            resolve({
                errCode:0,
                message:"Delete thành công"
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
createNewStatus:createNewStatus,
getAllStatus:getAllStatus,

updateStatusData:updateStatusData,
postdeleteStatus:postdeleteStatus,
getOneStatus:getOneStatus,CheckStatus
};