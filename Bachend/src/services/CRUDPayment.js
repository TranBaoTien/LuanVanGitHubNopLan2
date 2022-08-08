import bcrypt from 'bcryptjs';
import db from '../models/index'
const salt=bcrypt.genSaltSync(10);
//tao Payment
let CheckPayment=(proname)=>{
    return new Promise(async(resolve,reject)=>{
    
        try {

           let user= await db.Payment.findOne({

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
let createNewPayment=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let check=await CheckPayment(data.name)
            if(check==true){
                resolve(
                    {errCode:10,
                    message:"Trùng tên"
                }
                )

            }   else{
                let Payment= await db.Payment.create({
                    name: data.name,
                })
                resolve(
                    {
                        errCode:0,
                        message:"Create Thành Công",
                })
            }  }
        catch (e) {
            reject(e);
        } })
}

let getAllPayment=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Payments=db.Payment.findAll(
                {raw:true}
                );
        
            resolve(Payments);
        } catch (e) {
            reject(e);
        }

    })
}

let getOnePayment=async(Paymentid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Payments=db.Payment.findOne({  where:{id:Paymentid},raw:true});
            resolve(Payments);
        } catch (e) {
            reject(e);
        }

    })
}


let updatePaymentData=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let check=await CheckPayment(data.name)
            if(check==true){
                resolve(
                    {errCode:10,
                    message:"Trùng tên"
                }
                )

            }else{
                let Payment=await db.Payment.findOne({
                    where:{id:data.id}
                })
                if(Payment){
                  Payment.name= data.name;
                 
                  await Payment.save();
                  resolve({
                      errCode:0,
                      message:"Update thành công"
              });
                }else{
                    resolve({
                      errCode:20,
                      message:"id phương thức thanh toán không tồn tại"
              });
                }
            }
      
          
            
        } catch (e) {
            reject(e);
        }

    })
}
let postdeletePayment=(Paymentid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
          let Payment=await db.Payment.findOne({
              where:{id:Paymentid}
          })
          if(Payment){
            await Payment.destroy();
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
createNewPayment:createNewPayment,
getAllPayment:getAllPayment,

updatePaymentData:updatePaymentData,
postdeletePayment:postdeletePayment,
getOnePayment:getOnePayment,CheckPayment
};