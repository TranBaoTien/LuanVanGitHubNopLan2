import React, { Component } from 'react';
import { connect } from "react-redux";
import FooterUser from '../../../HomeUser/FooterUser';
import Slider from "react-slick"
 import "slick-carousel/slick/slick.css";
 import "slick-carousel/slick/slick-theme.css";
 import './Detailproduct.scss';
 import {toast}from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Modeldetailproduct from '../../../HomeUser/Section/Modeldetailproduct';
import {getAllProduct,getAllimg,
  getOne,getPrice,getAllProduct1,
  editupdateproduct,createcmtstart,getAllComment} 
  from '../../../../services/productService'
import {getAlluser}from'../../../../services/userService'
import{deletacart,showcart,addTocart} from '../../../HomeUser/Section/CRUDCart.js'
import HeaderU from '../../../HomeUser/HeaderU';
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background:" black" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }

class Detailproduct extends Component {
    constructor(props){
        super(props);
        this.state={
          arrUser:[],
          arrComment:[],
         arrUsers:[],
         arrIMG:[],
         arrPrice:[],
         errmessage:'',
        productEdit:{},
        cart:[],
        numstart:0,
        comment:'',
        idpro:this.props.match.params.id,
        iduser:null,
        tong:null,
        chia:null,
        flas:false
       

        }
    }
    async componentDidMount() {
        let response=await getAllProduct();
       let res=await getAllimg();
       let pri=await getPrice();
       let commentstart=await getAllComment();
       let us=await getAlluser();
       const { userInfocus,isLoggedInCUS } = this.props;
        if(isLoggedInCUS){
          this.setState({
            iduser:userInfocus.id
          })
        }
        if(response){
            this.setState({
              arrUser:us,
               arrComment:commentstart,
                arrUsers:response,
                arrIMG:res,
                arrPrice:pri,
                isOpenModel:false,
                isOpeneditModel:false,
                errmessage:'',
                errCode:2,
                userEdit:{},
                productEdit:{}
            })
        }
    
    }
   handleOnchangeInput=(event,id)=>{
      let copystate={...this.state};
      copystate[id]=event.target.value;
      this.setState({...copystate});
   //   console.log(id+"-"+this.state.comment)
      }
      addStart=(value)=>{
        this.setState({
          numstart:value
        });
      
        }
        addCommentStart=async()=>{
          let cmtstart=await createcmtstart({
            numstart:this.state.numstart,
            comment:this.state.comment,
            idpro:this.state.idpro,
            iduser:this.state.iduser
          })
          if(cmtstart)
          {
             
              if(cmtstart.errCode===0){
                  toast.success('Thành Công', {autoClose:3000})  
              }
              else{
                  toast.error(cmtstart.message, { autoClose:3000})
              }
          
          }
        }
    //value={this.state.comment}
    //onChange={(event)=>{this.handleOnchangeInput(event,"comment")}}
deletacart=async(id)=>{
    let storage=localStorage.getItem('cart')
    if(storage){
       this.state.cart=JSON.parse(storage)
    }
    this.state.cart= this.state.cart.filter(item=>item.product.id!=id)
    localStorage.setItem('cart',JSON.stringify(this.state.cart))
 this.showcart();
}

 addTocart=async(id)=>{
    await addTocart(id);
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
handleEdit=async(product)=>{
    // console.log('product',product)
    this.setState({
        isOpeneditModel:true,
        productEdit:product
    })
    }
    // editproduct=async(product)=>{
    //     try {
    //        let rs= await editupdateproduct(product);
    //        if(rs)
    //         {
    //             this.setState({
    //                 errmessage:rs.message,
    //                 errCode:rs.errCode,
    //                 isOpeneditModel:false
    //             })
    //             this.handegetall();
    //         }
    //     } catch (error) {
            
    //     }
    //     }
    render() {
       
     // console.log(this.state.iduser)
//console.log(this.props.match.params.id)
let detail=this.props.match.params.id;
let arrPro=this.state.arrUsers;
let arrImg=this.state.arrIMG;
let arrprice=this.state.arrPrice;
let arrCommentStart=this.state.arrComment;
let tong=this.state.tong;
let chia=this.state.tong;
let flas=this.state.flas;
//console.log('detail sv'+detail)
return (
    <div>
    { this.state.isOpeneditModel && <Modeldetailproduct
        isOpen={this.state.isOpeneditModel}
        toggleModal={this.toggleEditModal}
        product={this.state.productEdit}
        // editproduct={this.editproduct}
        // errmessage={this.state.errmessage}
        // errCode={this.state.errCode}
        />}

<HeaderU/>
    {arrPro && arrPro.map((item,index)=>{
         if(item.id==detail){
            return (
                <div className='section-1'>
                {arrCommentStart&&arrCommentStart.map((cmt,numcmt)=>{
                  if(this.state.idpro==cmt.idpro){
                    flas=true;                
                    tong+=cmt.start;
                    chia=chia+1;
                  }
                
                })}
               <div className='div-detail-left'>
                    <div className='div-detail-div'>
                      <div className='img-detail-pro'><img src={item.img}/></div>
                      <div>  <Slider settings={
                        {dots: true,
                        infinite: true,
                        speed: 500,
                  
                        nextArrow: <SampleNextArrow  />,
                        prevArrow: <SamplePrevArrow />}}
                        >
                        {arrImg && arrImg.map((itemimg,index)=>{
                          if(itemimg.idpro===item.id)
                          { 
                            return (
                                <div className='slider-detail'>
                                <img src={itemimg.name} />
                                </div>
                                    
                            );}
                                }) }
                        </Slider></div>
                    </div>
                    <div className='div-detail-1'>
                      <div className='detail-top'>
                  
                    <div  className='detail-top-1'>
                    <div><h3><b>{item.name}</b></h3></div>
                    <div> <h3><i class="fas fa-star" style={{color:'#FF9900'}}></i>
                    {isNaN((tong/chia))?'Chưa có đánh giá':(tong/chia)}</h3></div>
                    <div><h5>Giá Khuyến mãi</h5></div>
                    {arrprice && arrprice.map((itemprice,index1)=>{
                      if(item.id==itemprice.idpro){

                    
                      return( <div>
                          
                          <div><h3><b>                <span className="new-price new-price-2">
                          {new Intl.NumberFormat('vi-VN',
                          {style: 'decimal',decimal: 'VND'}).format(itemprice.price)+ ' VNĐ'}</span>
                            </b></h3></div>
                          <div><h3>Dung lượng</h3></div>
                          <div><h3>{itemprice.data}</h3></div>
                          </div>); }
                    })}
                    
                  
                    <div><b><h3>Khuyến mãi</h3></b></div>
                      <div><h5>Giá và khuyến mãi dự kiến áp dụng đến 23:00 24/06</h5></div>
                      <div><b><h5>Tặng Phiếu mua hàng giảm 10% Tai nghe từ 1.5 triệu (giảm tối đa 1 triệu)</h5></b></div>
                      <div><b><h5> Giảm đến 1,500,000đ khi tham gia thu cũ đổi mới</h5></b></div>
                      <div><b><h5>Giảm 50% giá gói cước 1 năm (Vina350/Vina500) cho Sim VinaPhone trả sau (Trị giá đến 3 triệu)</h5></b></div>
                      <div><b><h5>Giảm đến 500.000đ khi thanh toán quét QRcode qua App của ngân hàng</h5></b></div>
                      <div><b><h6>(*) Giá hoặc khuyến mãi không áp dụng trả góp lãi suất đặc biệt (0%, 0.5%, 1%)</h6></b></div>
                    
                  <div className='oder-pro'>
                  <div className='oder1'><button><b>Mua Ngay</b></button></div>
                  <div className='oder2'>
                  <button onClick={()=>this.handleEdit(item)}>Xem chi tiết</button>
                  <button onClick={()=>this.addTocart(item.id)}>Đặt Hàng</button>
                  </div>
                  
                  </div>
                    </div>
                    
                      </div>
                    
                    </div>        
              </div>
              <div>
              
             
          <table class="table table-dark">
  <thead>
  <tr>
<th>Thông tin chung</th>
</tr>
</thead>
    <tr>
      <th scope="col">Xuất xứ:</th>
      <td>{item.xuatxu}</td>
    
    </tr>
  
  <tbody>
    <tr>
      <th scope="row">Thời gian bảo hàng</th>
      <td>{item.timebaohanh	}</td>

    </tr>
    <thead>
    <tr>
  <th>Màn Hình</th>
  </tr>
  </thead>
    <tr>
      <th scope="row">Công nghệ màn hình</th>
      <td>{item.technologyscreen }</td>

    </tr>
    <tr>
    <th scope="row">Độ phân giải</th>
    <td>{item.dophangiai}</td>

  </tr>
  <tr>
  <th scope="row">Màn hình rộng</th>
  <td>{item.sizescreen}</td>
 
</tr>
<tr>
<th scope="row">Mặt kính</th>
<td>Không có</td>

</tr>
<thead>
  <tr>
<th>Hệ điều hành</th>
</tr>
</thead>
<tr>
<th scope="row">Hệ điều hành</th>
<td>{item.hedieuhanh}</td>

</tr>
<tr>
<th scope="row">Chip</th>
<td>{item.chip}</td>

</tr>
<tr>
<th scope="row">Pin</th>
<td>{item.pin}</td>

</tr>
<tr>
<th scope="row">Cổng sạc</th>
<td>{item.congsac}</td>

</tr>
<thead>
  <tr>
<th>Bộ nhớ</th>
</tr>
</thead>
<tr>
<th scope="row">Ram</th>
<td>{item.ram}</td>

</tr>
<tr>
<th scope="row">Dung Lượng</th>
<td>64GB</td>

</tr>
  </tbody>
</table>
              </div>
              <div className='cmt-start'>
              <div class="row no-gutters">
             
              </div>      
              </div>
              <div className='cmt-start'>
             
<div data-spy="scroll" data-target="#navbar-example2" data-offset="0">
<div>
<div class="stars" style={{color:`white`}}>
  <form action="">
    <input class="star star-5" id="star-5" type="radio" name="star" onClick={()=>this.addStart(5)}/>
    <label class="star star-5" for="star-5"></label> 
    <input class="star star-4" id="star-4" type="radio" name="star" onClick={()=>this.addStart(4)}/>
    <label class="star star-4" for="star-4"></label>
    <input class="star star-3" id="star-3" type="radio" name="star" onClick={()=>this.addStart(3)}/>
    <label class="star star-3" for="star-3"></label>
    <input class="star star-2" id="star-2" type="radio" name="star" onClick={()=>this.addStart(2)}/>
    <label class="star star-2" for="star-2"></label>
    <input class="star star-1" id="star-1" type="radio" name="star" onClick={()=>this.addStart(1)}/>
    <label class="star star-1" for="star-1"></label>
  </form>
</div>

</div>
<div class="input-group mb-3">
  <input type="text" class="form-control" 
  placeholder="Bình luận" aria-label="Recipient's username" 
  aria-describedby="button-addon2"
  value={this.state.comment}
    onChange={(event)=>{this.handleOnchangeInput(event,"comment")}}
  />
  <div class="input-group-append">
  <button type="button" class="btn btn-primary" onClick={()=>this.addCommentStart()}>Send</button>

  </div>
</div>

{arrCommentStart&&arrCommentStart.map((cmt,numcmt)=>{
  if(this.state.idpro==cmt.idpro){

    return(<div class="container commentye"> 
    <div class="row profile">        
     <div class="col-md-1000 comment">          
                              
       <div class="profile123">
       <img src="https://hocwebgiare.com/thiet_ke_web_chuan_demo/bootstrap_user_profile/images/profile_user.jpg" class="img-responsive" alt="Thông tin cá nhân"/>               
       </div>                                            
        <div>
        {this.state.arrUser&&this.state.arrUser.map(u=>{
          if(u.id==cmt.iduser)
          return(<h6>{u.fullname}</h6>
          );
        })}
        <h5><i class="fas fa-star" style={{color:'#FF9900'}}></i> {cmt.start}</h5>
        <h6>{(cmt.createdAt)}</h6>
        <h6>{cmt.cmt}</h6>
        </div>
     </div>      
      </div>
     
    </div>);
    
  }

})}
  </div>
              </div>
            
          
       </div>            
           );
         }
      
           }) }
<FooterUser/>
    </div>
  );
    }
}


export const addTocart1=async(id)=>{
    let carts=[];
    let storage=localStorage.getItem('cart')
    if(storage){
       carts=JSON.parse(storage)
    }
      let product=await getAllProduct1(id);
      let item=this.state.cart.find(c=>c.product.id==id);
      if(item){
        item.quatity+=1;
      }else{
         carts.push({product,quatity:1})
      }
    localStorage.setItem('cart',JSON.stringify(carts))
   this.showcart(carts);
//    this.setState({
//      cart:this.state.cart
      
//   })
   
  }
 export const showcart1=async(shoppingcart)=>{
    let cartBody=document.getElementById('cart-body')
    cartBody.innerHTML=''
    shoppingcart.map(item=>{
      cartBody.innerHTML+=
      `<div class='tb-cart-1'>
      <div class='tb-cart-2'><h1>${item.product.name}</h1></div>
      <div class='tb-cart-2'><h1>${item.quatity}</h1></div>
      <div class='tb-cart-2'><h1>${item.quatity}</h1></div>
      </div>`
      
    })
}

const mapStateToProps = state => {
    return {
      isLoggedInCUS: state.user.isLoggedInCUS,
      userInfocus:state.user.userInfocus
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detailproduct);
