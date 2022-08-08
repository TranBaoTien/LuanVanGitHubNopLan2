import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Modeldetail.scss'
import{Button,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
import _ from"lodash";

class ModelEditProduct extends Component {

   constructor(props){
    super(props);
    this.state={

        name:this.props.product.name ,
        xuatxu:this.props.product.xuatxu,
        timebaohanh: this.props.product.timebaohanh,
        size: this.props.product.size,
        weigth: this.props.product.weigth,
        chatlieu:this.props.product.chatlieu,
        chip: this.props.product.chip,
        sonhan: this.props.product.sonhan,
        ram: this.props.product.ram,
        sizescreen: this.props.product.sizescreen,
        technologyscreen: this.props.product.technologyscreen,
        dophangiai: this.props.product.dophangiai,
        camsau:this.props.product.camsau,
        camtruoc:this.props.product.camtruoc,
        musim:this.props.product.musim,
        congsac:this.props.product.congsac,
        pin: this.props.product.pin,
        hedieuhanh: this.props.product.hedieuhanh,
        img:this.props.product.img,
        idth: this.props.product.idth,
        idtype: this.props.product.idtype,
        idstatus: this.props.product.idstatus,
     
    }
   }
    componentDidMount() {
        let product=this.props.product;
        if(product&&!_.isEmpty(product)){
            this.state={
                id:product.id,
                name:product.name ,
                xuatxu:product.xuatxu,
                timebaohanh: product.timebaohanh,
                size: product.size,
                weigth: product.weigth,
                chatlieu:product.chatlieu,
                chip: product.chip,
                sonhan: product.sonhan,
                ram: product.ram,
                sizescreen: product.sizescreen,
                technologyscreen: product.technologyscreen,
                dophangiai: product.dophangiai,
                camsau:product.camsau,
                camtruoc:product.camtruoc,
                musim:product.musim,
                congsac:product.congsac,
                pin: product.pin,
                hedieuhanh: product.hedieuhanh,
                img:product.img,
                idth: product.idth,
                idtype: product.idtype,
                idstatus: product.idstatus,
                
               }
        }
        //console.log('check edit',this.props.product)
    }
    toggle=()=>{
        this.props.toggleModal();
    }

    handleOnchangeInput=(event,id)=>{
     // console.log('event 1',event.target.value,id)
    //  this.state[id]=event.target.value;
    //  this.setState({
    //   ...this.state
    // })
    let copystate={...this.state};
    copystate[id]=event.target.value;
    this.setState({...copystate})

    }
    checkInput=()=>{
      let isValid=true;
      let arrInput=['idth','idtype','idstatus'];
      for(let i=0;i<arrInput.length;i++){
        if(!this.state[arrInput[i]]){
          isValid=false;
          alert('chua nhap: '+arrInput[i]);
          break;
        }
      }
return isValid;
    }
    handleSave=()=>{
    
   let isValid= this.checkInput();
   if(isValid===true)
   {
     this.props.editproduct(this.state);
   
    // if(this.props.errCode===0){
    //  this.toggle();
   
    // }
   }
    }
    render() {
       
        return (
            <div>
  
  <Modal  isOpen={this.props.isOpen} toggle={()=>{this.toggle()}} 
  className="modalcontainer"
  >
    <ModalHeader toggle={()=>{this.toggle()}}>
Detail Product
    </ModalHeader>
    <ModalBody>
    <div className='modeluser'>
            <div className='input-container'>
               <div className='tieude-detail'><label>Thông tin chung</label></div> 
               
                <div className='lable-detail'>
                <label>Xuất xứ:</label>
                <label>{this.state.xuatxu}</label>
                </div>
                <div className='lable-detail'>
                <label>Thời gian bảo hàng:</label>
                <label>{this.state.timebaohanh}</label>
                </div>
            </div>
            <div className='input-container'>
            <div className='tieude-detail'><label>Màn Hình</label></div>
                <div className='lable-detail'>
                <label>Công nghệ màn hình</label>
                <label>{this.state.technologyscreen}</label>
                </div>
                <div className='lable-detail'>
                <label>Độ phân giải</label>
                <label>{this.state.dophangiai}</label>
                </div>
                <div className='lable-detail'>
                <label>Màn hình rộng</label>
                <label>{this.state.size}</label>
                </div>
                <div className='lable-detail'>
                <label>Mặt kính</label>
                <label>Không công bố</label>
                </div>
              
            </div>
            <div className='input-container'>
            <div className='tieude-detail'> <label>Hệ điều hành</label></div>
                <div className='lable-detail'>
                  <label>Hệ điều hành</label>
                  <label>{this.state.hedieuhanh}</label>
                </div>
                <div className='lable-detail'>
                  <label>Chip</label>
                  <label>{this.state.chip}</label>
                </div>
            </div>
            <div className='input-container'>
            <div className='tieude-detail'><label>Pin</label></div>
              <div className='lable-detail'>
              <label>Dung lượng pin</label>
              <label>{this.state.pin}</label>  
              </div>
              <div className='lable-detail'>
              <label>Cổng sạc</label>
              <label>{this.state.congsac}</label>  
              </div>

              </div>
            <div className='input-container'>
            <div className='tieude-detail'> <label>Bộ nhớ</label></div>
            <div className='lable-detail'>
            <label>Ram</label>
            <label>{this.state.ram}</label>
            </div>
            </div>

        <div className='input-container'>
        <label style={{color:'red'}}> {this.props.errmessage}</label>


        </div>
    
        </div>
</ModalBody>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModelEditProduct);
