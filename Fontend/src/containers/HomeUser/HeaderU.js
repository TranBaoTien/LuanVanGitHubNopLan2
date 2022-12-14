import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './HeaderU.scss';

import {getAllSreach,timkiem}from'../../services/productService'

import * as actions from "../../store/actions";
class HeaderU extends Component {
    constructor(props){
        super(props);
        this.state={
            arrproduct:[],
            key:'xiao'
        }
    }
    // constructor(props){
    //     super(props);
    //     this.state={
    //        arrproduct:[],
    //        key:'xiao'
    //     }
    // }

    handleOnchangeInput=async(event,id)=>{
     
        let copystate={...this.state};
        copystate[id]=event.target.value;
        this.setState({...copystate})
       
     //   console.log(this.state.key)
        }
        handlesreach=async()=>{
            try {
            //     let key=this.state.key;
            //  console.log('kq state',key)
              let response=await timkiem(this.state.key);
              console.log('kq la',response)
              if(response)
              {
                  this.setState({
                      arrproduct:response
                  })
              }
            } catch (e) {
               console.log(e) ;
            }  
          }
    render() {
        const { processLogoutCus,userInfocus,isLoggedInCUS } = this.props;
       // console.log(userInfocus);
      // console.log('check',this.props.userInfocus)
        return (
            <React.Fragment>
           <div className='header-user-container'>
                <div className='header-user-content'>
                <div className='left'></div>
                <div className='center'>
                    <div className='left-header'>
                    <Link to='/home'><i className='fas fa-bars'></i></Link> 
                     <div className='header-user-logo'></div>

                    </div>
                    <div className='center-header'>
                      <div className='child-content'><Link to='/product'><b>S???n Ph???m</b></Link></div>
                      {isLoggedInCUS? <div className='child-content'><Link to='/manager-user/2'><b>????n H??ng</b></Link></div>:''}
                      <div className='child-content'><b>Ch??m S??c Kh??ch H??ng</b></div>
                    
                      {isLoggedInCUS?<div  onClick={processLogoutCus}> <b>????ng Xu???t</b>
                      </div>:<Link to='/customerlogin'><b>????ng Nh???p</b></Link> } 
                
                     
                    </div>
                    <div className='right-header'>
                    <button className='content-header-1' ><Link to='/cart'><i className="fas fa-cart-plus"></i></Link></button>
                  {isLoggedInCUS?<button className='content-header-1'> <Link to='/manager-user'><i className="far fa-address-card"></i></Link></button>:""}  
                   {isLoggedInCUS?<div className="btn btn-logout content-header-1" onClick={processLogoutCus}> <i className="fas fa-sign-out-alt"></i>
                   </div>:'' } 
                   
                    </div>
                </div>
                <div className='right'></div>
               
                </div>
           </div>
         
          
  
           </React.Fragment>
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
        processLogoutCus: () => dispatch(actions.processLogoutCus()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderU);
