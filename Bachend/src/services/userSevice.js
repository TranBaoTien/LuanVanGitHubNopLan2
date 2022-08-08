import db from '../models/index'
import bcrypt, { hash } from 'bcryptjs';
let handleuserlogin=(username,password)=>{
    return new Promise(async(resolve,reject)=>{

        try {
            let userdata={};
            let isExist= await CheckUser(username);
           if(isExist==true)
                {
            //user co ton tai
                    let user= await db.User.findOne({

                        where:{username:username},
                       // attributes:['fullname','idtype','email','password','phone'],
                        raw:true,
                    });
                    if(user )//&& user.idtype!=1
                        {
                            let check =await bcrypt.compareSync(password,user.password);
                            if(check)
                                    {
                                        userdata.errCode=0;
                                        userdata.errMessage="Đăng nhập thành công";
                                        userdata.user=user;
                                        //xoa mat khau de khong bi hack
                                         user.name;
                                        delete user.createdAt;
                                        delete user.updatedAt;
                                    }
                            else
                                {
                                    userdata.errCode=3;
                                    userdata.errMessage="Sai mật khẩu";
                                }
                        }
                    else
                        {
                            userdata.errCode=2;
                            userdata.errMessage="Tài khoản không tồn tại ";
                        
                        }
                    
                }
           else
            {
                userdata.errCode=1;
                userdata.errMessage="Tài Khoản không tồn tại ";
            
            } 
           
           resolve(userdata)

        } catch (e) {
            reject(e)
        }

    })

}

let CheckUser=(username)=>{
    return new Promise(async(resolve,reject)=>{
    
        try {

           let user= await db.User.findOne({

               where:{username:username}
            })
          if(user){
              resolve(true);
          }else{resolve(false);}
        } catch (e) {
            reject(e)
        }

    })
}
module.exports={
    handleuserlogin:handleuserlogin,
    CheckUser:CheckUser 
}