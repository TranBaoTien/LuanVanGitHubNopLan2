import React, { Component } from 'react';

import { connect } from 'react-redux';
import './detailProduct.scss';
class detailProduct extends Component {

    render() {
  
        return (
          <div>
          
          </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        isLoggedInCUS: state.user.isLoggedInCUS,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(detailProduct);
