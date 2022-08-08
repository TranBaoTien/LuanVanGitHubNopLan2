import React, { Component } from 'react';

import { connect } from 'react-redux';


import {getAllProduct,getAllimg,getOne,getPrice,getAllProduct1,editupdateproduct} from '../../../../services/productService'
import{  getalloder,createoder,deleteoder,editoder,
    getvoucher,createvoucher,deletevoucher,editvoucher,
    getpayment,createpayment,deletepayment,editpayment,
    getalldetail,getAllstatus,getAlldeliveri,huydon
    }from '../../../../services/oderSevice'
    import {toast}from "react-toastify";
    import 'react-toastify/dist/ReactToastify.css';
import { toInteger } from 'lodash';
class Manageroder extends Component {
    constructor(props){
        super(props);
        this.state={
            arroder:[],
            arrdetialoder:[],
            arrstatus:[],
            arrdeliveri:[],
            tong:0,
            status:null,
            id:null,
            statusoder:0
        }
    }
    async componentDidMount() {
        
        let oder=await getalloder();
      let detail=await getalldetail();
      let status=await getAllstatus();
      let deliveri=await getpayment();
        this.setState({
            arroder:oder,
            arrdetialoder:detail,
            arrstatus:status,
            arrdeliveri:deliveri
         
        })
      //console.log(this.state.cart)
    }
    edithandleoder=()=>{

    }
    handleoder=async(status)=>{
        this.setState({
            statusoder:status
        })}
    handleDelete=async(data)=>{
        
    let rs= await huydon(data);
   if(rs)
    {
      
        if(rs.errCode===0){
            toast.success('Thành Công', {autoClose:3000})  
        }
        else{
            toast.error(rs.message, { autoClose:5000})
        }
       
    }
    this.componentDidMount();
    }
    render() {
   
        const { systemMenuPath,isLoggedIn,userInfocus,isLoggedInCUS } = this.props;
     
      let arroder=this.state.arroder;
      let detailoder=this.state.arrdetialoder;
      let status=this.state.arrstatus;
      let deliveri=this.state.arrdeliveri;
      let tong=this.state.tong;
        return (
            <div>
            {userInfocus?
                <ul class="nav nav-tabs">
            <li class="nav-item">
            <button class="nav-link"  onClick={()=>this.handleoder(0)}  >Tất cả</button>
            </li>
            <li class="nav-item">
            <button class="nav-link" onClick={()=>this.handleoder(1)}>Chờ xác nhận</button>
            </li>
            <li class="nav-item">
              <button class="nav-link" onClick={()=>this.handleoder(2)}>Đã xác nhận</button>
            </li>
            <li class="nav-item">
            <button class="nav-link" onClick={()=>this.handleoder(3)}>Đang vận chuyển</button>
          </li>
            <li class="nav-item">
            <button class="nav-link" onClick={()=>this.handleoder(4)}>Đã giao</button>
            </li>
            <li class="nav-item">
              <button class="nav-link" onClick={()=>this.handleoder(16)}>Đơn Huỷ</button>
            </li>
           
          </ul>
                :""}
            
          <div className='user-container'>
       
          {arroder.map((item,index)=>{
            // if(item.idstatus==16){
            //     return('');
            // }
            if(this.state.statusoder==0){
           if(userInfocus!=null)
              {  if(userInfocus.id===item.iduser)
                    { 

                        return(
                    <div className='bak-bak'>
                    {status.map(items=>{
                        if(item.idstatus==items.id)
                        return(
                            <div>
                            
                            <div>
                            <span><b>{items.name}</b></span></div>
                            {item.idstatus<3?<div>
                            <button className='btn-delete'  onClick={()=>this.handleDelete(item)}><i className="fas fa-trash"></i></button>
                            </div>:''}
                            </div>
                        );
                    })}
                    
                    {detailoder.map((itemdetail,index)=>{
                        if(item.id==itemdetail.idoder){
                         tong+=itemdetail.quatity*itemdetail.price;
            
                        return(
                          
                        
                            <div className='ala-cart'>
                            
                            <div className='ala-cart-left'>
                            <img src={'https://i.postimg.cc/ZK0K13NL/11-4-32.webp'} className='card-img-top'></img>
                        </div>
                            <div className='ala-cart-center'>
                                <div> <h7>{itemdetail.namepro}</h7></div>
                            </div>
                            <div className='ala-cart-right'>
                                <div>
                                        <span>Giá:</span>
                                        <h7 >{itemdetail.price}{" "}Vnđ</h7>
                                       
                                </div>
                                <div>
                                <span>Số lượng:</span>
                                {" "}<h7>{itemdetail.quatity}</h7>{" "}
                                
                                </div>
                            </div>
                        
                    
                            </div>
                        );}
                    })}
                 
                    <div className='summoney'>
                    <div className='summoney1'>Tổng Tiền :</div>
                    <div className='summoney2'>
                  
                            <h7 >{tong}{" "}<i class="fas fa-money-bill-alt"></i></h7>
                          
                    </div>
                    
                    </div>
                    <div className='summoney'>
                    <div className='summoney1'>Phương thức thanh toán :</div>
                    {deliveri&& deliveri.map(itemde=>{
                        if(itemde.id==item.idpay){
                            return(  <div className='summoney2'>
                  
                            <h7 >{itemde.name}</h7>
                          
                    </div>);
                        }

                    })}
                 
                  
                    
                    </div>
                    
                </div>
    
    
                         );
                        
                        }
                       //  else{return(<div><span><b><h3>Chưa có đơn hàng</h3></b></span></div>)}
                }
            }   
               if(this.state.statusoder==item.idstatus){
                if(userInfocus!=null)
                   {  if(userInfocus.id===item.iduser)
                         { 
     
                             return(
                         <div className='bak-bak'>
                         {status.map(items=>{
                             if(item.idstatus==items.id)
                             return(
                                 <div>
                                 
                                 <div>
                                 <span><b>{items.name}</b></span></div>
                                 {item.idstatus<3?<div>
                                 <button className='btn-delete'  onClick={()=>this.handleDelete(item)}><i className="fas fa-trash"></i></button>
                                 </div>:''}
                                 </div>
                             );
                         })}
                         
                         {detailoder.map((itemdetail,index)=>{
                             if(item.id==itemdetail.idoder){
                              tong+=itemdetail.quatity*itemdetail.price;
                 
                             return(
                               
                             
                                 <div className='ala-cart'>
                                 
                                 <div className='ala-cart-left'>
                                 <img src={'https://i.postimg.cc/ZK0K13NL/11-4-32.webp'} className='card-img-top'></img>
                             </div>
                                 <div className='ala-cart-center'>
                                     <div> <h7>{itemdetail.namepro}</h7></div>
                                 </div>
                                 <div className='ala-cart-right'>
                                     <div>
                                             <span>Giá:</span>
                                             <h7 >{itemdetail.price}{" "}Vnđ</h7>
                                            
                                     </div>
                                     <div>
                                     <span>Số lượng:</span>
                                     {" "}<h7>{itemdetail.quatity}</h7>{" "}
                                     
                                     </div>
                                 </div>
                             
                         
                                 </div>
                             );}
                         })}
                      
                         <div className='summoney'>
                         <div className='summoney1'>Tổng Tiền :</div>
                         <div className='summoney2'>
                       
                                 <h7 >{tong}{" "}<i class="fas fa-money-bill-alt"></i></h7>
                               
                         </div>
                         
                         </div>
                         <div className='summoney'>
                         <div className='summoney1'>Phương thức thanh toán :</div>
                         {deliveri&& deliveri.map(itemde=>{
                             if(itemde.id==item.idpay){
                                 return(  <div className='summoney2'>
                       
                                 <h7 >{itemde.name}</h7>
                               
                         </div>);
                             }
     
                         })}
                      
                       
                         
                         </div>
                         
                     </div>
         
         
                              );
                             
                             }
                            //  else{return(<div><span><b><h3>Chưa có đơn hàng</h3></b></span></div>)}
                     }
                 }
                //else{return(<div><span><b><h3>Chưa có đơn hàng</h3></b></span></div>)}
          }
          
          
          )}
         
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Manageroder);
