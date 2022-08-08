import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import ProductManage from '../containers/System/ProductManage';
import RegisterPackageGroupOrAcc from '../containers/System/RegisterPackageGroupOrAcc';
import TypeUser from '../containers/System/User/TypeUser';
import Delivery from '../containers/System/User/Delivery';
import Payment from '../containers/System/User/Payment';
import Status from '../containers/System/User/Status';
import Thuonghieu from '../containers/System/User/Thuonghieu';
import Typeproduct from '../containers/System/User/Typeproduct';
import New from '../containers/System/User/New';
import Header from '../containers/Header/Header';
import Image from '../containers/System/User/Image';
import Price from '../containers/System/User/Price';
import './System.scss'
import Menu from '../containers/Header/Menu';
import Oder from '../containers/System/User/Oder';
import Voucher from '../containers/System/User/Voucher';
import DetailOder from '../containers/System/User/DetailOder';
import Reviewproduct from '../containers/System/User/Reviewproduct';
import Doanhthu from '../containers/System/User/Doanhthu.js';
import NhanVien from '../containers/System/User/NhanVien';
class System extends Component {
    render() {
         // {/*this.props.isLoggedIn && <Header />*/}

        const { systemMenuPath,isLoggedIn } = this.props;
        return (
<React.Fragment>
{isLoggedIn && <Header />}
<div className="system-container">
<div className='menuapp'>
<Menu/>
</div>
                <div className="system-list">
                    <Switch>
                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/admin-manage" component={NhanVien} />
                        <Route path="/system/product-manage" component={ProductManage} />
                        <Route path="/system/register-package-group-or-account" component={RegisterPackageGroupOrAcc} />
                        <Route path="/system/typeuser-manage" component={TypeUser} />
                        <Route path="/system/delivery-manage" component={Delivery} />
                        <Route path="/system/payment-manage" component={Payment} />
                        <Route path="/system/typeproduct-manage" component={Typeproduct} />
                        <Route path="/system/status-manage" component={Status} />
                        <Route path="/system/review-manage" component={Reviewproduct} />
                        <Route path="/system/thuonghieu-manage" component={Thuonghieu} />
                        <Route path="/system/new-manage" component={New} />
                        <Route path="/system/image-manage" component={Image} />
                        <Route path="/system/price-manage" component={Price} />
                        <Route path="/system/oder-manage" component={Oder} />
                        <Route path="/system/voucher-manage" component={Voucher} />
                        <Route path="/system/doanhthu-manage" component={Doanhthu} />
                        <Route path="/system/detaioder-manage" component={DetailOder} />
                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
</React.Fragment>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
