import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import Menu from './Menu';

class Header extends Component {

    render() {
        const { processLogout,userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                   
                </div>
                <div className='welcome'>Xin Chào {userInfo && userInfo.fullname?userInfo.fullname:'' }</div>

                {/* nút logout */}
                <div className="btn btn-logout" onClick={processLogout}>
                    <i className="fas fa-sign-out-alt"></i>
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
