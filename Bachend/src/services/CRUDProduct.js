import bcrypt from 'bcryptjs';
import db, { sequelize } from '../models/index'
import Sequelize from "sequelize";
const salt=bcrypt.genSaltSync(10);
//tao Product
let CheckPro=(proname)=>{
    return new Promise(async(resolve,reject)=>{
    
        try {

           let user= await db.Product.findOne({

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
let createNewProduct=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let check=await CheckPro(data.name);
            if(check==true){
                resolve(
                    {errCode:10,
                    message:"Trùng tên"
                }
                )

            }else{
                let Product= await db.Product.create({
                    name:data.name ,
                    xuatxu: data.xuatxu,
                    timebaohanh: data.timebaohanh,
                    size: data.size,
                    weigth: data.weigth,
                    chatlieu:data.chatlieu,
                    chip: data.chip,
                    sonhan: data.sonhan,
                    ram: data.ram,
                    sizescreen: data.sizescreen,
                    technologyscreen: data.technologyscreen,
                    dophangiai: data.dophangiai,
                    camsau: data.camsau,
                    camtruoc: data.camtruoc,
                    musim: data.musim,
                    congsac: data.congsac,
                    pin: data.pin,
                    hedieuhanh: data.hedieuhanh,
                    img: data.img,
                    idth: data.idth,
                    idtype: data.idtype,
                    idstatus: data.idstatus,
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

let getAllProduct=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Products=db.Product.findAll(
                {raw:true}
                );
        
            resolve(Products);
        } catch (e) {
            reject(e);
        }

    })
}
let getAllProduct1=async(proid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Products='';
            if(proid=='ALL')
            { Products=await db.Product.findAll(
                {raw:true}
                )}
            if(proid && proid!='ALL'){
                Products=await db.Product.findOne(
                    { where: {id:proid},
                    raw:true
                }
                    
                      );
            }
          
        
            resolve(Products);
        } catch (e) {
            reject(e);
        }

    })
}

let getOneProduct=async(Productid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Products=db.Product.findOne(
                {  where:{id:Productid}
                ,raw:true});
            resolve(Products);
        } catch (e) {
            reject(e);
        }

    })
}

let updateProductData=(data)=>{
    console.log(data)
    return new Promise(async(resolve,reject)=>{
        try {
            // let check=await CheckPro(data.name);
            // if(check==true){
            //     resolve(
            //         {errCode:10,
            //         message:"Trùng tên"
            //     }
            //     )

            // }else{
          let Product=await db.Product.findOne({
              where:{id:data.id}
          })
          if(Product){
            Product.name=data.name ,
            Product.xuatxu= data.xuatxu,
            Product.timebaohanh= data.timebaohanh,
            Product.size= data.size,
            Product.weigth= data.weigth,
            Product.chatlieu=data.chatlieu,
            Product.chip= data.chip,
            Product.sonhan= data.sonhan,
            Product.ram= data.ram,
            Product.sizescreen= data.sizescreen,
            Product.technologyscreen= data.technologyscreen,
            Product.dophangiai= data.dophangiai,
            Product.camsau= data.camsau,
            Product.camtruoc= data.camtruoc,
            Product.musim= data.musim,
            Product.congsac= data.congsac,
            Product.pin= data.pin,
            Product.hedieuhanh= data.hedieuhanh,
            Product.img= data.img,
            Product.idth= data.idth,
            Product.idtype= data.idtype,
            Product.idstatus= data.idstatus,
            await Product.save();
            resolve({
                errCode:0,
                message:"Update thành công"
        });
          }else{
              resolve({
                errCode:20,
                message:"Sai Product"
        });
          }
          
            
        } catch (e) {
            reject(e);
        }

    })
}
let postdeleteProduct=(productid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
          let product=await db.Product.findOne({
              where:{id:productid}
          })
          if(product){
           // await Product.destroy();
            await db.Product.destroy({
                where:{id:productid}
            })
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
let timkiem=async(data)=>{
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({
                where: Sequelize.literal(`MATCH (name,ram,technologyscreen,congsac,chip,hedieuhanh) 
                AGAINST(` + `'` + data + `'` + `)`),
                raw:true
            });
            resolve(products);
        } catch (error) {
            // reject(error);
            console.log(error);
        }
    })
}

let SearchProduct =async(key) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({
                where: Sequelize.literal(`MATCH (name,ram,technologyscreen,congsac,chip,hedieuhanh) 
                AGAINST(` + `'` + key + `'` + `)`)

            });
            resolve(products);
        } catch (error) {
            // reject(error);
            console.log(error);
        }
    })
}
let searchProduct = (key) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({
                // where:{name:like %key% }
                // // where: {'name LIKE %`+key+`%
                // //  OR ram LIKE'%2%'OR chip LIKE
                // //   '%2%'chatlieu LIKE '%2%'
                // //    OR xuatxu LIKE'%2%'OR 
                // //    technologyscreen LIKE '%2%''}

            });
            resolve(products);
        } catch (error) {
            // reject(error);
            console.log(error);
        }
    })
}

let getpronhieunhat=async()=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const { QueryTypes } = require('sequelize');
            let Products= await sequelize.query(`SELECT products.name, products.img,SUM(detailoders.quatity) as soluongban,detailoders.namepro, products.id from detailoders join products on products.id = detailoders.idpro JOIN oders ON detailoders.idoder=oders.id WHERE oders.idstatus=4 GROUP BY detailoders.idpro ORDER BY SUM(detailoders.quatity) DESC limit 5`, { type: QueryTypes.SELECT })
        
            resolve(Products);
        } catch (e) {
            reject(e);
        }

    })
}
let getMoiNhat =async() => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({
                order:[["id","DESC"]]
            });
            resolve(products);
        } catch (error) {
            // reject(error);
            console.log(error);
        }
    })
}
// SELECT SUM(detailoders.quatity) as soluongban,detailoders.namepro, products.id from detailoders join products on products.id = detailoders.idpro JOIN oders ON detailoders.idoder=oders.id
// WHERE oders.idstatus=4
// GROUP BY detailoders.idpro
// ORDER BY SUM(detailoders.quatity) DESC limit 5

module.exports={
createNewProduct:createNewProduct,
getAllProduct:getAllProduct,
getAllProduct1:getAllProduct1,
updateProductData:updateProductData,
postdeleteProduct:postdeleteProduct,
getOneProduct:getOneProduct,
SearchProduct:SearchProduct,
CheckPro:CheckPro,
timkiem:timkiem,
getpronhieunhat:getpronhieunhat,
getMoiNhat:getMoiNhat
};