import React, { Component } from 'react';

import { connect } from 'react-redux';
import '../UserManage.scss';
import ModelUser from './ModelTypeUser.js'
import ModelEditUser from './ModelEditTypeuser.js';
import {getalldetail}from '../../../services/oderSevice';
class Delivery extends Component {

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
        let response=await getalldetail();
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
    let response=await getalldetail(data);
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




handegetall=async()=>{
    let response=await getalldetail();
        if(response){
            this.setState({
                arrUsers:response
            })
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

            <div className=" title text-center">Manage Oder</div>
         
           
            <div className='user-table mt-3 mx-2'>
            
            <table id="customers">
            <tr>
                <th>M??</th>
                <th>S??? L?????ng</th>
                <th>T??n S???n Ph???m</th>
                <th>Gi??</th>
                <th>M?? S???n Ph???m</th>
                <th>M?? ?????t H??ng</th>
                <th>T???ng Ti???n</th>
                <th>B???o H??nh</th>
                <th>Ng??y T???o</th>
            </tr>
            {arrUsers && arrUsers.map((item,index)=>{
                return(
                    <tr>
                    <td>{item.id}</td>
                    <td>{item.quatity}</td>
                    <td>{item.namepro}</td>
                    <td>{item.price}</td>
                    <td>{item.idpro}</td>
                    <td>{item.idoder}</td>
                    <td>{item.summoney}</td>
                    <td>{item.idbh}</td>
                    <td>{item.createdAt}</td>
                    
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

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);


