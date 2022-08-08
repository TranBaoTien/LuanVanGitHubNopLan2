
require('dotenv').config();

import nodemailer from 'nodemailer'
let sendEmail=async(data)=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user:'tranbaotien1182000@gmail.com', // generated ethereal user
          pass:'oyuilmlqnxxxveqa', // generated ethereal password
        },
      });
    
      // send mail with defined transport object
     
//       { data.cart&& data.cart.map(item=>{
//         return(
//           <div>
// {item.id}
//           </div>);
//       })}
      let info = await transporter.sendMail({
        from: '"XiaomiShop" <tranbaotien1182000@gmail.com>', // sender address
        to:data.email, // list of receivers
        subject: "Đơn đặt hàng thành công ✔", // Subject line
        text: "Đơn hàng của bạn đã được xác nhận", // plain text body
    
        html:`
         
           
          
        <h3>Xin chào ${data.fullname}</h3>
        <h3>Đơn hàng của bạn đã được xác nhận</h3>
        <h4>Địa chỉ nhận hàng: ${data.address}</h4>
        ${data.cart.map((item=>{
          return(`   
           <div class="media">
          <img class="mr-3" src=".../64x64" alt="Generic placeholder image"/>
          <div class="media-body">
          
            <div class="media-body">
            <h5 class="mt-0">Tên sản phẩm :${item.product.name} </h5>
            <h5 class="mt-0">Tổng Tiền:${item.quatity*item.price.price-item.quatity*item.price.price*data.discounts*0.01 } </h5>
            <h5 class="mt-0">Giá sản phẩm:${ item.price.price}</h5>
            
          </div>
        </div>
        </div>
        `)
                 
               }))}
    
        `, // html body quatity: item.quatity,
        // namepro: item.product.name,
        // price: item.price.price,
        // idpro:item.product.id ,
        // idoder: Oder.id,
        // summoney: item.quatity*item.price.price-item.quatity*item.price.price*data.discounts/100,
        // idbh: 1
      });
}
module.exports={sendEmail:sendEmail}
// address: data.address,
// iduser:data.iduser,
// note: data.note,
// idpay:1,
// idvoucher:1,
// idstatus:1