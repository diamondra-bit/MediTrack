import React, { useEffect,useState } from 'react'

import './Home.css'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios'
import Calendar from '../../components/Calendar/Calendar'
import ModalCarroussel from '../../components/Modal/ModalCarroussel'

function Home() {
  const [listVente,setListVente]=useState([]);
  useEffect(()=>{
    const show=()=>{
      axios.get("http://localhost:2604/get/medicineVente")
      .then((response)=>{
        setListVente(response.data)
      })
    }
    show();
  },[])
  return (
    <>
      <div className='home'>
        <Navbar />

        <div className='home-main'>
          
          <div className='home-main-1' >
  
            <div className='home-main-flex'>
                <div className='home-main-rupture'>
                    <h2>En rupture de stock</h2>
                    <p>Consulter l'état des stock médicaments</p>
                    <div className='home-btn'>
                    <Link to="/stock">Consulter</Link>
                    </div>
                </div>
                <div className='home-main-expired'>
                    <h2>Péremption imminente</h2>
                    <p>Consulter les médicaments expirées bientot</p>
                    <div className='home-btn'>
                    <Link to="/expire">Consulter</Link>
                    </div>
                </div>
            </div>

            <div className='home-main-history'>
              <h2>Dernières ventes</h2>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Prix</th>
                    <th scope="col">Recette</th>
                  </tr>
                </thead>
                <tbody>

                {listVente.map((val)=>(
                  <tr key={val.idV}>
                    <td>{val.medicament}</td>
                    <td>{val.nombre}</td>
                    <td>{val.prix}</td>
                    <td>{val.total}</td>
                  </tr>
                ))}
             
                </tbody>
              </table>
            </div>         
          </div>

          <div className='calendar'>
           <Calendar/>
          </div>
        </div>
      </div>
     
     
    </>
  )
}

export default Home