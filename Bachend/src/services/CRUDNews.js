import bcrypt from 'bcryptjs';
import db from '../models/index'
const salt=bcrypt.genSaltSync(10);
//tao News
let createNewNews=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
                   let News= await db.News.create({
                        name: data.name,
                        detail: data.detail
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

let getAllNews=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Newss=await db.News.findAll(
                {raw:true}
                );
        
            resolve(Newss);
        } catch (e) {
            reject(e);
        }

    })
}

let getOneNews=async(Newsid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Newss=db.News.findOne({  where:{id:Newsid},raw:true});
            resolve(Newss);
        } catch (e) {
            reject(e);
        }

    })
}


let updateNewsData=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
           
          let News=await db.News.findOne({
              where:{id:data.id}
          })
          if(News){
            News.name= data.name;
            News.detail= data.detail;
           
            await News.save();
            resolve({
                errCode:0,
                message:"Update thành công"
        });
          }else{
              resolve({
                errCode:20,
                message:"Sai News"
        });
          }
          
            
        } catch (e) {
            reject(e);
        }

    })
}
let postdeleteNews=(Newsid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
          let News=await db.News.findOne({
              where:{id:Newsid}
          })
          if(News){
            await News.destroy();
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
createNewNews:createNewNews,
getAllNews:getAllNews,

updateNewsData:updateNewsData,
postdeleteNews:postdeleteNews,
getOneNews:getOneNews,
};