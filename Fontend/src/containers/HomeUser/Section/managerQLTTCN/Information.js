import React, { Component } from 'react';

import { connect } from 'react-redux';
import { editupdateUser} from '../../../../services/userService';
import {toast}from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {getAlluser} from '../../../../services/userService'
class Information extends Component {
  constructor(props){
    super(props);
    this.state={
     fullname:'',
     email:'',
     phone:'',
     id:'',
     idtype:''
     
    }}
    async componentDidMount() {
        
      const { systemMenuPath,isLoggedIn,userInfocus,isLoggedInCUS } = this.props;
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
          idtype:item.idtype
        })
      });}

    }
    
  }
  handlephone=(data)=>{
    var vnf_regex = /((9|3|7|8|5)+([0-9]{8})\b)/g;

    if(data!=''){
        if (vnf_regex.test(data) == false) 
        {
           return false;
        }else{
           return true;
        }
    }else{
       return false;
    }
    }
    handleOnchangeInput=(event,id)=>{

        let copystate={...this.state};
        copystate[id]=event.target.value;
        this.setState({...copystate})
        
        }
        checkInput=()=>{
          let isValid=true;
          let arrInput=['fullname','email','phone'];
          for(let i=0;i<arrInput.length;i++){
            if(!this.state[arrInput[i]] ){
              isValid=false;
              // alert('chua nhap: '+arrInput[i]);
              // break;
            }
          }
    return isValid;
        }
        handleAdd=()=>{
        
       let isValid= this.checkInput();
       if(isValid===true)
       { 
        this.props.createUser(this.state);
       
         if(this.props.errCode===0){
          this.toggle();
       
         }
       }
        }
       handleSave=async(user)=>{
        //console.log(user)
          let isValid= this.checkInput();
         
          if(isValid===true)
          {
            let ktsdt=this.handlephone(this.state.phone);
            if(ktsdt==false){
              toast.error('False', {autoClose:3000})  
              this.componentDidMount();
            
            }else{
              await editupdateUser(user);
              //this.componentDidMount();
              toast.success('Thành Công', {autoClose:3000})  
            }
           
        
          }
      
           }
    render() {
        const { systemMenuPath,isLoggedIn,userInfocus,isLoggedInCUS } = this.props;  
// console.log(userInfocus)
     
        return (
          <div>
          
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Email</label>
      <input type="text" class="form-control" id="inputemail" 
      placeholder="Email"   
       onChange={(event)=>{this.handleOnchangeInput(event,"email")}}
       value={this.state.email}
      />
    </div>
    <div class="form-group col-md-12">
      <label for="inputPassword4">FullName</label>
      <input type="text" class="form-control" id="inputfullname"
       placeholder="Họ và tên"
       onChange={(event)=>{this.handleOnchangeInput(event,"fullname")}}
       value={this.state.fullname}
       />
    </div>
  </div>
 
 
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">Phone</label>
      <input type="text" class="form-control" id="inputphone"
      value={`0`+this.state.phone}
       onChange={(event)=>{this.handleOnchangeInput(event,"phone")}}
       />
    </div>
    <div class="form-group col-md-4">
      <label for="inputState">Hạng Thành Viên</label>
      <input type="text" class="form-control" id="inputhang" value={'Khách Hàng'}/>
    </div>

  </div>
 
  <button type="submit" class="btn btn-primary"    onClick={()=>{this.handleSave(this.state)}}>Cập Nhật</button>


  
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

export default connect(mapStateToProps, mapDispatchToProps)(Information);
