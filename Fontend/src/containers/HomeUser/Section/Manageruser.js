import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import { Link, Route, Routes } from 'react-router-dom';
import UserManage from '../../System/UserManage';
import ProductManage from '../../System/ProductManage';
import TypeUser from '../../System/User/TypeUser';
import HeaderU from '../HeaderU';
import Manageroder from './managerQLTTCN/Manageroder';
import Information from './managerQLTTCN/Information';
import Addaddress from './managerQLTTCN/Addaddress';
import Updatepass from './managerQLTTCN/Updatepass'
import './Manageruser.scss';
import {getAlluser} from '../../../services/userService'

class Manageruser extends Component {
    constructor(props){
        super(props);
        this.state={
         fullname:''
       
         
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
              
            })
          });}
    
        }
        
      }
    render() {
        const { systemMenuPath,isLoggedIn,userInfocus,isLoggedInCUS } = this.props;
       
        return (
<div>
<HeaderU/>
            <div class="container"> 
            <h1 class="text-center">Quản Lý Thông Tin Cá Nhân</h1> 
            <div class="container"> 
             <div class="row profile">        
              <div class="col-md-3">          
               <div class="profile-sidebar">                          
                <div class="profile-userpic">
                <img src="https://hocwebgiare.com/thiet_ke_web_chuan_demo/bootstrap_user_profile/images/profile_user.jpg" class="img-responsive" alt="Thông tin cá nhân"/>               
                </div>                                            
                <div class="profile-usertitle">                   
                 <div class="profile-usertitle-name">   <input  value={isLoggedInCUS?this.state.fullname:''}/>              </div>                  
           
                </div>                                                
                                                           
                <div class="profile-usermenu">                    
                 <div class="nav nana">                    
                  <div class="active">                         
                  <Link to='/manager-user/1'> <h5>Thông tin cá nhân   </h5> </Link>          
                  </div>  
                  {isLoggedInCUS? <div class="active">                         
                  <Link to='/manager-user/pass'> <h5>Đổi mật khẩu  </h5> </Link>          
                  </div> :''}                     
                  <div  class="active">                            
                  <Link to='/manager-user/2'><h5>Quản lý đơn hàng</h5> </Link>
                  </div>                       
                  <div  class="active">                            
                  <Link to='/manager-user/3'><h5>Liên hệ Hỗ trợ   </h5>  </Link>
                
                  </div>                       
                              
                 </div>                
                </div>                            
               </div>     
              </div>      
              <div class="col-md-9"> 
              <div className="system-list">
              <Switch>
              <Route path='/manager-user/1' component={Information} />
              <Route path='/manager-user/2' component={Manageroder} />
              <Route path='/manager-user/pass' component={Updatepass} />
              <Route path='/manager-user/3' component={Manageroder} />
              <Route path="/manager-user/4" component={Addaddress} />
              <Route component={() => { return (<Redirect to='/manager-user/1' />) }} />

          </Switch>
                </div>
                </div>
              </div>  
             </div>
            </div> 
           </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        systemMenuPath:'/manager-user/1',
        isLoggedInCUS: state.user.isLoggedInCUS,
        userInfocus:state.user.userInfocus
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manageruser);
