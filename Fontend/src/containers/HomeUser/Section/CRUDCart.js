import {getAllProduct1,getPrice,getOnePrice} from '../../../services/productService'
import Cart from './Cart.js'
let cart=[];
const deletacart=(id)=>{
    let storage=localStorage.getItem('cart')
    if(storage){
      cart=JSON.parse(storage)
    }
    cart= cart.filter(item=>item.product.id!=id)
    localStorage.setItem('cart',JSON.stringify(cart))
    
 showcart1();
 return cart;
}
const deletacartfull=(id)=>{
   let storage=localStorage.getItem('cart')
   if(storage){
     cart=JSON.parse(storage)
   }
   cart= cart.removeItem(id)
  localStorage.setItem('cart',JSON.stringify(cart))
showcart1();
return cart;
}
const showcart=async(shoppingcart)=>{
    let cartBody=document.getElementById('cart-body')
    cartBody.innerHTML=''
    shoppingcart.map(item=>{
      cartBody.innerHTML+=
      `<div class='tb-cart-1'>
      <div class='tb-cart-2'><h2>${item.product.name}</h2></div>
      <div class='tb-cart-2'><h2>${item.quatity}</h2></div>
      <div class='tb-cart-2'><h2>${item.quatity}</h2></div>
      </div>`
      
    })
    
}
const showcart1=async(req,res)=>{
  let storage=localStorage.getItem('cart')
  if(storage){
    cart=JSON.parse(storage)
  }
   return cart; 
    
}
const updatecart=async(id)=>{
    let storage=localStorage.getItem('cart')
    if(storage){
       cart=JSON.parse(storage)
    }
      let product=await getAllProduct1(id);
     
      let item=cart.find(c=>c.product.id===id);
      if(item){
        item.quatity+=1;
      }else{
         cart.push({product,quatity:1})
      }
    localStorage.setItem('cart',JSON.stringify(cart))
  //  showcart(cart);
  
  return cart;
   
  }
  const updatecartminus=async(id)=>{
    let storage=localStorage.getItem('cart')
    if(storage){
       cart=JSON.parse(storage)
    }
      let product=await getAllProduct1(id);
      let item=cart.find(c=>c.product.id===id);
    
      if(item){
        if(item.quatity>1){
            item.quatity-=1;
        }
        else{
       alert(`Không được bé hơn 1`)
        }
       
      }else{
         cart.push({product,quatity:1})
      }
    localStorage.setItem('cart',JSON.stringify(cart))
  //  showcart(cart);
  
  return cart;
   
  }
const addTocart=async(id)=>{
  let storage=localStorage.getItem('cart')
  if(storage){
     cart=JSON.parse(storage)
  }
    let product=await getAllProduct1(id);
    let price=await getOnePrice(id);
    let item=cart.find(c=>c.product.id===id);
    if(item){
      item.quatity+=1;
    }else{
       cart.push({product,quatity:1,price})
    }
  localStorage.setItem('cart',JSON.stringify(cart))
//  showcart(cart);
return cart;
 
}

export{deletacart,deletacartfull,showcart,addTocart,showcart1,updatecart,updatecartminus}