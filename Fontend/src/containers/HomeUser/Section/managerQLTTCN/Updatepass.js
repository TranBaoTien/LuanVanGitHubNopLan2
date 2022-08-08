import React, { Component } from 'react';

import { connect } from 'react-redux';
import { editupdateUser,updatePass} from '../../../../services/userService';
import {toast}from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
class Updatepass extends Component {
  constructor(props){
    super(props);
    this.state={
     id:'',
     isshow:false,
     password1:'',
     passwordnew:'',
     errmessage:'',
     errCode:2,
    }}
    async componentDidMount() {
        
      const { systemMenuPath,isLoggedIn,userInfocus,isLoggedInCUS } = this.props;
    
    if(isLoggedInCUS){
      this.setState({
        id:userInfocus.id,
      })
      
    }
    
  }
  handleShow=()=>{
    this.setState({
        isshow:!this.state.isshow
    })
    //console.log(this.state.isshow)
}
 
    handleOnchangeInput=(event,id)=>{

        let copystate={...this.state};
        copystate[id]=event.target.value;
        
        this.setState({...copystate})
       
        }
        checkInput=()=>{
          let isValid=true;
          let arrInput=['password1','passwordnew'];
          for(let i=0;i<arrInput.length;i++){
            if(!this.state[arrInput[i]] ){
              isValid=false;
               alert('chua nhap: '+arrInput[i]);
               break;
            }
          }
    return isValid;
        }
    
       handleSave=async()=>{
     
          let isValid= this.checkInput();
         
          if(isValid==true)
          {
            let response=await updatePass(this.state);
           //   console.log(response)
             
              if(response.errCode==0){
                this.setState({
                    errmessage:response.message,
                    errCode:response.errCode,
                })
                toast.success('Thành Công', {autoClose:3000})

            }
            else{
                toast.error(response.message, { autoClose:5000})
            }

          }else{
            toast.error('response.message', { autoClose:5000})
          }
      
           }
    render() {
//         const { systemMenuPath,isLoggedIn,userInfocus,isLoggedInCUS } = this.props;  
//  console.log(this.state)
     
        return (
          <div>
          

 
 
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">Mật khẩu hiện tại</label>
      <div class="input-group mb-2 classitemu">
      <div class="input-group-prepend ">
        <div class="input-group-text class-item"><i class="fas fa-lock"></i></div>
      </div>
      <input 
      type={this.state.isshow?'text':'password'}
      className='form-control'
                    placeholder='Enter your Password...'
               
                    onChange={(event)=>{this.handleOnchangeInput(event,'password1')}}
                    />
      <div class="input-group-prepend ">
        <div class="input-group-text class-item"> <span onClick={()=>{this.handleShow()}}>
        <i className={!this.state.isshow?"far fa-eye ":"fas fa-eye-slash"}></i>
        </span>
      </div>
      </div>
    </div>
    <label for="inputCity">Mật khẩu Mới</label>
    <div class="input-group mb-2 classitemu">
    <div class="input-group-prepend ">
      <div class="input-group-text class-item"><i class="fas fa-lock"></i></div>
    </div>
    <input 
    type={this.state.isshow?'text':'password'}
                  className='form-control'
                  placeholder='Enter your Password...'
             
                  onChange={(event)=>{this.handleOnchangeInput(event,'passwordnew')}}
                  />
    <div class="input-group-prepend ">
      <div class="input-group-text class-item"> <span onClick={()=>{this.handleShow()}}>

      <i className={!this.state.isshow?"far fa-eye ":"fas fa-eye-slash"}></i>
      </span>
    </div>
    </div>
  </div>
     
    </div>
 
  
  </div>
 
  <button type="submit" class="btn btn-primary"    onClick={()=>{this.handleSave()}}>Cập Nhật</button>

  
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

export default connect(mapStateToProps, mapDispatchToProps)(Updatepass);
