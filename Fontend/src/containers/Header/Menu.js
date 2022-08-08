import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Menu.scss';
import { Switch } from 'react-router';
import { Link, Route, Routes } from 'react-router-dom';

class Header extends Component {

    render() {
      console.log(this.props)
        return (
         
                  
                    <div class="accordion" id="accordionExample">
                    {this.props.userInfo.id==1? <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      <i class="fas fa-user"></i>{" "}Admin
                      </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                      <div className="menu">
                                              <ul>
                                              <li ><Link to='/system/typeuser-manage' ><i class="fas fa-user"></i> Loại </Link></li>
                                              <li><Link to='/system/admin-manage'><i class="fas fa-user-circle"></i>Nhân Viên</Link></li>
                                            
                                              </ul>
                                              </div>
                      </div>
                    </div>
                  </div>:''}
        {this.props.userInfo.id==2?  <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          <i class="fas fa-user"></i>{" "}USER
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div class="accordion-body">
          <div className="menu">
                                  <ul>
                                     {/*<li ><Link to='/system/typeuser-manage' ><i class="fas fa-user"></i> TYPE USER </Link></li>
 */}
                                  <li><Link to='/system/user-manage'><i class="fas fa-user-circle"></i> USER</Link></li>
                                
                                  </ul>
                                  </div>
          </div>
        </div>
      </div>:''}           

  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo" >
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      <i class="fas fa-mobile"></i>{" "}MANAGER PRODUCT
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <div className="menu">
      <ul>
      {this.props.userInfo.id==1?      <li><Link to="/system/typeproduct-manage"><i class="fab fa-product-hunt"></i> TYPE PRODUCT</Link></li>
      :''}
      <li><Link to='/system/product-manage'> <i class="fas fa-mobile-alt"></i> PRODUCT</Link></li>
      <li><Link to='/system/image-manage'> <i class="fas fa-camera"></i> IMAGE PRODUCT</Link></li>
      <li><Link to='/system/price-manage' ><i class="fas fa-money-bill-alt"></i> PRICE PRODUCT </Link></li>
      <li><Link to='/system/thuonghieu-manage'><i class="fab fa-trade-federation"></i> TRADE MARK</Link></li>
      {this.props.userInfo.id==1?      <li><Link to='/system/status-manage'><i class="fas fa-signal"></i> STATUS PRODUCT</Link></li>
      :''}
      <li><Link to='/system/review-manage'><i class="fas fa-star"></i> REVEIW PRODUCT</Link></li>
      </ul>
     
      </div>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      <i class="fas fa-shipping-fast"></i>{" "}MANAGER ODER
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <div className="menu">
      <ul>
      <li><Link to='/system/oder-manage' ><i class="fas fa-shipping-fast"></i>ODER </Link></li>
      <li><Link to='/system/detaioder-manage'><i class="fas fa-info-square"></i>DETAIL ODER</Link></li>
      <li><Link to='/system/payment-manage'><i class="fab fa-cc-visa"></i>PAYMENT</Link></li>
      <li><Link to='/system/voucher-manage'><i class="fas fa-tag"></i>VOUCHER</Link></li>
      <li><Link to='/system/status-manage'><i class="fas fa-signal"></i> STATUS</Link></li>
      </ul>
      </div>
      </div>
    </div>
  </div>
  <div class="accordion-item">
  <h2 class="accordion-header" id="headingFour">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
    <i class="fas fa-save"></i>{" "}MANAGER RECEIP
    </button>
  </h2>
  <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
    <div class="accordion-body">
    <div className="menu">
    <ul>
    <li><Link to='/system/delivery-manage' ><i class="fas fa-save"></i>RECEIP </Link></li>
    <li><Link to='/system/new-manage'><i class="fas fa-save"></i>DETAIL RECEIP</Link></li>
 
    </ul>
    </div>
    </div>
  </div>
</div>
<div class="accordion-item">
  <h2 class="accordion-header" id="headingFive">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
    <i class="fas fa-tasks"></i>{" "}MANAGER
    </button>
  </h2>
  <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
    <div class="accordion-body">
    <div className="menu">
    <ul>
    <li><Link to='/system/delivery-manage' ><i class="fas fa-truck"></i>DELIVERRY </Link></li>
    <li><Link to='/system/new-manage'><i class="fas fa-newspaper"></i>NEWS</Link></li>
    <li><Link to='/system/new-manage'><i class="fas fa-mobile"></i>INSURANCE</Link></li>
    </ul>
    </div>
    </div>
  </div>
</div>
<div class="accordion-item">
  <h2 class="accordion-header" id="headingSix">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
    <i class="fas fa-money-bill-alt"></i>{" "}MONEY
    </button>
  </h2>
  <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
    <div class="accordion-body">
    <div className="menu">
    <ul>
    <li><Link to='/system/doanhthu-manage' > Statistical</Link></li>
  
    </ul>
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
        userInfo:state.user.userInfo,
        isLoggedInCUS: state.user.isLoggedInCUS,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        processLogoutCus: () => dispatch(actions.processLogoutCus()),
     
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
