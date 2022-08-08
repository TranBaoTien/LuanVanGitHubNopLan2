import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../UserManage.scss';
import ModelUser from './ModelTypeUser.js'
import ModelEditUser from './ModelEditTypeuser.js';
import Modeldetailproduct from './Modeldetailpro.js';

import{ getAlluser,getoder,createoder,deleteoder,
    editoder,getAllstatus,getpayment,
    getvoucher}from '../../../services/oderSevice';
import {toast}from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
class Oder extends Component {

   constructor(props){
       super(props);
       this.state={
        arrOder:[],
        arrStatus:[],
        arrPayment:[],
        arrVoucher:[],
        arrUser:[],
        isOpenModel:false,
        isOpeneditModel:false,
        isOpendetailModel:false,
        errmessage:'',
        errCode:2,
        statusoder:0,
        typeuserEdit:{},
        arroder:[]
       
       }
   }

   async componentDidMount() {
        let response=await getoder();
        let vou=await getvoucher();
        let status=await getAllstatus();
        let pay=await getpayment();
        let user=await getAlluser();
        if(response){
            this.setState({
                arrOder:response,
                arrStatus:status,
                arrPayment:pay,
                arrVoucher:vou,
                arrUser:user
            })
        }
      
    }

toggleModal=()=>{
    this.setState({
        isOpendetailModel:!this.state.isOpendetailModel
    })
}
toggleEditModal=()=>{
    this.setState({
        isOpeneditModel:!this.state.isOpeneditModel
    })
}

createUser=async(data)=>{
  try {
    let response=await createoder(data);
    if(response)
    {
        this.setState({
            errmessage:response.message,
            errCode:response.errCode,
            isOpenModel:false
        })
        this.handegetall();
    }
    //console.log('kq la',response)
  } catch (e) {
     console.log(e) ;
  }  

  
}

editUser=async(user)=>{
try {
   let rs= await editoder(user);
   if(rs)
    {
        this.setState({
            errmessage:rs.message,
            errCode:rs.errCode,
            isOpeneditModel:false
        })
        if(rs.errCode===0){
            toast.success('Thành Công', {autoClose:3000})  
        }
        else{
            toast.error(rs.message, { autoClose:5000})
        }
        this.handegetall();
    }
} catch (error) {
    
}
}


handegetall=async()=>{
    let response=await getoder();
        if(response){
            this.setState({
                arrOder:response
            })
        }
   
}
handlemodel=(data)=>{
    this.setState({
        isOpendetailModel:true,
        arroder:data
    })
    console.log(data)
}
handleDelete=async(user)=>{
// console.log('user',user)
try {
    
   let res= await deleteoder(user.id);
    this.handegetall();
} catch (e) {
    console.log(e);
}
}
handleEdit=async(user)=>{
     //console.log('user',user)
    this.setState({
        isOpeneditModel:true,
        typeuserEdit:user
    })
    }
    handleoder=async(status)=>{
this.setState({
    statusoder:status
})
    }

    

    render() {
        //console.log("check",this.state.arrOder);
        let arrOder=this.state.arrOder;
        let arrvou=this.state.arrVoucher;
        let arrpay=this.state.arrPayment;
        let arrsta=this.state.arrStatus;
        let arru=this.state.arrUser;
        return (
            <div className="user-container-admin">
            
            { this.state.isOpendetailModel && <Modeldetailproduct
                isOpen={this.state.isOpendetailModel}
                toggleModal={this.toggleModal}
                arroder={this.state.arroder}
            
              
                />}
           { this.state.isOpeneditModel && <ModelEditUser
            isOpen={this.state.isOpeneditModel}
            toggleModal={this.toggleEditModal}
            typeuser={this.state.typeuserEdit}
            editUser={this.editUser}
            errmessage={this.state.errmessage}
            errCode={this.state.errCode}
            arroder={true}
            />}
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
            <div className=" title text-center">Manage Oder</div>
           
           
            <div className='user-table mt-3 mx-2'>
            
            <table id="customers">
                    <tr>
                        <th>ID</th>
                        <th>Địa chỉ</th>
                        <th>Khách Hàng</th>
                        <th>Ghi chú</th>
                        <th>Phương thức thanh toán</th>
                        <th>Khuyến mãi</th>
                        <th>Trạng Thái</th>
                        <th>Ngày Tạo đơn</th>
                        <th>Action</th>
                    </tr>
                    {arrOder && arrOder.map((item,index)=>{
                        if(this.state.statusoder==0)
                        {
                            return(
                                <tr onClick={()=>this.handlemodel(item)}>
                                <td>{item.id}</td>
                                <td>{item.address}</td>
                               
                                {arru&&arru.map((user)=>{
                                    if(user.id==item.iduser)
                                    return <td>{user.fullname}</td>
                                })}
                                
                                <td>{item.note}</td>
                                {arrpay&&arrpay.map((pay)=>{
                                    if(pay.id==item.idpay)
                                    return <td>{pay.name}</td>
                                })}
                                
                                {arrvou&&arrvou.map((vou)=>{
                                    if(vou.id==item.idvoucher)
                                    return <td>{vou.phantram}</td>
                                })}
                                {arrsta&&arrsta.map((sta)=>{
                                    if(sta.id==item.idstatus)
                                    return <td>{sta.name}</td>
                                })}
                                
                                <td>{item.createdAt}</td>
                         
                                <td>
                                {
                                    item.idstatus===16?'':<button className='btn-edit' onClick={()=>this.handleEdit(item)} ><i className="fas fa-pencil-alt"></i></button>

                                }
                                </td>
                                </tr>
                            )
                        }
                    if(item.idstatus==this.state.statusoder){
                        return(
                            <tr onClick={()=>this.handlemodel(item)}>
                            <td>{item.id}</td>
                            <td>{item.address}</td>
                           
                            {arru&&arru.map((user)=>{
                                if(user.id==item.iduser)
                                return <td>{user.fullname}</td>
                            })}
                            
                            <td>{item.note}</td>
                            {arrpay&&arrpay.map((pay)=>{
                                if(pay.id==item.idpay)
                                return <td>{pay.name}</td>
                            })}
                            
                            {arrvou&&arrvou.map((vou)=>{
                                if(vou.id==item.idvoucher)
                                return <td>{vou.phantram}</td>
                            })}
                            {arrsta&&arrsta.map((sta)=>{
                                if(sta.id==item.idstatus)
                                return <td>{sta.name}</td>
                            })}
                            
                            <td>{item.createdAt}</td>
                     
                            <td>
                            {
                                item.idstatus===16?'':<button className='btn-edit' onClick={()=>this.handleEdit(item)} ><i className="fas fa-pencil-alt"></i></button>

                            }
                            </td>
                            </tr>
                        )
                    }

                    }) }
                        
                   
                   
        </table>
            
            
            </div>
            </div>
         
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Oder);
