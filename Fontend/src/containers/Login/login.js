import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import './login.scss';
import * as actions from "../../store/actions";
//import { handleLoginApi } from '../../services/userService.js';
import { handleLoginApi } from '../../services/adminnhanvienService';
import { identity } from 'lodash';
import { userLoginsuccess } from '../../store/actions';


class Login extends Component {
    constructor(props) {
        super(props);
     this.state={
         username:'123456',
         password:'2020',
         isshow:false,
         errmessage:''

     }
    }
    handleonChangeinputU=(event)=>{
        this.setState({
            username:event.target.value
        })
    }
    handleonChangeinputP=(event)=>{
        this.setState({
           password:event.target.value
        })
     
    }
    handlelogin=async()=>{
            this.setState({
                errmessage:''
            })
        try {
          let data=  await handleLoginApi(this.state.username,this.state.password)
        if(data&&data.errCode!==0){

            this.setState({
                errmessage:data.message
            })
        }
        if(data&&data.errCode===0){
           // userLoginsuccess(data.user);
        //chuyen trang
            this.props.userLoginsuccess(data.user);
            this.setState({
                errmessage:data.message
            });        
        }
        //console.log(data)
        
        
        } catch (error) {
            if(error.response){
                if(error.response.data){
                    this.setState({
                        errmessage:error.response.data.message
                    })
                }
            }
          //  console.log("anh",error.response)
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
               <div class="input-group mb-2 classitemu">
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
             <div class="input-group mb-2 classitemu">
             <div class="input-group-prepend ">
               <div class="input-group-text class-item"><i class="fas fa-lock"></i></div>
             </div>
             <input 
                           type={this.state.isshow?'text':'password'} 
                           className='form-control'
                           placeholder='Enter your Password...'
                      
                           onChange={(event)=>{this.handleonChangeinputP(event)}}
                           />
             <div class="input-group-prepend ">
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
        navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        // adminLoginFail: () => dispatch(actions.adminLoginFail()),

        userLoginsuccess:(userInfo)=>dispatch(actions.userLoginsuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
