import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import './login.scss';
import * as actions from "../../store/actions";
import { handleLoginApi } from '../../services/userService.js';
import { identity } from 'lodash';
import { userLoginsuccess,userLoginsuccesscustomer } from '../../store/actions';
import { Link } from 'react-router-dom';
import { getAlluser,createNewUser ,deleteUser,editupdateUser} from '../../services/userService'

class dangky extends Component {
   
    constructor(props){
        super(props);
        this.state={
            fullname:'',
            username:'',
            password:'',
            email:'',
            phone:'',
            sdt:'',
            errmessage:'',
            errCode:'',

        }
       }
      
    
        handlephone=(data)=>{
        var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    
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
            let errorinput=['Họ và Tên','Tên đăng nhập',
            'Mật khẩu','Email','Số điện thoại'];
            let arrInput=['fullname','username',
            'password','email','phone'];
            for(let i=0;i<arrInput.length;i++){
              if(!this.state[arrInput[i]] ){
                isValid=false;
                alert('Chưa nhập: '+errorinput[i]);
                break;
              }
            }
      return isValid;
          }
        handleAdd=async()=>{
      
          let isValid= this.checkInput();
          if(isValid===true)
          { 
            let ktsdt=this.handlephone(this.state.phone);
            if(ktsdt==false){
              alert('Kiểm tra lại số điện thoại');
            }
            else{
              try {
                let response=await createNewUser(this.state);
    
                if(response)
                {
                    this.setState({
                        errmessage:response.message,
                        errCode:response.errCode,
                    })}
                    if(response.errCode==0){
                        push(`/customerlogin}`);
                    }
              } catch (e) {
              }}}}
    render() {
        return (
          
            <div>
            
            <div className='backgroud-dangky'>
            <div className='backgroud-dangky'>
            <div className='container-dangky'>
                
            <div className='content-login row'>
                <div className='col-12 text-login class-item2'>Đăng Ký</div>
               
                <form>
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="inputFullname4">Fullname</label>
                    <input type="text" class="form-control" id="inputFullname4" placeholder="Họ và Tên"
                    onChange={(event)=>{this.handleOnchangeInput(event,"fullname")}}
                    value={this.state.fullname}
                    />
                  </div>
                  <div class="form-group col-md-6">
                  <label for="inputUsername4">Username</label>
                  <input type="text" class="form-control" placeholder="Username"
                  onChange={(event)=>{this.handleOnchangeInput(event,"username")}}
                  value={this.state.username}
                  />
                </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Password</label>
                    <input type="password" class="form-control" id="inputPassword4" placeholder="Password"
                    onChange={(event)=>{this.handleOnchangeInput(event,"password")}}
                    value={this.state.password}
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail4">Email</label>
                  <input type="email" class="form-control" id="inputEmail4" placeholder="Email"
                  onChange={(event)=>{this.handleOnchangeInput(event,"email")}}
                  value={this.state.email}
                  />
                </div>
           
                <form>
                  <div class="input-group">
                      <input id="mobile" type="text" class="form-control"
                       placeholder="Số điện thoại"
                       onChange={(event)=>{this.handleOnchangeInput(event,"phone")}}
                       value={this.state.phone}
                       />
                      
                  </div>
              </form> 
              
                
                <button type="submit" class="btn btn-primary"   onClick={()=>{this.handleAdd()}}>Đăng ký</button>
              </form>
            
            </div>
 
                <div className='col-12 buf-loi'>{this.state.errmessage}</div>
             
                <div className='col-12 text-center'>
                <Link to='/customerlogin'> Đăng Nhập</Link> 
                </div>
                
              
            </div>
        </div>
 
            </div>
           </div>        

         )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // navigate: (path) => dispatch(push(path)),
        // // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        // // adminLoginFail: () => dispatch(actions.adminLoginFail()),

        userLoginsuccesscustomer:(userInfocus)=>dispatch(actions.userLoginsuccesscustomer(userInfocus))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(dangky);
