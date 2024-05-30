import React from 'react';
import {chart as chartJs, layouts} from "chart.js/auto";
import {Bar,Line} from "react-chartjs-2";
import { useEffect,useState } from 'react';
import axios from 'axios';
import './Stat.css'


function Stat() {
  const [chartData,setChartData]=useState([]);
  const [perimData,setPerimData]=useState([]);
  useEffect(()=>{
    fetchSomeInformation();
    fetchPerimInfo();
  },[]);

  const fetchSomeInformation= async ()=>{
    try {
      const resp= await axios.get("http://localhost:2604/get/getSome");
      setChartData(resp.data);
      console.log("voir "+ resp.data);
      
      } catch (error) {
       console.log("jereo"+error);
      }    
    };

    const fetchPerimInfo= async ()=>{
      try {
        const resp= await axios.get("http://localhost:2604/get/perime");
        setPerimData(resp.data);
        console.log("voir "+ resp.data);
        
      } catch (error) {
        console.log("jereo"+error);
      }
      
       };
  
       return (
        <div className='stat'>  
           <div className='dataCard categoryCard' style={{"backgroundColor":"white","padding":"30px","height":"450px","margin":"20px","width":"50%","border-radius":"30px"}} >
               <h6>La suivie des médicaments périmés  </h6>
               <Line 
               data={{
               labels:perimData.map((data)=>data.designation),
               datasets:[{
               label:"quantité périmé",
               data: perimData.map((data)=>data.quantity)
               },  
               ]
              }}
              />
            </div>
      
        
           
        <div className='dataCard customerCard' style={{"backgroundColor":"white","padding":"40px","height":"450px","margin":"20px","width":"50%","border-radius":"30px"}}>
          <h6> Vue globale des médicaments périmés dans le dépôt au fil du temps et les médicaments disponibles par chaques catégories</h6> 
          <Bar data={{
          labels:chartData.map((data)=>data.designation),
          datasets:[
            {
            label:"Quantitée périmé",
            data:perimData.map((data)=>data.quantity),
            backgroundColor:"green",
            borderRadius:10,
            },
            {
             label:"quantité en stock",
             data:chartData.map((data)=>data.quantity),
             backgroundColor:"blue",
             borderRadius:10,
            },
            ]
            }}/>  
        </div>
    </div>
  )
}
export default Stat