import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import './login.scss';
import * as actions from "../../store/actions";
import { handleLoginApi } from '../../services/userService.js';
import { identity } from 'lodash';
import { userLoginsuccess,userLoginsuccesscustomer } from '../../store/actions';
import { Redirect, Switch } from 'react-router-dom';
import { Link, Route, Routes } from 'react-router-dom';
import dangky from './dangky';
import dangnhap from './dangnhap';

class logincustomer extends Component {
    constructor(props) {
        super(props);
     this.state={
         u:'123456',
         p:'2020',
         isshow:false,
         errmessage:'',
         data:[]

     }
    }
    handleonChangeinputU=(event)=>{
        this.setState({
            u:event.target.value
        })
    }
    handleonChangeinputP=(event)=>{
        this.setState({
           p:event.target.value
        })
     
    }


    handlelogin=async()=>{
            this.setState({
                errmessage:''
            })
        try {
          let data=await handleLoginApi(this.state.u,this.state.p)
        if(data&&data.errCode!=0){

            this.setState({
                errmessage:data.message
            })
        }
        if(data&&data.errCode==0){
        //chuyen trang
            this.props.userLoginsuccesscustomer(data.user);
           this.props.history.push(`/home`);
            this.setState({
                errmessage:data.message,
                data:data.user
            });
            
        }
      
        
        } catch (error) {
            if(error.response){
                if(error.response.data){
                    this.setState({
                        errmessage:error.response.data.message
                    })
                }
            }
        }
    
    }
    handleShow=()=>{
        this.setState({
            isshow:!this.state.isshow
        })
    }

    render() {
        return (
          
            <div>
            
            <div className='backgroud-login'>
            <div className='backgroud-login123'>
            <div className='container-login'>
                
            <div className='content-login row'>
                <div className='col-12 text-login class-item2'>LOGIN</div>
                <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text class-item"><i class="fas fa-user"></i></div>
                </div>
                <input type="text" class="form-control" id="inlineFormInputGroup" 
                
                className='form-control '
                placeholder='Enter your Username...'
               // value={this.state.username}
                onChange={(event)=>{this.handleonChangeinputU(event)}}
                />
              </div>
              <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text class-item"><i class="fas fa-lock"></i></div>
              </div>
              <input 
                            type={this.state.isshow?'text':'password'} 
                            className='form-control'
                            placeholder='Enter your Password...'
                       
                            onChange={(event)=>{this.handleonChangeinputP(event)}}
                            />
              <div class="input-group-prepend">
                <div class="input-group-text class-item"> <span onClick={()=>{this.handleShow()}}>
 
                <i className={!this.state.isshow?"far fa-eye ":"fas fa-eye-slash"}></i>
                </span>
              </div>
              </div>
            </div>
                <div className='col-12 buf-loi'>{this.state.errmessage}</div>
                <div className='col-12'>
                <button
                 className='btn-login'
                onClick={()=>{this.handlelogin()}}
                 >Login</button>
                </div>
                <div className='col-12 text-center'>
                <Link to='/dangky'> Đăng ký?</Link> 
                </div>
                <div className='col-12 text-center'>
                    <a href='#'> Forgot your password?</a> 
                </div>
                <div className='col-12 text-center'>
                <span>   Or Login With: </span>
             
                </div>
                <div className='col-12 link-login'>
                <i className="fab fa-facebook facebook"></i>
                <i className="fab fa-google google"></i>
                </div>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(logincustomer);
