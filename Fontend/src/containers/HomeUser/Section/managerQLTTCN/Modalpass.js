import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
//import '../UserManage.scss';
import{Button,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
import _ from"lodash";

class Modalpass extends Component {

   constructor(props){
    super(props);
    this.state={
    

    }
   }
async   componentDidMount() {
        let typeuser=this.props.typeuser;
       
      
        if(typeuser&&!_.isEmpty(typeuser)){
            
            this.setState({
                id:typeuser.id,
                name:typeuser.name,
                detail:typeuser.detail,
                phantram:typeuser.phantram,
           
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

       
        return (
            <div>
  
  <Modal  isOpen={this.props.isOpen} toggle={()=>{this.toggle()}} 
  className="modalcontainer"
  >
    <ModalHeader toggle={()=>{this.toggle()}}>
            Edit
    </ModalHeader>
    <ModalBody>
    
  <div class="form-row">
  <div class="form-group col-md-6">
    <label for="inputCity">Mật khẩu hiện tại</label>
    <div class="input-group mb-2 classitemu">
    <div class="input-group-prepend ">
      <div class="input-group-text class-item"><i class="fas fa-lock"></i></div>
    </div>
    <input 
    type={this.state.isshow?'text':'password'}
    className='form-control'
                  placeholder='Enter your Password...'
             
                  onChange={(event)=>{this.handleOnchangeInput(event,'password1')}}
                  />
    <div class="input-group-prepend ">
      <div class="input-group-text class-item"> <span onClick={()=>{this.handleShow()}}>
      <i className={!this.state.isshow?"far fa-eye ":"fas fa-eye-slash"}></i>
      </span>
    </div>
    </div>
  </div>
  <label for="inputCity">Mật khẩu Mới</label>
  <div class="input-group mb-2 classitemu">
  <div class="input-group-prepend ">
    <div class="input-group-text class-item"><i class="fas fa-lock"></i></div>
  </div>
  <input 
  type={this.state.isshow?'text':'password'}
                className='form-control'
                placeholder='Enter your Password...'
           
                onChange={(event)=>{this.handleOnchangeInput(event,'passwordnew')}}
                />
  <div class="input-group-prepend ">
    <div class="input-group-text class-item"> <span onClick={()=>{this.handleShow()}}>

    <i className={!this.state.isshow?"far fa-eye ":"fas fa-eye-slash"}></i>
    </span>
  </div>
  </div>
</div>
   
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

export default connect(mapStateToProps, mapDispatchToProps)(Modalpass);
