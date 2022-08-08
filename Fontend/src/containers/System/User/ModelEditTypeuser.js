import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../UserManage.scss';
import{Button,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
import _ from"lodash";
import{getAllProduct,getAllstatus}from'../../../services/productService'

class ModelUser extends Component {

   constructor(props){
    super(props);
    this.state={
     id:this.props.typeuser.id,
     name:this.props.typeuser.name,
     idpro:this.props.typeuser.idpro,
     price:this.props.typeuser.price,
     idstatus:this.props.typeuser.idstatus,
     detail:this.props.typeuser.detail,
     phantram:this.props.typeuser.phantram,
     arrPro:[],
     arrStatus:[]

    }
   }
async   componentDidMount() {
        let typeuser=this.props.typeuser;
        let pro=await getAllProduct();
        let status= await getAllstatus();
      
        if(typeuser&&!_.isEmpty(typeuser)){
            
            this.setState({
                id:typeuser.id,
                name:typeuser.name,
                detail:typeuser.detail,
                phantram:typeuser.phantram,
                arrPro:pro,
                arrStatus:status
                
               })
        }
      //  console.log('check edit',this.props.typeuser)
    }
    toggle=()=>{
        this.props.toggleModal();
    }

    handleOnchangeInput=(event,id)=>{
      console.log('event 1',event.target.value,id)
  
    let copystate={...this.state};
    copystate[id]=event.target.value;
    this.setState({...copystate})

    }
    checkInput=()=>{
      let isValid=true;
      let arrInput=[];
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
     this.props.editUser(this.state);
 
   }
    }
    render() {

        let pro=this.state.arrPro;
        let status=this.state.arrStatus;
        return (
            <div>
  
  <Modal  isOpen={this.props.isOpen} toggle={()=>{this.toggle()}} 
  className="modalcontainer"
  >
    <ModalHeader toggle={()=>{this.toggle()}}>
            Edit
    </ModalHeader>
    <ModalBody>
        <div className='modeluser'>
        
                <div className='input-container'>
                    <label>ID</label>
                    <input type='text'
                    onChange={(event)=>{this.handleOnchangeInput(event,'id')}}
                    value={this.state.id}
                   disabled
                    />
                </div>
                <div className='input-container'>
                {this.props.arrtypepro||this.props.arrPayment||this.props.arrtypeuser||this.props.new||this.props.imgarr||this.props.thuonghieustate||this.props.statusstate?
                  <div className='input-container'>
                  <label>Name</label>
                  <input type='text'
                  onChange={(event)=>{this.handleOnchangeInput(event,"name")}}
                 value={this.state.name}
                  />
              </div>:''
                }
                {this.props.imgarr||this.props.pricearr?
                  <div class="form-group col-md-6">
                      <label>Loại Sản Phẩm</label>
                      <select class="form-control form-control-lg"    
                      onChange={(event)=>{this.handleOnchangeInput(event,"idpro")}}
                      value={this.state.idpro}
                      >
                      {
                        pro && pro.map((item,index)=>{
                          // if(this.state.idtype==item.id)
                          return(<option 
                          
                            value={item.id}
                            >{item.name}</option>);
                        })
                      }
                      </select>
                      </div>
                      :""

                }
                {this.props.new||this.props.arrvouchers?
                  <div className='input-container'>
                  <label>Detail</label>
                  <input type='text'
                  onChange={(event)=>{this.handleOnchangeInput(event,"detail")}}
                 value={this.state.detail}
                  />
              </div>
                  
                  :""}
                  {this.props.arrvouchers?
                    <div className='input-container'>
                    <label>Phần Trăm</label>
                    <input type='number'
                    onChange={(event)=>{this.handleOnchangeInput(event,"phantram")}}
                   value={this.state.phantram}
                    />
                </div>
                    
                    :""}
                {this.props.pricearr?<div className='input-container'>
                <label>Giá</label>
                <input type='text'
                onChange={(event)=>{this.handleOnchangeInput(event,"price")}}
               value={this.state.price}
                />
            </div>:''}
            {this.props.arroder?
              <div class="form-group col-md-6">
                  <label>Loai Sản Phẩm</label>
                  <select class="form-control form-control-lg"    
                  onChange={(event)=>{this.handleOnchangeInput(event,"idstatus")}}
                  value={this.state.idstatus}
                  >
                  {
                    status && status.map((item,index)=>{
                       if(item.id<=4||item.id==16)
                      return(<option 
                      
                        value={item.id}
                        >{item.name}</option>);
                    })
                  }
                  </select>
                  </div>
                  :""

            }
                </div>
            <div className='input-container'>
            <label style={{color:'red'}}> {this.props.errmessage}</label>
            
           
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModelUser);
