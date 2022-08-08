import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../UserManage.scss';
import{Button,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
import _ from"lodash";
import {toast}from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
class NewModelEdit extends Component {

   constructor(props){
    super(props);
    this.state={
     id:this.props.typeuser.id,
     name:this.props.typeuser.name,
     detail:this.props.typeuser.detail
    }
   }
    componentDidMount() {
        let typeuser=this.props.typeuser;
        if(typeuser&&!_.isEmpty(typeuser)){
            
            this.state={
                id:typeuser.id,
                name:typeuser.name,
                detail:typeuser.detail
               
                
               }
        }
        console.log('check edit',this.props.typeuser)
    }
    toggle=()=>{
        this.props.toggleModal();
    }

    handleOnchangeInput=(event,id)=>{
      console.log('event 1',event.target.value,id)
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
      let arrInput=['name'];
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
   
    // if(this.props.errCode===0){
    //  this.toggle();
   
    // }
   }
    }
    render() {
        //let user=this.props.typeuser;
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
                <label>Name</label>
                <input type='text'
                onChange={(event)=>{this.handleOnchangeInput(event,'name')}}
                value={this.state.name}
                />
                
                </div>
                <div className='input-container'>
                <label>Detail</label>
                <input type='text'
                onChange={(event)=>{this.handleOnchangeInput(event,'detail')}}
                value={this.state.detail}
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

export default connect(mapStateToProps, mapDispatchToProps)(NewModelEdit);
