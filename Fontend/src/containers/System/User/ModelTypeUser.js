import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../UserManage.scss';
import{Button,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
import{getAllProduct}from'../../../services/productService'

class ModelUser extends Component {

   constructor(props){
    super(props);
    this.state={
        id:'',
        name:'',
        idpro:'',
        price:'',
        detail:'',
        phantram:null,
    
        arrPro:[]
    }
   }
    async componentDidMount() {
      let pro=await getAllProduct();
      this.setState({
        arrPro:pro
      })
    }
    toggle=()=>{
        this.props.toggleModal();
    }

    handleOnchangeInput=(event,id)=>{
     
    let copystate={...this.state};
    copystate[id]=event.target.value;
    this.setState({...copystate})

    }
    checkInput=()=>{
      let isValid=true;
      let arrInput=[];
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
    this.props.createUser(this.state);
   
     if(this.props.errCode===0){
      this.toggle();
   
     }
   }
    }
    render() {
     let pro=this.state.arrPro;
     
        return (
            <div>
  
  <Modal  isOpen={this.props.isOpen} toggle={()=>{this.toggle()}} 
  className="modalcontainer"
  >
    <ModalHeader toggle={()=>{this.toggle()}}>
     Create 
    </ModalHeader>
    <ModalBody>
        <div className='modeluser'>
        {this.props.arrtypepro||this.props.arrPayment||this.props.arrtypeuser||this.props.new||this.props.imgarr||this.props.thuonghieustate||this.props.statusstate?
          <div className='input-container'>
          <label>Name</label>
          <input type='text'
          onChange={(event)=>{this.handleOnchangeInput(event,"name")}}
         value={this.state.name}
          />
      </div>:''
        }
               
                {this.props.new||this.props.arrvouchers?
                    <div className='input-container'>
                    <label>Detail</label>
                    <input type='text'
                    onChange={(event)=>{this.handleOnchangeInput(event,"detail")}}
                   value={this.props.detail}
                    />
                </div>
                    
                    :""}
                    {this.props.arrvouchers?
                      <div className='input-container'>
                      <label>Phần Trăm</label>
                      <input type='number'
                      onChange={(event)=>{this.handleOnchangeInput(event,"phantram")}}
                     value={this.props.phantram}
                      />
                  </div>
                      
                      :""}
  
  
                    {this.props.imgarr||this.props.pricearr?
                      <div className='input-container'>
                      <label>Mã sản phẩm</label>
                      <select
                      onChange={(event)=>{this.handleOnchangeInput(event,"idpro")}}
                      >
                      {pro.map(item=>{
                        return(<option value={item.id}>
                          {item.name}
                          </option>);
                      })}
                      </select>
                  
                  </div>
                      
                      :""}
                      {this.props.pricearr?<div className='input-container'>
                      <label>Giá</label>
                      <input type='text'
                      onChange={(event)=>{this.handleOnchangeInput(event,"price")}}
                     value={this.state.price}
                      />
                  </div>:''}
           
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

export default connect(mapStateToProps, mapDispatchToProps)(ModelUser);
