import bcrypt from 'bcryptjs';
import db from '../models/index'
const salt=bcrypt.genSaltSync(10);
//tao Voucher
let Checkvoucher=(mavc)=>{
    return new Promise(async(resolve,reject)=>{
        try {
           let vc= await db.Voucher.findAll({
               where:{detail:mavc}
            })
          if(vc){
              resolve(vc);
          }else{resolve(false);}
        } catch (e) {
            reject(e)
        }

    })
}
let createNewVoucher=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
                   let Voucher= await db.Voucher.create({
                        phantram: data.phantram,
                        detail: data.detail,
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

let getAllVoucher=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Vouchers=db.Voucher.findAll(
                {raw:true}
                );
        
            resolve(Vouchers);
        } catch (e) {
            reject(e);
        }

    })
}

let getOneVoucher=async(Voucherid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Vouchers=db.Voucher.findOne({  where:{id:Voucherid},raw:true});
            resolve(Vouchers);
        } catch (e) {
            reject(e);
        }

    })
}


let updateVoucherData=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
           
          let Voucher=await db.Voucher.findOne({
              where:{id:data.id}
          })
          if(Voucher){
            Voucher.phantram= data.phantram,
            Voucher.detail=data.detail,
           
            await Voucher.save();
            resolve({
                errCode:0,
                message:"Update thành công"
        });
          }else{
              resolve({
                errCode:20,
                message:"Sai Voucher"
        });
          }
          
            
        } catch (e) {
            reject(e);
        }

    })
}
let postdeleteVoucher=(Voucherid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
          let Voucher=await db.Voucher.findOne({
              where:{id:Voucherid}
          })
          if(Voucher){
            await Voucher.destroy();
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
createNewVoucher:createNewVoucher,
getAllVoucher:getAllVoucher,

updateVoucherData:updateVoucherData,
postdeleteVoucher:postdeleteVoucher,
getOneVoucher:getOneVoucher,
Checkvoucher:Checkvoucher
};