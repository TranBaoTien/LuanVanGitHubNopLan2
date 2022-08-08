import bcrypt from 'bcryptjs';
import db from '../models/index'
const salt=bcrypt.genSaltSync(10);
//tao Price
let createNewPrice=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
                   let Price= await db.Price.create({
                    idpro: data.idpro,
                    price: data.price
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

let getAllPrice=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Prices=db.Price.findAll(
                {raw:true}
                );
        
            resolve(Prices);
        } catch (e) {
            reject(e);
        }

    })
}

let getOnePrice=async(Priceid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Prices='';

            if(Priceid=='ALL')
            { Prices=await db.Price.findAll(
                {raw:true}
                )}
            if(Priceid && Priceid!='ALL'){
                Prices=await db.Price.findOne({  where:{idpro:Priceid},
                    
                    raw:true});
            }
          
        
            resolve(Prices);
        } catch (e) {
            reject(e);
        }
       

    })
}



let updatePriceData=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
           
          let Price=await db.Price.findOne({
              where:{id:data.id}
          })
          if(Price){
            Price.idpro=data.idpro,
            Price.price= data.price
            await Price.save();
            resolve({
                errCode:0,
                message:"Update thành công"
        });
          }else{
              resolve({
                errCode:20,
                message:"Sai Price"
        });
          }
          
            
        } catch (e) {
            reject(e);
        }

    })
}
let postdeletePrice=(Priceid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
          let Price=await db.Price.findOne({
              where:{id:Priceid}
          })
          if(Price){
            await Price.destroy();
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
createNewPrice:createNewPrice,
getAllPrice:getAllPrice,

updatePriceData:updatePriceData,
postdeletePrice:postdeletePrice,
getOnePrice:getOnePrice,
};