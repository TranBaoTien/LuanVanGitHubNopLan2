import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAlltypeuser}from '../../services/userService'
import{Button,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
import _ from"lodash";

class ModelUser extends Component {

   constructor(props){
    super(props);
    this.state={
     fullname:this.props.user.fullname,
     username:this.props.user.username,
     password:this.props.user.password,
     email:this.props.user.email,
     phone:this.props.user.phone,
     idtype:this.props.user.idtype,
     arrtype:[]
    }
   }
  async componentDidMount() {
        let user=this.props.user;
        let type=await getAlltypeuser();
        if(user&&!_.isEmpty(user)){
            this.setState({
                id:user.id,
                fullname:user.fullname,
                username:user.username,
                password:user.password,
                email:user.email,
                phone:user.phone,
                idtype:user.idtype,
                arrtype:type
                
               })
             
        }
     //   console.log('check edit',this.props.user.idtype)
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
      let arrInput=['fullname','username','password','email','phone'];
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
  Edit USER
    </ModalHeader>
    <ModalBody>
        <div className='modeluser'>
                <div className='input-container'>
                    <label>FULLNAME</label>
                    <input type='text' disabled
                    onChange={(event)=>{this.handleOnchangeInput(event,"fullname")}}
                   value={this.state.fullname}
                    />
                </div>
                <div className='input-container'>
                <label>USERNAME</label>
                <input type='text' 
                onChange={(event)=>{this.handleOnchangeInput(event,"username")}}
                value={this.state.username}
                disabled
                />
                </div>
               
                {this.props.modeluser? <div className='input-container'>
                <label>EMAIL</label>
                <input type='email'
                onChange={(event)=>{this.handleOnchangeInput(event,"email")}}
                value={this.state.email}
                />
                </div>:""}

                <div class="form-group col-md-6">
                  <label>Loai Người Dùng</label>
                  <select class="form-control form-control-lg"   disabled  
                  onChange={(event)=>{this.handleOnchangeInput(event,"idtype")}}
                  value={this.state.idtype}
                  >
                  {
                    this.state.arrtype && this.state.arrtype.map((item,index)=>{
                      // if(this.state.idtype==item.id)
                      return(<option 
                      
                        value={item.id}
                        >{item.name}</option>);
                    })
                  }
                  </select>
                </div>
                <div className='input-container'>
                <label>PHONE</label>
                <input type='number'
                disabled
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
        onClick={()=>{this.handleSave()}}
      >
        Save
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
