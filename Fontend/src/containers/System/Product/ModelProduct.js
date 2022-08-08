import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../UserManage.scss';
import{Button,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
import{getAll}from '../../../services/thuonghieuService';
import {getAllTypeProduct,getAllstatus} from '../../../services/productService';
class ModelProduct extends Component {

   constructor(props){
    super(props);
    this.state={
        name:'' ,
        xuatxu:'',
        timebaohanh: '',
        size: '',
        weigth: '',
        chatlieu:'',
        chip: '',
        sonhan: '',
        ram: '',
        sizescreen: '',
        technologyscreen: '',
        dophangiai: '',
        camsau:'',
        camtruoc:'',
        musim:'',
        congsac:'',
        pin: '',
        hedieuhanh: '',
        img:'',
        idth: '',
        idtype: '',
        idstatus: '',
        arrThuonghieu:[],
        arrtype:[],
        arrstatus:[]
     
    }
   }
    async componentDidMount() {
     let thuonghieu= await getAll();
     let type=await getAllTypeProduct();
     let status=await getAllstatus();

     this.setState({
      arrThuonghieu:thuonghieu,
      arrtype:type,
      arrstatus:status
     })
    }
    toggle=()=>{
        this.props.toggleModal();
    }

    handleOnchangeInput=(event,id)=>{
   
    let copystate={...this.state};
    copystate[id]=event.target.value;
    //console.log(event.target.value)
    this.setState({...copystate})

    }
    checkInput=()=>{
      let isValid=true;
      let arrInput=[ 'idth','idtype','idstatus'];
      for(let i=0;i<arrInput.length;i++){
        if(!this.state[arrInput[i]] ){
          isValid=false;
          alert('chua nhap: '+arrInput[i]);
          break;
        }
      }
return isValid;
    }
    handleAdd=()=>{
    
   let isValid= this.checkInput();
   if(isValid===true)
   { 
    this.props.createproduct(this.state);
   
     if(this.props.errCode===0){
      this.toggle();
   
     }
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
     Create New product
    </ModalHeader>
    <ModalBody>
        <div className='modeluser'>
                <div className='input-container'>
                    <label>Name</label>
                    <input type='text'
                    onChange={(event)=>{this.handleOnchangeInput(event,"name")}}
                   value={this.state.name}
                    />
                </div>
                <div className='input-container'>
                <label>Xuất Xứ</label>
                <input type='text'
                onChange={(event)=>{this.handleOnchangeInput(event,"xuatxu")}}
                value={this.state.xuatxu}
                />
                </div>
                <div className='input-container'>
                <label>Thời Gian Bảo Hành</label>
                <input type='password'
                onChange={(event)=>{this.handleOnchangeInput(event,"timebaohanh")}}
                value={this.state.timebaohanh}
                />
                </div>
               
              
                <div className='input-container'>
                <label>Kích Thước</label>
                <input type='text'
                onChange={(event)=>{this.handleOnchangeInput(event,"size")}}
                value={this.state.size}
                />
                </div>
                <div className='input-container'>
                <label>Trọng Lượng</label>
                <input type='integer'
                onChange={(event)=>{this.handleOnchangeInput(event,"weigth")}}
                value={this.state.weigth}
                />
               </div>

                <div className='input-container'>
                <label>Chất Liệu</label>
                <input type='text'
                onChange={(event)=>{this.handleOnchangeInput(event,"chatlieu")}}
               value={this.state.chatlieu}
                />
            </div>
            <div className='input-container'>
            <label>Chip</label>
            <input type='text'
            onChange={(event)=>{this.handleOnchangeInput(event,"chip")}}
            value={this.state.chip}
            />
            </div>
            <div className='input-container'>
            <label>Số Nhân</label>
            <input type='password'
            onChange={(event)=>{this.handleOnchangeInput(event,"sonhan")}}
            value={this.state.sonhan}
            />
            </div>
           
          
            <div className='input-container'>
            <label>Ram</label>
            <input type='text'
            onChange={(event)=>{this.handleOnchangeInput(event,"ram")}}
            value={this.state.ram}
            />
            </div>
            <div className='input-container'>
            <label>Kích Thước Màn Hình</label>
            <input type='integer'
            onChange={(event)=>{this.handleOnchangeInput(event,"sizescreen")}}
            value={this.state.sizescreen}
            />
            </div>
           


                    <div className='input-container'>
                    <label>Công nghệ màn hình</label>
                    <input type='text'
                    onChange={(event)=>{this.handleOnchangeInput(event,"technologyscreen")}}
                value={this.state.technologyscreen}
                    />
                </div>
                <div className='input-container'>
                <label>Độ phân giải</label>
                <input type='text'
                onChange={(event)=>{this.handleOnchangeInput(event,"dophangiai")}}
                value={this.state.dophangiai}
                />
                </div>
                <div className='input-container'>
                <label>Camera Sau</label>
                <input type='password'
                onChange={(event)=>{this.handleOnchangeInput(event,"camsau")}}
                value={this.state.camsau}
                />
                </div>
            
            
                <div className='input-container'>
                <label>Camera Truoc</label>
                <input type='text'
                onChange={(event)=>{this.handleOnchangeInput(event,"camtruoc")}}
                value={this.state.camtruoc}
                />
                </div>
                <div className='input-container'>
                <label>Số sim</label>
                <input type='integer'
                onChange={(event)=>{this.handleOnchangeInput(event,"musim")}}
                value={this.state.musim}
                />
            </div>

                <div className='input-container'>
                <label>Cổng sạc</label>
                <input type='text'
                onChange={(event)=>{this.handleOnchangeInput(event,"congsac")}}
            value={this.state.congsac}
                />
            </div>
            <div className='input-container'>
            <label>Pin</label>
            <input type='text'
            onChange={(event)=>{this.handleOnchangeInput(event,"pin")}}
            value={this.state.pin}
            />
            </div>
            <div className='input-container'>
            <label>Hệ Điều Hành</label>
            <input type='password'
            onChange={(event)=>{this.handleOnchangeInput(event,"hedieuhanh")}}
            value={this.state.hedieuhanh}
            />
            </div>


            <div className='input-container'>
            <label>Ảnh</label>
            <input type='file'
            onChange={(event)=>{this.handleOnchangeInput(event,"img")}}
            value={this.state.img}
            />
            </div>
            <div className='input-container'>
            <label>Thương Hiệu</label>
            <select class="form-control form-control-lg"  
            onChange={(event)=>{this.handleOnchangeInput(event,"idth")}}>
           
            {thuonghieu.map(item=>{
              return( <option     
               
                
                value={item.id}
                >
              {item.name}</option>
              );
            })}
         
            </select>
          
            </div>
            <div className='input-container'>
            <label>Loai Sản Phẩm</label>
            <select class="form-control form-control-lg"   
             onChange={(event)=>{this.handleOnchangeInput(event,"idtype")}}>
            {
              type && type.map((item,index)=>{
               
                return(<option 
                
                  value={item.id}
                  >{item.name}</option>);
              })
            }
            </select>
          
            </div>
            <div className='input-container'>
            <label>Trạng Thái</label>

            <select class="form-control form-control-lg"  
             onChange={(event)=>{this.handleOnchangeInput(event,"idstatus")}}>
            {
              status && status.map((item,index)=>{
                if(item.id==5||item.id==6)
                return(<option 
                
                  value={item.id}
                  >{item.name}</option>);
              })
            }
            </select>
          

            </div>
            <div className='input-container'>
            <label style={{color:'red'}}> {this.props.errmessage}</label>


            </div>
        
            </div>
    </ModalBody>

    <ModalFooter>
   
      <Button
        color="primary"
        onClick={()=>{this.handleAdd()}}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModelProduct);
