import bcrypt from 'bcryptjs';
import db from '../models/index'
const salt=bcrypt.genSaltSync(10);
//tao Image
let CheckPro=(proname)=>{
    return new Promise(async(resolve,reject)=>{
        try {
           let user= await db.Image.findOne({
               where:{name:proname}
            })
          if(user){
              resolve(true);
          }else{resolve(false);}
        } catch (e) {reject(e)}})}
let createNewImage=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try { let checkemail=await CheckPro(data.name);
            if(checkemail==true){
                resolve(
                    {errCode:10,
                    message:"Trùng tên"
                }
                )

            }else{
                let Image= await db.Image.create({
                    name: data.name,
                    idpro:data.idpro
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

let getAllImage=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Images=db.Image.findAll(
                {raw:true}
                );
        
            resolve(Images);
        } catch (e) {
            reject(e);
        }

    })
}

let getOneImage=async(Imageid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Images=db.Image.findOne({  where:{id:Imageid},raw:true});
            resolve(Images);
        } catch (e) {
            reject(e);
        }

    })
}


let updateImageData=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let checkemail=await CheckPro(data.name);
            if(checkemail==true){
                resolve(
                    {errCode:10,
                    message:"Trùng tên"
                }
                )

            }else{
                let Image=await db.Image.findOne({
                    where:{id:data.id}
                })
                if(Image){
                  Image.name= data.name;
                  Image.idpro=data.idpro
                  await Image.save();
                  resolve({
                      errCode:0,
                      message:"Update thành công"
              });
                }else{
                    resolve({
                      errCode:20,
                      message:"Sai Image"
              });
                }
                
            }
         
            
        } catch (e) {
            reject(e);
        }

    })
}
let postdeleteImage=(Imageid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
          let Image=await db.Image.findOne({
              where:{id:Imageid}
          })
          if(Image){
            await Image.destroy();
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
createNewImage:createNewImage,
getAllImage:getAllImage,

updateImageData:updateImageData,
postdeleteImage:postdeleteImage,
getOneImage:getOneImage,
};