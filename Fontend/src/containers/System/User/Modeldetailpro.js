import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../UserManage.scss';
import{Button,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
import _ from"lodash";
import{getAllProduct,getAllstatus}from'../../../services/productService'
import {getalldetail}from '../../../services/oderSevice';
class Modeldetailpro extends Component {

   constructor(props){
    super(props);
    this.state={
    
     arroder:[],
     arrdetail:[]


    }
   }
async   componentDidMount() {
         let arroder=this.props.arroder;
         let arrdetail=await getalldetail();
        // let pro=await getAllProduct();
        // let status= await getAllstatus();
      
        // if(typeuser&&!_.isEmpty(typeuser)){
            
            this.setState({
                arroder:arroder,
                arrdetail:arrdetail
                
               })
        // }
      //  console.log('check edit',this.props.typeuser)
    }
    toggle=()=>{
        this.props.toggleModal();
    }

    render() {
   
      let arroder=this.state.arroder
      let arrdetail=this.state.arrdetail
        return (
            <div>
  
    <Modal  isOpen={this.props.isOpen} toggle={()=>{this.toggle()}} 
    className="modalcontainer"
    >
    <ModalHeader toggle={()=>{this.toggle()}}>Detail Oder</ModalHeader>
    
    <ModalBody>
    <table class="table">
    <tr>
        <th>Mã</th>
        <th>Số Lượng</th>
        <th>Product</th>
        <th>Price</th>
        <th>Oder</th>
        <th>Money</th>
      
   
    </tr>
   {arrdetail.map(item=>{
    if(arroder.id===item.idoder)
    return(    
            <tr>
            <td>{item.id}</td>
            <td>{item.quatity}</td>
            <td>{item.namepro}</td>
            <td>{item.price}</td>
            <td>{item.idoder}</td>
            <td>{item.summoney}</td>
            
        
            
            </tr>
        )
    }) }
    </table>
    </ModalBody>

    <ModalFooter>
      <Button onClick={()=>{this.toggle()}}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
</div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modeldetailpro);
