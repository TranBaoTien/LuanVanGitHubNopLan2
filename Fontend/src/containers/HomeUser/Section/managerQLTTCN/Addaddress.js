import React, { Component } from 'react';

import { connect } from 'react-redux';

class Addaddress extends Component {

    render() {
        const { systemMenuPath,isLoggedIn,userInfocus,isLoggedInCUS } = this.props;
        return (
          <div>
          <form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Address</label>
      <input type="email" class="form-control" id="inputaddress" placeholder="Địa Chỉ" value={isLoggedInCUS?userInfocus.email:''}/>
    </div>
  
  </div>
  <button type="submit" class="btn btn-primary">Cập Nhật</button>
</form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Addaddress);
