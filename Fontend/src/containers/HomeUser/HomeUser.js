import React, { Component } from 'react';

import { connect } from 'react-redux';
import HeaderU from './HeaderU';
import Type from './Section/Type';
import FooterUser from './FooterUser';
import Detailproduct from './Section/detailProduct';
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background:" black" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }
class HomeUser extends Component {

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
             nextArrow: <SampleNextArrow />,
             prevArrow: <SamplePrevArrow />
          };
        return (
          <div>
          <HeaderU/>
          <div className='header-banner'></div>
          <div className='bottom-header'>
           
          <div className='bottom-option'>
              <div className='option-child'><b><i class="fas fa-truck"></i></b></div>
              <div className='text-child'>Giao Hàng Toàn Quốc</div>
          </div>
          <div className='bottom-option'>
              <div className='option-child'><i class="fas fa-chevron-circle-down"></i></div>
              <div className='text-child'>Mẫu Mã Đa Dạng</div>
          </div>
          <div className='bottom-option'>
              <div className='option-child'><i class="fab fa-connectdevelop"></i></div>
              <div className='text-child'>Bảo Hành</div>
          </div>
          <div className='bottom-option'>
              <div className='option-child'><i class="fas fa-undo"></i></div>
              <div className='text-child'>Đổi Trả & Nhanh</div>
          </div>
         
     </div>
          <Type settings={settings}/>
          <FooterUser/>
          <Detailproduct settings={settings}/>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeUser);
