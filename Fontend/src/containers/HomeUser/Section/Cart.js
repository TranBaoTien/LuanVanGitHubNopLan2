import React, { Component } from 'react';
import FooterUser from '../FooterUser';
import { connect } from 'react-redux';
import './detailProduct.scss';
import './Cart.scss'
import{deletacart,deletacartfull,showcart,addTocart,showcart1,updatecart,updatecartminus} from './CRUDCart.js'
import {getAllProduct,getAllimg,getOne,getPrice,getAllProduct1,editupdateproduct} from '../../../services/productService'
import HeaderU from '../HeaderU';
import {getAlluser} from '../../../services/userService'

import {createoder,addoder,getvoucher}from'../../../services/oderSevice'
class detailProduct extends Component {
    constructor(props){
        super(props);
        this.state={
            cart:[],
            arrPrice:[],
            vc:[],
            tong:0,
            discounts:0,
            address:'',
            iduser:null,
            email:'',
            note:'',
            idpay:null,
            idvoucher:null,
            phieugiam:'',
            fullname:'',
           // email:'',
            phone:'',
            id:'',
        }
    }
    async componentDidMount() {
       await showcart1();
        let cart1=await showcart1();
        //console.log(cart1)
        let pri=await getPrice();
        let vc=await getvoucher();
        this.setState({
          cart:cart1,
          arrPrice:pri,
          vc:vc
      })
        const { userInfocus,isLoggedInCUS } = this.props;
        if(isLoggedInCUS){
          this.setState({
            iduser:userInfocus.id
          })
        }
        let rs=await getAlluser();

        if(isLoggedInCUS){
          // eslint-disable-next-line no-lone-blocks
          {rs && rs.map(item=>{
            if(item.id==userInfocus.id)
            this.setState({
              fullname:item.fullname,
              email:item.email,
              phone:item.phone,
              id:item.id,
            
            })
          });}
    
        }
      //  console.log(userInfocus.id)
       
      //console.log(this.state.cart)
    }

  
    handleOnchangeInput=(event,id)=>{
     // console.log('event 1',event.target.value,id)

      let copystate={...this.state};
      copystate[id]=event.target.value;
      this.setState({...copystate});
     
     
     
      }
      appvoucher=async(voucher)=>{
        let vc=this.state.vc;
     
        let giamgia=0;
        // eslint-disable-next-line no-lone-blocks
        {vc && vc.map(item=>{
          if(item.detail==voucher)
              giamgia=item.phantram
        })
    this.setState({
      discounts:giamgia
    })
        }
      }
    handeladd=async()=>{
   
     console.log(this.state)
    let de=this.state.cart;
     
        let response=await addoder(this.state);
        if(response)
        {
          if(response.errCode==0){
              // eslint-disable-next-line no-lone-blocks
              {de&&de.map((item,index)=>{
               let cart=  deletacart(item.product.id);
                this.setState({
                cart:cart
                })
              })}

          }
            this.setState({
                errmessage:response.message,
                errCode:response.errCode,
                //isOpenModel:false
            })
          
        }
        else{
          this.setState({
            errmessage:'loi',
            errCode:1,
            //isOpenModel:false
        })
        }
  
   
    }
    
    deletecart=(id)=>{
       let cart=  deletacartfull(id);
       this.setState({
       cart:cart
       }) 

    }
    updateCart=async(id)=>{
       let cart= await updatecart(id);
       this.setState({
        cart:cart
        
    })
    }
    updateCartminus=async(id)=>{
      
        let cart= await updatecartminus(id);
        this.setState({
         cart:cart
         
     })
     }
    render() {  const { processLogoutCus,userInfocus,isLoggedInCUS } = this.props;
  
        let cart=this.state.cart;
        let arrprice=this.state.arrPrice;
        let tong=this.state.tong
        let giamgia=this.state.discounts;
        return (
          <div>
          <HeaderU/>
        
 <div className="user-container">
{cart.map(item=>{
    
    return(

<div>
        <div className='ala-cart'>
            <div className='ala-cart-left'>
                <img src={item.product.img} className='card-img-top'></img>
            </div>
            <div className='ala-cart-center'>
                <div > <h7>{item.product.name}</h7></div>
               

            </div>
            <div className='ala-cart-right'>
                <div>
                {arrprice && arrprice.map((itemprice,index1)=>{
                    if(item.product.id==itemprice.idpro){
                    return( 
                      <div  ><h7>                <span className="new-price new-price-2">
                      {new Intl.NumberFormat('vi-VN',
                      {style: 'decimal',decimal: 'VND'}).format(itemprice.price)+ ' VNĐ'}</span>
                        </h7></div> 
                        ); }})}
                </div>
                <div>
                <button type="button" class="btn btn-outline-success"
                
                onClick={()=>this.updateCartminus(item.product.id)}><i class="fas fa-minus"></i></button>
                {" "}<h7>{item.quatity}</h7>{" "}
                <button type="button" class="btn btn-outline-success"  onClick={()=>this.updateCart(item.product.id)}><i class="fas fa-plus"></i></button>
                </div>
            </div>
            <div className='ala-cart-right-right'>
            <div className='delete' onClick={()=>this.deletecart(item.product.id)}>
            <i className="fas fa-trash"/>
            </div>
            
            </div>
        </div>
        <div className='summoney'>
        <div className='summoney1'></div>
        <div className='summoney2'>
        {arrprice && arrprice.map((itemprice,index1)=>{
            if(item.product.id==itemprice.idpro){
              tong+=itemprice.price*item.quatity;
          
            return( 
                <></
                >
                ); }})}
            
        </div>
        </div>
        
    </div>

    ) 

   })}
   <div className='thongtinkh-thnahtoan'>
   
   <div className='thongtinkh1'>
   <div class="col-auto">
   <label class="sr-only" for="inlineFormInputGroup">Voucher</label>
   <div class="input-group mb-2">
     <div class="input-group-prepend">
       <div class="input-group-text">@</div>
     </div>
     <input type="text" class="form-control" 
     id="inlineFormInputGroup" placeholder="Voucher"
     onChange={(event)=>{this.handleOnchangeInput(event,'phieugiam')}}
     />
     <button type="button" class="btn btn-primary"
     onClick={()=>this.appvoucher(this.state.phieugiam) }
     >
     App</button>

   </div>
 </div>
   </div>
   
   <div className='tinhtien1'><h3>Thanh Toán</h3>
   <table class="table">

  <tbody>
    <tr>
      <th scope="row">Tạm Tính</th>
      <td>                <span className="new-price new-price-2">
      {new Intl.NumberFormat('vi-VN',
      {style: 'decimal',decimal: 'VND'}).format(tong)+ ' VNĐ'}</span>
        </td>
     
    </tr>
    <tr>
      <th scope="row">Giảm Giá</th>
      <td>{giamgia} %</td>
      
    </tr>
    <tr>
      <th scope="row">Tổng Cộng</th>
      
        <td   >
        <span className="new-price new-price-2">
        {new Intl.NumberFormat('vi-VN',
        {style: 'decimal',decimal: 'VND'}).format(tong-tong*giamgia/100)+ ' VNĐ'}</span>
          
        </td>
     
    </tr>
  </tbody>
</table>
   
   </div></div>
   
   
   <div className='thongtinkh'>
  
   <div><b>Thông tin khách hàng</b></div>
   <div class="form-check form-check-inline">
   <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
   <label class="form-check-label" for="inlineRadio1">Anh</label>
 </div>
 <div class="form-check form-check-inline">
   <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
   <label class="form-check-label" for="inlineRadio2">Chị</label>
 </div>
   <form>
     <div class="form-row " style={{display:'!flex'}}>
       <div class="col">
         <input type="text" class="form-control" placeholder="Họ và Tên"
         onChange={(event)=>{this.handleOnchangeInput(event,"fullname")}}
         value={this.state.fullname}
         
          />
       </div>
      
       <div class="col">
         <input type="text" class="form-control"
         onChange={(event)=>{this.handleOnchangeInput(event,"phone")}}
          placeholder="Số điện thoại" value={this.state.phone} />
       </div>
     </div>
     <div class="form-row " style={{display:'!flex'}}>
      
       <div class="col">
         <input type="text" class="form-control" placeholder="email"
         onChange={(event)=>{this.handleOnchangeInput(event,"email")}}
      
         value={this.state.email}
         
          />
       </div>
       
     </div>
   </form>
   </div>
   <div className='thongtinkh'>
   <div><b>Chọn hình giao hàng</b></div>
   <div class="form-group col-md-16">

    <div class="form-row">
    <div class="col">
    <input type="text" class="form-control" placeholder="Địa chỉ giao hàng."
    onChange={(event)=>{this.handleOnchangeInput(event,"address")}}
     value={this.state.address}
     />
  </div>
 </div>

 <div class="form-row">
 <div class="form-group col-md-12">
 <input type="text" class="form-control" placeholder="Ghi chú(nếu có)" 
 onChange={(event)=>{this.handleOnchangeInput(event,"note")}}
 value={this.state.note}
 />
</div>
</div>
</div>
   </div>
   <div className='thongtinkh'> 
 
   <button type="button" class="btn btn-primary btn-lg btn-block tt-xx" onClick={()=>{this.handeladd()}}>
   Đặt Hàng</button>
  
   </div>
   

</div>

      <FooterUser/>
          </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedInCUS: state.user.isLoggedInCUS,
        userInfocus:state.user.userInfocus
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(detailProduct);
