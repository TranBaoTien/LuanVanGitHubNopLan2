import React, { Component } from 'react'
import {getAllProduct,getAllimg,getPrice} from '../../services/productService'
import'./Product.scss'
import HeaderU from './HeaderU';
import FooterUser from './FooterUser';
import {timkiem,getAllmoinhat,getAllBanChay}from'../../services/productService'

import{deletacart,showcart,addTocart} from '../HomeUser/Section/CRUDCart'
export default class Product extends Component {
    constructor(props){
        super(props);
        this.state={
           arrproduct:[],
           arrPrice:[],
           key:'',
           danhmuc:'',
           flas:false
        }
    }
    async componentDidMount() {
      
        let pri=await getAllProduct();
        let price=await getPrice();
        this.setState({
          arrproduct:pri,
          arrPrice:price
        })
    }
    handleOnchangeInput=(event,id)=>{
     
      let copystate={...this.state};
      copystate[id]=event.target.value;
      this.setState({...copystate})
  
      }
      handlesreach=async()=>{
        try {
        //     let key=this.state.key;
        //  console.log('kq state',key)
          let response=await timkiem(this.state.key);
          //console.log('kq la',response)
          if(response)
          {
              this.setState({
                  arrproduct:response,
                  flas:false
              })
          }
        } catch (e) {
           console.log(e) ;
        }  
      }
      handledanhmuc=async(data)=>{
        let pri=await getAllProduct();
        this.setState({
                arrproduct:pri,
                 danhmuc:data,
                 flas:true
              })
       
      }
      handleHot=async()=>{
        let pri=await getAllmoinhat();
        this.setState({
                arrproduct:pri,
                 
                 flas:false
              })
      }
      handleTop=async()=>{
        let pri=await getAllBanChay();
        this.setState({
                arrproduct:pri,
              
                flas:false
              })
      }

    handledetailpro=(product)=>{
        //console.log('product',product);
        this.props.history.push(`/product/${product.id}`);
      
       }
       addTocart=async(id)=>{
        await addTocart(id);
    }
    
  render() {
    let pro=this.state.arrproduct;
    let arrprice=this.state.arrPrice;
    return (
      <div>
      <HeaderU />
     
      <div className='header-banner'>
      
      </div>
   
        <section className='product'>
            <div className='container'>
            
             
      <nav class="navbar navbar-light bg-light">

  <div class="form-inline">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
    onChange={(event)=>{this.handleOnchangeInput(event,"key")}}
    value={this.state.key}/>
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit"  onClick={()=>{this.handlesreach()}}><i class="fas fa-search"></i></button>
  </div>
  
</nav>
<div class="row">
  <div class="col-3">
    <div class="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
      <div class="nav"   role="tab" onClick={()=>{this.handledanhmuc(1)}}>Thương Hiệu</div>
      <div class="nav-link"  onClick={()=>{this.handledanhmuc(0)}} role="tab">Xiaomi</div>
      <div class="nav-link"  onClick={()=>{this.handledanhmuc(2)}}  role="tab">SamSung</div>
      <div class="nav-link"   role="tab">Iphone</div>
    </div>
  </div>
  <div class="col-3">
    <div class="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
      <div  role="tab">Danh mục sản phẩm</div>
      <div class="nav-link"   onClick={()=>{this.handledanhmuc(1)}} role="tab">Điện Thoại</div>
      <div class="nav-link"   onClick={()=>{this.handledanhmuc(2)}} role="tab">Tai nghe</div>
      <div class="nav-link"   onClick={()=>{this.handledanhmuc(4)}} role="tab">Phụ kiện</div>
      <div class="nav-link"    onClick={()=>{this.handledanhmuc(3)}} role="tab">Sạc</div>

      </div>
  </div>
  <div class="col-3">
  <div class="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
    <div   role="tab">Sản phẩm mới</div>
    <div class="nav-link" onClick={()=>{this.handleHot()}}  role="tab">Hot nhất</div>
    <div class="nav-link"  onClick={()=>{this.handleTop()}}  role="tab">Nhiều lượt mua</div>
    <div class="nav-link"  onClick={()=>{this.handleHot()}} role="tab">Mới ra</div>
  </div>
</div>

</div>

                <div className='row'>
                
                    {pro.map((item,index)=>{
                      // eslint-disable-next-line no-lone-blocks
                     
                     if(this.state.flas==true)
                       {
                        if(this.state.danhmuc==0)
                        {if(item.idth==1)
                        return(<div className='col-xl-3 col-lg-4 col-md-6 col sm-12 product-item' key={index} >
                                <div className='card card-pro-pro'>
                                <img src={item.img} className='card-img-top'/>
                                <div className='card-body'>
                                    <h4 className='card-title'>{(item.name).length<=45?item.name:item.name.substring(0,45)+"..."}</h4>
                                    {arrprice && arrprice.map((itemprice,index1)=>{
                                        if(item.id==itemprice.idpro){
                                
                                       
                                        return( 
                                            <h3 >
                                            <span className="new-price new-price-2">
                                            {new Intl.NumberFormat('vi-VN',
                                            {style: 'decimal',decimal: 'VND'}).format(itemprice.price)+ ' VNĐ'}</span>
                                              
                                            </h3>
                                            ); }
                                       })}
                                </div>
                                <div className='card-body card-center' >
                                <button type="button" class="btn btn-primary" onClick={()=>this.addTocart(item.id)}>Đặt Hàng</button>
                                <button type="button" class="btn btn-info" onClick={()=>this.handledetailpro(item)}>Chi Tiết</button>
                                <button type="button" class="btn btn-success" onClick={()=>this.addTocart(item.id)}>Giỏ Hàng</button>
                                </div> 
                               
                                </div>
                            </div>)}
                        else if(this.state.danhmuc==item.idtype)
                        return(<div className='col-xl-3 col-lg-4 col-md-6 col sm-12 product-item' key={index} >
                        <div className='card card-pro-pro'>
                        <img src={item.img} className='card-img-top'/>
                        <div className='card-body'>
                            <h4 className='card-title'>{(item.name).length<=45?item.name:item.name.substring(0,45)+"..."}</h4>
                            {arrprice && arrprice.map((itemprice,index1)=>{
                                if(item.id==itemprice.idpro){
                        
                               
                                return( 
                                    <h3 >
                                    <span className="new-price new-price-2">
                                    {new Intl.NumberFormat('vi-VN',
                                    {style: 'decimal',decimal: 'VND'}).format(itemprice.price)+ ' VNĐ'}</span>
                                      
                                    </h3>
                                    ); }
                               })}
                        </div>
                        <div className='card-body card-center' >
                        <button type="button" class="btn btn-primary" onClick={()=>this.addTocart(item.id)}>Đặt Hàng</button>
                        <button type="button" class="btn btn-info" onClick={()=>this.handledetailpro(item)}>Chi Tiết</button>
                        <button type="button" class="btn btn-success" onClick={()=>this.addTocart(item.id)}>Giỏ Hàng</button>
                        </div> 
                       
                        </div>
                    </div>)

                        }
                        else
                        return(<div className='col-xl-3 col-lg-4 col-md-6 col sm-12 product-item' key={index} >
                        <div className='card card-pro-pro'>
                        <img src={item.img} className='card-img-top'/>
                        <div className='card-body'>
                            <h4 className='card-title'>{(item.name).length<=25?item.name:item.name.substring(0,45)+"..."}</h4>
                            {arrprice && arrprice.map((itemprice,index1)=>{
                                if(item.id==itemprice.idpro){
                        
                               
                                return( 
                                    <h3 >
                                    <span className="new-price new-price-2">
                                    {new Intl.NumberFormat('vi-VN',
                                    {style: 'decimal',decimal: 'VND'}).format(itemprice.price)+ ' VNĐ'}</span>
                                      
                                    </h3>
                                    ); }
                               })}
                        </div>
                        <div className='card-body card-center' >
                        <button type="button" class="btn btn-primary" onClick={()=>this.addTocart(item.id)}>Đặt Hàng</button>
                        <button type="button" class="btn btn-info" onClick={()=>this.handledetailpro(item)}>Chi Tiết</button>
                        <button type="button" class="btn btn-success" onClick={()=>this.addTocart(item.id)}>Giỏ Hàng</button>
                        </div> 
                       
                        </div>
                    </div>)
                    })}
                </div>
            </div>
        </section>
      
      <FooterUser/>
      </div>
    )
  }
}
