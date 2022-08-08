import bcrypt from 'bcryptjs';
import db from '../models/index'
const salt=bcrypt.genSaltSync(10);
//tao Thuonghieu
let Checkthuonghieu=(proname)=>{
    return new Promise(async(resolve,reject)=>{
    
        try {

           let user= await db.Thuonghieu.findOne({

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
let createNewThuonghieu=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let checkemail=await Checkthuonghieu(data.name);
            if(checkemail==true){
                resolve(
                    {errCode:10,
                    message:"Trùng tên"
                }
                )

            }else{
                let Thuonghieu= await db.Thuonghieu.create({
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

let getAllThuonghieu=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Thuonghieus=db.Thuonghieu.findAll(
                {raw:true}
                );
        
            resolve(Thuonghieus);
        } catch (e) {
            reject(e);
        }

    })
}

let getOneThuonghieu=async(Thuonghieuid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Thuonghieus=db.Thuonghieu.findOne({  where:{id:Thuonghieuid},raw:true});
            resolve(Thuonghieus);
        } catch (e) {
            reject(e);
        }

    })
}


let updateThuonghieuData=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let checkemail=await Checkthuonghieu(data.name);
            if(checkemail==true){
                resolve(
                    {errCode:10,
                    message:"Trùng tên"
                }
                )

            }else{
                let Thuonghieu=await db.Thuonghieu.findOne({
                    where:{id:data.id}
                })
                if(Thuonghieu){
                  Thuonghieu.name= data.name;
                 
                  await Thuonghieu.save();
                  resolve({
                      errCode:0,
                      message:"Update thành công"
              });
                }else{
                    resolve({
                      errCode:20,
                      message:"Sai Thuonghieu"
              });
                }
            }
          
          
            
        } catch (e) {
            reject(e);
        }

    })
}
let postdeleteThuonghieu=(Thuonghieuid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
          let Thuonghieu=await db.Thuonghieu.findOne({
              where:{id:Thuonghieuid}
          })
          let Products=await db.Product.findOne({
            where:{idth:Thuonghieuid}
          });
          if(!Products){
            if(Thuonghieu){
                await Thuonghieu.destroy();
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
    
          }
          else{  resolve({
            errCode:20,
            message:"co san pham"
    });

          }
          
            
        } catch (e) {
            reject(e);
        }

    })

}



module.exports={
createNewThuonghieu:createNewThuonghieu,
getAllThuonghieu:getAllThuonghieu,

updateThuonghieuData:updateThuonghieuData,
postdeleteThuonghieu:postdeleteThuonghieu,
getOneThuonghieu:getOneThuonghieu,Checkthuonghieu
};