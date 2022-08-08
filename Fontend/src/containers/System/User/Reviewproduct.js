import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../UserManage.scss';
import ModelUser from './ModelTypeUser.js'
import ModelEditUser from './ModelEditTypeuser.js';
import{getAllReview}from 
'../../../services/productpreviewService';
import{getAllProduct}from'../../../services/productService';
import {toast}from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
class Reviewproduct extends Component {

   constructor(props){
       super(props);
       this.state={
        arrUsers:[],
        arrPro:[],
        isOpenModel:false,
        isOpeneditModel:false,
        errmessage:'',
        errCode:2,
        typeuserEdit:{}
       }
   }

   async componentDidMount() {
        let response=await getAllReview();
        let pro=await getAllProduct();
        if(response){
            this.setState({
                arrUsers:response,
                arrPro:pro
            })
        }
      
    }
handeladd=()=>{
    this.setState({
        isOpenModel:true
    })
}
toggleModal=()=>{
    this.setState({
        isOpenModel:!this.state.isOpenModel
    })
}
toggleEditModal=()=>{
    this.setState({
        isOpeneditModel:!this.state.isOpeneditModel
    })
}



// editUser=async(user)=>{
// try {
//    let rs= await putupdate(user);
//    if(rs)
//     {
//         this.setState({
//             errmessage:rs.message,
//             errCode:rs.errCode,
//             isOpeneditModel:false
//         })
//         if(rs.errCode===0){
//             toast.success('Thành Công', {autoClose:3000})  
//         }
//         else{
//             toast.error(rs.message, { autoClose:5000})
//         }
//         this.handegetall();
//     }
// } catch (error) {
    
// }
// }


handegetall=async()=>{
    let response=await getAllReview();
        if(response){
            this.setState({
                arrUsers:response
            })
        }
   
}
// handleDelete=async(user)=>{
// // console.log('user',user)
// try {
    
//    let res= await postdelete(user.id);
//     this.handegetall();
//     if(res.errCode===0){
//         toast.success('Thành Công', {autoClose:3000})  
//     }
//     else{
//         toast.error(res.message, { autoClose:5000})
//     }
// } catch (e) {
//     console.log(e);
// }
// }
handleEdit=async(user)=>{
     //console.log('user',user)
    this.setState({
        isOpeneditModel:true,
        typeuserEdit:user
    })
    }

    

    render() {
        //console.log("check",this.state.arrUsers);
        let arrUsers=this.state.arrUsers;
        let arrPros=this.state.arrPro;
        
        return (
            <div className="user-container-admin">

            <ModelUser
            isOpen={this.state.isOpenModel}
            toggleModal={this.toggleModal}
            createUser={this.createUser}
            errmessage={this.state.errmessage}
            errCode={this.state.errCode}
            statusstate={true}
            />
           { this.state.isOpeneditModel && <ModelEditUser
            isOpen={this.state.isOpeneditModel}
            toggleModal={this.toggleEditModal}
            typeuser={this.state.typeuserEdit}
            editUser={this.editUser}
            errmessage={this.state.errmessage}
            errCode={this.state.errCode}
            statusstate={true}
            />}

            <div className=" title text-center">Manage users</div>
            <div className='user-table mt-3 mx-2'>
            <table id="customers">
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Bình luận</th>
                        <th>Đánh giá</th>
                        <th>Trạng thái</th>
                        <th>Ngày tạo</th>
                        <th>Action</th>
                    </tr>
                    {arrUsers && arrUsers.map((item,index)=>{
                        return(
                            <tr>
                            {
                                arrPros.map((itempro)=>{
                                    if(item.idpro==itempro.id)
                                    return( <td>{itempro.name}</td>)
                                })
                            }
                           
                          
                            <td>{item.cmt}</td>
                            <td>{item.start}</td>
                            
                            <td>{item.edit}</td>
                            <td>{item.createdAt}</td>
                            
                            <td>
                            <button className='btn-edit' onClick={()=>this.handleEdit(item)} ><i className="fas fa-pencil-alt"></i></button>
                           
                            </td>
                            </tr>
                        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Reviewproduct);
