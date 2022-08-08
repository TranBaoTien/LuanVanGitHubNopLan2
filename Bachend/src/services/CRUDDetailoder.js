import bcrypt from 'bcryptjs';
import { application } from 'express';
import { INTEGER } from 'sequelize';
import db from '../models/index'
const salt=bcrypt.genSaltSync(10);
//tao Oder

let getAllDetailOder=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let Oders= await db.Detailoder.findAll(
                {raw:true}
                );
        
            resolve(Oders);
        } catch (e) {
            reject(e);
        }

    })
}




module.exports={
    getAllDetailOder:getAllDetailOder
};