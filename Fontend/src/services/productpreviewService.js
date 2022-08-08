
import axios from '../axios'

const getAllReview=()=>{
    return axios.get('/get-allproductreview')
    
}

export{getAllReview}