import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import ModelUser from './ModelUser';
import ModelEditUser from './ModelEditUser';
import { getAlluser,createNewUser ,deleteUser,editupdateUser,getAlltypeuser} from '../../services/userService.js';
import {toast}from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class UserManage extends Component {

   constructor(props){
       super(props);
       this.state={
        arrUsers:[],
        arrType:[],
        isOpenModel:false,
        isOpeneditModel:false,
        errmessage:'',
        errCode:2,
    
        userEdit:{}

       }
   }

   async componentDidMount() {
        let response=await getAlluser();
        let arrtype=await getAlltypeuser();
        if(response){
            this.setState({
                arrUsers:response,
                arrType:arrtype
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
    let response=await createNewUser(data);
    if(response)
    {
        this.setState({
            errmessage:response.message,
            errCode:response.errCode,
            //isOpenModel:false
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
     //console.log(e) ;
  }  

  
}

editUser=async(user)=>{
try {
   let rs= await editupdateUser(user);
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
    let response=await getAlluser();
        if(response){
            this.setState({
                arrUsers:response
            })
        }
   
}
handleDelete=async(user)=>{
// console.log('user',user)
try {
    
   let res= await deleteUser(user.id);
   
   if(res.errmessage===0)
        toast.success('Thành Công', {autoClose:3000})  
    else
        toast.error(res.message, { autoClose:5000})
    
   
    this.handegetall();
} catch (e) {
    console.log(e);
}
}
handleEdit=async(user)=>{
    // console.log('user',user)
    this.setState({
        isOpeneditModel:true,
        userEdit:user
    })
    }

    

    render() {
        //console.log("check",this.state.arrUsers);
        let arrUsers=this.state.arrUsers;
        let arrtype=this.state.arrType;
        return (
            <div className="user-container-admin">

            <ModelUser
            isOpen={this.state.isOpenModel}
            toggleModal={this.toggleModal}
            createUser={this.createUser}
            errmessage={this.state.errmessage}
            errCode={this.state.errCode}
            modeluser={true}
            />
           { this.state.isOpeneditModel && <ModelEditUser
            isOpen={this.state.isOpeneditModel}
            toggleModal={this.toggleEditModal}
            user={this.state.userEdit}
            editUser={this.editUser}
            errmessage={this.state.errmessage}
            errCode={this.state.errCode}
            modeluser={true}
            />}

            <div className=" title text-center">Manage users</div>
           <div className='mx-1'>
         
           
           </div>
           
            <div className='user-table mt-3 mx-2'>
            <button className='btn btn-outline-success'  
            onClick={()=>{this.handeladd()}}>
            <i className="fas fa-plus"></i>Add
            </button>
            <table id="customers">
                    <tr>
                        <th>ID</th>
                        <th>FULLNAME</th>
                       
                        <th>USERNAME</th>
                        <th>IDTYPE</th>
                        <th>EMAIL</th>
                        <th>PHONE</th>
                        <th>Action</th>
                    </tr>
                    {arrUsers && arrUsers.map((item,index)=>{
                        return(
                            <tr>
                            <td>{item.id}</td>
                            <td>{item.fullname}</td>
                           
                            <td>{item.username}</td>
                            {arrtype&&arrtype.map(type=>{
                                if(type.id==item.idtype)
                                return <td>{type.name}</td>;
                            })}
                           
                            <td>{item.email}</td>
                            <td>+84{item.phone}</td>
                          
                            {item.idtype!=3?
                                <td>
                                <button className='btn-edit' onClick={()=>this.handleEdit(item)} ><i className="fas fa-pencil-alt"></i></button>
                               {/* <button className='btn-delete'  onClick={()=>this.handleDelete(item)}><i className="fas fa-trash"></i></button>*/}
                                </td>
                                
                                :<td></td>}
                          
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
