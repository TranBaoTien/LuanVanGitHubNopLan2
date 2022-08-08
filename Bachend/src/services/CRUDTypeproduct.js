import bcrypt from 'bcryptjs';
import db from '../models/index'
const salt=bcrypt.genSaltSync(10);
//tao Typeproduct
let CheckType=(proname)=>{
    return new Promise(async(resolve,reject)=>{
    
        try {

           let user= await db.Typeproduct.findOne({

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
let createNewTypeproduct=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let checkemail=await CheckType(data.name);
            if(checkemail==true){
                resolve(
                    {errCode:10,
                    message:"Trùng tên"
                }
                )

            }else{
                 let Typeproduct= await db.Typeproduct.create({
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

let getAllTypeproduct=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Typeproducts=db.Typeproduct.findAll(
                {raw:true}
                );
        
            resolve(Typeproducts);
        } catch (e) {
            reject(e);
        }

    })
}

let getOneTypeproduct=async(Typeproductid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Typeproducts=db.Typeproduct.findOne({  where:{id:Typeproductid},raw:true});
            resolve(Typeproducts);
        } catch (e) {
            reject(e);
        }

    })
}


let updateTypeproductData=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let checkemail=await CheckType(data.name);
            if(checkemail==true){
                resolve(
                    {errCode:10,
                    message:"Trùng tên"
                }
                )

            }else{
                let Typeproduct=await db.Typeproduct.findOne({
                    where:{id:data.id}
                })
                if(Typeproduct){
                  Typeproduct.name= data.name;
                 
                  await Typeproduct.save();
                  resolve({
                      errCode:0,
                      message:"Update thành công"
              });
                }else{
                    resolve({
                      errCode:20,
                      message:"Sai Typeproduct"
              });
                }
            }
           
     
          
            
        } catch (e) {
            reject(e);
        }

    })
}
let postdeleteTypeproduct=async(Typeproductid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
          let Typeproduct=await db.Typeproduct.findOne({
              where:{id:Typeproductid}
          });
          let Products=await db.Product.findOne({
            where:{idtype:Typeproductid}
          });
         
          if(Products){
            resolve({
                errCode:20,
                message:"Có sản phẩm không thể xoá", 
        });}
        else{
            if(Typeproduct){
                await Typeproduct.destroy();
                resolve({
                    errCode:0,
                    message:"Delete thành công"
            });//nhu return
              }else{
                  resolve({
                    errCode:20,
                    message:"Không có id cần xoá",
                    err:Products.length
            });
              }
       }
      
          
            
        } catch (e) {
            reject(e);
        }

    })

}



module.exports={
createNewTypeproduct:createNewTypeproduct,
getAllTypeproduct:getAllTypeproduct,

updateTypeproductData:updateTypeproductData,
postdeleteTypeproduct:postdeleteTypeproduct,
getOneTypeproduct:getOneTypeproduct,CheckType
};