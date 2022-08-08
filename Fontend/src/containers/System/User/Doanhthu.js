import React, { Component } from 'react';

import {ResponsiveContainer, LineChart,
     Line, XAxis, YAxis, CartesianGrid, 
     Tooltip, Legend} from 'recharts';
import {getalloder}from '../../../services/oderSevice'
import {getalldetail}from '../../../services/oderSevice';

class Doanhthu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name:"Tháng 07", uv: 5000, pv: 33980000, amt: 2400},
        {name:"Tháng 08", uv: 3000, pv: 68600000, amt: 2210},
        {name:"Tháng 09", uv: 2000, pv: 42400000, amt: 2290},
        
      ],
    
      
      arroders:[],
      arrdetail:[]
    }
  }
  async componentDidMount() {
    let response=await getalloder();
    let rs=await getalldetail();
    if(response){
        this.setState({
            arroders:response,
            arrdetail:rs
        })
    }
  
}

  render() {
    let data = this.state.data
    let arroder=this.state.arroders
     let arrde=this.state.arrdetail
    return (
<div>
        <div className=" title text-center">Doanh Thu</div>
     
       
        <div className='user-table mt-3 mx-2'>
        <ResponsiveContainer className="chart" height={300}>
        <LineChart 
         width={1000} 
         height={300} 
         data={data}
         margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Line type="monotone" dataKey='pv'
        stroke="#8884d8" activeDot={{r: 8}}/>
       
        </LineChart>
      </ResponsiveContainer>
        </div>
        </div>
      
    );
  }
}

export default Doanhthu;
