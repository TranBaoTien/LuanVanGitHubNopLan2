import bcrypt from 'bcryptjs';

import db from '../models/index'
const salt=bcrypt.genSaltSync(10);
//tao Productreview
let createNewProductreview=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let User= await db.User.findOne(
                            {where:{id:data.iduser}}
                         );
            if(User){
                
                  let Oders=await db.Oder.findAll(
                {where:{iduser:data.iduser}}
                );
                if(Oders){
                let flasoder=false;
                {Oders.map(async(item,index)=>{
                   
                        if(item.idstatus==4){
                            flasoder=true;
                            let detailoder= await db.Detailoder.findAll(
                                {where:{idoder:item.id}}
                                );
                                let flas=false;
                                {detailoder.map(async(detail,ind)=>{
                                    if(detail.idpro==data.idpro){
                                        flas=true;
                                        await db.Productreview.create({
                                        idoder: detail.idoder,
                                        iduser: data.iduser,
                                        start:data.numstart,
                                        cmt:data.comment,
                                        edit:1,
                                        idpro:data.idpro
                                        })
                                       
                                        resolve({
                                           
                                            errCode:0,
                                            message:"Bình luận thành công"})
                                    }
                                    
                                })}
                                if(flas==false){
                                    resolve({
                                        errCode:4,
                                        message:"Sản phẩm chưa được bạn đặt"})
                                }
                                                           
                        }
                })}if(flasoder==false){
                    resolve({
                        errCode:3,
                        message:"Chưa Thanh Toán"})
                }
                  
                   
                }else{
                    resolve({
                        errCode:2,
                        message:"Khách hàng chưa có đặt hàng"})
                }
               
            }
            else{
                resolve({errCode:1,
                    message:"Khách hàng chưa đăng nhập"})
            }
            // let Oders=await db.Oder.findOne(
            //     {where:{id:data.idoder}}
            //     );
            //     if(Oders){
            //         let User= await db.User.findOne(
            //             {where:{id:data.iduser}}
            //          );
            //         if(User){
            //             if(Oders.iduser==User.id){
            //                 if(Oders.idstatus==4){
            //                     // let Productreview= await db.Productreview.create({
            //                     //     idoder: data.idoder,
            //                     //     iduser: data.iduser,
            //                     //     start:data.start,
            //                     //     cmt:data.cmt,
            //                     //     edit: data.edit
            //                     //     })
            //                     resolve(
            //                         {errCode:0,
            //                         message:"Create Thành Công",
            //                     })
            //                 }else{
            //                     resolve(
            //                         {errCode:4,
            //                         message:"Don hang chua giao thanh cong",
            //                     })
            //                 }
                       
            //             }else{
            //                 resolve(
            //                     {
            //                     Oders:Oders,
            //                     errCode:3,
            //                     message:"Khach chua dat hang",
            //                 })
            //             }
                      
            //         }else{
            //             resolve(
            //                 {
            //                     errCode:2,
            //                     message:"Khong co khach hang can tim",
            //             })
            //         }
                   
            //     }
            //     else{
            //         resolve(
            //             {
                           
            //                 errCode:1,
            //                 message:"oder khong ton tai",
            //         })
            //     }
                  
                }
        catch (e) {
            reject(e);
        } })
}

let getAllProductreview=async()=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Productreviews=db.Productreview.findAll(
                {raw:true}
                );
        
            resolve(Productreviews);
        } catch (e) {
            reject(e);
        }

    })
}

let getOneProductreview=async(Productreviewid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Productreviews=db.Productreview.findOne({  where:{id:Productreviewid},raw:true});
            resolve(Productreviews);
        } catch (e) {
            reject(e);
        }

    })
}


let updateProductreviewData=(data,Productreviewid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
           
          let Productreview=await db.Productreview.findOne({
              where:{id:Productreviewid}
          })
          if(Productreview){
           
            Productreview.idoder= data.idoder,
            Productreview.iduser=data.iduser,
            Productreview.start=data.start,
            Productreview.cmt=data.cmt,
            Productreview.edit=data.edit
           
            await Productreview.save();
            resolve({
                errCode:0,
                message:"Update thành công"
        });
          }else{
              resolve({
                errCode:20,
                message:"Sai Productreview"
        });
          }
          
            
        } catch (e) {
            reject(e);
        }

    })
}
let postdeleteProductreview=(Productreviewid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
          let Productreview=await db.Productreview.findOne({
              where:{id:Productreviewid}
          })
          if(Productreview){
            await Productreview.destroy();
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
createNewProductreview:createNewProductreview,
getAllProductreview:getAllProductreview,

updateProductreviewData:updateProductreviewData,
postdeleteProductreview:postdeleteProductreview,
getOneProductreview:getOneProductreview,
};