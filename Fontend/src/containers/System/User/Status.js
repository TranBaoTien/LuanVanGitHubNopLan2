import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../UserManage.scss';
import ModelUser from './ModelTypeUser.js'
import ModelEditUser from './ModelEditTypeuser.js';
import{getAll,postcreate,postdelete,putupdate}from '../../../services/statusService';
import {toast}from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
class Status extends Component {

   constructor(props){
       super(props);
       this.state={
        arrUsers:[],
        isOpenModel:false,
        isOpeneditModel:false,
        errmessage:'',
        errCode:2,
        typeuserEdit:{}
       }
   }

   async componentDidMount() {
        let response=await getAll();
        if(response){
            this.setState({
                arrUsers:response
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

createUser=async(data)=>{
  try {
    let response=await postcreate(data);
    if(response)
    {
        this.setState({
            errmessage:response.message,
            errCode:response.errCode,
            isOpenModel:false
        })
        if(response.errCode===0){
            toast.success('Thành Công', {autoClose:3000})  
        }
        else{
            toast.error(response.message, { autoClose:5000})
        }
        this.handegetall();
    }
    //console.log('kq la',response)
  } catch (e) {
     console.log(e) ;
  }  

  
}

editUser=async(user)=>{
try {
   let rs= await putupdate(user);
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
    let response=await getAll();
        if(response){
            this.setState({
                arrUsers:response
            })
        }
   
}
handleDelete=async(user)=>{
// console.log('user',user)
try {
    
   let res= await postdelete(user.id);
    this.handegetall();
    if(res.errCode===0){
        toast.success('Thành Công', {autoClose:3000})  
    }
    else{
        toast.error(res.message, { autoClose:5000})
    }
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

    

    render() {
        //console.log("check",this.state.arrUsers);
        let arrUsers=this.state.arrUsers;
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
           <div className='mx-1'>
           <button className='btn btn-success px-3'  onClick={()=>{this.handeladd()}}><i className="fas fa-plus"></i>Add
           
           </button>
           
           </div>
           
            <div className='user-table mt-3 mx-2'>
            
            <table id="customers">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                      
                        {this.props.userInfo.id==1?   <th>
                           Action
                            </th>:''}
                    </tr>
                    {arrUsers && arrUsers.map((item,index)=>{
                        return(
                            <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                     
                         {this.props.userInfo.id==1?   <td>
                            <button className='btn-edit' onClick={()=>this.handleEdit(item)} ><i className="fas fa-pencil-alt"></i></button>
                            <button className='btn-delete'  onClick={()=>this.handleDelete(item)}><i className="fas fa-trash"></i></button>
                           
                            </td>:''}
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
        isLoggedIn: state.user.isLoggedIn,
        userInfo:state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Status);
