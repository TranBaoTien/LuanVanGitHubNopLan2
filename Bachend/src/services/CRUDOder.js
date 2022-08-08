import bcrypt from 'bcryptjs';
import { application } from 'express';
import { INTEGER } from 'sequelize';
import db from '../models/index'
import emailService from './Emailservice'
const salt=bcrypt.genSaltSync(10);
//tao Oder
let createNewOder=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
                   let Oder= await db.Oder.create({
                        
                        address: data.address,
                        iduser:data.iduser,
                        note: data.note,
                        idpay:1,
                        idvoucher:1,
                        idstatus:1
                    })
                    if((data.idpro).length===1){
                        let DetailOder=await db.Detailoder.create({
                            quatity: data.quatity,
                            namepro: data.namepro,
                            price: data.price,
                            idpro:data.idpro ,
                            idoder: Oder.id,
                            summoney: data.summoney,
                            idbh: 1
                        }) 
                        resolve(
                            {
                                errCode:0,
                                message:"Create Thành Công",
                        })
                    }
                    else if((data.idpro).length>=2){
                     const arridpro=[];
                     const arrnamepro=[];
                     const arrquatity=[];
                     const arrprice=[];
                     let i=0;
                     while(i<(data.idpro).length){
                        arridpro.unshift(data.idpro[i]);
                        arrnamepro.unshift(data.namepro[i]);
                        arrquatity.unshift(data.quatity[i]);
                        arrprice.unshift(data.price[i]);
                        i++;
                     }
                     let j=0;
                     while(j<(data.idpro).length){
                        await db.Detailoder.create({
                            quatity:arrquatity[j] ,
                            namepro:arrnamepro[j],
                            price: arrprice[j],
                            idpro:arridpro[j],
                            idoder: Oder.id,
                            summoney: data.summoney,
                            idbh: 1
                        }) 
                        j++;
                     }
                    resolve(
                        {
                            errCode:0,
                            message:"aâa",
                            test1:arridpro,
                            test2:arrnamepro,
                            test3:arrquatity,
                            test4:arrprice,
                    })
                }
                
                }
        catch (e) {
            reject(e);
        } })
}

let getAllOder=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Oders=await
             db.Oder.findAll(
                {raw:true}
                );
        
            resolve(Oders);
        } catch (e) {
            reject(e);
        }

    })
}

let getOneOder=async(Oderid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Oders=db.Oder.findOne({  where:{id:Oderid},raw:true});
            resolve(Oders);
        } catch (e) {
            reject(e);
        }

    })
}


let updateOderData=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
           
          let Oder=await db.Oder.findOne({
              where:{id:data.id}
          })
          if(Oder){
            if(data.idstatus==16){
                Oder.idstatus=data.idstatus
                await Oder.save();
                resolve({
                    errCode:0,
                    message:"Huỷ đơn thành công"
            });
            }else{
                if(Oder.idstatus>data.idstatus){
                    resolve({
                        errCode:11,
                        message:"Không thể cập nhật lại trạng thái trước đó"
                        
                    });
                }
                else{
                    if(data.idstatus==Oder.idstatus+1)
                  {
                    Oder.idstatus=data.idstatus
                    await Oder.save();
                    resolve({
                        errCode:0,
                        message:"Update thành công"
                });
                    
                  }else{
                    resolve({
                        errCode:8,
                        message:"Trạng thái failse"
                });
                  }  
                    }}
          }else{
              resolve({
                errCode:20,
                message:"Sai Oder"
        });}
        } catch (e) {
            reject(e);
        }

    })
}
let huydon=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
           
          let Oder=await db.Oder.findOne({
              where:{id:data.id}
          })
          if(Oder){
          
                Oder.idstatus=16
                await Oder.save();
                resolve({
                    errCode:0,
                    message:"Huỷ đơn thành công"
            });   
          }else{
              resolve({
                errCode:20,
                message:" Oder không tồn tại"
        });}
        } catch (e) {
            reject(e);
        }

    })
}
let postdeleteOder=(Oderid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
          let Oder=await db.Oder.findOne({
              where:{id:Oderid}
          })
          if(Oder){
            await Oder.destroy();
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
let getAllDetailOder=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Oders=db.Detailoder.findAll(
                {raw:true}
                );
        
            resolve(Oders);
        } catch (e) {
            reject(e);
        }

    })
}
let createOder=async(data)=>{
  //  console.log(data)
    return new Promise(async(resolve,reject)=>{
        try {
    
           let odercus=data.cart;
                   let Oder= await db.Oder.create({ 
                        address: data.address,
                        iduser:data.iduser,
                        note: data.note,
                        idpay:1,
                        idvoucher:1,
                        idstatus:1
                    })
                   
                    {odercus&&odercus.map(async(item,index)=>{
                     //  console.log(item.quatity*item.price.price)
                      let Detail= await db.Detailoder.create({
                            quatity: item.quatity,
                            namepro: item.product.name,
                            price: item.price.price,
                            idpro:item.product.id ,
                            idoder: Oder.id,
                            summoney: item.quatity*item.price.price-item.quatity*item.price.price*data.discounts/100,
                            idbh: 1
                        }) 
                    }
                        )}
                if(Oder){
                   
                    resolve(
                        {
                            errCode:0,
                            message:"Create Thành Công",
                        
                    })
                    await emailService.sendEmail(data)
                }
                else{
                    resolve(
                        {
                            errCode:3,
                            message:"Đơn hàng đặt thất bại",
            
                    })
                }
                       
                    }
                   
                
        catch (e) {
            reject(e);
        } })
}

module.exports={
createNewOder:createNewOder,
getAllOder:getAllOder,

updateOderData:updateOderData,
postdeleteOder:postdeleteOder,
getOneOder:getOneOder,
getAllDetailOder:getAllDetailOder,
createOder:createOder,
huydon:huydon
};