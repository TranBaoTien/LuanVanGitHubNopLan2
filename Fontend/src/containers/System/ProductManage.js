import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import Modelproduct from '../System/Product/ModelProduct';
import ModelEditproduct from '../System/Product/ModelEditProduct';
import {getAllProduct,createNewproduct,deleteproduct,editupdateproduct,getAllimg,getAllTypeProduct} from '../../services/productService.js';
import {toast}from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
class productManage extends Component {

   constructor(props){
       super(props);
       this.state={
        arrproducts:[],
        isOpenModel:false,
        isOpeneditModel:false,
        errmessage:'',
        errCode:2,
        productEdit:{},
        arrtye:[]
       }
   }

   async componentDidMount() {
        let response=await getAllProduct();
        let type=await getAllTypeProduct();
        if(response){
            this.setState({
                arrproducts:response,
                arrtye:type
            })
        }
      
    }
handeladd=()=>{
    this.setState({
        isOpenModel:true
    })
}
toggleModal=()=>{
    this.setState({
        isOpenModel:!this.state.isOpenModel
    })
}
toggleEditModal=()=>{
    this.setState({
        isOpeneditModel:!this.state.isOpeneditModel
    })
}

createproduct=async(data)=>{
  try {
    let response=await createNewproduct(data);
    if(response)
    {
        this.setState({
            errmessage:response.message,
            errCode:response.errCode,
            //isOpenModel:false
        })
        if(response.errCode===0){
        toast.success('Thành Công', {autoClose:3000})  }
        else
        {toast.error(response.message, { autoClose:5000})}
    
        this.handegetall();
    }
    //console.log('kq la',response)
  } catch (e) {
     console.log(e) ;
  }  

  
}

editproduct=async(product)=>{
try {
   let rs= await editupdateproduct(product);
   if(rs)
    {
        this.setState({
            errmessage:rs.message,
            errCode:rs.errCode,
            isOpeneditModel:false
        })
        if(rs.errCode===0){
            toast.success('Thành Công', {autoClose:3000})  }
            else
            {toast.error(rs.message, { autoClose:5000})}
        
        this.handegetall();
    }
} catch (error) {
    
}
}


handegetall=async()=>{
    let response=await getAllProduct();
        if(response){
            this.setState({
                arrproducts:response
            })
        }
   
}
handleDelete=async(product)=>{
 //console.log('product',product.id)

try {
    
  let rs=  await deleteproduct(product.id);
  if(rs.errCode===0){
    toast.success('Thành Công', {autoClose:3000})  }
    else
    {toast.error(rs.message, { autoClose:5000})}

    this.handegetall();
} catch (e) {
    console.log(e);
}
}
handleEdit=async(product)=>{
    // console.log('product',product)
    this.setState({
        isOpeneditModel:true,
        productEdit:product
    })
    }

    

    render() {
        //console.log("check",this.state.arrproducts);
        let arrproducts=this.state.arrproducts;
        let type=this.state.arrtye;
        return (
            <div className="product-container">

            <Modelproduct
            isOpen={this.state.isOpenModel}
            toggleModal={this.toggleModal}
            createproduct={this.createproduct}
            type={this.state.arrtye}
            errmessage={this.state.errmessage}
            errCode={this.state.errCode}
            />
           { this.state.isOpeneditModel && <ModelEditproduct
            isOpen={this.state.isOpeneditModel}
            toggleModal={this.toggleEditModal}//true false để mở model hoặc tắt 
            product={this.state.productEdit}//data của item được gửi lên
            editproduct={this.editproduct}//hàm xử lý update
            errmessage={this.state.errmessage}//kiểm tra lỗi gửi lỗi cho hàm
            errCode={this.state.errCode}//gửi số mã lỗi để xử lý
            />}

            <div className=" title text-center">Manage products</div>
           <div className='mx-1'>
           <button className='btn btn-success px-3'  onClick={()=>{this.handeladd()}}><i className="fas fa-plus"></i>Add
           
           </button>
           
           </div>
           
            <div className='product-table mt-3 mx-2'>
            
            <table id="customers">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>IMG</th>
                       
                        <th>Action</th>
                    </tr>
                    {arrproducts && arrproducts.map((item,index)=>{
                        return(
                            <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.img}</td>
                        
                            <td>
                            <button className='btn-edit' onClick={()=>this.handleEdit(item)} ><i className="fas fa-pencil-alt"></i></button>
                            <button className='btn-delete'  onClick={()=>this.handleDelete(item)}><i className="fas fa-trash"></i></button>
                           
                            </td>
                            </tr>
                        )
                    }) }
                        
                   
                   
        </table>
            
            
            </div>
            </div>
         
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(productManage);
