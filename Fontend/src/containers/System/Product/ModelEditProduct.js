import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../UserManage.scss';
import{getAll}from '../../../services/thuonghieuService';
import {getAllTypeProduct,getAllstatus} from '../../../services/productService';

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
        arrThuonghieu:[],
        arrtype:[],
        arrstatus:[]
     
     
    }
   }
   async componentDidMount() {
        let product=this.props.product;
        let thuonghieu= await getAll();
        let type=await getAllTypeProduct();
        let status=await getAllstatus();
        // if(product&&!_.isEmpty(product)){
            this.setState({
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
                arrThuonghieu:thuonghieu,
                arrtype:type,
                arrstatus:status
               })
       // }
        console.log('check edit',this.state.arrtype)
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
      let thuonghieu=this.state.arrThuonghieu;
      let type=this.state.arrtype;
      let status=this.state.arrstatus;
       
        return (
            <div>
  
  <Modal  isOpen={this.props.isOpen} toggle={()=>{this.toggle()}} 
  className="modalcontainer"
  >
    <ModalHeader toggle={()=>{this.toggle()}}>
  Edit product
    </ModalHeader>
    <ModalBody>
    <div className='modeluser'>
    <form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label>Tên sản phẩm</label>
      <input type="text" class="form-control"   
      onChange={(event)=>{this.handleOnchangeInput(event,"name")}}
      value={this.state.name}/>
    </div>
    <div class="form-group col-md-6">
      <label>Xuất xứ</label>
      <input type="text" class="form-control"
      onChange={(event)=>{this.handleOnchangeInput(event,"xuatxu")}}
      value={this.state.xuatxu}
      />
    </div>
  </div>

  <div class="form-row">
    <div class="form-group col-md-6">
      <label>Thời Gian Bảo Hành</label>
      <input type="text" class="form-control" 
      onChange={(event)=>{this.handleOnchangeInput(event,"timebaohanh")}}
      value={this.state.timebaohanh}
      />
    </div>
    <div class="form-group col-md-6">
    <label>Kích Thước</label>
    <input type="text" class="form-control" 
    onChange={(event)=>{this.handleOnchangeInput(event,"size")}}
    value={this.state.size}
    />
  </div>
 
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label>Trọng Lượng</label>
      <input type="text" class="form-control" 
      onChange={(event)=>{this.handleOnchangeInput(event,"weigth")}}
            value={this.state.weigth}
      />
    </div>
    <div class="form-group col-md-6">
    <label>Chất Liệu</label>
    <input type="text" class="form-control" 
    onChange={(event)=>{this.handleOnchangeInput(event,"chatlieu")}}
    value={this.state.chatlieu}
    />
  </div>
 
  </div>
  <div class="form-row">
  <div class="form-group col-md-6">
    <label>Chip</label>
    <input type="text" class="form-control" 
    onChange={(event)=>{this.handleOnchangeInput(event,"chip")}}
    value={this.state.chip}
    />
  </div>
  <div class="form-group col-md-6">
  <label>Số Nhân</label>
  <input type="text" class="form-control" 
  onChange={(event)=>{this.handleOnchangeInput(event,"sonhan")}}
  value={this.state.sonhan}
  />
</div>

</div>
<div class="form-row">
<div class="form-group col-md-6">
  <label>Ram</label>
  <input type="text" class="form-control" 
  onChange={(event)=>{this.handleOnchangeInput(event,"ram")}}
  value={this.state.ram}
  />
</div>
<div class="form-group col-md-6">
<label>Kích Thước Màn Hình</label>
<input type="text" class="form-control" 
onChange={(event)=>{this.handleOnchangeInput(event,"sizescreen")}}
value={this.state.sizescreen}
/>
</div>

</div>
<div class="form-row">
<div class="form-group col-md-6">
  <label>Công nghệ màn hình</label>
  <input type="text" class="form-control" 
  onChange={(event)=>{this.handleOnchangeInput(event,"technologyscreen")}}
  value={this.state.technologyscreen}
  />
</div>
<div class="form-group col-md-6">
<label>Độ phân giải</label>
<input type="text" class="form-control" 
onChange={(event)=>{this.handleOnchangeInput(event,"dophangiai")}}
value={this.state.dophangiai}
/>
</div>

</div>
<div class="form-row">
<div class="form-group col-md-6">
  <label>Camera Sau</label>
  <input type="text" class="form-control" 
  onChange={(event)=>{this.handleOnchangeInput(event,"camsau")}}
  value={this.state.camsau}
  />
</div>
<div class="form-group col-md-6">
<label>Camera Trước</label>
<input type="text" class="form-control" 
onChange={(event)=>{this.handleOnchangeInput(event,"camtruoc")}}
value={this.state.camtruoc}
/>
</div>

</div>

<div class="form-row">
<div class="form-group col-md-6">
  <label>Số sim</label>
  <input type="text" class="form-control" 
  onChange={(event)=>{this.handleOnchangeInput(event,"musim")}}
  value={this.state.musim}
  />
</div>
<div class="form-group col-md-6">
<label>Cổng sạc</label>
<input type="text" class="form-control" 
onChange={(event)=>{this.handleOnchangeInput(event,"congsac")}}
value={this.state.congsac}
/>
</div>

</div>
<div class="form-row">
<div class="form-group col-md-6">
  <label>Pin</label>
  <input type="text" class="form-control" 
  onChange={(event)=>{this.handleOnchangeInput(event,"pin")}}
  value={this.state.pin}
  />
</div>
<div class="form-group col-md-6">
<label>Hệ Điều Hành</label>
<input type="text" class="form-control" 
onChange={(event)=>{this.handleOnchangeInput(event,"hedieuhanh")}}
value={this.state.hedieuhanh}
/>
</div>

</div>

<div class="form-row">
<div class="form-group col-md-6">
  <label>Ảnh</label>
  <input type="text" class="form-control" 
  onChange={(event)=>{this.handleOnchangeInput(event,"img")}}
        value={this.state.img}
  />
</div>
<div class="form-group col-md-6">
<label>Thương Hiệu</label>
            <select class="form-control form-control-lg"  
            onChange={(event)=>{this.handleOnchangeInput(event,"idth")}}
            value={this.state.idth}
            >

            {thuonghieu.map(item=>{
              // if(this.state.idth==item.id)
              return( <option     
               
                
                value={item.id}
                >
              {item.name}</option>
              );
            })}
         
            </select>
</div>
<div class="form-group col-md-6">
<label>Loai Sản Phẩm</label>
<select class="form-control form-control-lg"    
onChange={(event)=>{this.handleOnchangeInput(event,"idtype")}}
value={this.state.idtype}
>
{
  type && type.map((item,index)=>{
    // if(this.state.idtype==item.id)
    return(<option 
    
      value={item.id}
      >{item.name}</option>);
  })
}
</select>
</div>
<div class="form-group col-md-6">
<label>Trạng Thái</label>

<select class="form-control form-control-lg"  
 onChange={(event)=>{this.handleOnchangeInput(event,"idstatus")}}
 value={this.state.idstatus}
 >
{
  status && status.map((item,index)=>{
   //if(this.state.idstatus==item.id)
   if(item.id==5||item.id==6)
    return(<option 
    
      value={item.id}
      >{item.name}</option>);
     
  })
}
</select>


</div>
<div class="form-group col-md-6">
<label style={{color:'red'}}> {this.props.errmessage}</label>

</div>
</div>
</form>

    
        </div>
</ModalBody>

    <ModalFooter>
   
      <Button
        color="primary"
        onClick={()=>{this.handleSave()}}
      >
        Add
      </Button>
      {' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModelEditProduct);
