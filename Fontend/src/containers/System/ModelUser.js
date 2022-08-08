import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import{Button,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
class ModelUser extends Component {

   constructor(props){
    super(props);
    this.state={
     fullname:'',
     username:'',
     password:'',
     email:'',
     phone:'',

     
    }
   }
    componentDidMount() {
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
      let arrInput=['fullname','username','password','phone'];
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
        return (
            <div>
  
  <Modal  isOpen={this.props.isOpen} toggle={()=>{this.toggle()}} 
  className="modalcontainer"
  >
    <ModalHeader toggle={()=>{this.toggle()}}>
     Create New User
    </ModalHeader>
    <ModalBody>
        <div className='modeluser'>
                <div className='input-container'>
                    <label>FULLNAME</label>
                    <input type='text' 
                    onChange={(event)=>{this.handleOnchangeInput(event,"fullname")}}
                   value={this.state.fullname}
                    />
                </div>
                <div className='input-container'>
                <label>USERNAME</label>
                <input type='text'
                onChange={(event)=>{this.handleOnchangeInput(event,"username")}}
                value={this.state.username}
                />
                </div>
                <div className='input-container'>
                <label>PASSWORD</label>
                <input type='password'
                onChange={(event)=>{this.handleOnchangeInput(event,"password")}}
                value={this.state.password}
                />
                </div>
               
              {this.props.modeluser? <div className='input-container'>
              <label>EMAIL</label>
              <input type='email'
              onChange={(event)=>{this.handleOnchangeInput(event,"email")}}
              value={this.state.email}
              />
              </div>:""}
               
               
                <div className='input-container'>
                <label>PHONE</label>
                <input type='number'
             
                onChange={(event)=>{this.handleOnchangeInput(event,"phone")}}
                value={this.state.phone}
                />
               
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

export default connect(mapStateToProps, mapDispatchToProps)(ModelUser);
