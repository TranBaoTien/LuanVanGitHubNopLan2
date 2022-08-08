import bcrypt from 'bcryptjs';
import db from '../models/index'
const salt=bcrypt.genSaltSync(10);
//tao Delivery
let createNewDelivery=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
                   let Delivery= await db.Delivery.create({
                        name: data.name,
                    })
                    resolve(
                        {
                            errCode:0,
                            message:"Create Thành Công",
                    })}
        catch (e) {
            reject(e);
        } })
}

let getAllDelivery=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Deliverys= await db.Delivery.findAll(
                {raw:true}
                );
        
            resolve(Deliverys);
        } catch (e) {
            reject(e);
        }

    })
}

let getOneDelivery=async(Deliveryid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Deliverys=db.Delivery.findOne({  where:{id:Deliveryid},raw:true});
            resolve(Deliverys);
        } catch (e) {
            reject(e);
        }

    })
}


let updateDeliveryData=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
           
          let Delivery=await db.Delivery.findOne({
              where:{id:data.id}
          })
          if(Delivery){
            Delivery.name= data.name;
           
            await Delivery.save();
            resolve({
                errCode:0,
                message:"Update thành công"
        });
          }else{
              resolve({
                errCode:20,
                message:"Sai Delivery"
        });
          }
          
            
        } catch (e) {
            reject(e);
        }

    })
}
let postdeleteDelivery=(Deliveryid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
          let Delivery=await db.Delivery.findOne({
              where:{id:Deliveryid}
          })
          if(Delivery){
            await Delivery.destroy();
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
createNewDelivery:createNewDelivery,
getAllDelivery:getAllDelivery,

updateDeliveryData:updateDeliveryData,
postdeleteDelivery:postdeleteDelivery,
getOneDelivery:getOneDelivery,
};